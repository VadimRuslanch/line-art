import Link from 'next/link';
import './Breadcrumbs.scss';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

type Props = {
  nameProduct?: string;
};

export default function Breadcrumbs({ nameProduct }: Props) {
  return (
    <div className="Breadcrumbs">
      <Link className="Breadcrumbs__item" href="/">
        Главная
      </Link>
      <IconArrow />
      <Link className="Breadcrumbs__item" href="/categories">
        Каталог
      </Link>
      {nameProduct && (
        <>
          <IconArrow />
          <span className="Breadcrumbs__item">{nameProduct}</span>
        </>
      )}
    </div>
  );
}
