import { InMemoryCache } from '@apollo/client-integration-nextjs';
import type { TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
  MediaItem: { keyFields: ['databaseId'] },
  ProductCategory: { keyFields: ['databaseId'] },
  Product: { keyFields: ['databaseId'] },
  SimpleProduct: { keyFields: ['databaseId'] },
};

export function makeCache() {
  return new InMemoryCache({ typePolicies });
}
