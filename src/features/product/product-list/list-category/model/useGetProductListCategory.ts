'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';

import {
  GetProductListCategoryDocument,
  type GetProductListCategoryQuery,
  type GetProductListCategoryQueryVariables,
} from '@/shared/api/gql/graphql';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { buildCategoryWhere } from '@/features/catalog/catalog-filters/utils/utils';
import { filtersEqual, mergeProductNodes } from '../../utils';
import type {
  UseProductListOptions,
  UseProductListResult,
  ProductNode,
} from '../../model/useProductList';

type UseProductCategoryListOptions = UseProductListOptions & { slug: string };

type CategoryNode = NonNullable<
  NonNullable<
    NonNullable<GetProductListCategoryQuery['productCategory']>['products']
  >['nodes'][number]
>;

export function useGetProductListCategory({
  slug,
  pageSize = 10,
}: UseProductCategoryListOptions): UseProductListResult {
  const selectedFilters = useAppSelector(selectSelectedFilters, filtersEqual);
  const where = useMemo(
    () => buildCategoryWhere(selectedFilters),
    [selectedFilters],
  );

  const variables = useMemo<GetProductListCategoryQueryVariables>(
    () => ({
      n: pageSize,
      slug,
      where,
    }),
    [pageSize, slug, where],
  );

  const { data, fetchMore, loading, error, networkStatus } = useQuery<
    GetProductListCategoryQuery,
    GetProductListCategoryQueryVariables
  >(GetProductListCategoryDocument, {
    variables,
    skip: !slug,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const products = useMemo<(CategoryNode | null | undefined)[]>(
    () =>
      (data?.productCategory?.products?.nodes ?? []) as (
        | CategoryNode
        | null
        | undefined
      )[],
    [data?.productCategory?.products?.nodes],
  );

  const pageInfo = data?.productCategory?.products?.pageInfo;
  const endCursor = pageInfo?.endCursor ?? null;
  const hasNextPage = Boolean(pageInfo?.hasNextPage);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (isFetchingMore) return;
    if (!endCursor || !hasNextPage || !slug) return;

    setIsFetchingMore(true);
    try {
      await fetchMore({
        variables: {
          n: pageSize,
          after: endCursor,
          slug,
          where,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.productCategory) return prev;
          if (!prev?.productCategory) return fetchMoreResult;

          const prevProducts = prev.productCategory.products;
          const nextProducts = fetchMoreResult.productCategory.products;
          if (!prevProducts || !nextProducts) return prev;

          const mergedNodes = mergeProductNodes(
            prevProducts.nodes,
            nextProducts.nodes,
          ) as typeof prevProducts.nodes;

          return {
            ...prev,
            productCategory: {
              ...fetchMoreResult.productCategory,
              products: {
                ...nextProducts,
                nodes: mergedNodes,
              },
            },
          };
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  }, [
    isFetchingMore,
    endCursor,
    hasNextPage,
    slug,
    fetchMore,
    pageSize,
    where,
  ]);

  const isInitialLoading = loading && !products.length;

  return {
    products: products as unknown as (ProductNode | null | undefined)[],
    loadMore,
    hasNextPage,
    isFetchingMore,
    isInitialLoading,
    error,
    networkStatus,
    cursors: {
      endCursor,
      hasNextPage,
    },
  };
}
