import { GraphQLClient } from 'graphql-request';
import { CatalogData, MainSliderData } from '@/shared/types/api';

const endpoint = 'http://line-art.ru/api/graphql';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    // Если используется токен аутентификации:
    // Authorization: `Bearer YOUR_ACCESS_TOKEN`,
  },
});

export async function fetchWooCommerceProductsCategories() {
  const query = `
    query GetProductCategoriesWithChildren {
      productCategories(where: { hideEmpty: false, parent: null }) {
        nodes {
          id
          name
          slug
          parentId
          children {
            nodes {
              id
              name
              slug
              parentId
              children {
                nodes {
                  id
                  name
                  slug
                  parentId
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response: CatalogData = await client.request(query);
    return response.productCategories.nodes;
  } catch (error) {
    console.error('Error fetching WooCommerce categories via GraphQL:', error);
    throw new Error('Failed to fetch WooCommerce categories');
  }
}

export async function fetchPageSlider() {
  const query = `
query GetMainSlider {
    page(id: "cG9zdDo3NA==") {
      homeMainSlider {
        main_slider {
          description
          title
          id
          image {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
  `;

  try {
    const response: MainSliderData = await client.request(query);
    console.log(response);
    return response.page.homeMainSlider.main_slider;
  } catch (error) {
    console.error('Error fetching page slider via GraphQL:', error);
    throw new Error('Failed to fetch page slider');
  }
}
