import ModalMenuCatalogSubcategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogSubcategoriesItems/ModalMenuCatalogSubcategoriesItems';
import ModalMenuCatalogProductItems from '@/widgets/SideMenuComponent/ModalMenuCatalogProductItems/ModalMenuCatalogProductItems';
import type { TTypeMenu } from '@/widgets/SideMenuComponent/types/types';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';
import React from 'react';

type Props = {
  typeActiveMenu: TTypeMenu;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function ModalMenuSectionThird({
  typeActiveMenu,
  onBack,
}: Props) {
  const { popular, newArrivals, discounted } = useGetHomeCatalog();

  return (
    <>
      {typeActiveMenu === 'POPULAR' && (
        <ModalMenuCatalogProductItems
          categories={popular.categories}
          onBack={onBack}
        />
      )}
      {typeActiveMenu === 'NEW' && (
        <ModalMenuCatalogProductItems
          categories={newArrivals.categories}
          onBack={onBack}
        />
      )}
      {typeActiveMenu === 'SALE' && (
        <ModalMenuCatalogProductItems
          categories={discounted.categories}
          onBack={onBack}
        />
      )}

      {typeActiveMenu === 'CATEGORIES' && (
        <ModalMenuCatalogSubcategoriesItems onBack={onBack} />
      )}
    </>
  );
}
