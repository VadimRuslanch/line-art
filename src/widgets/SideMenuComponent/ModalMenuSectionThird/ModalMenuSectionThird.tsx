import ModalMenuCatalogSubcategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogSubcategoriesItems/ModalMenuCatalogSubcategoriesItems';
import ModalMenuCatalogProductItems from '@/widgets/SideMenuComponent/ModalMenuCatalogProductItems/ModalMenuCatalogProductItems';
import type { TTypeMenu } from '@/widgets/SideMenuComponent/types/types';
import { useCategoriesProductsPopular } from '@/entities/category/model/useCategoriesProductsPopular';
import { useCategoriesProductsNew } from '@/entities/category/model/useCategoriesProductsNew';
import { useCategoriesProductsDiscounted } from '@/entities/category/model/useCategoriesProductsDiscounted';
import React from 'react';

type Props = {
  typeActiveMenu: TTypeMenu;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function ModalMenuSectionThird({
  typeActiveMenu,
  onBack,
}: Props) {
  const { categories: categoriesProductsPopular } =
    useCategoriesProductsPopular();
  const { categories: categoriesProductsNew } = useCategoriesProductsNew();
  const { categories: categoriesProductsDiscounted } =
    useCategoriesProductsDiscounted();

  return (
    <>
      {typeActiveMenu === 'POPULAR' && (
        <ModalMenuCatalogProductItems
          categories={categoriesProductsPopular}
          onBack={onBack}
        />
      )}
      {typeActiveMenu === 'NEW' && (
        <ModalMenuCatalogProductItems
          categories={categoriesProductsNew}
          onBack={onBack}
        />
      )}
      {typeActiveMenu === 'SALE' && (
        <ModalMenuCatalogProductItems
          categories={categoriesProductsDiscounted}
          onBack={onBack}
        />
      )}

      {typeActiveMenu === 'CATEGORIES' && (
        <ModalMenuCatalogSubcategoriesItems onBack={onBack} />
      )}
    </>
  );
}
