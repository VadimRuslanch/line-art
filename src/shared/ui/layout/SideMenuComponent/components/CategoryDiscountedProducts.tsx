import CatalogMenu from '@/shared/ui/layout/SideMenuComponent/components/CatalogMenu';
import { CategoryWithProducts } from '@/shared/types/general';
import { useCategoriesProductsDiscounted } from '@/app/features/category/discounted/hooks/useCategoriesProductsDiscounted';

export default function CategoryDiscountedProducts() {
  const { categories } = useCategoriesProductsDiscounted();
  return (
    <CatalogMenu<CategoryWithProducts>
      title="Со скидками"
      categories={categories}
    />
  );
}
