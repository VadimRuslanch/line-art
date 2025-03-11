'use client';
import styles from './SliderArticles.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function SliderArticles() {
  return (
    <section className={`${styles.container}`}>
      <header>
        <h2 className={`${styles.title}`}>Полезная информация</h2>
      </header>
      <Swiper
        modules={[Navigation]}
        className={styles.slider}
        spaceBetween="20"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }}
      >
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/product.png" alt="art" />

            <div>
              <span className={styles.text}>Статьи / . 14 Июн 2024</span>
            </div>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/product.png" alt="art" />

            <div>
              <span className={styles.text}>Теневой профиль</span>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/product.png" alt="art" />

            <div>
              <span className={styles.text}>Теневой профиль</span>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/product.png" alt="art" />

            <div>
              <span className={styles.text}>Теневой профиль</span>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
