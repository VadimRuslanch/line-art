import './HeaderComponentNavigation.scss';
import Link from 'next/link';

export default async function HeaderComponentNavigation() {
  const navArray = [
    {
      id: 1,
      title: 'Link',
      link: '/',
    },
    {
      id: 12,
      title: 'Link',
      link: '/',
    },
    {
      id: 13,
      title: 'Link',
      link: '/',
    },
    {
      id: 14,
      title: 'Link',
      link: '/',
    },
  ];

  return (
    <div className="flex">
      {navArray.map((item) => (
        <Link key={item.id} href={item.link}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}
