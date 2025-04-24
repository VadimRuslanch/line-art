import { useGetCategoryParentsSuspenseQuery } from '@/generated/graphql';

export const useCategoriesParents = () => {
  const { data } = useGetCategoryParentsSuspenseQuery({
    fetchPolicy: 'cache-first',
  });

  if (!data || !data.productCategories) return { categories: [] };

  const categories = data.productCategories.nodes;

  return { categories };
};
