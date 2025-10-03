import React, { forwardRef } from 'react';

const SwiperNavButtonPrev = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SwiperNavButtonPrev(props, ref) {
  return <button ref={ref} {...props} className="swiper-button-prev" />;
});

export default SwiperNavButtonPrev;
