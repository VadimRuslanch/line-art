'use client';

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { makeLinks } from './links';
import { makeCache } from './cache';

function makeClient() {
  return new ApolloClient({
    cache: makeCache() as InMemoryCache,
    link: makeLinks(false),
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
