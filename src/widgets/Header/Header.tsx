'use client';

import './Header.scss';
import Link from 'next/link';
import UIButtonBurger from '@/shared/ui/UIElements/UIButtonBurger/UIButtonBurger';
import IconLogo from '@/shared/assets/svg/logo.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import { useUI } from '@/context/UIContext';
import { useAppSelector } from '@/shared/model/hooks';
import { selectCartTotalQuantity } from '@/entities/cart/model/cartSelectors';
import { SearchInput } from '@/widgets/Search/SearchInput/SearchInput';

export default function Header() {
  const { toggleCart } = useUI();
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const showCartCount = totalQuantity > 0;

  return (
    <header className="header__container">
      <div className="header">
        <div className="header__left">
          <Link href="/">
            <IconLogo className="headerLogo" />
          </Link>

          <span className="header__tel">
            <Link className="subtitleS3" href="tel:+7 (999) 99-99-99">
              +7 (999) 99-99-99
            </Link>
            <span className="captionC1">Обратный звонок</span>
          </span>
        </div>

        <div className="header__center">
          <SearchInput />

          <div className="header__actions">
            <button className="header__link" onClick={toggleCart}>
              <IconCart className="header__link-icon" />
              <span className="captionC1">Корзина</span>
              {showCartCount && (
                <span className="header__link-count" aria-live="polite">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        <UIButtonBurger />
      </div>
    </header>
  );
}
