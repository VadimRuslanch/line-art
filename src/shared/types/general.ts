import { ImageCoreFragment } from '@/generated/graphql';

import { ProductProduct } from '@/shared/ui/ProductCard/ProductCard';

export interface CategoryWithProducts {
  databaseId: number;
  id: string;
  name?: string | null;
  slug?: string | null;
  uri?: string | null;
  image?: ImageCoreFragment | null;
  products: ProductProduct[];
}
