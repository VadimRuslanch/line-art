import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectSelectedFilters = (s: RootState) => s.catalogFilters;
