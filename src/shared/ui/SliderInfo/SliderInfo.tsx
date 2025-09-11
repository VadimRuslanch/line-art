'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

import { Navigation } from 'swiper/modules';
import styles from './SliderInfo.module.scss';

import SwiperNavButtonNext from '@/shared/ui/Swiper/SwiperNavButtonNext';
import SwiperNavButtonPrev from '@/shared/ui/Swiper/SwiperNavButtonPrev';
import Image from 'next/image';

export default function SliderInfo() {
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
    // Когда кнопки смонтированы, обновляем конфигурацию навигации
    setNavigationConfig({
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    });
  }, []);

  return (
    <section className={`${styles.container} block-limiter`}>
      <Swiper
        modules={[Navigation]}
        navigation={navigationConfig}
        className={styles.slider}
        spaceBetween={20}
      >
        <SwiperSlide>
          <article className={styles.content}>
            <Image
              loading="lazy"
              className={styles.image}
              width={860}
              height={433}
              src="/images/info.jpg"
              alt="art"
            />
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
              <Link className={styles.link} href="/public#">
                Показать полностью
              </Link>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className={styles.content}>
            <Image
              loading="lazy"
              className={styles.image}
              width={860}
              height={433}
              src="/images/info.jpg"
              alt="art"
            />
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
              <Link className={styles.link} href="/public#">
                Показать полностью
              </Link>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className={styles.content}>
            <Image
              loading="lazy"
              className={styles.image}
              width={860}
              height={433}
              src="/images/info.jpg"
              alt="art"
            />
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
              <Link className={styles.link} href="/public#">
                Показать полностью
              </Link>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className={styles.content}>
            <Image
              loading="lazy"
              className={styles.image}
              width={860}
              height={433}
              src="/images/info.jpg"
              alt="art"
            />
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
              {/*<Link className={styles.link} href="/public#">*/}
              {/*  Показать полностью*/}
              {/*</Link>*/}
            </div>
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
