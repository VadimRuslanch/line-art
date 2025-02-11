'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow.svg';

interface Slide {
  id: number;
  image: string;
  title: string;
  link: string;
}

export default function HomePopularProducts() {
  const array: Slide[] = [
    {
      id: 1,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
    {
      id: 12,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
    {
      id: 13,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
    {
      id: 14,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
    {
      id: 15,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
    {
      id: 16,
      image: '/images/MainSlider/first.jpg',
      title: 'Теневой профиль',
      link: '#',
    },
  ];
  return (
    <section className="flex">
      <div className="grid justify-between">
        <h2 className="text-7xl font-semibold">
          Категории <span className="text-shadow">товаров</span>
        </h2>
        <span className="w-1/2">
          Современные, стильные решения для ценителей минимализма
        </span>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        className="h-96 w-full max-w-4xl"
      >
        {array.map((item) => (
          <SwiperSlide
            className="slide-container rounded-2xl flex content-end font-semibold"
            key={item.id}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="px-6 py-5 mt-auto flex justify-between items-center">
              <span className="text-2xl italic text-white">{item.title}</span>
              <Link
                href={item.link}
                className="min-w-9 h-9 flex items-center justify-center rounded-full bg-white-opacity "
              >
                <IconArrow className={'w-5 h-5 stroke-white -rotate-90'} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
