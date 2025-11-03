import { Suspense } from 'react';
import CatalogPageClient from './CatalogPageClient';
import { CatalogPageSkeleton } from './CatalogSkeleton';

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogPageSkeleton />}>
      <CatalogPageClient />
    </Suspense>
  );
}
