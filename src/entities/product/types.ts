import type {
  CartCoreFragment,
  GetProductDetailsQuery,
  GetProductListAllQuery,
  GetProductListCategoryQuery,
} from '@/shared/api/gql/graphql';

/**
 * Product data enriched with cart state flags.
 */
export type SimpleProductGQL = Extract<
  NonNullable<GetProductDetailsQuery['product']>,
  { __typename: 'SimpleProduct' | 'VariableProduct' }
>;

export type ListSimpleProduct = Extract<
  NonNullable<GetProductListAllQuery['products']>['nodes'][number],
  { __typename: 'SimpleProduct' }
>;

export type CategorySimpleProduct = Extract<
  NonNullable<
    NonNullable<GetProductListCategoryQuery['productCategory']>['products']
  >['nodes'][number],
  { __typename: 'SimpleProduct' }
>;

export type CartSimpleProduct = Extract<
  NonNullable<
    NonNullable<
      NonNullable<CartCoreFragment['contents']>['nodes'][number]
    >['product']
  >['node'],
  { __typename: 'SimpleProduct' }
>;

export type CartVariableProduct = Extract<
  NonNullable<
    NonNullable<
      NonNullable<CartCoreFragment['contents']>['nodes'][number]
    >['product']
  >['node'],
  { __typename: 'VariableProduct' }
>;

export type SimpleProductLike =
  | ListSimpleProduct
  | CategorySimpleProduct
  | CartSimpleProduct
  | SimpleProductGQL
  | SimpleProductUI;

export type ProductWithCart = CartSimpleProduct & {
  quantity: number;
  inCart: boolean;
  key?: string | null;
  totalSales?: number | null;
  averageRating?: number | null;
  reviewCount?: number | null;
  productCategories?: SimpleProductGQL['productCategories'];
  galleryImages?: SimpleProductGQL['galleryImages'];
};

export type GlobalProductAttributeUI = {
  __typename: 'GlobalProductAttribute';
  id: string;
  name?: string | null;
  variation?: boolean | null;
  visible?: boolean | null;
  label?: string | null;
  terms?: {
    __typename: 'GlobalProductAttributeToTermNodeConnection';
    nodes: NamedTermNode[];
  } | null;
};

export type SimpleProductUI = Omit<SimpleProductGQL, 'attributes'> & {
  inCart: boolean;
  key: string | null;
  quantity: number;
  attributes?: { nodes: GlobalProductAttributeUI[] } | null;
};

type AttributeNode = NonNullable<
  NonNullable<SimpleProductGQL['attributes']>['nodes']
>[number];

type AttributeNodeWithTerms = Extract<
  AttributeNode,
  { terms?: { nodes?: unknown[] | null } | null }
>;

export type NamedTermNode = Extract<
  NonNullable<
    NonNullable<NonNullable<AttributeNodeWithTerms['terms']>['nodes']>[number]
  >,
  { name?: string | null; slug?: string | null; value?: string | null }
>;
