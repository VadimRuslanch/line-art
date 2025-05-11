'use client';

import { useCart } from '@/app/features/cart/hooks/useCart';

interface IdentifiableProduct {
  __typename?: string;
  databaseId?: number;
}

export type WithCartFlag<T extends IdentifiableProduct> = T & {
  inCart: boolean;
  key?: string;
};

export function useCartState<
  T extends IdentifiableProduct = IdentifiableProduct,
>(productsItem: readonly T[] = []): WithCartFlag<T>[] {
  const { simpleProducts } = useCart();

  return productsItem.map<WithCartFlag<T>>((product) => {
    const cartItem = simpleProducts.find(
      (ci) =>
        ci.product?.node &&
        'databaseId' in ci.product.node &&
        ci.product.node.databaseId === product.databaseId,
    );

    const productKey = simpleProducts.find(
      (ci) =>
        ci.product?.node &&
        'databaseId' in ci.product.node &&
        ci.product.node.databaseId === product.databaseId,
    )?.key;

    return {
      ...product,
      inCart: Boolean(cartItem),
      key: productKey,
    };
  });
}
