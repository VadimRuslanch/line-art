import React from 'react';
import ProductDetailsPreview from '@/shared/ui/ProductDetailsPreview/ProductDetailsPreview';
// import ProductDetailsInfo from '@/shared/ui/ProductDetailsInfo/ProductDetailsInfo';
type Params = Promise<{ slug: string }>;

export default async function ProductDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  return (
    <>
      <ProductDetailsPreview slug={slug} />
      {/*<ProductDetailsInfo />*/}
    </>
  );
}
