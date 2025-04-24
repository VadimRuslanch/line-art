import {
  ImageCoreFragment,
  ProductWithCategoriesFragment,
} from '@/generated/graphql';

export interface CategoryWithProducts {
  databaseId: number;
  id: string;
  name?: string | null;
  slug?: string | null;
  uri?: string | null;
  image?: ImageCoreFragment | null;
  products: ProductWithCategoriesFragment[];
}
