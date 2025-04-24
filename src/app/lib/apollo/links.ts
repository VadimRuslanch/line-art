import { ApolloLink, HttpLink } from '@apollo/client';
import { SSRMultipartLink } from '@apollo/client-integration-nextjs';

const httpLink = new HttpLink({
  uri: 'https://wp-admin.lineart-alumo.ru/graphql',
});

export function makeLinks(isServer: boolean) {
  return isServer
    ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
    : httpLink;
}
