'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { GetCategoryWithProductDocument } from '@/shared/api/gql/graphql';

export const useCategoryWithProduct = () => {
  const { data } = useSuspenseQuery(GetCategoryWithProductDocument, {
    fetchPolicy: 'cache-first',
  });

  const items = data.productCategories?.nodes ?? [];
  const categories = items.filter((c) => c.contentNodes?.nodes?.length);
  return { categories };
};
