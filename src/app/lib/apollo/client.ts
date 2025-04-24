'use client';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { makeLinks } from './links';
import { makeCache } from './cache';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: makeCache() as InMemoryCache,
    link: makeLinks(false),
  });
});
