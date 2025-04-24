import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { makeLinks } from './links';
import { makeCache } from './cache';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: makeCache() as InMemoryCache,
    link: makeLinks(true),
  });
});
