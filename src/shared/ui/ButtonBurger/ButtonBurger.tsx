'use client';

import BurgerIcon from '@/shared/assets/svg/burger.svg';
import './ButtonBurger.scss';
import { useMenu } from '@/context/MenuContext';

export default function ButtonBurger() {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <button
      className={'burger'}
      data-state={isMenuOpen ? 'close' : ''}
      type="button"
      onClick={toggleMenu}
    >
      <BurgerIcon />
    </button>
  );
}
