'use client';

import './UISelect.scss';

import {
  PRODUCT_INFO_ITEMS,
  type IProductDetailsInfo,
} from '@/shared/ui/ProductDetailsInfo/types/types';
import { useState } from 'react';

type Props = {
  activeItem: IProductDetailsInfo;
  action: (item: IProductDetailsInfo) => void;
};

export default function UISelect({ activeItem, action }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={'UISelect'}>
      <button
        data-open={isOpen}
        onClick={toggleSelect}
        className={'UISelect__select'}
      >
        <span className={'ButtonBut2-medium'}>{activeItem.label}</span>
      </button>
      {isOpen && (
        <div className={'UISelect__options'}>
          {PRODUCT_INFO_ITEMS.map((item) => (
            <button
              data-active={activeItem.type === item.type}
              className={'UISelect__option ButtonBut2-medium'}
              onClick={() => action(item)}
              key={item.type}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
