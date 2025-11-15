'use client';
import {
  GetCartDocument,
  AddToCartDocument,
  RemoveFromCartDocument,
  GetCartQuery,
  GetCartQueryVariables,
  AddToCartMutation,
  AddToCartMutationVariables,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
  CartCoreFragment,
  UpdateCartItemQuantitiesMutation,
  UpdateCartItemQuantitiesMutationVariables,
  UpdateCartItemQuantitiesDocument,
  AddVariableToCartMutation,
  AddVariableToCartMutationVariables,
  AddVariableToCartDocument,
} from '@/shared/api/gql/graphql';
import type {
  CartSimpleProduct,
  CartVariableProduct,
} from '@/entities/product/types';
import { ApolloCache } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useMemo, useCallback, useEffect } from 'react';
import { ApolloError } from '@apollo/client/v4-migration';
import { useAppDispatch } from '@/shared/model/hooks';
import {
  setSnapshot,
  CartItemState,
  CartVariationAttributes,
} from '@/entities/cart/model/cartSlice';
import { parseMoney } from '@/shared/lib/money';
/* ------------------------ helpers -------------------------------- */

type Cart = CartCoreFragment;

type CartProductNode = CartSimpleProduct | CartVariableProduct;

type VariationPricing = {
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale?: boolean | null;
};

export type CartVariationDisplayAttribute = {
  key: string;
  label: string | null;
  value: string | null;
};

type SimpleCartEntry = {
  key: string;
  quantity: number;
  total: string | null;
  product: CartProductNode;
  variationId?: number;
  variationAttributes?: CartVariationAttributes | null;
  variationPricing?: VariationPricing | null;
  variationDisplayAttributes?: CartVariationDisplayAttribute[] | null;
};

function writeCart(cache: ApolloCache, newCart: Cart | null | undefined) {
  if (!newCart) return;

  cache.writeQuery<GetCartQuery>({
    query: GetCartDocument,
    data: { __typename: 'RootQuery', cart: newCart },
  });
}

// ---- helpers для вариативных атрибутов ----
type AttributeLike =
  | Record<string, string>
  | Array<{ name: string; value: string }>;

type VariationAttributeLike =
  | {
      name?: string | null;
      label?: string | null;
      value?: string | null;
    }
  | null
  | undefined;

function normalizeAttrName(name: string) {
  return name
    .trim()
    .replace(/^attribute_pa_/i, 'pa_')
    .replace(/^attribute_/i, '')
    .trim()
    .toLowerCase();
}

function toProductAttributeInput(attributes: AttributeLike) {
  if (Array.isArray(attributes)) {
    return attributes.map((a) => ({
      attributeName: normalizeAttrName(a.name),
      attributeValue: a.value,
    }));
  }
  return Object.entries(attributes).map(([name, value]) => ({
    attributeName: normalizeAttrName(name),
    attributeValue: value,
  }));
}

function buildVariationExtraData(
  price?: number | string | null,
): string | null {
  if (price === null || typeof price === 'undefined') return null;
  const normalized =
    typeof price === 'number' && Number.isFinite(price)
      ? price
      : typeof price === 'string'
        ? (() => {
            const parsed = parseMoney(price);
            return Number.isFinite(parsed) ? parsed : null;
          })()
        : null;
  if (normalized === null) return null;
  return JSON.stringify({ variationPrice: normalized });
}

function normalizeAttrValue(value?: string | null) {
  return value?.trim() ?? '';
}

