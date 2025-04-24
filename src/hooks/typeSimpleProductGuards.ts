import { GetDetailsProductQuery } from '@/generated/graphql';

export function isSimpleProduct(
  product: GetDetailsProductQuery['product'] | undefined | null,
): product is Extract<
  GetDetailsProductQuery['product'],
  { __typename: 'SimpleProduct' }
> {
  return product?.__typename === 'SimpleProduct';
}
