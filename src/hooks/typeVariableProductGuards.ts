import { GetProductDetailsQuery } from '@/shared/api/gql/graphql';

type MaybeDeep<T> = T | null | undefined | { __typename?: string };

export function isVariableProduct(
  product: MaybeDeep<GetProductDetailsQuery['product']>,
): product is Extract<
  NonNullable<GetProductDetailsQuery['product']>,
  { __typename: 'VariableProduct' }
> {
  return !!product && product.__typename === 'VariableProduct';
}
