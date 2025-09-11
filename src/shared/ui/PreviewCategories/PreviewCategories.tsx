'use client';
import styles from './PreviewCategories.module.scss';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import { useCategoriesParents } from '@/entities/category/model/useCategoriesParents';

export default function PreviewCategories() {
  const { categories } = useCategoriesParents();
  if (!categories) return null;
  return (
    <section className={styles.container}>
      <h2 className="HeadlineH2">Популярные категории</h2>
      <Swiper
        className={styles.slider}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 1.6, spaceBetween: 20 },
          1600: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.databaseId}>
            <div
              className={styles.slide}
              style={{
                backgroundImage: `url(${category.image ? category.image.sourceUrl : 'https:foni.papik.pro/uploads/posts/2024-10/thumbs/foni-papik-pro-9p7y-p-kartinki-serii-kotik-na-prozrachnom-fone-1.png'})`,
              }}
            >
              <div className={styles.content}>
                <span className="HeadlineH5">{category.name}</span>
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
    </section>
  );
}
