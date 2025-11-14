'use client';

import './ButtonFilter.scss';
import Icon from './icon/mage_filter.svg';
import { useUI } from '@/context/UIContext';

export default function ButtonFilter() {
  const { openFilters } = useUI();

  return (
    <button type="button" className="ButtonFilter" onClick={openFilters}>
      Фильтры
      <Icon />
    </button>
  );
}
