import Link from 'next/link';
import './Breadcrumbs.scss';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';

type BreadcrumbsItem = {
  title: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbsItems = items.map(({ title, href }, index) => (
    <div className={'Breadcrumbs__item'} key={index}>
      <IconArrow />
      {href ? (
        <Link className="SubtitleS3" href={href}>
          {title}
        </Link>
      ) : (
        <span className="SubtitleS3">{title}</span>
      )}
    </div>
  ));

  return (
    <div className="Breadcrumbs">
      <Link className="SubtitleS3" href="/public">
        Главная
      </Link>
      {breadcrumbsItems}
    </div>
  );
}
