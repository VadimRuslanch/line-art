import './FilterGroup.scss';
import FilterInput from '@/features/catalog/catalog-filters/ui/FilterInput/FilterInput';
import { useGetAttributesCatalog } from '@/features/catalog/catalog-filters/api/useGetAttributesCatalog';
import { useAppSelector, useAppDispatch } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import type {
  SelectedFilters,
  FilterKey,
} from '@/features/catalog/catalog-filters/model/slice';
import { toggleTerm } from '@/features/catalog/catalog-filters/model/slice';

type OptionNode = {
  id: string;
  name?: string | null;
  slug?: string | null;
  count?: number | null;
};

const ATTR_KEYS = [
  'allPaBacklights',
  'allPaColor',
  'allPaGlubina',
  'allPaShadowGap',
  'allPaWidth',
] as const;

type AttrKey = (typeof ATTR_KEYS)[number];

const STORE_KEY_BY_GRAPH: Record<AttrKey, FilterKey> = {
  allPaBacklights: 'backlights',
  allPaColor: 'color',
  allPaGlubina: 'glubina',
  allPaShadowGap: 'shadowGap',
  allPaWidth: 'width',
};

export default function FilterGroup() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedFilters) as SelectedFilters;

  const attributes = useGetAttributesCatalog();

  const gqlKeys = ATTR_KEYS;

  const labelByKey: Record<AttrKey, string> = {
    allPaBacklights: "�?�?�?�?�?��'���",
    allPaColor: "���?��'",
    allPaGlubina: '�"�>�?�+��?��',
    allPaShadowGap: "���?��?�� �'��?��",
    allPaWidth: '���?��?��',
  };

  return (
    <>
      {gqlKeys.map((gqlKey) => {
        const conn = attributes[gqlKey];
        const options: OptionNode[] = conn?.nodes ?? [];
        const storeKey = STORE_KEY_BY_GRAPH[gqlKey];
        const picked = new Set(selected[storeKey] ?? []);

        return (
          <section key={String(gqlKey)} className="FilterGroup">
            <h4 className="SubtitleS1">{labelByKey[gqlKey as AttrKey]}</h4>
            {options.map((opt) => {
              const slug = opt.slug ?? '';
              const checked = slug ? picked.has(slug) : false;

              return (
                <FilterInput
                  key={opt.id}
                  checked={checked}
                  onChange={() => {
                    if (!slug) return;
                    dispatch(toggleTerm({ key: storeKey, slug }));
                  }}
                  disabled={!opt.count}
                  count={opt.count}
                >
                  {opt.name ?? ''}
                </FilterInput>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
