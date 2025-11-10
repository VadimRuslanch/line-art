import './ProductDetailsAbout.scss';

import { notFound } from 'next/navigation';
import type { SimpleProductGQL } from '@/entities/product/types';
import ProductDetailsCharacteristics from '@/widgets/product/ProductDetails/ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import { extractGlobalAttributes } from '@/entities/product/current-detail/lib/normalizeProductAttributes';

type Props = {
  productPromise: Promise<SimpleProductGQL | null>;
};

export default async function ProductDetailsAbout({ productPromise }: Props) {
  const product = await productPromise;
  const attributes = extractGlobalAttributes(product);

  if (!product) {
    notFound();
  }

  const description = product.description?.trim() ?? '';
  const rootClass =
    'ProductDetailsAbout' +
    (description ? ' ProductDetailsAbout--has-description' : '');

  return (
    <div className={rootClass}>
      <h3
        id="characteristics"
        className="ProductDetailsAbout__title HeadlineH2"
      >
        О товаре
      </h3>

      {description && (
        <article
          className="ProductDetailsAbout__description SubtitleS2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      <section className="ProductDetailsAbout__characteristics">
        {attributes.map((attribute) => (
          <ProductDetailsCharacteristics
            key={attribute.id}
            attribute={attribute}
          />
        ))}
      </section>
    </div>
  );
}
