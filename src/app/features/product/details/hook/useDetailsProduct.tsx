'use client';

import {
  useGetDetailsProductSuspenseQuery,
  ProductIdTypeEnum,
} from '@/generated/graphql';

export const useDetailsProduct = (slug: string) => {
  const { data } = useGetDetailsProductSuspenseQuery({
    variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
    fetchPolicy: 'cache-first',
  });

  return { product: data?.product ?? null };
};
