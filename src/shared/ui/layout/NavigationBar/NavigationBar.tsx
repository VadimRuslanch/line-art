import styles from './NavigationBar.module.scss';
import IconUser from '@/shared/assets/svg/user.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import IconChart from '@/shared/assets/svg/chart.svg';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className={styles.navigation}>
      <Link href={'/public#'} className={styles.link}>
        <IconChart className={styles.link__icon} />
        Сравнить
      </Link>
      <Link href={'/public#'} className={styles.link}>
        <IconHeart className={styles.link__icon} />
        Избранное
      </Link>
      <Link href={'/public#'} className={styles.link}>
        <IconCart className={styles.link__icon} />
        Корзина
      </Link>

      <Link href={'/public#'} className={styles.link}>
        <IconUser className={styles.link__icon} />
        Войти
      </Link>
    </nav>
  );
}
