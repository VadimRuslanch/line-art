import useCatalogNavigation from '@/hooks/useCatalogNavigation';
import {
  CategoryCoreFragment,
  ProductWithCategoriesFragment,
} from '@/generated/graphql';
import CatalogMenuItems from '@/shared/ui/layout/SideMenuComponent/components/CatalogMenuItems';
import CategoryPreview from '@/shared/ui/layout/SideMenuComponent/components/CategoryPreview';
import { ImageCoreFragment } from '@/generated/graphql';
import { CategoryWithProducts } from '@/shared/types/general';

type ExtendedCategoryCoreFragment = CategoryCoreFragment & {
  children?: { nodes: CategoryCoreFragment[] } | null;
};

interface CatalogMenuProps<T> {
  title: string;
  categories: T[];
}

export default function CatalogMenu<
  T extends CategoryWithProducts | ExtendedCategoryCoreFragment,
>({ title, categories }: CatalogMenuProps<T>) {
  const {
    activeCategory,
    activeCategoryItem,
    handleCategoryChange,
    handleCategoryItemChange,
  } = useCatalogNavigation();

  const currentCategory = categories[activeCategory];

  let categoryItem: ProductWithCategoriesFragment[] | CategoryCoreFragment[] =
    [];

  if ('products' in currentCategory) {
    categoryItem = currentCategory.products ?? [];
  } else if ('children' in currentCategory) {
    categoryItem = currentCategory.children?.nodes ?? [];
  }

  const categoryImage: ImageCoreFragment | null =
    categoryItem.length > 0
      ? (categoryItem[activeCategoryItem].image ?? null)
      : null;

  return (
    <>
      <CatalogMenuItems<ExtendedCategoryCoreFragment>
        title={title}
        titleNumber="02"
        categoriesItems={categories ?? []}
        handleCategoryChange={handleCategoryChange}
      />

      <CatalogMenuItems<CategoryCoreFragment | ProductWithCategoriesFragment>
        title={currentCategory.name ?? ''}
        titleNumber="03"
        categoriesItems={categoryItem}
        handleCategoryChange={handleCategoryItemChange}
      />

      <CategoryPreview image={categoryImage} />
    </>
  );
}
