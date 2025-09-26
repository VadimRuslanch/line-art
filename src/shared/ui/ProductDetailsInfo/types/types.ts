import React from 'react';
import ProductDetailsInfoDelivery from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoDelivery/ProductDetailsInfoDelivery';
import ProductDetailsInfoPay from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoPay/ProductDetailsInfoPay';
import ProductDetailsInfoContacts from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoContacts/ProductDetailsInfoContacts';
import ProductDetailsInfoPlacing from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoPlacing/ProductDetailsInfoPlacing';

export type TProductDetailsInfo = 'DELIVERY' | 'PAY' | 'CONTACT' | 'TECHNICAL';

export interface IProductDetailsInfo {
  type: TProductDetailsInfo;
  label: string;
  Component: React.FC;
}

export const PRODUCT_INFO_ITEMS: IProductDetailsInfo[] = [
  {
    type: 'DELIVERY',
    label: 'Доставка',
    Component: ProductDetailsInfoDelivery,
  },
  {
    type: 'TECHNICAL',
    label: 'Оформление заказа',
    Component: ProductDetailsInfoPlacing,
  },
  {
    type: 'PAY',
    label: 'Оплата',
    Component: ProductDetailsInfoPay,
  },
  {
    type: 'CONTACT',
    label: 'География доставки',
    Component: ProductDetailsInfoContacts,
  },
];
