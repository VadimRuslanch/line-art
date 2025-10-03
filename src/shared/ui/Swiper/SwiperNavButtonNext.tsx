import React, { forwardRef } from 'react';

const SwiperNavButtonNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SwiperNavButtonNext(props, ref) {
  return <button ref={ref} {...props} className="swiper-button-next" />;
});

export default SwiperNavButtonNext;
