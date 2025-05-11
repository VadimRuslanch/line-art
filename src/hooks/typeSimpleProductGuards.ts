import { GetProductDetailsQuery } from '@/generated/graphql';

export function isSimpleProduct(
  product: GetProductDetailsQuery['product'] | undefined | null,
): product is Extract<
  GetProductDetailsQuery['product'],
  { __typename: 'SimpleProduct' }
> {
  return product?.__typename === 'SimpleProduct';
}
