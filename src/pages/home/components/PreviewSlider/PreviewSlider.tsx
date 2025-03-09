'use client';

import 'swiper/scss';
import 'swiper/scss/scrollbar';
import styles from './PreviewSlider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import Link from 'next/link';

export default function PreviewSlider() {
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
      <SwiperSlide
        style={{ backgroundImage: 'url(/images/MainSlider/first.jpg)' }}
        className={styles.slide}
      >
        <div className={styles.content}>
          <span className={styles.text}>Теневой профиль</span>
          <Link href={'/'} className={styles.link}>
            <IconArrow />
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{ backgroundImage: 'url(/images/MainSlider/first.jpg)' }}
        className={styles.slide}
      >
        <div className={styles.content}>
          <span className={styles.text}>Теневой профиль</span>
          <Link href={'/'} className={styles.link}>
            <IconArrow />
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{ backgroundImage: 'url(/images/MainSlider/first.jpg)' }}
        className={styles.slide}
      >
        <div className={styles.content}>
          <span className={styles.text}>Теневой профиль</span>
          <Link href={'/'} className={styles.link}>
            <IconArrow />
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
