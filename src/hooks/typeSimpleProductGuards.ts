import { GetProductDetailsQuery } from '@/shared/api/gql/graphql';

type MaybeDeep<T> = T | null | undefined | { __typename?: string };

export function isSimpleProduct(
  product: MaybeDeep<GetProductDetailsQuery['product']>,
): product is Extract<
  NonNullable<GetProductDetailsQuery['product']>,
  { __typename: 'SimpleProduct' }
> {
  return !!product && product.__typename === 'SimpleProduct';
}
