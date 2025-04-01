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

export default function HeaderComponent() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <IconLogo className={styles.header__logo} />
      </Link>

      <div className={styles.header__links}>
        <Link
          className={styles.header__link}
          target="_blank"
          href="tel:+74957909455"
        >
          +7 (495) 790-94-55
        </Link>

        <Link className={styles.header__link} href="">
          <IconTelegram />
        </Link>

        <Link className={styles.header__link} href="">
          <IconWhatsapp />
        </Link>
      </div>

      <div className={styles.header__links_right}>
        <Link href="/public#" className={styles.link}>
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
      </div>

      <ButtonBurger />
    </header>
  );
}
