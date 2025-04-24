// 'use client';
//
// import {
//   useGetDetailsProductSuspenseQuery,
//   GetDetailsProductQuery,
//   ProductIdTypeEnum,
// } from '@/generated/graphql';
// import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
//
// export const useDetailsProduct = (slug: string) => {
//   const { data } = useGetDetailsProductSuspenseQuery({
//     variables: { id: slug, idType: ProductIdTypeEnum.SLUG },
//     fetchPolicy: 'cache-first',
//   });
//
//   const product: GetDetailsProductQuery | null =
//     data && isSimpleProduct(data.product) ? data.product : null;
//
//   return { product, loading: !data };
// };
