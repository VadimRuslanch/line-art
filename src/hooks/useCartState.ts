'use client';

import { useAppSelector } from '@/shared/model/hooks';
import { selectCartItemsByProductId } from '@/entities/cart/model/cartSelectors';

interface IdentifiableProduct {
  __typename?: string;
  databaseId?: number;
}

export type WithCartFlag<T extends IdentifiableProduct> = T & {
  inCart: boolean;
  key?: string;
  quantity: number;
};

export function useCartState<
  T extends IdentifiableProduct = IdentifiableProduct,
>(productsItem: readonly T[] = []): WithCartFlag<T>[] {
  const itemsById = useAppSelector(selectCartItemsByProductId);

  return productsItem.map<WithCartFlag<T>>((product) => {
    const productId = product.databaseId;
    const cartItem =
      typeof productId === 'number' ? itemsById[productId] : undefined;

    return {
      ...product,
      inCart: Boolean(cartItem),
      key: cartItem?.key,
      quantity: cartItem?.quantity ?? 0,
    };
  });
}
