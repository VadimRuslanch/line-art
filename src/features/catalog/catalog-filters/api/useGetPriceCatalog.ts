'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { GetPriceExtremesDocument } from '@/shared/api/gql/graphql';
import { pickExtremes } from '@/features/catalog/catalog-filters/model/utils';

export const useGetPriceCatalog = () => {
  const { data: price } = useSuspenseQuery(GetPriceExtremesDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const { min, max } = pickExtremes(price?.min?.nodes, price?.max?.nodes);
  return { min, max };
};
