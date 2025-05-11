'use client';
import {
  GetCartDocument,
  GetCartQuery,
  GetCartQueryVariables,
  AddToCartDocument,
  AddToCartMutation,
  AddToCartMutationVariables,
  RemoveFromCartDocument,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
  ProductWithCategoriesFragment,
  CartCoreFragment,
} from '@/generated/graphql';
import {
  useQuery,
  useMutation,
  ApolloError,
  ApolloCache,
} from '@apollo/client';
import { useMemo, useCallback } from 'react';

/* ------------------------ helpers -------------------------------- */

type Cart = CartCoreFragment;

type CartItem = NonNullable<Cart['contents']>['nodes'][number];

type CartItemWithProduct = Omit<CartItem, 'product'> & {
  product: { node: ProductWithCategoriesFragment };
};

function writeCart(
  cache: ApolloCache<unknown>,
  newCart: Cart | null | undefined,
) {
  if (!newCart) return;

  cache.writeQuery<GetCartQuery>({
    query: GetCartDocument,
    data: { cart: newCart },
  });
}

/* ------------------------ основной хук --------------------------- */

export function useCart() {
  const { data, loading: loadingCart } = useQuery<
    GetCartQuery,
    GetCartQueryVariables
  >(GetCartDocument, {
    fetchPolicy: 'cache-first',
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

  const loading = loadingCart || adding || removing;
  const error: ApolloError | undefined = addErr || rmErr;

  return useMemo<
    Readonly<{
      cart: Cart | null;
      simpleProducts: typeof simpleProducts;
      loading: boolean;
      error: ApolloError | undefined;
      add: (id: number, qty?: number) => Promise<void>;
      remove: (key: string) => Promise<void>;
      clear: () => Promise<void>;
    }>
  >(
    () => ({
      cart,
      simpleProducts,
      loading,
      error,
      add,
      remove,
      clear,
    }),
    [cart, simpleProducts, loading, error, add, remove, clear],
  );
}
