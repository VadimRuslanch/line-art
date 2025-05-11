'use client';

import {
  useGetProductDetailsSuspenseQuery,
  ProductIdTypeEnum,
} from '@/generated/graphql';
import { useCart } from '@/app/features/cart/hooks/useCart';
import { useMemo } from 'react';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';

export const useProductDetails = (slug: string) => {
  const { data } = useGetProductDetailsSuspenseQuery({
    variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
    fetchPolicy: 'cache-first',
  });

  const { simpleProducts } = useCart();

  const cartItem = useMemo(() => {
    if (!data?.product) return undefined;

    return simpleProducts.find((ci) => {
      if (isSimpleProduct(data.product)) {
        return (
          ci.product?.node &&
          'databaseId' in ci.product.node &&
          ci.product.node.databaseId === data.product!.databaseId
        );
      }
    });
  }, [simpleProducts, data?.product]);

  const product = data?.product && {
    ...data.product,
    inCart: Boolean(cartItem),
    key: cartItem?.key ?? null,
    quantity: cartItem?.quantity ?? 0,
  };

  return { product };
};
