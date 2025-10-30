import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';
import React from 'react';

type Props = {
  title: string;
  onSelect?: () => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function CategoryNewProducts({
  title,
  onSelect,
  onBack,
}: Props) {
  const { newArrivals } = useGetHomeCatalog();
  const categories = newArrivals.categories;

  return (
    <ModalMenuCatalogCategoriesItems
      title={title}
      categories={categories}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}
