'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';

import {
  GetProductListAllDocument,
  type GetProductListAllQuery,
  type GetProductListAllQueryVariables,
} from '@/shared/api/gql/graphql';

import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';
import { buildWhere } from '@/features/catalog/catalog-filters/utils/utils';
import { filtersEqual, mergeProductNodes } from '../../utils';
import type {
  UseProductListOptions,
  UseProductListResult,
  ProductNode,
} from '../../model/useProductList';

type AllProductNode = NonNullable<
  GetProductListAllQuery['products']
>['nodes'][number];

type UseGetProductListAllOptions = UseProductListOptions & {
  selectedFilters?: SelectedFilters;
};

export function useGetProductListAll(
  options?: UseGetProductListAllOptions,
): UseProductListResult {
  const { pageSize = 12, selectedFilters: providedFilters } = options ?? {};
  const selectedFiltersFromStore = useAppSelector(
    selectSelectedFilters,
    filtersEqual,
  );
  const selectedFilters = providedFilters ?? selectedFiltersFromStore;
  const where = useMemo(() => buildWhere(selectedFilters), [selectedFilters]);

  const variables = useMemo<GetProductListAllQueryVariables>(
    () => ({
      n: pageSize,
      after: null,
      where,
    }),
    [pageSize, where],
  );

  const { data, fetchMore, loading, error, networkStatus } = useQuery<
    GetProductListAllQuery,
    GetProductListAllQueryVariables
  >(GetProductListAllDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const products = useMemo<(AllProductNode | null | undefined)[]>(
    () =>
      (data?.products?.nodes ?? []) as (AllProductNode | null | undefined)[],
    [data?.products?.nodes],
  );

  const pageInfo = data?.products?.pageInfo;
  const endCursor = pageInfo?.endCursor ?? null;
  const hasNextPage = Boolean(pageInfo?.hasNextPage);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (isFetchingMore) return;
    if (!endCursor || !hasNextPage) return;

    setIsFetchingMore(true);
    try {
      console.log(pageSize);
      await fetchMore({
        variables: {
          n: pageSize,
          after: endCursor,
          where,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.products) return prev;
          if (!prev?.products) return fetchMoreResult;

          const mergedNodes = mergeProductNodes(
            prev.products.nodes,
            fetchMoreResult.products.nodes,
          ) as typeof prev.products.nodes;

          return {
            ...prev,
            products: {
              ...fetchMoreResult.products,
              nodes: mergedNodes,
            },
          };
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, endCursor, hasNextPage, fetchMore, pageSize, where]);

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
