import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import { useCategoriesProductsPopular } from '@/entities/category/model/useCategoriesProductsPopular';
import React from 'react';

type Props = {
  title: string;
  onSelect?: () => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function CategoryPopularProducts({
  title,
  onSelect,
  onBack,
}: Props) {
  const { categories } = useCategoriesProductsPopular();
  return (
    <ModalMenuCatalogCategoriesItems
      title={title}
      categories={categories}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}
