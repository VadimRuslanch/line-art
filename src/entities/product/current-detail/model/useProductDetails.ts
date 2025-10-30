'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetProductDetailsDocument,
  ProductIdTypeEnum,
} from '@/shared/api/gql/graphql';
import { useCart } from '@/entities/cart/model/useCart';
import { useMemo } from 'react';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import type {
  // GlobalProductAttributeUI,
  NamedTermNode,
  SimpleProductGQL,
  SimpleProductUI,
} from '../../types';

type AttrNode = NonNullable<
  NonNullable<SimpleProductGQL['attributes']>['nodes']
>[number];

// type GlobalAttrNode = Extract<
//   AttrNode & { __typename: unknown },
//   { __typename: 'GlobalProductAttribute' }
// >;

function isNonNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

function isGlobal(
  v: AttrNode | null | undefined,
): v is AttrNode & { __typename: 'GlobalProductAttribute' } {
  return !!v && v.__typename === 'GlobalProductAttribute';
}

function hasName<T>(v: T): v is T & { name?: string | null } {
  return !!v && typeof v === 'object' && 'name' in (v as object);
}

function getDbId(node: unknown): number | undefined {
  return (node as { databaseId?: number } | null | undefined)?.databaseId;
}
export const useProductDetails = (slug: string) => {
  const { data } = useSuspenseQuery(GetProductDetailsDocument, {
    variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
    fetchPolicy: 'cache-first',
  });

  const { simpleProducts } = useCart();

  const simple: SimpleProductGQL | null = isSimpleProduct(data?.product)
    ? (data!.product as SimpleProductGQL)
    : null;

  const product = useMemo<SimpleProductUI | null>(() => {
    if (!simple) return null;

    const cartItem = simpleProducts.find(
      (ci) => getDbId(ci.product?.node) === simple.databaseId,
    );

    const rawAttrs = simple.attributes?.nodes ?? [];

    const narrowedAttrs = rawAttrs
      .filter(isNonNull)
      .filter(isGlobal)
      .map((attr) => ({
        __typename: 'GlobalProductAttribute' as const,
        id: attr.id,
        name: attr.name,
        variation: attr.variation,
        visible: attr.visible,
        label: attr.label,
        terms: attr.terms
          ? {
              __typename: 'GlobalProductAttributeToTermNodeConnection' as const,
              nodes: (attr.terms.nodes ?? [])
                .filter(isNonNull)
                .filter(hasName) as NamedTermNode[],
            }
          : null,
      }));

    return {
      ...simple,
      inCart: Boolean(cartItem),
      key: cartItem?.key ?? null,
      quantity: cartItem?.quantity ?? 0,
      attributes: { nodes: narrowedAttrs },
    };
  }, [simple, simpleProducts]);

  return { product };
};
