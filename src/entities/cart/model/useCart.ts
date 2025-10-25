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
  ProductWithCategoriesFragment,
  CartCoreFragment,
  UpdateCartItemQuantitiesMutation,
  UpdateCartItemQuantitiesMutationVariables,
  UpdateCartItemQuantitiesDocument,
} from '@/shared/api/gql/graphql';
import { ApolloCache } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useMemo, useCallback, useEffect } from 'react';
import { ApolloError } from '@apollo/client/v4-migration';
import { useAppDispatch } from '@/shared/model/hooks';
import { setSnapshot, CartItemState } from '@/entities/cart/model/cartSlice';
/* ------------------------ helpers -------------------------------- */

type Cart = CartCoreFragment;

type CartItem = NonNullable<Cart['contents']>['nodes'][number];

type CartItemWithProduct = Omit<CartItem, 'product'> & {
  product: { node: ProductWithCategoriesFragment };
};

function writeCart(cache: ApolloCache, newCart: Cart | null | undefined) {
  if (!newCart) return;

  cache.writeQuery<GetCartQuery>({
    query: GetCartDocument,
    data: { cart: newCart },
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

  const simpleProducts = useMemo(() => {
    if (!cart?.contents?.nodes) return [];

    return cart.contents.nodes.filter(
      (item): item is CartItemWithProduct =>
        item.product?.node?.__typename === 'SimpleProduct' &&
        'databaseId' in item.product.node &&
        'id' in item.product.node,
    );
  }, [cart]);

  const hasCart = Boolean(cart);
  const cartSubtotal = cart?.subtotal ?? null;
  const cartTotal = cart?.total ?? null;

  useEffect(() => {
    if (!hasCart) {
      dispatch(setSnapshot({ items: [], subtotal: null, total: null }));
      return;
    }

    const items: CartItemState[] = simpleProducts
      .map((item) => {
        const productId = item.product.node.databaseId;
        const key = item.key;
        const quantity = item.quantity ?? 0;

        if (typeof productId !== 'number' || !key) return null;

        return {
          key,
          productId,
          quantity,
          total: item.total ?? null,
        };
      })
      .filter((item): item is CartItemState => Boolean(item));

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
