import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import { useCategoriesProductsDiscounted } from '@/entities/category/model/useCategoriesProductsDiscounted';
import React from 'react';

type Props = {
  title: string;
  onSelect?: () => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function CategoryDiscountedProducts({
  title,
  onSelect,
  onBack,
}: Props) {
  const { categories } = useCategoriesProductsDiscounted();
  return (
    <ModalMenuCatalogCategoriesItems
      title={title}
      categories={categories}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}
