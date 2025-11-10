'use server';

import { cache } from 'react';
import makeClient from '@/shared/api/Apollo/ApolloWrapper.client';
import {
  GetProductDetailsDocument,
  ProductIdTypeEnum,
} from '@/shared/api/gql/graphql';
import type { SimpleProductGQL } from '@/entities/product/types';

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

  const isSupportedProduct =
    product.__typename === 'SimpleProduct' ||
    product.__typename === 'VariableProduct';

  if (!isSupportedProduct) {
    return null;
  }

  return product;
});
