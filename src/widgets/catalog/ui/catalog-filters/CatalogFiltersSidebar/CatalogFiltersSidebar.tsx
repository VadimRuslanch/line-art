'use client';

import './CatalogFiltersSidebar.scss';
import PriceRange from '@/features/catalog/catalog-filters/ui/PriceRange/PriceRange';
import FilterGroup from '@/features/catalog/catalog-filters/ui/FilterGroup/FilterGroup';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { clearAll } from '@/features/catalog/catalog-filters/model/slice';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { ATTR_KEYS } from '@/shared/constants/taxonomy';

export default function CatalogFiltersSidebar() {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const hasCategory = selectedFilters.category.length > 0;
  const hasAttributes = ATTR_KEYS.some((key) => {
    const list = selectedFilters[key];
    return Array.isArray(list) && list.length > 0;
  });
  const hasPrice = Array.isArray(selectedFilters.price);
  const hasActiveFilters = hasCategory || hasAttributes || hasPrice;

  return (
    <form className="CatalogFiltersSidebar">
      <PriceRange />
      <FilterGroup />
      <button
        type="button"
        className="CatalogFiltersSidebar__reset"
        onClick={() => dispatch(clearAll())}
        disabled={!hasActiveFilters}
      >
        Очистить фильтр
      </button>
    </form>
  );
}
