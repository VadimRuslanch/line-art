import React, { forwardRef } from 'react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import './SlideButton.scss';

const SwiperNavButtonNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SwiperNavButtonNext(props, ref) {
  return (
    <button ref={ref} className={`swiper-button-next button`} {...props}>
      <IconArrow className="iconNext" />
    </button>
  );
});

export default SwiperNavButtonNext;
