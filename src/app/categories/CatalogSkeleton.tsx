'use client';

import type { ReactNode } from 'react';
import { CatalogFiltersSkeleton } from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersSidebar/CatalogFiltersSkeleton';
import { CatalogProductListSkeleton } from '@/widgets/catalog/ui/catalog-product-list/CatalogProductListSkeleton/CatalogProductListSkeleton';

export { CatalogFiltersSkeleton, CatalogProductListSkeleton };

export function CatalogPageSkeleton({
  productsFallback,
}: {
  productsFallback?: ReactNode;
}) {
  return (
    <section className="CatalogShell CatalogShell--skeleton">
      <div className="CatalogShell__sidebar--decktop">
        <CatalogFiltersSkeleton />
      </div>
      {productsFallback ?? <CatalogProductListSkeleton />}
    </section>
  );
}
