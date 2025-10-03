import ModalMenuCatalogCategoriesItems from '@/widgets/SideMenuComponent/ModalMenuCatalogCategoriesItems/ModalMenuCatalogCategoriesItems';
import { useCategoriesCatalog } from '@/features/catalog/catalog-category/model/useCategoriesCatalog';
import React, { useMemo } from 'react';
import type { CategoryWithUriAndName } from '@/widgets/SideMenuComponent/CatalogMenuItems';

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
  const { categories } = useCategoriesCatalog();

  const normalized: CategoryWithUriAndName[] = useMemo(() => {
    return (categories ?? [])
      .filter((c) => c?.name && c?.uri) // отсекаем null/undefined
      .map((c) => ({
        id: c.id,
        databaseId: c.databaseId,
        name: c.name as string,
        uri: c.uri as string,
        // добавь сюда то, что ещё требуется в твоём CategoryWithUriAndName
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
