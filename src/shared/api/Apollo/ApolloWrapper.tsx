import React, { useCallback } from 'react';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import makeClient from '@/shared/api/Apollo/ApolloWrapper.client';

type Props = React.PropsWithChildren<{
  cookieHeader?: string;
  wooSession?: string | null;
}>;

export function ApolloWrapper({ children, cookieHeader, wooSession }: Props) {
  const make = useCallback(
    () => makeClient(cookieHeader, wooSession),
    [cookieHeader, wooSession],
  );
  return (
    <ApolloNextAppProvider makeClient={make}>{children}</ApolloNextAppProvider>
  );
}
