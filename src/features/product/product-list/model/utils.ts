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
