'use client';

import './Header.scss';
import Link from 'next/link';
import UIButtonBurger from '@/shared/ui/UIElements/UIButtonBurger/UIButtonBurger';
import IconLogo from '@/shared/assets/svg/logo.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import IconSearch from '@/shared/assets/svg/search.svg';
import { useUI } from '@/context/UIContext';

export default function Header() {
  const { toggleCart } = useUI();
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
        {/*Вынести в компонент*/}
        <label className="header__search-label" htmlFor="search">
          <IconSearch />
          <input
            id="search"
            className="header__search"
            type="search"
            placeholder="Найти товар"
          />
        </label>

        <div className="header__actions">
          {/*<button className="header__link" onClick={toggleFavorites}>*/}
          {/*  <IconHeart className="header__link-icon" />*/}
          {/*  <span className="captionC1">Избранное</span>*/}
          {/*</button>*/}
          <button className="header__link" onClick={toggleCart}>
            <IconCart className="header__link-icon" />
            <span className="captionC1">Корзина</span>
          </button>
        </div>
      </div>

      <UIButtonBurger />
    </header>
  );
}
