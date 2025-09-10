'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const GRAPHQL_URL = 'https://wp-admin.lineart-alumo.ru/graphql';

// Лучше POST: длинные cursors/where не упрётся в URL
function createHttpLink() {
  return new HttpLink({
    uri: GRAPHQL_URL,
    useGETForQueries: false,
    credentials: 'omit',
  });
}

let wcSession: string | null =
  (typeof window !== 'undefined' && localStorage.getItem('wcSession')) || null;

// Читаем заголовок 'woocommerce-session' из ответа и сохраняем в localStorage
const captureSessionLink = new ApolloLink((operation, forward) => {
  // всегда возвращаем Observable
  if (!forward) {
    return new Observable((observer) => observer.complete());
  }
  return new Observable((observer) => {
    const sub = forward(operation).subscribe({
      next: (result) => {
        try {
          const resp = operation.getContext().response as Response | undefined;
          const token = resp?.headers?.get?.('woocommerce-session');
          if (token) {
            wcSession = token;
            if (typeof window !== 'undefined') {
              localStorage.setItem('wcSession', token);
            }
          }
        } catch {}
        observer.next(result);
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => sub.unsubscribe();
  });
});

const sendSessionLink = setContext((_, { headers }) => {
  if (!wcSession) return { headers };
  const value = wcSession.startsWith('Session ')
    ? wcSession
    : `Session ${wcSession}`;
  return { headers: { ...headers, 'woocommerce-session': value } };
});

function createLink() {
  return ApolloLink.from([
    captureSessionLink,
    sendSessionLink,
    createHttpLink(),
  ]);
}

function createCache() {
  return new InMemoryCache({
    typePolicies: {
      MediaItem: { keyFields: ['databaseId'] },
      ProductCategory: { keyFields: ['databaseId'] },
      Product: { keyFields: ['databaseId'] },
      SimpleProduct: { keyFields: ['databaseId'] },
      Query: {
        fields: {
          products: relayStylePagination(['where']),
        },
      },
      RootQuery: {
        fields: {
          products: relayStylePagination(['where']),
        },
      },
    },
  });
}

export function makeApolloClient() {
  return new ApolloClient({
    link: createLink(),
    cache: createCache(),
    ssrMode: false, // чисто клиент
  });
}
