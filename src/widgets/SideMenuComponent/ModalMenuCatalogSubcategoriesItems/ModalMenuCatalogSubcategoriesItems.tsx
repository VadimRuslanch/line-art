import CatalogMenuItems, {
  CategoryWithUriAndName,
} from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useCategoriesCatalog } from '@/features/catalog/catalog-category/model/useCategoriesCatalog';
import { useAppSelector } from '@/shared/model/hooks';
import { selectActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/selectors';
import React, { useMemo } from 'react';

type Props = {
  onBack?: () => void;
};

export default function ModalMenuCatalogSubcategoriesItems({ onBack }: Props) {
  const { categories } = useCategoriesCatalog();
  const activeCategoryIndex = useAppSelector(selectActiveCategory);

  const activeCategory = categories?.[activeCategoryIndex];

  // Нормализуем children.nodes -> CategoryWithUriAndName[]
  const items: CategoryWithUriAndName[] = useMemo(() => {
    const nodes = activeCategory?.children?.nodes ?? [];
    return nodes
      .filter((n) => n?.name && n?.uri) // убираем null-ы
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
