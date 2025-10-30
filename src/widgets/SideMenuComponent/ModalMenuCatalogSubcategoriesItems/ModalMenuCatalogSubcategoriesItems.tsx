import CatalogMenuItems, {
  CategoryWithUriAndName,
} from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useAppSelector } from '@/shared/model/hooks';
import { selectActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/selectors';
import React, { useMemo } from 'react';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

type Props = {
  onBack?: () => void;
};

export default function ModalMenuCatalogSubcategoriesItems({ onBack }: Props) {
  const { categories } = useGetHomeCatalog();
  const activeCategoryIndex = useAppSelector(selectActiveCategory);
  const activeCategory = categories?.[activeCategoryIndex];

  const items: CategoryWithUriAndName[] = useMemo(() => {
    const nodes = activeCategory?.children?.nodes ?? [];
    return nodes
      .filter((n) => n?.name && n?.uri)
      .map((n) => ({
        id: n.id,
        databaseId: n.databaseId,
        name: n.name as string,
        uri: n.uri as string,
      }));
  }, [activeCategory]);

  return (
    <>
      <CatalogMenuItems
        title={activeCategory?.name ?? ''}
        titleNumber="03"
        categoriesItems={items}
        onBack={onBack}
      />
    </>
  );
}
