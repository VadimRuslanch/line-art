'use client';
import 'swiper/css';

import styles from './SliderArticles.module.scss';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function SliderArticles() {
  return (
    <section className={`${styles.container} block-limiter`}>
      <header>
        <h2 className={`heading ${styles.title}`}>Полезная информация</h2>
      </header>
      <Swiper
        modules={[Navigation]}
        className={styles.slider}
        spaceBetween="20"
        breakpoints={{
          0: { slidesPerView: 1 },
          1100: { slidesPerView: 2 },
          1600: { slidesPerView: 3 },
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
