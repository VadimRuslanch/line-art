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
import { setSnapshot, CartItemState } from '@/entities/cart/model/cartSlice';
/* ------------------------ helpers -------------------------------- */

type Cart = CartCoreFragment;

type CartProductNode = CartSimpleProduct | CartVariableProduct;

type SimpleCartEntry = {
  key: string;
  quantity: number;
  total: string | null;
  product: CartProductNode;
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

      if (!key) {
        return acc;
      }

      acc.push({
        key,
        quantity,
        total,
        product: node,
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

    const items: CartItemState[] = simpleProducts.map((item) => ({
      key: item.key,
      productId: item.product.databaseId,
      quantity: item.quantity,
      total: item.total,
    }));

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
    ) => {
      await addVarExec({
        variables: {
          productId,
          variationId,
          quantity,
          attributes: toProductAttributeInput(attributes),
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
    ) => Promise<void>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
    updateQuantity: (key: string, qty: number) => Promise<void>;
  }>;
}
