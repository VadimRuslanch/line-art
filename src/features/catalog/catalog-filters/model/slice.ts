import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilterKey =
  | 'category'
  | 'backlights'
  | 'color'
  | 'glubina'
  | 'shadowGap'
  | 'width';

type TogglePayload = { key: FilterKey; slug: string };
type PricePayload = [number, number];
export type SelectedFilters = {
  category: string[];
  backlights?: string[];
  color?: string[];
  glubina?: string[];
  shadowGap?: string[];
  width?: string[];
  price?: [number, number] | undefined;
};

const ensure = (arr?: string[]) => (Array.isArray(arr) ? arr : []);

const initialState: SelectedFilters = {
  category: [],
  backlights: [],
  color: [],
  glubina: [],
  shadowGap: [],
  width: [],
  price: undefined,
};

const catalogFiltersSlice = createSlice({
  name: 'catalogFilters',
  initialState,
  reducers: {
    toggleTerm(state, { payload }: PayloadAction<TogglePayload>) {
      const list = new Set(ensure(state[payload.key]));
      if (list.has(payload.slug)) list.delete(payload.slug);
      else list.add(payload.slug);
      state[payload.key] = Array.from(list);
    },
    setCategory(state, { payload }: PayloadAction<string>) {
      state.category = payload ? [payload] : [];
    },
    setPrice(state, { payload }: PayloadAction<PricePayload>) {
      state.price = payload;
    },
    clearAll() {
      return initialState;
    },
  },
});

export const {
  toggleTerm,
  setPrice,
  clearAll,
  setCategory,
} = catalogFiltersSlice.actions;
export const catalogFiltersReducer = catalogFiltersSlice.reducer;
