import CatalogMenuItems, {
  CategoryWithUriAndName,
} from '@/widgets/SideMenuComponent/CatalogMenuItems';
import { useAppDispatch } from '@/shared/model/hooks';
import React, { useCallback } from 'react';
import { setActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/slice';
import type { CategoryWithProducts } from '@/shared/utils/ustils';

type Props = {
  title: string;
  categories: CategoryWithUriAndName[] | CategoryWithProducts[];
  onSelect?: (id: string) => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function ModalMenuCatalogCategoriesItems({
  title,
  categories,
  onSelect,
  onBack,
}: Props) {
  const dispatch = useAppDispatch();

  const handleCategoryChange = useCallback(
    (index: number) => {
      dispatch(setActiveCategory(index));
    },
    [dispatch],
  );

  return (
    <>
      <CatalogMenuItems
        title={title}
        titleNumber={'02'}
        categoriesItems={categories}
        handleCategoryChange={handleCategoryChange}
        onSelect={onSelect}
        onBack={onBack}
      />
    </>
  );
}
