'use client';

import './ProductCard.scss';
import { ProductWithCategoriesFragment } from '@/shared/api/gql/graphql';

import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import ImageHoverSlider from '@/shared/ui/ImageHoverSlider/ImageHoverSlider';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
// import UIFavorite from '@/shared/ui/UIFavorite/UIFavorite';

export interface ProductProduct extends ProductWithCategoriesFragment {
  quantity: number;
  inCart: boolean;
  key?: string;
}

export default function ProductCard({
  product,
}: {
  product: ProductWithCategoriesFragment;
}) {
  const gallery = [
    product.image
      ? { src: product.image.sourceUrl ?? '', alt: product.image.altText }
      : null,
    ...(product.galleryImages?.nodes ?? []).map((n) => ({
      src: n?.sourceUrl ?? '',
      alt: n?.altText,
      id: n?.id ?? n?.databaseId,
    })),
  ]
    .filter(Boolean)
    .filter(
      (img, idx, arr) => arr.findIndex((x) => x?.src === img?.src) === idx,
    ) as { src: string; alt?: string | null; id?: string | number }[];

  return (
    <article className="ProductCard">
      {/*<div className="ProductCard__actions" role="toolbar">*/}
      {/*  <UIFavorite />*/}
      {/*</div>*/}

      <Link href={product.uri!} className="ProductCard__link-image">
        <ImageHoverSlider
          images={gallery}
          width={273}
          height={240}
          className="ProductCard__image"
          priority={false}
          resetOnLeave={true}
        />
      </Link>

      <div className="ProductCard__bottom">
        <span className="ProductCard__bottom-art BodyB2">{product.sku}</span>
        <h3 className="ProductCard__bottom-subtitle SubtitleS3">
          {product.name}
        </h3>

        <div className="productPrice">
          <ProductPrice
            regularPrice={product.regularPrice!}
            salePrice={product.salePrice}
            onSale={product.onSale!}
          />
        </div>

        <AddToCart product={product} />
      </div>
    </article>
  );
}
