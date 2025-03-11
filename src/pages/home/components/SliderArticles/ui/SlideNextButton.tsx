import { forwardRef, ReactNode } from 'react';
import styles from './SlideButton.module.scss';
import { useSwiper } from 'swiper/react';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

interface Props {
  children?: ReactNode;
  type: 'submit' | 'button';
}

const SlideNextButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const swiper = useSwiper();

  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={() => swiper.slideNext()} // Исправлено: slideNext
      {...props}
    >
      <IconArrow />
    </button>
  );
});

export default SlideNextButton;
