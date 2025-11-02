import { ApolloLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { relayStylePagination } from '@apollo/client/utilities';
import {
  buildAttachWooSessionLink,
  buildWooErrorLink,
  buildHttpLink,
} from '@/shared/api/Apollo/ApolloWrapper.links';

function makeCache() {
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

function makeClient(cookieHeader?: string, wooSessionFromSSR?: string | null) {
  const isServer = typeof window === 'undefined';

  const attachWooSessionLink = buildAttachWooSessionLink({
    isServer,
    cookieHeader,
    wooSessionFromSSR,
  });
  const wooErrorLink = buildWooErrorLink();
  const httpLink = buildHttpLink(isServer);

  return new ApolloClient({
    cache: makeCache(),
    link: ApolloLink.from([attachWooSessionLink, wooErrorLink, httpLink]),
  });
}

export default makeClient;