function extractVariationAttributes(
  attributes:
    | ReadonlyArray<VariationAttributeLike | null | undefined>
    | null
    | undefined,
): CartVariationAttributes | undefined {
  if (!attributes || attributes.length === 0) return undefined;

  const normalized: CartVariationAttributes = {};

  for (const attribute of attributes) {
    if (!attribute) continue;
    const key = normalizeAttrName(attribute.name ?? attribute.label ?? '');
    const value = normalizeAttrValue(attribute.value);
    if (!key || !value) continue;
    normalized[key] = value;
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

/* ------------------------ основной хук --------------------------- */

export function useCart() {
  const dispatch = useAppDispatch();
  const { data, loading: loadingCart } = useQuery<
    GetCartQuery,
    GetCartQueryVariables
  >(GetCartDocument, {
    ssr: true,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const cart = data?.cart ?? null;

  const simpleProducts = useMemo<SimpleCartEntry[]>(() => {
    if (!cart?.contents?.nodes) return [];

    return cart.contents.nodes.reduce<SimpleCartEntry[]>((acc, item) => {
      const node = item?.product?.node;
      if (
        !node ||
        (node.__typename !== 'SimpleProduct' &&
          node.__typename !== 'VariableProduct')
      ) {
        return acc;
      }

      const key = item.key ?? undefined;
      const quantity = item.quantity ?? 0;
      const total = item.total ?? null;
      const variationEdge = item.variation ?? null;
      const variationId = variationEdge?.node?.databaseId ?? undefined;
      const variationAttributes = extractVariationAttributes(
        variationEdge?.attributes ?? null,
      );
      const variationDisplayAttributesRaw =
        variationEdge?.attributes
          ?.map((attribute) => {
            if (!attribute) return null;
            const key = normalizeAttrName(
              attribute.name ?? attribute.label ?? '',
            );
            if (!key) return null;
            return {
              key,
              label: attribute.label ?? attribute.name ?? null,
              value: attribute.value ?? null,
            } satisfies CartVariationDisplayAttribute;
          })
          .filter((attribute): attribute is CartVariationDisplayAttribute =>
            Boolean(attribute),
          ) ?? [];
      const variationDisplayAttributes =
        variationDisplayAttributesRaw.length > 0
          ? variationDisplayAttributesRaw
          : null;
      const variationPricing = variationEdge?.node
        ? {
            price: variationEdge.node.price ?? null,
            regularPrice: variationEdge.node.regularPrice ?? null,
            salePrice: variationEdge.node.salePrice ?? null,
            onSale: variationEdge.node.onSale ?? null,
          }
        : null;

      if (!key) {
        return acc;
      }

      acc.push({
        key,
        quantity,
        total,
        product: node,
        variationId,
        variationAttributes,
        variationPricing,
        variationDisplayAttributes,
      });

      return acc;
    }, []);
  }, [cart]);

  const hasCart = Boolean(cart);
  const cartSubtotal = cart?.subtotal ?? null;
  const cartTotal = cart?.total ?? null;

  useEffect(() => {
    if (!hasCart) {
      dispatch(setSnapshot({ items: [], subtotal: null, total: null }));
      return;
    }

    const items: CartItemState[] = simpleProducts.reduce<CartItemState[]>(
      (acc, item) => {
        const productId = item.product.databaseId;
        if (typeof productId !== 'number') {
          return acc;
        }

        acc.push({
          key: item.key,
          productId,
          quantity: item.quantity,
          total: item.total,
          variationId: item.variationId ?? null,
          variationAttributes: item.variationAttributes ?? null,
        });

        return acc;
      },
      [],
    );

    dispatch(
      setSnapshot({
        items,
        subtotal: cartSubtotal,
        total: cartTotal,
      }),
    );
  }, [dispatch, hasCart, simpleProducts, cartSubtotal, cartTotal]);

  const [addExec, { loading: adding, error: addErr }] = useMutation<
    AddToCartMutation,
    AddToCartMutationVariables
  >(AddToCartDocument, {
    update(cache, { data }) {
      writeCart(cache, data?.addToCart?.cart);
    },
  });

  const [addVarExec, { loading: addingVar, error: addVarErr }] = useMutation<
    AddVariableToCartMutation,
    AddVariableToCartMutationVariables
  >(AddVariableToCartDocument, {
    update(cache, { data }) {
      writeCart(cache, data?.addToCart?.cart);
    },
  });

  const [rmExec, { loading: removing, error: rmErr }] = useMutation<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables
  >(RemoveFromCartDocument, {
    update(cache, { data }) {
      writeCart(cache, data?.removeItemsFromCart?.cart);
    },
  });

  const [updateQtyExec, { loading: updating, error: updateErr }] = useMutation<
    UpdateCartItemQuantitiesMutation,
    UpdateCartItemQuantitiesMutationVariables
  >(UpdateCartItemQuantitiesDocument, {
    update(cache, { data }) {
      writeCart(cache, data?.updateItemQuantities?.cart);
    },
  });

  const add = useCallback(
    async (productId: number, quantity = 1) => {
      await addExec({ variables: { productId, quantity } });
    },
    [addExec],
  );

  const addVariable = useCallback(
    async (
      productId: number,
      variationId: number,
      attributes: AttributeLike,
      quantity = 1,
      price?: number | string | null,
    ) => {
      await addVarExec({
        variables: {
          productId,
          variationId,
          quantity,
          attributes: toProductAttributeInput(attributes),
          extraData: buildVariationExtraData(price),
        },
      });
    },
    [addVarExec],
  );

  const remove = useCallback(
    async (key: string) => {
      await rmExec({ variables: { keys: [key], all: false } });
    },
    [rmExec],
  );

  const clear = useCallback(async () => {
    await rmExec({ variables: { keys: [], all: true } });
  }, [rmExec]);

  const updateQuantity = useCallback(
    async (key: string, quantity: number) => {
      await updateQtyExec({ variables: { items: [{ key, quantity }] } });
    },
    [updateQtyExec],
  );

  const mutating = adding || removing || updating || addingVar;
  const cartLoading = loadingCart;

  const error: ApolloError | undefined =
    addErr || rmErr || updateErr || addVarErr;

  return useMemo(
    () => ({
      cart,
      simpleProducts,
      mutating,
      cartLoading,
      error,
      add,
      addVariable,
      remove,
      clear,
      updateQuantity,
    }),
    [
      cart,
      simpleProducts,
      mutating,
      cartLoading,
      error,
      add,
      addVariable,
      remove,
      clear,
      updateQuantity,
    ],
  ) as Readonly<{
    cart: Cart | null;
    simpleProducts: typeof simpleProducts;
    mutating: boolean;
    cartLoading: boolean;
    error: ApolloError | undefined;
    add: (id: number, qty?: number) => Promise<void>;
    addVariable: (
      productId: number,
      variationId: number,
      attributes: AttributeLike,
      qty?: number,
      price?: number | string | null,
    ) => Promise<void>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
    updateQuantity: (key: string, qty: number) => Promise<void>;
  }>;
}
