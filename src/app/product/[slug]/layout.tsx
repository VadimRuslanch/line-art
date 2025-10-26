import React, { Suspense } from 'react';
import ProductSkeleton from '@/shared/ui/ProductSkeleton/ProductSkeleton';
import ProductsRecommended from '@/widgets/product/ProductsRecommended/ProductsRecommended';
import 'swiper/scss';
import 'swiper/css/navigation';

export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<ProductSkeleton />}>
        <div className="LayoutProductDetails">
          {children}
          <ProductsRecommended />
        </div>
      </Suspense>
    </>
  );
}
