'use client';

import './ProductDetailsAbout.scss';
import { useProductDetails } from '@/features/product/product-details/model/useProductDetails';
import React from 'react';
import ProductDetailsCharacteristics from '@/shared/ui/ProductDetails/ProductDetailsCharacteristics/ProductDetailsCharacteristics';

export default function ProductDetailsAbout({ slug }: { slug: string }) {
  const { product } = useProductDetails(slug);

  if (product === null) return <p>Идет загрузка</p>;

  const { description, attributes } = product;
  const html = description?.trim();

  const attributesNodes = attributes?.nodes ?? [];
  const rootClass =
    'ProductDetailsAbout' +
    (html ? ' ProductDetailsAbout--has-description' : '');

  return (
    <div className={rootClass}>
      <h3
        id="characteristics"
        className="ProductDetailsAbout__title HeadlineH2"
      >
        О товаре
      </h3>

      {html && (
        <article
          className="ProductDetailsAbout__description SubtitleS2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <section className="ProductDetailsAbout__characteristics">
        {attributesNodes.map((attribute) => (
          <ProductDetailsCharacteristics
            key={attribute.id}
            attribute={attribute}
          />
        ))}
      </section>
    </div>
  );
}
