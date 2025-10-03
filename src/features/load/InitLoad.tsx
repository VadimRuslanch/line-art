'use client';

import { useCategoriesCatalog } from '@/features/catalog/catalog-category/model/useCategoriesCatalog';
import { useCategoriesProductsDiscounted } from '@/entities/category/model/useCategoriesProductsDiscounted';
import { useCategoriesProductsNew } from '@/entities/category/model/useCategoriesProductsNew';
import { useCategoriesProductsPopular } from '@/entities/category/model/useCategoriesProductsPopular';

export default function InitLoad() {
  useCategoriesCatalog();
  useCategoriesProductsDiscounted();
  useCategoriesProductsNew();
  useCategoriesProductsPopular();
  return null;
}
