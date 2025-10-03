import { ImageCoreFragment } from '@/shared/api/gql/graphql';

import { ProductProduct } from '@/features/product/ui/ProductCard/ProductCard';

export interface CategoryWithProducts {
  databaseId: number;
  id: string;
  name?: string | null;
  slug?: string | null;
  uri?: string | null;
  image?: ImageCoreFragment | null;
  products: ProductProduct[];
}
