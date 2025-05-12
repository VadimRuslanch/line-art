import CatalogMenu from './CatalogMenu';
import { useCategoriesCatalog } from '@/app/features/category/catalog/hook/useCategoriesCatalog';
import { CategoryCoreFragment } from '@/generated/graphql';

type ExtendedCategoryCoreFragment = CategoryCoreFragment & {
  children?: { nodes: CategoryCoreFragment[] } | null;
};

export default function CategoriesCatalog({
  title,
  toggleCatalog,
  ...props
}: {
  title: string;
  toggleCatalog: () => void;
}) {
  const { categories } = useCategoriesCatalog();

  return (
    <CatalogMenu<ExtendedCategoryCoreFragment>
      title={title}
      toggleCatalog={toggleCatalog}
      categories={categories}
      {...props}
    />
  );
}
