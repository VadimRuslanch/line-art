import { forwardRef } from 'react';
import styles from './SlideButton.module.scss';
import { useSwiper } from 'swiper/react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

const SlidePrevButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const swiper = useSwiper();

  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={() => swiper.slidePrev()}
      type="button"
      {...props}
    >
      <IconArrow />
    </button>
  );
});

export default SlidePrevButton;
