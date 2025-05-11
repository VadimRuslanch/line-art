'use client';

import React from 'react';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { makeApolloClient } from '@/app/lib/apollo/client';

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={() => makeApolloClient(false)}>
      {children}
    </ApolloNextAppProvider>
  );
}
