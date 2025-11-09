'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  PostsByCategoryDocument,
  type PostsByCategoryQuery,
  type PostsByCategoryQueryVariables,
} from '@/shared/api/gql/graphql';

export function GetPostsByCategory(slug: string) {
  const { data } = useSuspenseQuery<
    PostsByCategoryQuery,
    PostsByCategoryQueryVariables
  >(PostsByCategoryDocument, {
    variables: { slug: slug },
    fetchPolicy: 'cache-first',
  });

  const posts = data?.posts?.nodes;

  return posts;
}
