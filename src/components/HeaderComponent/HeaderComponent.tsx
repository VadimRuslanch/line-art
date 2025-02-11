import './HeaderComponent.scss';
import Link from 'next/link';
import ButtonLogo from '@/shared/ui/ButtonLogo/ButtonLogo';
import HeaderNavigation from '@/components/HeaderComponent/components/HeaderNavigation';
import HeaderMenuCatalog from '@/components/HeaderComponent/components/HeaderMenuCatalog';
import HeaderSearch from '@/components/HeaderComponent/components/HeaderSearch';
import HeaderUserBar from '@/components/HeaderComponent/components/HeaderUserBar';
import HeaderContacts from '@/components/HeaderComponent/components/HeaderContacts';

export default async function HeaderComponent() {
  return (
    <header className="header grid gap-y-4 gap-x-5 z-10 pt-4 pb-7">
      <Link className="max-w-fit header-grid-aria-link" href="/">
        <ButtonLogo />
      </Link>

      <HeaderNavigation />
      <HeaderContacts />
      <HeaderMenuCatalog />
      <HeaderSearch />
      <HeaderUserBar />
    </header>
  );
}
