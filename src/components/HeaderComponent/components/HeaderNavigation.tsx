import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow.svg';

export default async function HeaderNavigation() {
  const navArray = [
    {
      id: 1,
      title: 'Доставка',
      link: '#',
    },
    {
      id: 12,
      title: 'шоурумы',
      link: '#',
    },
    {
      id: 13,
      title: 'контакты',
      link: '#',
    },
    {
      id: 14,
      title: 'О компании',
      link: '#',
    },
  ];

  return (
    <div className="header-grid-aria-nav flex items-center gap-x-4 h-auto">
      {navArray.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="uppercase whitespace-nowrap text-sm font-semibold leading-4 px-3 py-2.5"
        >
          {item.title}
        </Link>
      ))}
      <button className="flex uppercase whitespace-nowrap text-sm font-semibold leading-4 px-3 py-2.5">
        еще
        <IconArrow className={'stroke-main-text-color ml-1'} />
      </button>
    </div>
  );
}
