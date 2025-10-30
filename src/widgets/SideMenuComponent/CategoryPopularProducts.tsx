import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';
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
  const { popular } = useGetHomeCatalog();
  const categories = popular.categories;

  return (
    <ModalMenuCatalogCategoriesItems
      title={title}
      categories={categories}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}
