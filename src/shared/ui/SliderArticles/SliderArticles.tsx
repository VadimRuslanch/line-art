'use client';
import styles from './SliderArticles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperNavButtonPrev from '@/shared/ui/Swiper/SwiperNavButtonPrev';
import SwiperNavButtonNext from '@/shared/ui/Swiper/SwiperNavButtonNext';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function SliderArticles() {
  type ButtonRef = HTMLButtonElement | null;

  interface NavigationConfig {
    prevEl: ButtonRef;
    nextEl: ButtonRef;
  }

  const prevRef = useRef<ButtonRef>(null);
  const nextRef = useRef<ButtonRef>(null);
  const [navigationConfig, setNavigationConfig] = useState<NavigationConfig>({
    prevEl: null,
    nextEl: null,
  });

  useEffect(() => {
    setNavigationConfig({
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    });
  }, []);

  return (
    <section className={`${styles.container}`}>
      <header>
        <h2 className="SliderArticles HeadlineH2">Полезная информация</h2>
      </header>
      <Swiper
        modules={[Navigation]}
        navigation={navigationConfig}
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
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <Image
              className={styles.image}
              width={388}
              height={356}
              src="/images/product.png"
              alt="art"
            />

            <span className={styles.text}>Статьи / . 14 Июн 2024</span>

            <p className={styles.name}>Алюминий в современном интерьере</p>
          </article>
        </SwiperSlide>

        <div className={styles.sliderControl}>
          <SwiperNavButtonPrev ref={prevRef} />
          <SwiperNavButtonNext ref={nextRef} />
        </div>
      </Swiper>
    </section>
  );
}
