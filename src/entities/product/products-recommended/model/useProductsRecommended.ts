'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { GetProductsRecommendedDocument } from '@/shared/api/gql/graphql';
import { useCartState } from '@/hooks/useCartState';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { ProductCoreFragment } from '@/shared/api/gql/graphql';

export const useProductsRecommended = () => {
  const { data } = useSuspenseQuery(GetProductsRecommendedDocument);

  const recommended = useCartState<ProductCoreFragment>(
    (data?.products?.nodes ?? []).filter(isSimpleProduct),
  );

  return { products: recommended };
};
