import React from 'react';
import IconShoppingBag from '@/shared/assets/svg/icon-shopping-bag.svg';
import IconFire from '@/shared/assets/svg/icon-fire.svg';
import IconNew from '@/shared/assets/svg/icon-new.svg';
import IconSalePrice from '@/shared/assets/svg/icon-sale-price.svg';
import IconDelivery from '@/shared/assets/svg/shipped.svg';
import IconHandshake from '@/shared/assets/svg/handshake.svg';
import IconShop from '@/shared/assets/svg/shop.svg';
import IconAbout from '@/shared/assets/svg/about.svg';
import IconContact from '@/shared/assets/svg/contact.svg';

import CategoryDiscountedProducts from '@/widgets/SideMenuComponent/CategoryDiscountedProducts';
import CategoryNewProducts from '@/widgets/SideMenuComponent/CategoryNewProducts';
import CategoryPopularProducts from '@/widgets/SideMenuComponent/CategoryPopularProducts';
import CatalogCategoriesItems from '@/widgets/SideMenuComponent/CatalogCategoriesItems/CatalogCategoriesItems';

export type TTypeMenu = 'CATEGORIES' | 'POPULAR' | 'NEW' | 'SALE';

export type MenuItem = {
  type: TTypeMenu;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  Component: React.FC<{
    title: string;
    onSelect?: () => void;
    onBack?: () => void;
  }>;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    type: 'CATEGORIES',
    label: 'Каталог товаров',
    Icon: IconShoppingBag,
    Component: CatalogCategoriesItems,
  },
  {
    type: 'POPULAR',
    label: 'Популярные товары',
    Icon: IconFire,
    Component: CategoryPopularProducts,
  },
  {
    type: 'NEW',
    label: 'Новые товары',
    Icon: IconNew,
    Component: CategoryNewProducts,
  },
  {
    type: 'SALE',
    label: 'Со скидками',
    Icon: IconSalePrice,
    Component: CategoryDiscountedProducts,
  },
];

export const MENU_ITEMS_LINK = [
  {
    id: 1,
    title: 'Доставка',
    link: '/delivery',
    Icon: IconDelivery,
  },
  {
    id: 12,
    title: 'Сотрудничество',
    link: '/partners',
    Icon: IconHandshake,
  },
  {
    id: 13124412,
    link: '/showrooms',
    title: 'Шоурумы',
    Icon: IconShop,
  },
  {
    link: '/about',
    id: 123232,
    title: 'О компании',
    Icon: IconAbout,
  },
  {
    link: '/contacts',
    id: 3212,
    title: 'Контакты',
    Icon: IconContact,
  },
];
