import React, { forwardRef } from 'react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import './SlideButton.scss';

const SwiperNavButtonPrev = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SwiperNavButtonPrev(props, ref) {
  return (
    <button ref={ref} className={`swiper-button-prev button`} {...props}>
      <IconArrow className="iconPrev" />
    </button>
  );
});

export default SwiperNavButtonPrev;
