import type { DateInput } from '@/shared/api/gql/graphql';
import type { WithCartFlag } from '@/hooks/useCartState';
import { groupProductsByCategory } from '@/shared/utils/ustils';
import type { ProductWithCart } from '@/entities/product/types';
import type {
  CatalogCategoryNode,
  CatalogPageInfo,
  CatalogProductNode,
  CatalogSection,
  SimpleCatalogProductNode,
} from './homeCatalog.types';

const MS_IN_DAY = 86_400_000;

const notEmpty = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

const isSimpleProductNode = (
  node: CatalogProductNode | null | undefined,
): node is SimpleCatalogProductNode => node?.__typename === 'SimpleProduct';

export const DEFAULT_FIRST = 12;
export const DEFAULT_NEW_AFTER_DAYS = 30;

export const createNewAfterDateInput = (
  days = DEFAULT_NEW_AFTER_DAYS,
  now = Date.now(),
): DateInput => {
  const date = new Date(now - days * MS_IN_DAY);

  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
};

export const sanitizeCategoryNodes = (
  nodes: (CatalogCategoryNode | null | undefined)[] | null | undefined,
): CatalogCategoryNode[] =>
  (nodes ?? []).filter(notEmpty).map((category) => ({
    ...category,
    children: category.children
      ? {
          ...category.children,
          nodes: (category.children.nodes ?? []).filter(notEmpty),
        }
      : null,
  })) as CatalogCategoryNode[];

export const extractSimpleProducts = (
  nodes: readonly (CatalogProductNode | null | undefined)[] | null | undefined,
  label: string,
): SimpleCatalogProductNode[] => {
  const items = (nodes ?? []).filter(notEmpty);
  const simpleProducts = items.filter(isSimpleProductNode);
  const skipped = items.length - simpleProducts.length;

  if (skipped > 0) {
    console.warn(
      `[useGetHomeCatalog] Skipped ${skipped} non-simple product(s) in "${label}" response.`,
    );
  }

  return simpleProducts;
};

export const mapCartProducts = (
  products: WithCartFlag<SimpleCatalogProductNode>[],
): ProductWithCart[] => products as unknown as ProductWithCart[];

export const buildCatalogSection = (
  products: ProductWithCart[],
  pageInfo?: CatalogPageInfo,
): CatalogSection => ({
  products,
  categories: products.length ? groupProductsByCategory(products) : [],
  pageInfo,
});

export const extractPageInfo = (
  pageInfo:
    | { endCursor?: string | null; hasNextPage?: boolean | null }
    | null
    | undefined,
): CatalogPageInfo | undefined => {
  if (!pageInfo) {
    return undefined;
  }

  return {
    endCursor: pageInfo.endCursor ?? null,
    hasNextPage: Boolean(pageInfo.hasNextPage),
  };
};
