'use client';

import { useAppSelector } from '@/shared/model/hooks';
import { selectCartItemsByProductIdMap } from '@/entities/cart/model/cartSelectors';

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
  const itemsById = useAppSelector(selectCartItemsByProductIdMap);

  return productsItem.map<WithCartFlag<T>>((product) => {
    const productId = product.databaseId;
    const cartItems =
      typeof productId === 'number' ? itemsById[productId] ?? [] : [];
    const [firstItem] = cartItems;
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (item.quantity ?? 0),
      0,
    );

    return {
      ...product,
      inCart: cartItems.length > 0,
      key: firstItem?.key,
      quantity: totalQuantity,
    };
  });
}
