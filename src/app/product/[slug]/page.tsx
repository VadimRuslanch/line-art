import { Suspense } from 'react';
import ProductDetails from '@/shared/ui/ProductDetails/ProductDetails';
import ProductSkeleton from '@/shared/ui/ProductSkeleton/ProductSkeleton';

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails slug={slug} />
    </Suspense>
  );
}
