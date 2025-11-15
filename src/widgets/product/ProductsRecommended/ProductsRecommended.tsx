'use client';
import './ProductsRecommended.scss';

import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';
import SliderContainer from '@/shared/ui/Swiper/SliderContainer/SliderContainer';

export default function ProductsRecommended() {
  const { popular } = useGetHomeCatalog();
  return (
    <div className="ProductsRecommended__container">
      <SliderContainer
        title="Вам может понравиться"
        items={popular.products}
        ItemComponent={ProductCard}
        swiperProps={{
          breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 1.6, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          },
        }}
      />
    </div>
  );
}
