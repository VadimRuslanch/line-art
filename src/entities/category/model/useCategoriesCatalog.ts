'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetCategoriesCatalogDocument,
  type GetCategoriesCatalogQuery,
} from '@/shared/api/gql/graphql';

type Categories = NonNullable<GetCategoriesCatalogQuery['productCategories']>;
type CategoryNode = Categories['nodes'][number]; // может быть null | undefined

export const useCategoriesCatalog = () => {
  const { data } = useSuspenseQuery(GetCategoriesCatalogDocument, {
    fetchPolicy: 'cache-first',
  });

  const categories: NonNullable<CategoryNode>[] = (
    data.productCategories?.nodes ?? []
  ).filter((n): n is NonNullable<CategoryNode> => Boolean(n));

  return { categories };
};
