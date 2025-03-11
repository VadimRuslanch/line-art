'use client';
import { forwardRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './InfoSlider.module.scss';
import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

// Компонент кнопки для перехода к предыдущему слайду
const SlidePrevButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const swiper = useSwiper();
  const isDisabled = swiper ? swiper.isBeginning : true;

  const handleClick = () => {
    if (swiper && !isDisabled) {
      swiper.slidePrev();
    }
  };

  return (
    <button
      ref={ref}
      className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
      onClick={handleClick}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      <IconArrow />
    </button>
  );
});

// Компонент кнопки для перехода к следующему слайду
const SlideNextButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const swiper = useSwiper();
  const isDisabled = swiper ? swiper.isEnd : true;

  const handleClick = () => {
    if (swiper && !isDisabled) {
      swiper.slideNext();
    }
  };

  return (
    <button
      ref={ref}
      className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
      onClick={handleClick}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      <IconArrow />
    </button>
  );
});

export default function InfoSlider() {
  return (
    <section className={`${styles.container} block-limiter`}>
      <Swiper
        modules={[Navigation]}
        className={styles.slider}
        spaceBetween={20}
      >
        <SwiperSlide>
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
                коммерческих помещений. В чем же заключен такой успех?
              </p>
              <Link className={styles.link} href="/#">
                Показать полностью
              </Link>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className={styles.content}>
            <img className={styles.image} src="/images/info.jpg" alt="art" />
          </article>
        </SwiperSlide>
        {/* Контейнер навигационных кнопок. Они находятся внутри контекста Swiper и используют useSwiper */}
        <div className={styles.sliderControl}>
          <SlidePrevButton />
          <SlideNextButton />
        </div>
      </Swiper>
    </section>
  );
}
