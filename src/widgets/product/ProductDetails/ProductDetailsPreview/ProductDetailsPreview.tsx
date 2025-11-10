import ProductDetailsPreviewClient from './ProductDetailsPreview.client';
import type { SimpleProductGQL } from '@/entities/product/types';
import { notFound } from 'next/navigation';

type Props = {
  productPromise: Promise<SimpleProductGQL | null>;
};

export default async function ProductDetailsPreview({ productPromise }: Props) {
  const product = await productPromise;

  if (!product) {
    notFound();
  }

  return <ProductDetailsPreviewClient key={product.id} product={product} />;
}
