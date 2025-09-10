'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { makeApolloClient } from '@/shared/api/Apollo/client';
// import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
// import { makeApolloClient } from '@/shared/api/apollo/client';
const client = makeApolloClient();

export function ApolloProviderApp({ children }: React.PropsWithChildren) {
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
    // <ApolloNextAppProvider makeClient={() => makeApolloClient(false)}>
    //   {children}
    // </ApolloNextAppProvider>
  );
}
