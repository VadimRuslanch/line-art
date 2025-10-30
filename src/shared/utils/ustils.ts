import type { ProductWithCart } from '@/entities/product/types';
import type { CategoryCoreFragment } from '@/shared/api/gql/graphql';

export type CategoryWithProducts = CategoryCoreFragment & {
  products: ProductWithCart[];
};

export function groupProductsByCategory(
  products: ProductWithCart[],
): CategoryWithProducts[] {
  const map = new Map<string, CategoryWithProducts>();

  for (const product of products) {
    product.productCategories?.nodes.forEach((cat) => {
      if (!map.has(cat.id)) {
        map.set(cat.id, {
          databaseId: cat.databaseId,
          id: cat.id,
          name: cat.name,
          uri: cat.uri,
          image: cat.image,
          products: [],
        });
      }
      map.get(cat.id)!.products.push(product);
    });
  }

  return Array.from(map.values()).sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? ''),
  );
}

export function replacePrice(price: string) {
  return price.replace(/&nbsp;/g, ' ');
}
