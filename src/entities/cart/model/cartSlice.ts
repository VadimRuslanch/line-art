import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartVariationAttributes = Record<string, string>;

export type CartItemState = {
  key: string;
  productId: number;
  quantity: number;
  total: string | null;
  variationId?: number | null;
  variationAttributes?: CartVariationAttributes | null;
};

type CartSnapshot = {
  items: CartItemState[];
  subtotal?: string | null;
  total?: string | null;
};

export interface CartState {
  itemsByProductId: Record<number, CartItemState[]>;
  itemsByKey: Record<string, CartItemState>;
  itemKeys: string[];
  subtotal: string | null;
  total: string | null;
  totalQuantity: number;
}

const initialState: CartState = {
  itemsByProductId: {},
  itemsByKey: {},
  itemKeys: [],
  subtotal: null,
  total: null,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSnapshot(state, action: PayloadAction<CartSnapshot>) {
      const { items, subtotal = null, total = null } = action.payload;
      state.itemsByProductId = {};
      state.itemsByKey = {};
      state.itemKeys = [];
      state.totalQuantity = 0;

      for (const item of items) {
        if (!state.itemsByProductId[item.productId]) {
          state.itemsByProductId[item.productId] = [];
        }
        state.itemsByProductId[item.productId].push(item);
        state.itemsByKey[item.key] = item;
        state.itemKeys.push(item.key);
        state.totalQuantity += item.quantity;
      }

      state.subtotal = subtotal;
      state.total = total;
    },
    clear(state) {
      state.itemsByProductId = {};
      state.itemsByKey = {};
      state.itemKeys = [];
      state.subtotal = null;
      state.total = null;
      state.totalQuantity = 0;
    },
  },
});

export const { setSnapshot, clear } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
