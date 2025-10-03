import IconNotFound from '@/shared/assets/svg/not-found.svg';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={'NotFound'}>
      <IconNotFound />
      <p>Страница находится в разработке</p>
      <Link className={'NotFound__link ButtonBut2-medium'} href={'/'}>
        Вернуться на главную
      </Link>
    </div>
  );
}
