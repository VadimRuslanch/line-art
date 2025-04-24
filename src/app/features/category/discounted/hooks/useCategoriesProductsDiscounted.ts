'use client';

import {
  ProductWithCategoriesFragment,
  useGetCategoriesProductsDiscountedSuspenseQuery,
} from '@/generated/graphql';
import { groupProductsByCategory } from '@/shared/utils/ustils';

export const useCategoriesProductsDiscounted = () => {
  const { data } = useGetCategoriesProductsDiscountedSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  if (!data || !data.products) return { categories: [] };

  const rawAll = data.products.nodes;

  const raw: ProductWithCategoriesFragment[] = rawAll.filter(
    (p): p is ProductWithCategoriesFragment =>
      p?.__typename === 'SimpleProduct',
  );

  const categories = groupProductsByCategory(raw);

  return { categories };
};
