import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectSelectedFilters = (s: RootState) => s.catalogFilters;
export const selectIsFiltersModalOpen = (s: RootState) =>
  s.catalogFilters.isOpenModal;
