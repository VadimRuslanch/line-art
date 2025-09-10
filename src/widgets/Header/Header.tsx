'use client';

import './Header.scss';
import Link from 'next/link';
import ButtonBurger from '@/shared/ui/ButtonBurger/ButtonBurger';
import IconLogo from '@/shared/assets/svg/logo.svg';
// import IconTelegram from '@/shared/assets/svg/icon-telegram.svg';
// import IconWhatsapp from '@/shared/assets/svg/icon-whatsapp.svg';
// import IconChart from '@/shared/assets/svg/chart.svg';
// import IconUser from '@/shared/assets/svg/user.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import { useUI } from '@/context/UIContext';

export default function Header() {
  const { toggleFavorites, toggleCart } = useUI();
  return (
    <header className="header">
      <div className="header__left">
        <Link href="/">
          <IconLogo className="headerLogo" />
        </Link>

        <span className="header__tel">
          <Link className="subtitle-S3" href="tel:+7 (999) 99-99-99">
            +7 (999) 99-99-99
          </Link>
          <span className="captionC1">Обратный звонок</span>
        </span>
      </div>

      <div className="header__center">
        <label className="header__search-label" htmlFor="search">
          <input
            id="search"
            className="header__search"
            type="search"
            placeholder="Найти товар"
          />
        </label>

        {/*<Link href={'/'} className="link">*/}
        {/*  <IconUser className="link__icon" />*/}
        {/*  Войти*/}
        {/*</Link>*/}
      </div>

      <div className="header__actions">
        <button className="header__link" onClick={toggleFavorites}>
          <IconHeart className="header__link-icon" />
          <span className="captionC1">Избранное</span>
        </button>

        <button className="header__link" onClick={toggleCart}>
          <IconCart className="header__link-icon" />
          <span className="captionC1">Корзина</span>
        </button>
      </div>

      <ButtonBurger />
    </header>
  );
}
