'use client';

import styles from './NavigationBar.module.scss';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import { useDrawer } from '@/context/DrawerContext';

export default function NavigationBar() {
  const { toggleFavorites, toggleCart } = useDrawer();
  return (
    <nav className={styles.navigation}>
      {/*<Link href={'/public#'} className={styles.link}>*/}
      {/*  <IconChart className={styles.link__icon} />*/}
      {/*  Сравнить*/}
      {/*</Link>*/}
      <button className={styles.link} onClick={toggleFavorites}>
        <IconHeart className={styles.link__icon} />
        Избранное
      </button>
      <button className={styles.link} onClick={toggleCart}>
        <IconCart className={styles.link__icon} />
        Корзина
      </button>
      {/*<Link href={'/public#'} >*/}
      {/*  */}
      {/*</Link>*/}
      {/*<Link href={'/public#'} className={styles.link}>*/}
      {/*  */}
      {/*</Link>*/}

      {/*<Link href={'/public#'} className={styles.link}>*/}
      {/*  <IconUser className={styles.link__icon} />*/}
      {/*  Войти*/}
      {/*</Link>*/}
    </nav>
  );
}
