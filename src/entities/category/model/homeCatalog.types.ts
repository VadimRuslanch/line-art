import type {
  GetHomeCatalogQuery,
  GetHomeCatalogQueryVariables,
} from '@/shared/api/gql/graphql';
import type { CategoryWithProducts } from '@/shared/utils/ustils';
import type { ProductWithCart } from '@/entities/product/types';

export type CatalogCategoryNode = NonNullable<
  NonNullable<GetHomeCatalogQuery['categories']>['nodes'][number]
>;

export type CatalogProductNode = NonNullable<
  | NonNullable<GetHomeCatalogQuery['popularBySales']>['nodes'][number]
  | NonNullable<GetHomeCatalogQuery['newArrivals']>['nodes'][number]
  | NonNullable<GetHomeCatalogQuery['discounted']>['nodes'][number]
>;

export type SimpleCatalogProductNode = Extract<
  CatalogProductNode,
  { __typename?: 'SimpleProduct' }
>;

export type CatalogPageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type CatalogSection = {
  products: ProductWithCart[];
  categories: CategoryWithProducts[];
  pageInfo?: CatalogPageInfo;
};

export type UseGetHomeCatalogOptions = Partial<
  Pick<GetHomeCatalogQueryVariables, 'first' | 'newAfter'>
>;

export type UseGetHomeCatalogResult = {
  categories: CatalogCategoryNode[];
  popular: CatalogSection;
  newArrivals: CatalogSection;
  discounted: CatalogSection;
};
