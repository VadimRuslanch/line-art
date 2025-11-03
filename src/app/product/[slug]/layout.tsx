import React from 'react';
import ProductsRecommended from '@/widgets/product/ProductsRecommended/ProductsRecommended';
import 'swiper/scss';
import 'swiper/css/navigation';

export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="LayoutProductDetails">
      {children}
      <ProductsRecommended />
    </div>
  );
}
