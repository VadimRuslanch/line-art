'use client';

import { useQuery } from '@apollo/client/react';

import {
  GetProductsPageDocument,
  type GetProductsPageQuery,
  type GetProductsPageQueryVariables,
} from '@/shared/api/gql/graphql';
import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { buildWhere } from '@/features/catalog/catalog-filters/utils/utils';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';

type Vars = GetProductsPageQueryVariables;
type Edge = NonNullable<GetProductsPageQuery['products']>['nodes'][number];

export function useProducts(options?: { pageSize?: number }) {
  const { pageSize = 24 } = options ?? {};
  const selected = useAppSelector(selectSelectedFilters);

  const where: Vars['where'] = useMemo(() => buildWhere(selected), [selected]);
  const whereKey = useMemo(() => JSON.stringify(where ?? {}), [where]);

  const { data, fetchMore, loading } = useQuery(GetProductsPageDocument, {
    variables: { where, first: pageSize },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const nodes = useMemo<(Edge | null | undefined)[]>(
    () => data?.products?.nodes ?? [],
    [data?.products?.nodes],
  );

  const products = useMemo(
    () =>
      nodes
        .map((edge) => edge)
        .filter((node): node is NonNullable<typeof node> => Boolean(node))
        .filter(isSimpleProduct),
    [nodes],
  );

  const endCursor = data?.products?.pageInfo.endCursor;
  const hasNextPage = Boolean(data?.products?.pageInfo?.hasNextPage);

  const productsRef = useRef(products);
  const hasNextPageRef = useRef(hasNextPage);
  const endCursorRef = useRef(endCursor);
  const isFetchingMoreRef = useRef(false);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    endCursorRef.current = endCursor;
  }, [endCursor]);

  const [isFetchingMore, setIsFetchingMore] = useState(false);
  useEffect(() => {
    isFetchingMoreRef.current = isFetchingMore;
  }, [isFetchingMore]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [whereKey]);

  const loadMore = useCallback(async () => {
    if (isFetchingMoreRef.current) return;
    if (!hasNextPageRef.current) return;
    if (!endCursorRef.current) return;

    setIsFetchingMore(true);
    try {
      const result = await fetchMore({
        variables: { where, first: pageSize, after: endCursorRef.current },
      });

      const nextNodes =
        (result.data?.products?.nodes as (Edge | null | undefined)[]) ?? [];
      const nextProducts = nextNodes
        .map((edge) => edge)
        .filter(
          (node): node is NonNullable<typeof node> => Boolean(node),
        )
        .filter(isSimpleProduct);

      const previousProducts = productsRef.current;
      if (nextProducts.length >= previousProducts.length) {
        productsRef.current = nextProducts;
      } else {
        const merged = [...previousProducts];
        nextProducts.forEach((product) => {
          if (!merged.some((item) => item.id === product.id)) {
            merged.push(product);
          }
        });
        productsRef.current = merged;
      }
      hasNextPageRef.current = Boolean(
        result.data?.products?.pageInfo?.hasNextPage,
      );
      endCursorRef.current = result.data?.products?.pageInfo?.endCursor;
    } finally {
      setIsFetchingMore(false);
    }
  }, [fetchMore, pageSize, where]);

  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  const ensurePage = useCallback(
    async (targetPage: number) => {
      const safeTarget = Math.max(1, targetPage);
      while (
        Math.ceil(productsRef.current.length / pageSize) < safeTarget &&
        hasNextPageRef.current
      ) {
        await loadMoreRef.current?.();
      }
    },
    [pageSize],
  );

  const goToPage = useCallback(
    async (page: number) => {
      const safePage = Math.max(1, page);
      setIsPageChanging(true);
      try {
        await ensurePage(safePage);
      } finally {
        setIsPageChanging(false);
      }

      const availablePages =
        productsRef.current.length === 0
          ? 1
          : Math.ceil(productsRef.current.length / pageSize);
      setCurrentPage(Math.min(safePage, Math.max(1, availablePages)));
    },
    [ensurePage, pageSize],
  );

  const totalLoadedPages = useMemo(() => {
    if (!products.length) return 0;
    return Math.ceil(products.length / pageSize);
  }, [products, pageSize]);

  useEffect(() => {
    const maxPage = totalLoadedPages > 0 ? totalLoadedPages : 1;
    setCurrentPage((prev) => Math.min(prev, maxPage));
  }, [totalLoadedPages]);

  const currentPageProducts = useMemo(() => {
    if (!products.length) return [];
    const clampedPage = Math.max(
      1,
      Math.min(currentPage, Math.max(1, totalLoadedPages)),
    );
    const start = (clampedPage - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, currentPage, totalLoadedPages, pageSize]);

  const displayTotalPages =
    totalLoadedPages > 0
      ? totalLoadedPages + (hasNextPage ? 1 : 0)
      : hasNextPage
        ? 1
        : 0;

  const canGoPrev = currentPage > 1;
  const canGoNext =
    hasNextPage ||
    (totalLoadedPages > 0 && currentPage < totalLoadedPages);

  const isInitialLoading = loading && !products.length;

  return {
    products: currentPageProducts,
    allProducts: products,
    currentPage,
    goToPage,
    canGoPrev,
    canGoNext,
    totalPages: displayTotalPages,
    loadedPages: totalLoadedPages,
    hasNextPage,
    isFetchingMore,
    isPageChanging,
    isInitialLoading,
    pageSize,
  };
}
