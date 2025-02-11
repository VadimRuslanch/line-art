import Link from 'next/link';
import IconArrowInwards from '@/shared/assets/svg/arrow-inwards.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconUser from '@/shared/assets/svg/user.svg';
import IconCart from '@/shared/assets/svg/cart.svg';

export default function HeaderUserBar() {
  return (
    <nav className="header-grid-aria-user flex justify-end">
      <Link
        className="flex items-center gap-x-2 uppercase text-xs font-semibold px-2 py-2"
        href="#"
      >
        <IconArrowInwards />
        Сравнить
      </Link>
      <Link
        className="flex items-center gap-x-2 uppercase text-xs font-semibold px-2 py-2"
        href="#"
      >
        <IconHeart />
        Избранное
      </Link>
      <Link
        className="flex items-center gap-x-2 uppercase text-xs font-semibold px-2 py-2"
        href="#"
      >
        <IconUser />
        Войти
      </Link>
      <Link
        className="flex items-center gap-x-2 uppercase text-xs font-semibold px-2 py-2"
        href="#"
      >
        <IconCart />
        -/-
      </Link>
    </nav>
  );
}
