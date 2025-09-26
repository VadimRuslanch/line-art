import useCatalogNavigation from '@/hooks/useCatalogNavigation';
import {
  CategoryCoreFragment,
  ProductWithCategoriesFragment,
} from '@/shared/api/gql/graphql';
import CatalogMenuItems from '@/widgets/SideMenuComponent/components/CatalogMenuItems';
import { CategoryWithProducts } from '@/shared/types/general';

type ExtendedCategoryCoreFragment = CategoryCoreFragment & {
  children?: { nodes: CategoryCoreFragment[] } | null;
};

interface CatalogMenuProps<T> {
  title: string;
  categories: T[];
  toggleCatalog: () => void;
}

export default function CatalogMenu<
  T extends CategoryWithProducts | ExtendedCategoryCoreFragment,
>({ title, toggleCatalog, categories, ...props }: CatalogMenuProps<T>) {
  const { activeCategory, handleCategoryChange, handleCategoryItemChange } =
    useCatalogNavigation();

  const currentCategory = categories[activeCategory];

  let categoryItem: ProductWithCategoriesFragment[] | CategoryCoreFragment[] =
    [];

  if (categories.length === 0)
    return (
      <span className="CatalogMenu__error-item HeadlineH2">
        Нет товаров со скидкой
      </span>
    );

  if ('products' in currentCategory) {
    categoryItem = currentCategory.products ?? [];
  } else if ('children' in currentCategory) {
    categoryItem = currentCategory.children?.nodes ?? [];
  }

  return (
    <>
      <CatalogMenuItems<ExtendedCategoryCoreFragment>
        title={title}
        toggleCatalog={toggleCatalog}
        titleNumber="02"
        categoriesItems={categories ?? []}
        handleCategoryChange={handleCategoryChange}
        data-type="category"
        {...props}
      />

      <CatalogMenuItems<CategoryCoreFragment | ProductWithCategoriesFragment>
        title={currentCategory.name ?? ''}
        titleNumber="03"
        categoriesItems={categoryItem}
        handleCategoryChange={handleCategoryItemChange}
        data-type="product"
      />
    </>
  );
}
