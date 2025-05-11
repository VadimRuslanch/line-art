'use client';
import styles from './ProductsRecommended.module.scss';

import { useProductsRecommended } from '@/app/features/product/recommended/hook/useProductsRecommended';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';

export default function ProductsRecommended() {
  const { products } = useProductsRecommended();
  return (
    <div className={styles.container}>
      <div className="block-limiter">
        <h2 className={styles.title}>Вам может понравиться</h2>
        <Swiper
          modules={[Scrollbar]}
          className={styles.slider}
          scrollbar={{ draggable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            550: { slidesPerView: 1.6 },
            1024: { slidesPerView: 2.7 },
            1600: { slidesPerView: 4 },
          }}
        >
          {products.map(
            (product) =>
              product?.__typename === 'SimpleProduct' && (
                <SwiperSlide key={product.databaseId} className={styles.slide}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      </div>
    </div>
  );
}
