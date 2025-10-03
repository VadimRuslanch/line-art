'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import {
  GetCategoriesForFiltersDocument,
  type GetCategoriesForFiltersQuery,
} from '@/shared/api/gql/graphql';

type CategoriesQuery = GetCategoriesForFiltersQuery;
type Categories = NonNullable<CategoriesQuery['productCategories']>;
type CategoryNode = Categories['nodes'][number];

export const useGetCategoriesCatalog = () => {
  const { data } = useSuspenseQuery(GetCategoriesForFiltersDocument, {
    fetchPolicy: 'cache-first',
  });

  if (!data?.productCategories?.nodes) {
    return { categories: [] as CategoryNode[] };
  }

  const categories: CategoryNode[] = data.productCategories.nodes.filter(
    (n: CategoryNode): n is NonNullable<CategoryNode> => Boolean(n),
  );

  return { categories };
};
