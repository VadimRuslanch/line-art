import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import React, { useMemo } from 'react';
import type { CategoryWithUriAndName } from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

type Props = {
  title: string;
  onSelect?: () => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function CatalogCategoriesItems({
  title,
  onSelect,
  onBack,
}: Props) {
  const { categories } = useGetHomeCatalog();

  const normalized: CategoryWithUriAndName[] = useMemo(() => {
    return (categories ?? [])
      .filter((c) => c?.name && c?.uri)
      .map((c) => ({
        id: c.id,
        databaseId: c.databaseId,
        name: c.name as string,
        uri: c.uri as string,
      }));
  }, [categories]);

  return (
    <ModalMenuCatalogCategoriesItems
      title={title}
      categories={normalized}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}
