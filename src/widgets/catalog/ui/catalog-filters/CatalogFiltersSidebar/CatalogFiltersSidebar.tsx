'use client';

import './CatalogFiltersSidebar.scss';
import PriceRange from '@/features/catalog-filters/ui/PriceRange/PriceRange';
import FilterGroup from '@/features/catalog-filters/ui/FilterGroup/FilterGroup';

export default function CatalogFiltersSidebar() {
  return (
    <form className="CatalogFiltersSidebar">
      <PriceRange />
      <FilterGroup />
    </form>
  );
}
