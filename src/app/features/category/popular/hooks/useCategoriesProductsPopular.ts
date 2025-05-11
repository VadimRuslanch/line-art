'use client';

import {
  useGetCategoriesProductsPopularSuspenseQuery,
  ProductWithCategoriesFragment,
} from '@/generated/graphql';
import { groupProductsByCategory } from '@/shared/utils/ustils';
import { useCartState } from '@/hooks/useCartState';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { WithCartFlag } from '@/hooks/useCartState';
import { ProductProduct } from '@/shared/ui/ProductCard/ProductCard';

export const useCategoriesProductsPopular = () => {
  const { data } = useGetCategoriesProductsPopularSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  if (!data || !data.products) return { categories: [] };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const rawAll = useCartState<ProductWithCategoriesFragment>(
    (data?.products?.nodes ?? []).filter(isSimpleProduct),
  );

  const raw: ProductProduct[] = rawAll.filter(
    (p): p is WithCartFlag<ProductProduct> => p?.__typename === 'SimpleProduct',
  );

  const categories = groupProductsByCategory(raw);

  return { categories };
};
