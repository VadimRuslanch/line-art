'use client';
import styles from './PreviewCategories.module.scss';

import Link from 'next/link';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import { useCategoriesParents } from '@/app/features/category/parent/hook/useCategoriesParents';

export default function PreviewCategories() {
  const { categories } = useCategoriesParents();

  if (!categories) return null;

  return (
    <Swiper
      modules={[Scrollbar]}
      className={styles.slider}
      scrollbar={{ draggable: true }}
      breakpoints={{
        0: { slidesPerView: 1 },
        1100: { slidesPerView: 2 },
        1600: { slidesPerView: 3 },
      }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category.databaseId}>
          <div
            className={styles.slide}
            style={{
              backgroundImage: `url(${category.image ? category.image.sourceUrl : 'https://foni.papik.pro/uploads/posts/2024-10/thumbs/foni-papik-pro-9p7y-p-kartinki-serii-kotik-na-prozrachnom-fone-1.png'})`,
            }}
          >
            <div className={styles.content}>
              <span className={styles.text}>{category.name}</span>
              <Link
                href={`/categories/${category.slug}`}
                className={styles.link}
              >
                <IconArrow />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
