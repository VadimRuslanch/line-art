import CatalogMenuItems from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useAppSelector } from '@/shared/model/hooks';
import { selectActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/selectors';
import { CategoryWithProducts } from '@/shared/types/general';

type Props = {
  categories: CategoryWithProducts[];
  onBack?: () => void;
};

export default function ModalMenuCatalogProductItems({
  categories,
  onBack,
}: Props) {
  const activeCategory = useAppSelector(selectActiveCategory);
  const ActiveCategory = categories[activeCategory];
  const item = ActiveCategory.products ?? [];

  return (
    <>
      <CatalogMenuItems
        title={ActiveCategory.name ?? ''}
        titleNumber={'03'}
        categoriesItems={item}
        onBack={onBack}
      />
    </>
  );
}
