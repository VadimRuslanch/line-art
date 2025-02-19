import { useSwiper } from 'swiper/react';
import React from 'react';

export default function SlideNextButton({ title }: { title: string }) {
  const swiper = useSwiper();

  const slideNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    swiper.slideNext();
  };

  return (
    <button onClick={slideNext} className="swiper-button-next">
      <span className="swiper-button-title">{title}</span>
    </button>
  );
}
