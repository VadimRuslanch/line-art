import CatalogMenuItems from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useAppSelector } from '@/shared/model/hooks';
import { selectActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/selectors';
import type { CategoryWithProducts } from '@/shared/utils/ustils';

type Props = {
  categories: CategoryWithProducts[];
  onBack?: () => void;
};

export default function ModalMenuCatalogProductItems({
  categories,
  onBack,
}: Props) {
  const activeCategory = useAppSelector(selectActiveCategory);
  const activeWithProducts =
    categories[activeCategory] && categories[activeCategory].products?.length
      ? categories[activeCategory]
      : categories.find((category) => category.products?.length);

  if (!activeWithProducts) {
    return null;
  }

  const item = activeWithProducts.products ?? [];

  return (
    <>
      <CatalogMenuItems
        title={activeWithProducts.name ?? ''}
        titleNumber={'03'}
        categoriesItems={item}
        onBack={onBack}
      />
    </>
  );
}
