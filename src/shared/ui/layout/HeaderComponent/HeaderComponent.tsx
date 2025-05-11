'use client';

import styles from './HeaderComponent.module.scss';
import Link from 'next/link';
import ButtonBurger from '@/shared/ui/ButtonBurger/ButtonBurger';
import IconLogo from '@/shared/assets/svg/logo.svg';
import IconTelegram from '@/shared/assets/svg/icon-telegram.svg';
import IconWhatsapp from '@/shared/assets/svg/icon-whatsapp.svg';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import IconUser from '@/shared/assets/svg/user.svg';
import { useDrawer } from '@/context/DrawerContext';

export default function HeaderComponent() {
  const { toggleFavorites, toggleCart } = useDrawer();
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <IconLogo className={styles.headerLogo} />
          </Link>

          <div className={styles.headerLinks}>
            <Link
              className={styles.headerLink}
              target="_blank"
              href="tel:+74957909455"
            >
              +7 (495) 790-94-55
            </Link>

            <Link className={styles.headerLink} href="">
              <IconTelegram />
            </Link>

            <Link className={styles.headerLink} href="">
              <IconWhatsapp />
            </Link>
          </div>

          <div className={styles.headerLinksRight}>
            <Link href="/compare" className={styles.link}>
              <IconChart className={styles.link__icon} />
              Сравнить
            </Link>

            <button className={styles.link} onClick={toggleFavorites}>
              <IconHeart className={styles.link__icon} />
              Избранное
            </button>

            <button className={styles.link} onClick={toggleCart}>
              <IconCart className={styles.link__icon} />
              Корзина
            </button>

            <Link href={'/public#'} className={styles.link}>
              <IconUser className={styles.link__icon} />
              Войти
            </Link>
          </div>

          <ButtonBurger />
        </div>
      </div>
    </header>
  );
}
