'use client';

import './ProductDetailsPreview.scss';
import { useMemo } from 'react';

import ProductDetailsCharacteristics from '../ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/entities/cart/model/useCart';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
import type { SimpleProductGQL } from '@/entities/product/types';
import { extractGlobalAttributes } from '@/entities/product/current-detail/lib/normalizeProductAttributes';

type Props = {
  product: SimpleProductGQL;
};

export default function ProductDetailsPreviewClient({ product }: Props) {
  const attributes = useMemo(
    () => extractGlobalAttributes(product),
    [product],
  );
  const { error } = useCart();

  const {
    name,
    sku,
    image,
    galleryImages,
    regularPrice,
    salePrice,
    onSale,
  } = product;

  const title = name?.trim() ?? 'Untitled product';

  const breadcrumbItems = useMemo(
    () => [
      {
        title: 'Каталог',
        href: '/categories',
      },
      {
        title,
      },
    ],
    [title],
  );

  return (
    <div className="ProductDetailsPreview">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="ProductDetailsPreview__content">
        <ImagesPreview
          image={image}
          galleryImages={galleryImages?.nodes ?? []}
          fallbackAlt={title}
        />

        <div className="ProductDetailsPreview__info">
          <section>
            <p className="ProductDetailsPreview__sku BodyB2">{sku}</p>
            <h1 className="HeadlineH3">{title}</h1>
          </section>

          <section className="ProductDetailsPreview__characteristics">
            {attributes.map((attribute) => (
              <ProductDetailsCharacteristics
                key={attribute.id}
                attribute={attribute}
              />
            ))}
            <a href="#characteristics" className="attribute-link BodyB2">
              View specifications
            </a>
          </section>

          <div className="ProductDetailsPreview__actionsCard">
            <div className="price">
              <ProductPrice
                regularPrice={regularPrice}
                salePrice={salePrice}
                onSale={onSale}
              />
            </div>

            <AddToCart product={product} />

            {error && (
              <p className="error">Failed to update cart</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

