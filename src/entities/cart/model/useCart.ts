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
} from '@/shared/api/gql/graphql';
import type { CartSimpleProduct } from '@/entities/product/types';
import { ApolloCache } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useMemo, useCallback, useEffect } from 'react';
import { ApolloError } from '@apollo/client/v4-migration';
import { useAppDispatch } from '@/shared/model/hooks';
import { setSnapshot, CartItemState } from '@/entities/cart/model/cartSlice';
/* ------------------------ helpers -------------------------------- */

type Cart = CartCoreFragment;

type SimpleCartEntry = {
  key: string;
  quantity: number;
  total: string | null;
  product: CartSimpleProduct;
};

function writeCart(cache: ApolloCache, newCart: Cart | null | undefined) {
  if (!newCart) return;

  cache.writeQuery<GetCartQuery>({
    query: GetCartDocument,
    data: { __typename: 'RootQuery', cart: newCart },
  });
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
      if (!node || node.__typename !== 'SimpleProduct') {
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

  const mutating = adding || removing || updating;
  const cartLoading = loadingCart;

  const error: ApolloError | undefined = addErr || rmErr || updateErr;

  return useMemo<
    Readonly<{
      cart: Cart | null;
      simpleProducts: typeof simpleProducts;
      mutating: boolean;
      cartLoading: boolean;
      error: ApolloError | undefined;
      add: (id: number, qty?: number) => Promise<void>;
      remove: (key: string) => Promise<void>;
      clear: () => Promise<void>;
      updateQuantity: (key: string, qty: number) => Promise<void>;
    }>
  >(
    () => ({
      cart,
      simpleProducts,
      mutating,
      cartLoading,
      error,
      add,
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
      remove,
      clear,
      updateQuantity,
    ],
  );
}
