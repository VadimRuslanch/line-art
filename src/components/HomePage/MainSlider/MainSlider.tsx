'use client';

import './MainSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { splitTitle } from '@/app/utils/stringUtils';
import SlideNextButton from '@/components/HomePage/MainSlider/components/SlideNextButton';
import SlidePrevButton from '@/components/HomePage/MainSlider/components/SlidePrevButton';
import { useState } from 'react';
import MainSliderDecorationItems from '@/components/HomePage/MainSlider/components/MainSliderDecorationItems/MainSliderDecorationItems';

const swiperArray = [
  {
    id: 1,
    title: 'Теневой плинтус',
    description: 'Современные, стильные решения для ценителей минимализма',
    image: '/images/MainSlider/first.jpg',
    alt: 'Image',
  },
  {
    id: 2,
    title: 'Декоративные панели',
    description: 'Элегантное решение для современного интерьера',
    image: '/images/MainSlider/second.jpg',
    alt: 'Image 2',
  },
  {
    id: 23,
    title: 'Декоративные панели',
    description: 'Элегантное решение для современного интерьера',
    image: '/images/MainSlider/second.jpg',
    alt: 'Image 2',
  },
  {
    id: 42,
    title: 'Декоративные панели',
    description: 'Элегантное решение для современного интерьера',
    image: '/images/MainSlider/second.jpg',
    alt: 'Image 2',
  },
  {
    id: 12,
    title: 'Декоративные панели',
    description: 'Элегантное решение для современного интерьера',
    image: '/images/MainSlider/second.jpg',
    alt: 'Image 2',
  },
  {
    id: 3,
    title: 'Декоративные панели',
    description: 'Элегантное решение для современного интерьера',
    image: '/images/MainSlider/second.jpg',
    alt: 'Image 2',
  },
];

export default function MainSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex =
    (currentIndex - 1 + swiperArray.length) % swiperArray.length;
  const nextIndex = (currentIndex + 1) % swiperArray.length;
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
      {swiperArray.map((item) => {
        const { firstWord, secondPart } = splitTitle(item.title);

        return (
          <SwiperSlide key={item.id}>
            <div
              className="MainSlider__slide"
              style={{
                backgroundImage: `url(${item.image})`,
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
      <SlidePrevButton title={swiperArray[prevIndex].title} />
      <SlideNextButton title={swiperArray[nextIndex].title} />
    </Swiper>
  );
}
