'use client';

import { useGetCategoriesProductsDiscountedSuspenseQuery } from '@/generated/graphql';
import { groupProductsByCategory } from '@/shared/utils/ustils';

import { ProductProduct } from '@/shared/ui/ProductCard/ProductCard';

export const useCategoriesProductsDiscounted = () => {
  const { data } = useGetCategoriesProductsDiscountedSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  if (!data || !data.products) return { categories: [] };

  const rawAll = data.products.nodes;

  const raw: ProductProduct[] = rawAll.filter(
    (p): p is ProductProduct => p?.__typename === 'SimpleProduct',
  );

  const categories = groupProductsByCategory(raw);

  return { categories };
};
