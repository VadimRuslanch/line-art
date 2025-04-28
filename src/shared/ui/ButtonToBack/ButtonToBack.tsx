import styles from './ButtonToBack.module.scss';
import IconArrow from '@/shared/assets/svg/arrow-left.svg';

export default function ButtonToBack() {
  return (
    <button className={styles.button}>
      <IconArrow />
      Назад
    </button>
  );
}
