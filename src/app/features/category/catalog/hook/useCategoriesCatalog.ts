'use client';

import { useGetCategoriesCatalogSuspenseQuery } from '@/generated/graphql';

export const useCategoriesCatalog = () => {
  const { data } = useGetCategoriesCatalogSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  if (!data) return { categories: [] };

  if (!data.productCategories) return { categories: [] };

  const categories = data.productCategories.nodes;

  return { categories };
};
