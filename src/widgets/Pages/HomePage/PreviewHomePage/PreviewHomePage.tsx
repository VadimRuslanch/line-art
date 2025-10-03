import './PreviewHomePage.scss';
import Image from 'next/image';
import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow-left.svg';

export default function PreviewHomePage() {
  return (
    <section className={'PreviewHomePage'}>
      <h1 className={'PreviewHomePage__title HeadlineH1'}>
        Комфорт начинается c lineart
      </h1>
      <Link className={'PreviewHomePage__link'} href={'/categories'}>
        <span className={'ButtonBut1'}>Смотреть каталог</span>
        <IconArrow />
      </Link>
      <p className={'PreviewHomePage__description SubtitleS1'}>
        Компания Lineart является официальным производителейм бытовой техники с
        2017 года.
      </p>
      <Image
        width={630}
        height={560}
        src={'/images/preview.jpg'}
        alt={'картинка'}
        className={'PreviewHomePage__image'}
      />
    </section>
  );
}
