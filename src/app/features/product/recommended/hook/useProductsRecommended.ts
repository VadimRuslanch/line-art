'use client';

import { useGetProductsRecommendedSuspenseQuery } from '@/generated/graphql';
import { useCartState } from '@/hooks/useCartState';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { ProductCoreFragment } from '@/generated/graphql';

export const useProductsRecommended = () => {
  const { data } = useGetProductsRecommendedSuspenseQuery();

  const recommended = useCartState<ProductCoreFragment>(
    (data?.products?.nodes ?? []).filter(isSimpleProduct),
  );

  return { products: recommended };
};
