import CatalogMenu from '@/shared/ui/layout/SideMenuComponent/components/CatalogMenu';
import { CategoryWithProducts } from '@/shared/types/general';
import { useCategoriesProductsNew } from '@/app/features/category/new/hooks/useCategoriesProductsNew';

export default function CategoryNewProducts({
  title,
  toggleCatalog,
  ...props
}: {
  title: string;
  toggleCatalog: () => void;
}) {
  const { categories } = useCategoriesProductsNew();
  return (
    <CatalogMenu<CategoryWithProducts>
      title={title}
      toggleCatalog={toggleCatalog}
      categories={categories}
      {...props}
    />
  );
}
