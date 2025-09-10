import CatalogMenu from '@/widgets/SideMenuComponent/components/CatalogMenu';
import { CategoryWithProducts } from '@/shared/types/general';
import { useCategoriesProductsDiscounted } from '@/entities/category/model/useCategoriesProductsDiscounted';

export default function CategoryDiscountedProducts({
  title,
  toggleCatalog,
  ...props
}: {
  title: string;
  toggleCatalog: () => void;
}) {
  const { categories } = useCategoriesProductsDiscounted();
  return (
    <CatalogMenu<CategoryWithProducts>
      title={title}
      toggleCatalog={toggleCatalog}
      categories={categories}
      {...props}
    />
  );
}
