'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetCategoryParentsDocument,
  type GetCategoryParentsQuery,
} from '@/shared/api/gql/graphql';

// алиасы для удобства
type Categories = NonNullable<GetCategoryParentsQuery['productCategories']>;
type CategoryNode = Categories['nodes'][number]; // может быть null | undefined

export const useCategoriesParents = () => {
  const { data } = useSuspenseQuery(GetCategoryParentsDocument, {
    fetchPolicy: 'cache-first',
  });

  // убираем null/undefined из массива
  const categories: NonNullable<CategoryNode>[] = (
    data.productCategories?.nodes ?? []
  ).filter((n): n is NonNullable<CategoryNode> => Boolean(n));

  return { categories };
};
