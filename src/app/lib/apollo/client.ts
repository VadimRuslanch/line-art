import {
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';

import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URL = 'https://wp-admin.lineart-alumo.ru/graphql';

function createHttpLink() {
  return new HttpLink({
    uri: GRAPHQL_URL,
    useGETForQueries: true,
    credentials: 'omit',
  });
}

let wcSession: string | null =
  (typeof window !== 'undefined' && localStorage.getItem('wcSession')) || null;

const captureSessionLink = new ApolloLink((op, forward) =>
  forward(op).map((response) => {
    const token = op.getContext().response?.headers.get('woocommerce-session');
    if (token) {
      wcSession = token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('wcSession', token);
      }
    }
    return response;
  }),
);

const sendSessionLink = setContext((_, { headers }) => {
  if (!wcSession) return { headers };

  // если wcSession уже содержит "Session ", оставляем как есть
  const value = wcSession.startsWith('Session ')
    ? wcSession
    : `Session ${wcSession}`;

  return {
    headers: {
      ...headers,
      'woocommerce-session': value,
    },
  };
});

function createLink(isServer: boolean) {
  const http = createHttpLink();

  const chain: ApolloLink[] = [captureSessionLink, sendSessionLink, http];

  if (isServer) {
    chain.unshift(new SSRMultipartLink({ stripDefer: true }));
  }

  return ApolloLink.from(chain);
}

function createCache() {
  return new InMemoryCache({
    typePolicies: {
      MediaItem: { keyFields: ['databaseId'] },
      ProductCategory: { keyFields: ['databaseId'] },
      Product: { keyFields: ['databaseId'] },
      SimpleProduct: { keyFields: ['databaseId'] },
    },
  });
}

export function makeApolloClient(isServer: boolean): ApolloClient<never> {
  return new ApolloClient({
    link: createLink(isServer),
    cache: createCache(),
  });
}
