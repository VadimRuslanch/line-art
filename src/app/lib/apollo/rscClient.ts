import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { makeApolloClient } from './client';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const isServer = typeof window === 'undefined';

  return makeApolloClient(isServer);
});
