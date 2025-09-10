'use client';

import { useQuery } from '@apollo/client/react';

import {
  GetProductsPageDocument,
  type GetProductsPageQuery,
  type GetProductsPageQueryVariables,
} from '@/shared/api/gql/graphql';
import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog-filters';
import { buildWhere } from '@/features/catalog-filters/utils/utils';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
// import { useCartState } from '@/hooks/useCartState';

type Vars = GetProductsPageQueryVariables;
type Products = NonNullable<GetProductsPageQuery['products']>;
type Edge = Products['nodes'][number];

// type Node = NonNullable<Edge>['node'];

export function useProducts(options?: { pageSize?: number }) {
  const { pageSize = 160 } = options ?? {};
  const selected = useAppSelector(selectSelectedFilters);

  const where: Vars['where'] = useMemo(() => buildWhere(selected), [selected]);

  const { data, fetchMore } = useQuery(GetProductsPageDocument, {
    variables: { where, first: pageSize },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  const nodes = useMemo<(Edge | null | undefined)[]>(
    () => data?.products?.nodes ?? [],
    [data?.products?.nodes],
  );
  console.log(nodes);
  const products = useMemo(
    () =>
      nodes
        .map((e) => e)
        .filter((n): n is NonNullable<typeof n> => Boolean(n))
        .filter(isSimpleProduct),
    [nodes],
  );

  const endCursor = data?.products?.pageInfo.endCursor;
  const hasNextPage = Boolean(data?.products?.pageInfo?.hasNextPage);

  const pageInfo = data?.products?.pageInfo;

  const lastAfterRef = useRef<string | undefined>(undefined);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    if (endCursor && lastAfterRef.current && endCursor < lastAfterRef.current) {
      console.warn('Cursor moved backwards', {
        endCursor,
        prev: lastAfterRef.current,
      });
    }
  }, [endCursor]);

  const loadMore = useCallback(async () => {
    if (!hasNextPage || !endCursor || isFetchingMore) return;
    if (lastAfterRef.current === endCursor) return; // защита от повтора

    setIsFetchingMore(true);
    try {
      await fetchMore({
        variables: { where, first: pageSize, after: endCursor },
      });
      lastAfterRef.current = endCursor;
    } finally {
      setIsFetchingMore(false);
    }
  }, [hasNextPage, endCursor, isFetchingMore, fetchMore, where, pageSize]);

  return { products, pageInfo, hasNextPage, loadMore, isFetchingMore };
}
