'use client';

import './ProductCard.scss';
import type { SimpleProductLike } from '@/entities/product/types';

import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import ImageHoverSlider from '@/shared/ui/ImageHoverSlider/ImageHoverSlider';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
// import UIFavorite from '@/shared/ui/UIFavorite/UIFavorite';

type PriceInfo = {
  regularPrice: string | null;
  salePrice: string | null;
  onSale: boolean;
};

function getPriceInfo(product: SimpleProductLike): PriceInfo {
  const regularPrice =
    'regularPrice' in product ? product.regularPrice ?? null : null;
  const salePrice = 'salePrice' in product ? product.salePrice ?? null : null;
  const onSaleField =
    'onSale' in product && typeof product.onSale === 'boolean'
      ? product.onSale
      : Boolean(
          salePrice &&
            regularPrice &&
            salePrice.length > 0 &&
            salePrice !== regularPrice,
        );

  return {
    regularPrice,
    salePrice,
    onSale: Boolean(onSaleField),
  };
}

export default function ProductCard({
  product,
}: {
  product: SimpleProductLike;
}) {
  const galleryNodes =
    'galleryImages' in product && product.galleryImages?.nodes
      ? product.galleryImages.nodes
      : [];

  const gallery = [
    product.image
      ? { src: product.image.sourceUrl ?? '', alt: product.image.altText }
      : null,
    ...galleryNodes.map((n) =>
      n
        ? {
            src: n.sourceUrl ?? '',
            alt: n.altText,
            id: n.id ?? n.databaseId,
          }
        : null,
    ),
  ]
    .filter(Boolean)
    .filter(
      (img, idx, arr) => arr.findIndex((x) => x?.src === img?.src) === idx,
    ) as { src: string; alt?: string | null; id?: string | number }[];

  const { regularPrice, salePrice, onSale } = getPriceInfo(product);
  const isSimple = product.__typename === 'SimpleProduct';

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
            regularPrice={regularPrice ?? undefined}
            salePrice={salePrice ?? undefined}
            onSale={onSale}
          />
        </div>

        {isSimple ? (
          <AddToCart product={product} />
        ) : (
          <Link href={product.uri ?? '#'} className="ProductCard__view-link">
            <span className="ButtonBut2-bold">Перейти к товару</span>
          </Link>
        )}
      </div>
    </article>
  );
}
