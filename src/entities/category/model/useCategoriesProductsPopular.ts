'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetCategoriesProductsPopularDocument,
  type GetCategoriesProductsPopularQuery,
} from '@/shared/api/gql/graphql';
import { groupProductsByCategory } from '@/shared/utils/ustils';
import { useCartState } from '@/hooks/useCartState';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import type { WithCartFlag } from '@/hooks/useCartState';
import type { ProductWithCart } from '@/entities/product/model/types';

type NodeFromQuery = NonNullable<
  GetCategoriesProductsPopularQuery['products']
>['nodes'][number];

type SimpleFromQuery = Extract<NodeFromQuery, { __typename: 'SimpleProduct' }>;

export const useCategoriesProductsPopular = () => {
  const { data } = useSuspenseQuery(GetCategoriesProductsPopularDocument, {
    fetchPolicy: 'cache-first',
  });

  const nodes = data?.products?.nodes ?? [];

  const simpleNodes = nodes.filter(isSimpleProduct) as SimpleFromQuery[];

  const withCart = useCartState<SimpleFromQuery>(simpleNodes);

  if (!nodes.length)
    return { categories: [] as ReturnType<typeof groupProductsByCategory> };

  const raw: WithCartFlag<ProductWithCart>[] = (
    withCart as unknown as WithCartFlag<ProductWithCart>[]
  ).filter(
    (p): p is WithCartFlag<ProductWithCart> =>
      p?.__typename === 'SimpleProduct',
  );

  const categories = groupProductsByCategory(raw);

  return { categories };
};
