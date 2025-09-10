import CatalogMenu from '@/widgets/SideMenuComponent/components/CatalogMenu';
import { useCategoriesProductsPopular } from '@/entities/category/model/useCategoriesProductsPopular';
import { CategoryWithProducts } from '@/shared/types/general';

export default function CategoryPopularProducts({
  title,
  toggleCatalog,
  ...props
}: {
  title: string;
  toggleCatalog: () => void;
}) {
  const { categories } = useCategoriesProductsPopular();

  return (
    <CatalogMenu<CategoryWithProducts>
      title={title}
      toggleCatalog={toggleCatalog}
      categories={categories}
      {...props}
    />
  );
}
