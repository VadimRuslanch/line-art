import { configureStore } from '@reduxjs/toolkit';
import { catalogFiltersReducer } from '@/features/catalog/catalog-filters/model/slice';
import { activeCategoryReducer } from '@/widgets/SideMenuComponent/model/store/slices/slice';

export const store = configureStore({
  reducer: {
    catalogFilters: catalogFiltersReducer,
    activeCategory: activeCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
