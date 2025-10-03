import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CatalogNavigationState = {
  activeCategory: number;
};

const initialState: CatalogNavigationState = {
  activeCategory: 0,
};

const activeCategorySlice = createSlice({
  name: 'catalogNavigation',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    resetActiveCategory(state) {
      state.activeCategory = 0;
    },
  },
});

export const { setActiveCategory, resetActiveCategory } =
  activeCategorySlice.actions;
export const activeCategoryReducer = activeCategorySlice.reducer;
