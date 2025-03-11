'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import styles from '@/pages/home/components/SliderArticles/SliderArticles.module.scss';
import styles from './InfoSlider.module.scss';
import Link from 'next/link';

export default function InfoSlider() {
  return (
    <section className={`${styles.container} block-limiter`}>
      <Swiper
        modules={[Navigation]}
        className={styles.slider}
        spaceBetween="20"
      >
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/info.jpg" alt="art" />

            <div className={styles.info}>
              <h3 className={styles.name}>Что такое теневой плинтус?</h3>
              <p className={styles.text}>
                Скрытый теневой плинтус, в отличие от классического скрытого, не
                требует дополнительных элементов в виде вставок (часто
                изготовленных из МДФ), безопасен для здоровья, 100% влагостоек.
                В настоящее время теневой профиль и плинтус активно применяются
                в современных ремонтах как квартир и частных домов, так и
                коммерческих помещений. В чем же заключен такой успех
              </p>
              <Link className={styles.link} href="/#">
                Показать полностью
              </Link>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <article className={styles.content}>
            <img className={styles.image} src="/images/info.jpg" alt="art" />
          </article>
        </SwiperSlide>
        {/*<div className={styles.sliderControl}>*/}
        {/*  <SlidePrevButton />*/}
        {/*  <SlideNextButton />*/}
        {/*</div>*/}
      </Swiper>
    </section>
  );
}
