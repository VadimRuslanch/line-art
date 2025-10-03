import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectActiveCategory = (s: RootState) =>
  s.activeCategory.activeCategory;
