'use client';

import './ProductCard.scss';
import type { SimpleProductLike } from '@/entities/product/types';

import Link from 'next/link';
import ProductPrice, {
  type PriceValue,
} from '@/shared/ui/ProductPrice/ProductPrice';
import ImageHoverSlider from '@/shared/ui/ImageHoverSlider/ImageHoverSlider';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
import { parseMoney } from '@/shared/lib/money';
// import UIFavorite from '@/shared/ui/UIFavorite/UIFavorite';

type PriceInfo = {
  regularPrice: PriceValue | null;
  salePrice: PriceValue | null;
  minSalePrice?: number | string | null;
  onSale: boolean;
};

type VariableProductNode = Extract<
  SimpleProductLike,
  {
    __typename: 'VariableProduct';
    variations?: { nodes?: unknown[] | null } | null;
  }
>;
type VariationNode = NonNullable<
  NonNullable<NonNullable<VariableProductNode['variations']>['nodes']>[number]
>;

type MoneyCandidate = number | string | null | undefined;

type RangeResult = {
  range: { min: number; max: number };
  minValue: number;
};

type WithPrice = { price?: string | null };
type WithRegularPrice = { regularPrice?: string | null };
type WithSalePrice = { salePrice?: string | null };

function toNumeric(value: MoneyCandidate): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = parseMoney(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function buildRange(values: MoneyCandidate[]): RangeResult | null {
  const numericValues = values.reduce<number[]>((acc, value) => {
    const numeric = toNumeric(value);
    if (numeric !== null) {
      acc.push(numeric);
    }
    return acc;
  }, []);
  if (!numericValues.length) return null;

  const min = Math.min(...numericValues);
  const max = Math.max(...numericValues);
  return {
    range: { min, max },
    minValue: min,
  };
}

function isVariableProductNode(
  product: SimpleProductLike,
): product is VariableProductNode {
  return product.__typename === 'VariableProduct';
}

function hasPrice(
  product: SimpleProductLike,
): product is SimpleProductLike & WithPrice {
  return 'price' in product;
}

function hasRegularPrice(
  product: SimpleProductLike,
): product is SimpleProductLike & WithRegularPrice {
  return 'regularPrice' in product;
}

function hasSalePrice(
  product: SimpleProductLike,
): product is SimpleProductLike & WithSalePrice {
  return 'salePrice' in product;
}

function getVariationNodes(product: SimpleProductLike): VariationNode[] {
  if (!isVariableProductNode(product)) return [];
  const nodes = product.variations?.nodes ?? [];
  return nodes.filter((node): node is VariationNode => Boolean(node));
}

function getPriceInfo(product: SimpleProductLike): PriceInfo {
  const fallbackPrice = hasPrice(product) ? (product.price ?? null) : null;
  const baseRegular = hasRegularPrice(product)
    ? (product.regularPrice ?? fallbackPrice)
    : fallbackPrice;
  const baseSale = hasSalePrice(product) ? (product.salePrice ?? null) : null;
  const baseRegularNumber = toNumeric(baseRegular);
  const baseSaleNumber = toNumeric(baseSale);

  if (product.__typename !== 'VariableProduct') {
    const onSaleField =
      'onSale' in product && typeof product.onSale === 'boolean'
        ? product.onSale
        : Boolean(
            baseSaleNumber !== null &&
              baseRegularNumber !== null &&
              baseSaleNumber < baseRegularNumber,
          );

    return {
      regularPrice: baseRegular,
      salePrice: baseSale,
      minSalePrice: baseSaleNumber ?? undefined,
      onSale: Boolean(onSaleField),
    };
  }

  const variations = getVariationNodes(product);
  const regularSources: MoneyCandidate[] =
    variations.length > 0
      ? variations.map(
          (variation) =>
            variation?.regularPrice ?? variation?.price ?? baseRegular ?? null,
        )
      : [baseRegular];

  const variableSaleSources =
    variations.length > 0
      ? variations.reduce<MoneyCandidate[]>((acc, variation) => {
          if (variation?.onSale) {
            acc.push(
              variation.salePrice ??
                variation.price ??
                variation.regularPrice ??
                null,
            );
          }
          return acc;
        }, [])
      : [];

  const hasVariationSale = variableSaleSources.length > 0;
  const saleSources = hasVariationSale
    ? variableSaleSources
    : baseSale
      ? [baseSale]
      : [];

  const regularRange = buildRange(regularSources);
  const saleRange = buildRange(saleSources);

  const regularPriceValue = regularRange?.range ?? baseRegular ?? fallbackPrice;
  const salePriceValue =
    saleRange?.range ?? (hasVariationSale ? null : baseSale);

  const minSaleValue =
    saleRange?.minValue ?? (hasVariationSale ? null : (baseSaleNumber ?? null));

  const hasSale =
    hasVariationSale ||
    Boolean(
      baseSaleNumber !== null &&
        baseRegularNumber !== null &&
        baseSaleNumber < baseRegularNumber,
    );

  return {
    regularPrice: regularPriceValue,
    salePrice: hasSale ? salePriceValue : null,
    minSalePrice: hasSale ? (minSaleValue ?? undefined) : undefined,
    onSale: hasSale,
  };
}

type ProductCardProps =
  | { product: SimpleProductLike; item?: never }
  | { item: SimpleProductLike; product?: never }
  | { product: SimpleProductLike; item: SimpleProductLike };

export default function ProductCard(props: ProductCardProps) {
  const product = props.product ?? props.item;
  if (!product) return null;

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

  const { regularPrice, salePrice, minSalePrice, onSale } =
    getPriceInfo(product);
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
        <Link href={product.uri!}>
          <h3 className="ProductCard__bottom-subtitle SubtitleS3">
            {product.name}
          </h3>
        </Link>

        <div className="productPrice">
          <ProductPrice
            regularPrice={regularPrice ?? undefined}
            salePrice={salePrice ?? undefined}
            minSalePrice={minSalePrice}
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
