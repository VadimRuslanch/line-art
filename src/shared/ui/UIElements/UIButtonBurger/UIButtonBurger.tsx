'use client';

import BurgerIcon from '@/shared/assets/svg/burger.svg';
import './UIButtonBurger.scss';
import { useUI } from '@/context/UIContext';

export default function UIButtonBurger() {
  const { drawerType, toggleMenu } = useUI();
  return (
    <button
      className="burger"
      data-state={drawerType === 'MENU' ? 'close' : 'open'}
      type="button"
      onClick={toggleMenu}
    >
      <BurgerIcon />
    </button>
  );
}
