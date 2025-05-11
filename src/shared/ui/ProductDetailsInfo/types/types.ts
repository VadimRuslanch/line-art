import React from 'react';
import ProductDetailsInfoDelivery from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoDelivery';

export type TProductDetailsInfo =
  | 'DELIVERY'
  | 'PAY'
  | 'CONTACT-INFO'
  | 'TECHNICAL-INFO';

interface ProductDetailsInfo {
  type: TProductDetailsInfo;
  label: string;
  Component: React.FC;
}

export const PRODUCT_INFO_ITEMS: ProductDetailsInfo[] = [
  {
    type: 'DELIVERY',
    label: 'Оплата',
    Component: ProductDetailsInfoDelivery,
  },
  {
    type: 'PAY',
    label: 'Доставка',
    Component: ProductDetailsInfoDelivery,
  },
  {
    type: 'CONTACT-INFO',
    label: 'Контактная информация',
    Component: ProductDetailsInfoDelivery,
  },
  {
    type: 'TECHNICAL-INFO',
    label: 'Техническая информация',
    Component: ProductDetailsInfoDelivery,
  },
];
