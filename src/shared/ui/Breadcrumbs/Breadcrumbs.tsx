import Link from 'next/link';
import './Breadcrumbs.scss';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

type Props = {
  nameProduct?: string | null;
};

export default function Breadcrumbs({ nameProduct }: Props) {
  return (
    <div className="Breadcrumbs">
      <Link className="SubtitleS3" href="/">
        Главная
      </Link>
      <IconArrow />
      <Link className="SubtitleS3" href="/categories">
        Каталог
      </Link>
      {nameProduct && (
        <>
          <IconArrow />
          <span className="SubtitleS3">{nameProduct}</span>
        </>
      )}
    </div>
  );
}
