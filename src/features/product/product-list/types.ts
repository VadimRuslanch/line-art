//
// type AllEdge = NonNullable<GetProductListAllQuery['products']>['nodes'][number];
// type CategoryEdge = NonNullable<
//   NonNullable<
//     NonNullable<GetProductCategoryListQuery['productCategory']>['products']
//   >['nodes'][number]
// >;
//
// type ProductNode = AllEdge | CategoryEdge;
//
// type UseProductListOptions = { pageSize?: number };
//
// type UseProductListResult = {
//   products: (ProductNode | null | undefined)[];
//   loadMore: () => Promise<void> | void;
//   hasNextPage: boolean;
//   isFetchingMore: boolean;
//   isInitialLoading: boolean;
//   error?: unknown;
//   networkStatus?: number;
//   cursors: {
//     endCursor: string | null;
//     hasNextPage: boolean;
//   };
// };
