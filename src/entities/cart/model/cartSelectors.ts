import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider/config/store';

const selectCartDomain = (state: RootState) => state.cart;

export const selectCartItemsByProductId = createSelector(
  selectCartDomain,
  (cart) => cart.itemsByProductId,
);

export const selectCartItemByProductId = (productId: number | undefined) =>
  createSelector(selectCartItemsByProductId, (items) =>
    productId ? items[productId] : undefined,
  );

export const selectCartTotalQuantity = createSelector(
  selectCartDomain,
  (cart) => cart.totalQuantity,
);

export const selectCartTotals = createSelector(selectCartDomain, (cart) => ({
  subtotal: cart.subtotal,
  total: cart.total,
}));

