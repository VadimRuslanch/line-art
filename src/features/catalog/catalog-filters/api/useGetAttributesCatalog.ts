'use client';

import { useMemo } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetAttributesFiltersDocument,
  type GetAttributesFiltersQuery,
} from '@/shared/api/gql/graphql';

export const useGetAttributesCatalog = (): GetAttributesFiltersQuery => {
  const { data: attributes } = useSuspenseQuery(GetAttributesFiltersDocument, {
    fetchPolicy: 'cache-first',
  });

  return useMemo(() => attributes, [attributes]);
};
