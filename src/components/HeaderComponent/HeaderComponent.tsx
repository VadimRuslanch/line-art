import './HeaderComponent.scss';
import Link from 'next/link';
import ButtonLogo from '@/components/UI/ButtonLogo/ButtonLogo';
import HeaderComponentNavigation from '@/components/HeaderComponent/HeaderComponentNavigation/HeaderComponentNavigation';
import ButtonMenuCatalog from '@/components/UI/ButtonMenuCatalog/ButtonMenuCatalog';

export default async function HeaderComponent() {
  return (
    <header className="HeaderComponent">
      <Link className={'HeaderComponent__link'} href="/">
        <ButtonLogo />
      </Link>
      <ButtonMenuCatalog />
      <HeaderComponentNavigation />
    </header>
  );
}
