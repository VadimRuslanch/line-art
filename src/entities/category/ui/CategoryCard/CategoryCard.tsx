import Link from 'next/link';
import Image from 'next/image';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import type { GetCategoryParentsQuery } from '@/shared/api/gql/graphql';
import './CategoryCard.scss';

type CategoryNode = {
  item: NonNullable<
    GetCategoryParentsQuery['productCategories']
  >['nodes'][number];
};

export default function CategoryCard({ item }: CategoryNode) {
  const { image, name } = item;

  return (
    <Link href={`/categories/`} className={'CategoryCard'}>
      <Image
        className={'CategoryCard__image'}
        width={413}
        height={480}
        src={
          image
            ? image.sourceUrl!
            : 'https://foni.papik.pro/uploads/posts/2024-10/thumbs/foni-papik-pro-9p7y-p-kartinki-serii-kotik-na-prozrachnom-fone-1.png'
        }
        alt={image ? image.altText! : 'ALT'}
      />
      <div className={'CategoryCard__bottom'}>
        <span className="HeadlineH5">{name}</span>
        <span className={'CategoryCard__link'}>
          <IconArrow />
        </span>
      </div>
    </Link>
  );
}
