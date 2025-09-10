import type { GetProductsPageQueryVariables } from '@/shared/api/gql/graphql';
import type { SelectedFilters } from '@/features/catalog-filters/model/slice';
import { ATTR_KEYS, TAXONOMY_BY_KEY } from '@/shared/constants/taxonomy';

type Vars = GetProductsPageQueryVariables;
type Where = Vars['where'];

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
  } else {
    filters.push({
      taxonomy: TAXONOMY_BY_KEY.categories,
      terms: [
        'aksessuary',
        'alyuminiyevyye-polki',
        'alyuminiyevyy-kromochnyy-profil',
        'alyuminievyj-plintus',
        'alyuminievyj-plintus-dlya-pola',
        'alyuminievyj-profil',
        'alyuminiyevyy-profil-dlya-skrytogo-plintusa',
        'alyuminievyj-profil-s-rasseivatelem',
        'dekorativnyy-alyuminiyevyy-profil',
        'dekorativnyy-profil-dlya-plitki',
        'dekorativnyj-profil-dlya-sten',
        'p-obraznyy-chernyy-alyuminiyevyy-dekora',
        'plintus-alyuminievyj-100-mm',
        'plintus-napolnyj-alyuminievyj-chernyj',
        'profil-p-obraznyj-alyuminievyj',
        'rasseivatel-dlya-profilya',
        'rasseivatel-dlya-tenevogo-plintusa',
        'skrytyj-plintus',
        'tenevoj-plintus',
        'tenevoj-plintus-10-mm',
        'tenevoy-plintus-10-mm',
        'ekran-dlya-profilya',
      ],
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

  if (!hasPrice && !hasTax) return undefined;

  return {
    ...(hasPrice && { minPrice: price![0], maxPrice: price![1] }),
    ...(hasTax && {
      taxonomyFilter: {
        relation: 'AND',
        filters: taxFilters,
      },
    }),
  } as Where;
}
