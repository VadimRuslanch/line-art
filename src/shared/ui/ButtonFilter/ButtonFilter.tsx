'use client';

import './ButtonFilter.scss';
import { useAppDispatch } from '@/shared/model/hooks';
import { openModal } from '@/features/catalog-filters/model/slice';
import Icon from './icon/mage_filter.svg';

export default function ButtonFilter() {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="ButtonFilter"
      onClick={() => dispatch(openModal())}
    >
      Фильтры
      <Icon />
    </button>
  );
}
