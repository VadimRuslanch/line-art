import { configureStore } from '@reduxjs/toolkit';
import { catalogFiltersReducer } from '@/features/catalog-filters/model/slice';

export const store = configureStore({
  reducer: {
    catalogFilters: catalogFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
