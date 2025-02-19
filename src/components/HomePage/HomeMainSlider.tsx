'use client';

import './style/MainSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { splitTitle } from '@/app/utils/stringUtils';
import SlideNextButton from '@/components/HomePage/components/SlideNextButton';
import SlidePrevButton from '@/components/HomePage/components/SlidePrevButton';
import { useEffect, useState } from 'react';
import { fetchPageSlider } from '@/app/utils/API/wooCommerceApi';
import { Slider } from '@/shared/types/api';

export default function HomeMainSlider() {
  const [sliderData, setSliderData] = useState<Slider[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchPageSlider()
      .then((data) => setSliderData(data))
      .catch((error) => console.error('Ошибка при загрузке slider:', error));
  }, []);

  const prevIndex = (currentIndex - 1 + sliderData.length) % sliderData.length;
  const nextIndex = (currentIndex + 1) % sliderData.length;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      loop
      className="MainSlider"
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
    >
      {sliderData.map((item) => {
        const { firstWord, secondPart } = splitTitle(item.title);

        return (
          <SwiperSlide key={item.id}>
            <div
              className="MainSlider__slide"
              style={{
                backgroundImage: `url(${item.image.node.sourceUrl})`,
              }}
            >
              <div className="MainSlider__content">
                <h2 className="MainSlider__title">
                  {firstWord} {secondPart && <span>{secondPart}</span>}
                </h2>
                <p className="MainSlider__description">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      {sliderData.length > 0 && (
        <>
          <SlidePrevButton title={sliderData[prevIndex]?.title} />
          <SlideNextButton title={sliderData[nextIndex]?.title} />
        </>
      )}
    </Swiper>
  );
}
