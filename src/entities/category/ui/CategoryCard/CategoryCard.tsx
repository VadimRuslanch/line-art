'use client';

import Link from 'next/link';
import Image from 'next/image';
import IconArrow from '@/shared/assets/svg/arrow-button.svg';
import type { CatalogCategoryNode } from '@/entities/category/model/homeCatalog.types';
import './CategoryCard.scss';
import { useAppDispatch } from '@/shared/model/hooks';
import { setCategory } from '@/features/catalog/catalog-filters/model/slice';

type CategoryNode = {
  item: CatalogCategoryNode;
};

export default function CategoryCard({ item }: CategoryNode) {
  const { image, name, uri } = item;
  const dispatch = useAppDispatch();
  const slug =
    uri && uri.length > 0
      ? uri
          .split('/')
          .filter(Boolean)
          .pop() ?? ''
      : '';
  const href =
    slug && slug.length > 0
      ? `/categories?category=${encodeURIComponent(slug)}`
      : '/categories';

  const handleClick = () => {
    dispatch(setCategory(slug ?? ''));
  };

  return (
    <Link href={href} className="CategoryCard" onClick={handleClick}>
      <Image
        className="CategoryCard__image"
        width={413}
        height={480}
        src={
          image
            ? image.sourceUrl!
            : 'https://foni.papik.pro/uploads/posts/2024-10/thumbs/foni-papik-pro-9p7y-p-kartinki-serii-kotik-na-prozrachnom-fone-1.png'
        }
        alt={image ? image.altText! : 'ALT'}
      />
      <div className="CategoryCard__bottom">
        <span className="HeadlineH5">{name}</span>
        <span className="CategoryCard__link">
          <IconArrow />
        </span>
      </div>
    </Link>
  );
}
