import './ProductDetailsAbout.scss';

import { notFound } from 'next/navigation';
import ProductDetailsCharacteristics from '../ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import { extractGlobalAttributes } from '@/entities/product/current-detail/lib/normalizeProductAttributes';
import type { SimpleProductGQL } from '@/entities/product/types';

type Props = {
  productPromise: Promise<SimpleProductGQL | null>;
};

export default async function ProductDetailsAbout({ productPromise }: Props) {
  const product = await productPromise;

  if (!product) {
    notFound();
  }

  const attributes = extractGlobalAttributes(product);
  const description = product.description?.trim() ?? '';
  const rootClass =
    'ProductDetailsAbout' +
    (description ? ' ProductDetailsAbout--has-description' : '');

  return (
    <div className={rootClass}>
      <h3 id="characteristics" className="ProductDetailsAbout__title HeadlineH2">
        About product
      </h3>

      {description && (
        <article
          className="ProductDetailsAbout__description SubtitleS2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {/*<section className="ProductDetailsAbout__characteristics">*/}
      {/*  {attributes.map((attribute) => (*/}
      {/*    <ProductDetailsCharacteristics*/}
      {/*      key={attribute.id}*/}
      {/*      attribute={attribute}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</section>*/}
    </div>
  );
}

