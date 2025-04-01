import { gql } from '@apollo/client';

export const getPopularProductCategories = gql`
  query GetCategoriesWithProducts {
    productCategories(first: 5) {
      edges {
        node {
          id
          name
          products(first: 2) {
            edges {
              node {
                id
                name
                image {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getProductCategories = gql(`
  query GetProductCategoriesWithProducts {
    productCategories(where: {parent: null}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            id
            name
            slug
            image {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`);

export const getCatalog = gql(`
  query GetProductCategoriesWithProducts {
    productCategories(where: {parent: null}) {
      nodes {
        id
        name
        children {
          nodes {
            id
            name
            slug
            contentNodes {
              nodes {
                ... on SimpleProduct {
                  id
                  name
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`);
