'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetProductDetailsDocument,
  type GetProductDetailsQuery,
  ProductIdTypeEnum,
} from '@/shared/api/gql/graphql';
import { useCart } from '@/entities/cart/model/useCart';
import { useMemo } from 'react';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';

type SimpleGQL = Extract<
  NonNullable<GetProductDetailsQuery['product']>,
  { __typename: 'SimpleProduct' }
>;

type SimpleProductUI = SimpleGQL & {
  inCart: boolean;
  key: string | null;
  quantity: number;
};

export const useProductDetails = (slug: string) => {
  const { data } = useSuspenseQuery(GetProductDetailsDocument, {
    variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
    fetchPolicy: 'cache-first',
  });

  const { simpleProducts } = useCart();

  const simple: SimpleGQL | undefined = isSimpleProduct(data?.product)
    ? data!.product
    : undefined;

  const cartItem = useMemo(() => {
    if (!simple) return undefined;

    return simpleProducts.find((ci) => {
      const nodeDbId = (ci.product?.node as { databaseId?: number } | undefined)
        ?.databaseId;
      return nodeDbId === simple.databaseId;
    });
  }, [simple, simpleProducts]);

  const product: SimpleProductUI | undefined = simple
    ? {
        ...simple,
        inCart: Boolean(cartItem),
        key: cartItem?.key ?? null,
        quantity: cartItem?.quantity ?? 0,
      }
    : undefined;

  return { product };
};
