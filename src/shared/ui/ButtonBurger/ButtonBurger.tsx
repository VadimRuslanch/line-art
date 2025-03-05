import BurgerIcon from '@/shared/assets/svg/burger.svg';
import styles from './ButtonBurger.module.scss';

export default function ButtonBurger() {
  return (
    <button className={styles.burger} type="button">
      <BurgerIcon className={styles.burger__icon} />
    </button>
  );
}
