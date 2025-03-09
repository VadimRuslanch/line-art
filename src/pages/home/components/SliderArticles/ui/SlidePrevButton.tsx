import { useSwiper } from 'swiper/react';

export default function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button className={'swiper-button-prev'} onClick={() => swiper.slidePrev()}>
      Slide to the next slide
    </button>
  );
}
