// import { Suspense } from 'react';
// import ProductDetails from '@/app/features/product/details/ui/ProductDetails';
// import ProductSkeleton from '@/shared/ui/ProductSkeleton/ProductSkeleton';

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <div>
      <h1>Считай меня товаром - {slug}</h1>
    </div>
    // <Suspense fallback={<ProductSkeleton />}>
    //   <ProductDetails slug={slug} />
    // </Suspense>
  );
}
