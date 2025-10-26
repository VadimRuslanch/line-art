import {
  AttributeOperatorEnum,
  OrderEnum,
  ProductAttributeEnum,
  ProductsOrderByEnum,
  type ProductAttributeFilterInput,
  type ProductCategoryToProductConnectionWhereArgs,
  type RootQueryToProductUnionConnectionWhereArgs,
} from '@/shared/api/gql/graphql';
import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';
import { ATTR_KEYS, TAXONOMY_BY_KEY } from '@/shared/constants/taxonomy';

type Where = RootQueryToProductUnionConnectionWhereArgs | undefined;
type CategoryWhere = ProductCategoryToProductConnectionWhereArgs | undefined;

type TaxFilter = {
  taxonomy: string;
  terms?: string[];
  ids?: number[];
  operator?: 'IN' | 'NOT_IN' | 'AND';
};

const ATTRIBUTE_ENUM_BY_KEY: Record<
  (typeof ATTR_KEYS)[number],
  ProductAttributeEnum
> = {
  backlights: ProductAttributeEnum.PA_BACKLIGHTS,
  color: ProductAttributeEnum.PA_COLOR,
  glubina: ProductAttributeEnum.PA_GLUBINA,
  shadowGap: ProductAttributeEnum.PA_SHADOW_GAP,
  width: ProductAttributeEnum.PA_WIDTH,
};

const isNonEmpty = <T>(v: T[] | undefined | null): v is T[] =>
  Array.isArray(v) && v.length > 0;

function makeTaxFilters(selected: SelectedFilters): TaxFilter[] {
  const filters: TaxFilter[] = [];

  if (isNonEmpty(selected.category)) {
    filters.push({
      taxonomy: TAXONOMY_BY_KEY.categories,
      terms: selected.category,
      operator: 'IN',
    });
  }

  for (const key of ATTR_KEYS) {
    const terms = selected[key];
    if (isNonEmpty(terms)) {
      filters.push({
        taxonomy: TAXONOMY_BY_KEY[key],
        terms,
        operator: 'IN',
      });
    }
  }

  return filters;
}

function makeAttributeFilters(
  selected: SelectedFilters,
): ProductAttributeFilterInput[] {
  const filters: ProductAttributeFilterInput[] = [];

  for (const key of ATTR_KEYS) {
    const terms = selected[key];
    if (isNonEmpty(terms)) {
      filters.push({
        taxonomy: ATTRIBUTE_ENUM_BY_KEY[key],
        terms,
        operator: AttributeOperatorEnum.IN,
      });
    }
  }

  return filters;
}

const createOrderByDateDesc = () => ({
  orderby: [
    {
      field: ProductsOrderByEnum.DATE,
      order: OrderEnum.DESC,
    },
  ],
});

export function buildWhere(selected: SelectedFilters): Where {
  const price = selected.price;
  const hasPrice = Array.isArray(price);
  const taxFilters = makeTaxFilters(selected);
  const hasTax = taxFilters.length > 0;

  if (!hasPrice && !hasTax) {
    return createOrderByDateDesc() as Where;
  }

  return {
    ...(hasPrice && { minPrice: price![0], maxPrice: price![1] }),
    ...(hasTax && {
      taxonomyFilter: {
        relation: 'AND',
        filters: taxFilters,
      },
    }),
    ...createOrderByDateDesc(),
  } as Where;
}

export function buildCategoryWhere(selected: SelectedFilters): CategoryWhere {
  const price = selected.price;
  const hasPrice = Array.isArray(price);
  const attributeFilters = makeAttributeFilters(selected);
  const hasAttributes = attributeFilters.length > 0;

  if (!hasPrice && !hasAttributes) {
    return createOrderByDateDesc() as CategoryWhere;
  }

  return {
    ...(hasPrice && { minPrice: price![0], maxPrice: price![1] }),
    ...(hasAttributes && {
      attributes: {
        relation: AttributeOperatorEnum.AND,
        queries: attributeFilters,
      },
    }),
    ...createOrderByDateDesc(),
  } as CategoryWhere;
}
