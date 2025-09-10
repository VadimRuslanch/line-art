'use client';

import './CatalogFiltersModal.scss';
import CatalogFiltersSidebar from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersSidebar/CatalogFiltersSidebar';
import { useAppDispatch } from '@/shared/model/hooks';
import { closeModal } from '@/features/catalog-filters/model/slice';
import ArrowIcon from '@/shared/assets/svg/arrow-left.svg';

export default function CatalogFiltersModal() {
  const dispatch = useAppDispatch();
  return (
    <div className="CatalogFiltersModal">
      <button
        type="button"
        className="CatalogFiltersModal__button"
        onClick={() => dispatch(closeModal())}
      >
        <ArrowIcon />
        <span className="HeadlineH3">Фильтры</span>
      </button>
      <CatalogFiltersSidebar />
    </div>
  );
}
