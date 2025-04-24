import CatalogMenu from '@/shared/ui/layout/SideMenuComponent/components/CatalogMenu';
import { useCategoriesProductsPopular } from '@/app/features/category/popular/hooks/useCategoriesProductsPopular';
import { CategoryWithProducts } from '@/shared/types/general';

export default function CategoryPopularProducts() {
  const { categories } = useCategoriesProductsPopular();

  return (
    <CatalogMenu<CategoryWithProducts>
      title="Каталог товаров"
      categories={categories}
    />
  );
}
