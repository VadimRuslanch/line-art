import {
  type GetProductListAllQuery,
  type GetProductListCategoryQuery,
} from '@/shared/api/gql/graphql';

type AllEdge = NonNullable<GetProductListAllQuery['products']>['nodes'][number];
type CategoryEdge = NonNullable<
  NonNullable<
    NonNullable<GetProductListCategoryQuery['productCategory']>['products']
  >['nodes'][number]
>;

type UseProductListResult = {
  products: (ProductNode | null | undefined)[];
  loadMore: () => Promise<void> | void;
  hasNextPage: boolean;
  isFetchingMore: boolean;
  isInitialLoading: boolean;
  error?: unknown;
  networkStatus?: number;
  cursors: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
  refetch?: () => void;
};
type ProductNode = AllEdge | CategoryEdge;

type UseProductListOptions = { pageSize?: number };

export type { UseProductListOptions, UseProductListResult, ProductNode };

// import { useCallback, useMemo, useState } from 'react';
// import { useQuery } from '@apollo/client/react';
// import { useAppSelector } from '@/shared/model/hooks';
// import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
// import {
//   buildCategoryWhere,
//   buildWhere,
// } from '@/features/catalog/catalog-filters/utils/utils';
// import { filtersEqual, mergeProductNodes } from '../utils';
//
// export function useProductAllList(
//   options?: UseProductListOptions,
// ): UseProductListResult {
//   const { pageSize = 12 } = options ?? {};
//   const selectedFilters = useAppSelector(selectSelectedFilters, filtersEqual);
//   const where = useMemo(() => buildWhere(selectedFilters), [selectedFilters]);
//
//   const variables = useMemo<GetProductListAllQueryVariables>(
//     () => ({
//       n: pageSize,
//       after: null,
//       where,
//     }),
//     [pageSize, where],
//   );
//
//   const { data, fetchMore, loading, error, networkStatus, refetch } = useQuery<
//     GetProductListAllQuery,
//     GetProductListAllQueryVariables
//   >(GetProductListAllDocument, {
//     variables,
//     fetchPolicy: 'cache-and-network',
//     nextFetchPolicy: 'cache-first',
//     returnPartialData: true,
//     notifyOnNetworkStatusChange: true,
//   });
//
//   const products = useMemo<(ProductNode | null | undefined)[]>(
//     () => (data?.products?.nodes ?? []) as (ProductNode | null | undefined)[],
//     [data?.products?.nodes],
//   );
//
//   const pageInfo = data?.products?.pageInfo;
//   const endCursor = pageInfo?.endCursor ?? null;
//   const hasNextPage = Boolean(pageInfo?.hasNextPage);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//
//   const loadMore = useCallback(async () => {
//     if (isFetchingMore) return;
//     if (!endCursor || !hasNextPage) return;
//
//     setIsFetchingMore(true);
//     try {
//       await fetchMore({
//         variables: {
//           n: pageSize,
//           after: endCursor,
//           where,
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult?.products) return prev;
//           if (!prev?.products) return fetchMoreResult;
//
//           const mergedNodes = mergeProductNodes(
//             prev.products.nodes,
//             fetchMoreResult.products.nodes,
//           ) as typeof prev.products.nodes;
//
//           return {
//             ...prev,
//             products: {
//               ...fetchMoreResult.products,
//               nodes: mergedNodes,
//             },
//           };
//         },
//       });
//     } finally {
//       setIsFetchingMore(false);
//     }
//   }, [isFetchingMore, endCursor, hasNextPage, fetchMore, pageSize, where]);
//
//   const isInitialLoading = loading && !products.length;
//
//   return {
//     products,
//     loadMore,
//     hasNextPage,
//     isFetchingMore,
//     isInitialLoading,
//     error,
//     networkStatus,
//     cursors: {
//       endCursor,
//       hasNextPage,
//     },
//     refetch: () => {
//       try {
//         void refetch?.(variables);
//       } catch {}
//     },
//   };
// }
//
// type UseProductCategoryListOptions = UseProductListOptions & { slug: string };
//
// export function useProductCategoryList({
//   slug,
//   pageSize = 13,
// }: UseProductCategoryListOptions): UseProductListResult {
//   const selectedFilters = useAppSelector(selectSelectedFilters, filtersEqual);
//   const where = useMemo(
//     () => buildCategoryWhere(selectedFilters),
//     [selectedFilters],
//   );
//
//   const variables = useMemo<GetProductListCategoryQueryVariables>(
//     () => ({
//       n: pageSize,
//       after: null,
//       slug,
//       where,
//     }),
//     [pageSize, slug, where],
//   );
//
//   const { data, fetchMore, loading, error, networkStatus, refetch } = useQuery<
//     GetProductListCategoryQuery,
//     GetProductListCategoryQueryVariables
//   >(GetProductListCategoryDocument, {
//     variables,
//     skip: !slug,
//     fetchPolicy: 'cache-and-network',
//     nextFetchPolicy: 'cache-first',
//     returnPartialData: true,
//     notifyOnNetworkStatusChange: true,
//   });
//
//   const products = useMemo<(ProductNode | null | undefined)[]>(
//     () =>
//       (data?.productCategory?.products?.nodes ?? []) as (
//         | ProductNode
//         | null
//         | undefined
//       )[],
//     [data?.productCategory?.products?.nodes],
//   );
//
//   const pageInfo = data?.productCategory?.products?.pageInfo;
//   const endCursor = pageInfo?.endCursor ?? null;
//   const hasNextPage = Boolean(pageInfo?.hasNextPage);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//
//   const loadMore = useCallback(async () => {
//     if (isFetchingMore) return;
//     if (!endCursor || !hasNextPage || !slug) return;
//
//     setIsFetchingMore(true);
//     try {
//       await fetchMore({
//         variables: {
//           n: pageSize,
//           after: endCursor,
//           slug,
//           where,
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult?.productCategory) return prev;
//           if (!prev?.productCategory) return fetchMoreResult;
//
//           const prevProducts = prev.productCategory.products;
//           const nextProducts = fetchMoreResult.productCategory.products;
//           if (!prevProducts || !nextProducts) return prev;
//
//           const mergedNodes = mergeProductNodes(
//             prevProducts.nodes,
//             nextProducts.nodes,
//           ) as typeof prevProducts.nodes;
//
//           return {
//             ...prev,
//             productCategory: {
//               ...fetchMoreResult.productCategory,
//               products: {
//                 ...nextProducts,
//                 nodes: mergedNodes,
//               },
//             },
//           };
//         },
//       });
//     } finally {
//       setIsFetchingMore(false);
//     }
//   }, [
//     isFetchingMore,
//     endCursor,
//     hasNextPage,
//     slug,
//     fetchMore,
//     pageSize,
//     where,
//   ]);
//
//   const isInitialLoading = loading && !products.length;
//
//   return {
//     products,
//     loadMore,
//     hasNextPage,
//     isFetchingMore,
//     isInitialLoading,
//     error,
//     networkStatus,
//     cursors: {
//       endCursor,
//       hasNextPage,
//     },
//     refetch: () => {
//       try {
//         void refetch?.(variables);
//       } catch {}
//     },
//   };
// }
//
