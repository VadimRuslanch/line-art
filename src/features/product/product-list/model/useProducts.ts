'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';

import {
  GetProductAllListDocument,
  type GetProductAllListQuery,
  type GetProductAllListQueryVariables,
} from '@/shared/api/gql/graphql';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { buildWhere } from '@/features/catalog/catalog-filters/utils/utils';
import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';

const filtersEqual = (a: SelectedFilters, b: SelectedFilters) =>
  a.category === b.category &&
  a.backlights === b.backlights &&
  a.color === b.color &&
  a.glubina === b.glubina &&
  a.shadowGap === b.shadowGap &&
  a.width === b.width &&
  a.price === b.price;

const mergeProductNodes = (
  prevNodes?: (Edge | null | undefined)[] | null,
  nextNodes?: (Edge | null | undefined)[] | null,
) => {
  if (!prevNodes?.length) return nextNodes ? [...nextNodes] : [];
  if (!nextNodes?.length) return prevNodes ? [...prevNodes] : [];

  const merged: (Edge | null | undefined)[] = [];
  const seen = new Set<string>();
  const push = (list?: (Edge | null | undefined)[] | null) => {
    if (!list) return;
    for (const node of list) {
      if (!node) {
        merged.push(node);
        continue;
      }
      const key = node.id ?? `db-${node.databaseId ?? ''}`;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(node);
    }
  };

  push(prevNodes);
  push(nextNodes);
  return merged;
};

type Edge = NonNullable<GetProductAllListQuery['products']>['nodes'][number];

type UseProductsOptions = { pageSize?: number };

export function useProducts(options?: UseProductsOptions) {
  const { pageSize = 10 } = options ?? {};
  const selectedFilters = useAppSelector(selectSelectedFilters, filtersEqual);
  const where = useMemo(
    () => buildWhere(selectedFilters),
    [selectedFilters],
  );
  const variables = useMemo<GetProductAllListQueryVariables>(
    () => ({
      n: pageSize,
      where,
    }),
    [pageSize, where],
  );

  const { data, fetchMore, loading, error, networkStatus } = useQuery<
    GetProductAllListQuery,
    GetProductAllListQueryVariables
  >(GetProductAllListDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const products = useMemo<(Edge | null | undefined)[]>(
    () => data?.products?.nodes ?? [],
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
      await fetchMore({
        variables: {
          n: pageSize,
          after: endCursor,
          where,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.products) return prev;
          if (!prev?.products) return fetchMoreResult;

          return {
            ...prev,
            products: {
              ...fetchMoreResult.products,
              nodes: mergeProductNodes(
                prev.products.nodes,
                fetchMoreResult.products.nodes,
              ),
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
    products,
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
