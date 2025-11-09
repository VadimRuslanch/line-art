'use server';

import { cache } from 'react';
import makeClient from '@/shared/api/Apollo/ApolloWrapper.client';
import {
  GetProductDetailsDocument,
  ProductIdTypeEnum,
  type GetProductDetailsQuery,
} from '@/shared/api/gql/graphql';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import type { SimpleProductGQL } from '@/entities/product/types';

type QueryResult = GetProductDetailsQuery['product'];

export const getProductDetails = cache(async function getProductDetails(
  slug: string,
): Promise<SimpleProductGQL | null> {
  const client = makeClient();
  const { data } = await client.query({
    query: GetProductDetailsDocument,
    variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
    fetchPolicy: 'no-cache',
  });

  const product = data?.product;
  if (!product) return null;

  if (
    product.__typename === 'SimpleProduct' ||
    product.__typename === 'VariableProduct'
  ) {
    return product;
  }

  return product;
});
