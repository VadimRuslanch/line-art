import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider/config/store';

const selectCartDomain = (state: RootState) => state.cart;

export const selectCartItemsByProductIdMap = createSelector(
  selectCartDomain,
  (cart) => cart.itemsByProductId,
);

export const selectCartItemsByKeyMap = createSelector(
  selectCartDomain,
  (cart) => cart.itemsByKey,
);

export const makeSelectCartItemsByProductId = (
  productId: number | undefined,
) =>
  createSelector(selectCartItemsByProductIdMap, (items) =>
    typeof productId === 'number' ? items[productId] ?? [] : [],
  );

export const makeSelectCartItemByKey = (key: string | undefined) =>
  createSelector(selectCartItemsByKeyMap, (items) =>
    key ? items[key] : undefined,
  );

export const selectCartTotalQuantity = createSelector(
  selectCartDomain,
  (cart) => cart.totalQuantity,
);

export const selectCartTotals = createSelector(selectCartDomain, (cart) => ({
  subtotal: cart.subtotal,
  total: cart.total,
}));
