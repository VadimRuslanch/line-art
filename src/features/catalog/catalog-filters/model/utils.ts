import type { GetPriceExtremesQuery } from '@/shared/api/gql/graphql';
import { parseMoney } from '@/shared/lib/money';

type MinNodes =
  | NonNullable<GetPriceExtremesQuery['min']>['nodes']
  | null
  | undefined;

type MaxNodes =
  | NonNullable<GetPriceExtremesQuery['max']>['nodes']
  | null
  | undefined;

type AnyMinNode = NonNullable<NonNullable<MinNodes>>[number];
type AnyMaxNode = NonNullable<NonNullable<MaxNodes>>[number];

const hasPrice = (
  n: AnyMinNode | AnyMaxNode | null | undefined,
): n is Extract<
  AnyMinNode | AnyMaxNode,
  { __typename: 'SimpleProduct' | 'VariableProduct' }
> =>
  !!n &&
  (n.__typename === 'SimpleProduct' || n.__typename === 'VariableProduct');

export const pickExtremes = (minNodes?: MinNodes, maxNodes?: MaxNodes) => {
  const minNode = minNodes?.[0];
  const maxNode = maxNodes?.[0];

  const minRaw = hasPrice(minNode) ? (minNode.price ?? 0) : 0;
  const maxRaw = hasPrice(maxNode) ? (maxNode.price ?? 0) : 0;

  const min = parseMoney(minRaw);
  const max = parseMoney(maxRaw);
  return { min, max };
};
