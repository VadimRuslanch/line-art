'use client';
import './ProductsRecommended.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

export default function ProductsRecommended() {
  const { popular } = useGetHomeCatalog();

  return (
    <div className="ProductsRecommended__container">
      <h2 className="HeadlineH2">Recommended products</h2>
      <Swiper spaceBetween={20} slidesPerView="auto">
        {popular.products.map(
          (product) =>
            product?.__typename === 'SimpleProduct' && (
              <SwiperSlide
                key={product.databaseId}
                className="ProductsRecommended__slide"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}

