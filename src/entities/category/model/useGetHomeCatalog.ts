'use client';

import { useMemo } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';

import {
  GetHomeCatalogDocument,
  type GetHomeCatalogQueryVariables,
} from '@/shared/api/gql/graphql';
import { useCartState } from '@/hooks/useCartState';
import {
  DEFAULT_FIRST,
  buildCatalogSection,
  createNewAfterDateInput,
  extractPageInfo,
  extractSimpleProducts,
  mapCartProducts,
  sanitizeCategoryNodes,
} from './homeCatalog.helpers';
import type {
  SimpleCatalogProductNode,
  UseGetHomeCatalogOptions,
  UseGetHomeCatalogResult,
} from './homeCatalog.types';

export const useGetHomeCatalog = (
  options: UseGetHomeCatalogOptions = {},
): UseGetHomeCatalogResult => {
  const variables: GetHomeCatalogQueryVariables = {
    first: options.first ?? DEFAULT_FIRST,
    newAfter: options.newAfter ?? createNewAfterDateInput(),
  };

  const { data } = useSuspenseQuery(GetHomeCatalogDocument, {
    variables,
    fetchPolicy: 'cache-first',
    onError: (error) => {
      console.error(
        '[useGetHomeCatalog] Failed to fetch home catalog data.',
        error,
      );
    },
  });

  const categories = useMemo(
    () => sanitizeCategoryNodes(data?.categories?.nodes ?? []),
    [data?.categories?.nodes],
  );

  const popularSource = useMemo(
    () => extractSimpleProducts(data?.popularBySales?.nodes, 'popularBySales'),
    [data?.popularBySales?.nodes],
  );
  const newSource = useMemo(
    () => extractSimpleProducts(data?.newArrivals?.nodes, 'newArrivals'),
    [data?.newArrivals?.nodes],
  );
  const discountedSource = useMemo(
    () => extractSimpleProducts(data?.discounted?.nodes, 'discounted'),
    [data?.discounted?.nodes],
  );

  const popularWithCart =
    useCartState<SimpleCatalogProductNode>(popularSource);
  const newWithCart = useCartState<SimpleCatalogProductNode>(newSource);
  const discountedWithCart =
    useCartState<SimpleCatalogProductNode>(discountedSource);

  const popularProducts = useMemo(
    () => mapCartProducts(popularWithCart),
    [popularWithCart],
  );
  const newProducts = useMemo(
    () => mapCartProducts(newWithCart),
    [newWithCart],
  );
  const discountedProducts = useMemo(
    () => mapCartProducts(discountedWithCart),
    [discountedWithCart],
  );

  const popularPageInfo = useMemo(
    () => extractPageInfo(data?.popularBySales?.pageInfo),
    [data?.popularBySales?.pageInfo],
  );

  return useMemo(
    () => ({
      categories,
      popular: buildCatalogSection(popularProducts, popularPageInfo),
      newArrivals: buildCatalogSection(newProducts),
      discounted: buildCatalogSection(discountedProducts),
    }),
    [
      categories,
      popularProducts,
      popularPageInfo,
      newProducts,
      discountedProducts,
    ],
  );
};

export type {
  UseGetHomeCatalogOptions,
  UseGetHomeCatalogResult,
} from './homeCatalog.types';
