import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';
import type { RootQueryToProductUnionConnectionWhereArgs } from '@/shared/api/gql/graphql';

type ProductWhere = RootQueryToProductUnionConnectionWhereArgs | undefined;

export function hasCategory(where: ProductWhere): boolean {
  if (!where) return false;
  return Boolean(
    where.category || where.categoryIn?.length || where.categoryNotIn?.length,
  );
}

export function stripCategoryFromWhere<T extends ProductWhere>(where: T): T {
  if (!where) return where;

  const rest: RootQueryToProductUnionConnectionWhereArgs = { ...where };
  delete rest.category;
  delete rest.categoryIn;
  delete rest.categoryNotIn;

  return rest as T;
}

export const filtersEqual = (a: SelectedFilters, b: SelectedFilters) =>
  a.category === b.category &&
  a.backlights === b.backlights &&
  a.color === b.color &&
  a.glubina === b.glubina &&
  a.shadowGap === b.shadowGap &&
  a.width === b.width &&
  a.price === b.price;

type NodeWithIdentifiers = {
  id?: string | null;
  databaseId?: number | null;
};

const nodeKey = (node: NodeWithIdentifiers): string | undefined => {
  if (node.id) return node.id;
  if (node.databaseId !== undefined && node.databaseId !== null) {
    return `db-${node.databaseId}`;
  }
  return undefined;
};

export function mergeProductNodes<T extends NodeWithIdentifiers>(
  prevNodes?: (T | null | undefined)[] | null,
  nextNodes?: (T | null | undefined)[] | null,
): (T | null)[] {
  if (!prevNodes?.length) return (nextNodes ?? []) as (T | null)[];
  if (!nextNodes?.length) return (prevNodes ?? []) as (T | null)[];

  const merged: (T | null)[] = [];
  const seen = new Set<string>();

  const push = (list?: (T | null | undefined)[] | null) => {
    if (!list) return;
    for (const node of list) {
      if (!node) {
        merged.push(node ?? null);
        continue;
      }

      const key = nodeKey(node);
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      merged.push(node);
    }
  };

  push(prevNodes);
  push(nextNodes);

  return merged;
}
