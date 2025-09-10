'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetCategoriesProductsNewDocument,
  type GetCategoriesProductsNewQuery,
} from '@/shared/api/gql/graphql';
import { groupProductsByCategory } from '@/shared/utils/ustils';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';

type NodeFromQuery = NonNullable<
  GetCategoriesProductsNewQuery['products']
>['nodes'][number];

type SimpleFromQuery = Extract<NodeFromQuery, { __typename: 'SimpleProduct' }>;

export const useCategoriesProductsNew = () => {
  const { data } = useSuspenseQuery(GetCategoriesProductsNewDocument, {
    fetchPolicy: 'cache-first',
  });

  if (!data?.products?.nodes?.length) {
    return { categories: [] as ReturnType<typeof groupProductsByCategory> };
  }

  const simpleNodes = data.products.nodes.filter(
    isSimpleProduct,
  ) as SimpleFromQuery[];

  const categories = groupProductsByCategory(simpleNodes);

  return { categories };
};
