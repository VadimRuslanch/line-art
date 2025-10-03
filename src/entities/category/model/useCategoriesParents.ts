'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetCategoryParentsDocument,
  type GetCategoryParentsQuery,
} from '@/shared/api/gql/graphql';

type Categories = NonNullable<GetCategoryParentsQuery['productCategories']>;
type CategoryNode = Categories['nodes'][number];

export const useCategoriesParents = () => {
  const { data } = useSuspenseQuery(GetCategoryParentsDocument, {
    fetchPolicy: 'cache-first',
  });

  const categories: NonNullable<CategoryNode>[] = (
    data.productCategories?.nodes ?? []
  ).filter((n): n is NonNullable<CategoryNode> => Boolean(n));

  return { categories };
};
