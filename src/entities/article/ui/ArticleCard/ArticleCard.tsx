import './ArticleCard.scss';
import type { TArticleCard } from '@/widgets/Pages/HomePage/SliderArticlesNewsCards';
import Image from 'next/image';
import Link from 'next/link';
type TArticleCardProps = {
  item: TArticleCard;
};

export default function ArticleCard({ item }: TArticleCardProps) {
  return (
    <Link href={'/'} className={'ArticleCard'}>
      <Image
        className={'ArticleCard__image'}
        width={380}
        height={356}
        src={item.image.url}
        alt={item.title}
      />
      <span className={'ArticleCard__text BodyB2'}>{item.text}</span>
      <h3 className={'HeadlineH5'}>{item.title}</h3>
    </Link>
  );
}
