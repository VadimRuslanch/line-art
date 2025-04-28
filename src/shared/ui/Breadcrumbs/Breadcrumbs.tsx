import Link from 'next/link';
import './Breadcrumbs.scss';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

export default function Breadcrumbs({ nameProduct }: { nameProduct: string }) {
  return (
    <div className="Breadcrumbs">
      <Link className="Breadcrumbs__item" href="/">
        Главная
      </Link>
      <IconArrow />
      <Link className="Breadcrumbs__item" href="/categories">
        Каталог
      </Link>
      <IconArrow />
      <span className="Breadcrumbs__item">{nameProduct}</span>
    </div>
  );
}
