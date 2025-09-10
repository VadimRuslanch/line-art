import React from 'react';
import IconShoppingBag from '@/shared/assets/svg/icon-shopping-bag.svg';
import IconFire from '@/shared/assets/svg/icon-fire.svg';
import IconNew from '@/shared/assets/svg/icon-new.svg';
import IconSalePrice from '@/shared/assets/svg/icon-sale-price.svg';

import CategoriesCatalog from '@/widgets/SideMenuComponent/components/CategoriesCatalog';
import CategoryDiscountedProducts from '@/widgets/SideMenuComponent/components/CategoryDiscountedProducts';
import CategoryNewProducts from '@/widgets/SideMenuComponent/components/CategoryNewProducts';
import CategoryPopularProducts from '@/widgets/SideMenuComponent/components/CategoryPopularProducts';

export type TTypeMenu = 'CATEGORIES' | 'POPULAR' | 'NEW' | 'SALE';

interface MenuItem {
  type: TTypeMenu;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  Component: React.FC<{ title: string; toggleCatalog: () => void }>;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    type: 'CATEGORIES',
    label: 'Каталог товаров',
    Icon: IconShoppingBag,
    Component: CategoriesCatalog,
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
