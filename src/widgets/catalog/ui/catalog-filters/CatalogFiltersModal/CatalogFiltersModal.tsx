'use client';

import './CatalogFiltersModal.scss';
import CatalogFiltersSidebar from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersSidebar/CatalogFiltersSidebar';
import ArrowIcon from '@/shared/assets/svg/arrow-left.svg';
import { useUI } from '@/context/UIContext';

export default function CatalogFiltersModal() {
  const { closeFilters } = useUI();

  return (
    <div className="CatalogFiltersModal">
      <button
        type="button"
        className="CatalogFiltersModal__button"
        onClick={closeFilters}
      >
        <ArrowIcon />
        <span className="HeadlineH3">Filters</span>
      </button>
      <CatalogFiltersSidebar />
    </div>
  );
}
