import { Suspense } from 'react';
import type { Metadata } from 'next';

import ProductDetailsPreview from '@/widgets/product/ProductDetails/ProductDetailsPreview/ProductDetailsPreview';
import ProductDetailsInfo from '@/shared/ui/ProductDetailsInfo/ProductDetailsInfo';
import ProductDetailsAbout from '@/widgets/product/ProductDetails/ProductDetailsAbout/ProductDetailsAbout';
import { getProductDetails } from '@/entities/product/current-detail/model/getProductDetails';
import {
  ProductDetailsAboutSkeleton,
  ProductDetailsPreviewSkeleton,
} from '@/widgets/product/ProductDetails/ProductDetailsSkeletons/ProductDetailsSkeletons';

type Params = Promise<{ slug: string }>;

function stripHtml(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const clean = value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return undefined;
  return clean.length > 160 ? `${clean.slice(0, 157)}...` : clean;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetails(slug);
  if (!product) {
    return { title: 'Товар не найден' };
  }

  const title = product.name ? `${product.name} | Line Art` : 'Line Art';
  const description = stripHtml(product.description);
  const image = product.image?.sourceUrl ?? undefined;
  const url = product.uri ?? undefined;

  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      url,
      images: image
        ? [{ url: image, alt: product.image?.altText ?? title }]
        : undefined,
      type: 'website',
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const productPromise = getProductDetails(slug);

  return (
    <>
      <Suspense fallback={<ProductDetailsPreviewSkeleton />}>
        <ProductDetailsPreview productPromise={productPromise} />
      </Suspense>

      <ProductDetailsInfo />

      <Suspense fallback={<ProductDetailsAboutSkeleton />}>
        <ProductDetailsAbout productPromise={productPromise} />
      </Suspense>
    </>
  );
}
