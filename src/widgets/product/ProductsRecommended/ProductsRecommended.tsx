'use client';
import './ProductsRecommended.scss';

import { useProductsRecommended } from '@/entities/product/recommended/model/useProductsRecommended';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';

export default function ProductsRecommended() {
  const { products } = useProductsRecommended();
  return (
    <div className={'ProductsRecommended__container'}>
      <h2 className="HeadlineH2">Вам может понравиться</h2>
      <Swiper spaceBetween={20} slidesPerView="auto">
        {products.map(
          (product) =>
            product?.__typename === 'SimpleProduct' && (
              <SwiperSlide
                key={product.databaseId}
                className={'ProductsRecommended__slide'}
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
