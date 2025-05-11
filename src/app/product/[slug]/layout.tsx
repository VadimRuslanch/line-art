import React, { Suspense } from 'react';
import ProductSkeleton from '@/shared/ui/ProductSkeleton/ProductSkeleton';
import ProductsRecommended from '@/shared/ui/ProductsRecommended/ProductsRecommended';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'swiper/css/navigation';
import ProductDetailsInfo from '@/shared/ui/ProductDetailsInfo/ProductDetailsInfo';

export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <div className="LayoutProductDetails">
        {children}
        <ProductDetailsInfo />
        <ProductsRecommended />
      </div>
    </Suspense>
  );
}
