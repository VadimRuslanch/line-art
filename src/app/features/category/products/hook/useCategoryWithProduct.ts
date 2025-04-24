import { useGetCategoryWithProductSuspenseQuery } from '@/generated/graphql';

export const useCategoryWithProduct = () => {
  const { data } = useGetCategoryWithProductSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  const categories = data?.productCategories?.nodes ?? [];

  return { categories };
};
