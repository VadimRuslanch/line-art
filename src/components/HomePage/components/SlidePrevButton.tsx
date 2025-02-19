import { useSwiper } from 'swiper/react';
import React from 'react';

export default function SlidePrevButton({ title }: { title: string }) {
  const swiper = useSwiper();

  const slidePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    swiper.slidePrev();
  };

  return (
    <button onClick={slidePrev} className="swiper-button-prev">
      <span className="swiper-button-title">{title}</span>
    </button>
  );
}
