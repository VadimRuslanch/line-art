'use client';

import { Key, ComponentType, useCallback, useEffect, useRef } from 'react';
import type { Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperNavButtonPrev from '@/shared/ui/Swiper/SwiperNavButtonPrev';
import SwiperNavButtonNext from '@/shared/ui/Swiper/SwiperNavButtonNext';

import 'swiper/scss';
import 'swiper/scss/navigation';
import './SliderContainer.scss';

type WithDbId = { databaseId: Key };

type SliderContainerProps<T extends WithDbId> = {
  title: string;
  items: ReadonlyArray<T>;
  ItemComponent: ComponentType<{ item: T }>;
  swiperProps: SwiperProps;
};

export default function SliderContainer<T extends WithDbId>({
  title,
  items,
  ItemComponent,
  swiperProps,
}: SliderContainerProps<T>) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleBeforeInit = useCallback((swiper: SwiperCore) => {
    swiperRef.current = swiper;
    if (!prevRef.current || !nextRef.current) {
      return;
    }

    const navParam = swiper.params.navigation;
    if (navParam === false) {
      return;
    }

    const nav =
      navParam === true || typeof navParam === 'undefined'
        ? {}
        : { ...navParam };

    swiper.params.navigation = {
      ...nav,
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) {
      return;
    }

    const navParam = swiper.params.navigation;
    if (navParam === false) {
      return;
    }

    const nav =
      navParam === true || typeof navParam === 'undefined'
        ? {}
        : { ...navParam };

    swiper.params.navigation = {
      ...nav,
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };

    swiper.navigation?.destroy();
    swiper.navigation?.init();
    swiper.navigation?.update();
  }, [items.length]);

  return (
    <section className={'SliderContainer'}>
      <h2 className="SliderContainer__title HeadlineH2">{title}</h2>
      <SwiperNavButtonPrev ref={prevRef} />
      <SwiperNavButtonNext ref={nextRef} />
      <Swiper
        modules={[Navigation]}
        onBeforeInit={handleBeforeInit}
        {...swiperProps}
      >
        {items.map((item) => (
          <SwiperSlide key={item.databaseId}>
            <ItemComponent item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
