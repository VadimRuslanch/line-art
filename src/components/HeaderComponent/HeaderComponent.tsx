import styles from './HeaderComponent.module.scss';
import Link from 'next/link';
import ButtonBurger from '@/shared/ui/ButtonBurger/ButtonBurger';
import IconLogo from '@/shared/assets/svg/logo.svg';
import IconTelegram from '@/shared/assets/svg/icon-telegram.svg';
import IconWhatsapp from '@/shared/assets/svg/icon-whatsapp.svg';

export default async function HeaderComponent() {
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

      <ButtonBurger />
    </header>
  );
}
