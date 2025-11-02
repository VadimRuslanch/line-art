import React from 'react';
import { ApolloWrapper } from '@/shared/api/Apollo/ApolloWrapper';

export function ApolloProviderApp({ children }: React.PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
