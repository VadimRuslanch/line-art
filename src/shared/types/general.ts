import type { ImageCoreFragment } from '@/shared/api/gql/graphql';
import type { ProductWithCart } from '@/entities/product/model/types';

export interface CategoryWithProducts {
  databaseId: number;
  id: string;
  name?: string | null;
  slug?: string | null;
  uri?: string | null;
  image?: ImageCoreFragment | null;
  products: ProductWithCart[];
}
