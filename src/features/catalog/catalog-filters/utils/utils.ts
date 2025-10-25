import {
  OrderEnum,
  ProductsOrderByEnum,
  type RootQueryToProductUnionConnectionWhereArgs,
} from '@/shared/api/gql/graphql';
import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';
import { ATTR_KEYS, TAXONOMY_BY_KEY } from '@/shared/constants/taxonomy';

type Where = RootQueryToProductUnionConnectionWhereArgs | undefined;

type TaxFilter = {
  taxonomy: string;
  terms?: string[];
  ids?: number[];
  operator?: 'IN' | 'NOT_IN' | 'AND';
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

export function buildWhere(selected: SelectedFilters): Where {
  const price = selected.price;
  const hasPrice = Array.isArray(price);
  const taxFilters = makeTaxFilters(selected);
  const hasTax = taxFilters.length > 0;
  const shouldOrderByDate = !isNonEmpty(selected.category);
  const hasAnyFilter = hasPrice || hasTax || shouldOrderByDate;

  if (!hasAnyFilter) return undefined;

  return {
    ...(hasPrice && { minPrice: price![0], maxPrice: price![1] }),
    ...(hasTax && {
      taxonomyFilter: {
        relation: 'AND',
        filters: taxFilters,
      },
    }),
    ...(shouldOrderByDate && {
      orderby: [
        {
          field: ProductsOrderByEnum.DATE,
          order: OrderEnum.DESC,
        },
      ],
    }),
  } as Where;
}
