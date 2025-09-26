import ProductDetailsPreview from '@/shared/ui/ProductDetails/ProductDetailsPreview/ProductDetailsPreview';
import ProductDetailsInfo from '@/shared/ui/ProductDetailsInfo/ProductDetailsInfo';
import ProductDetailsAbout from '@/shared/ui/ProductDetails/ProductDetailsAbout/ProductDetailsAbout';

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
      <ProductDetailsInfo />
      <ProductDetailsAbout slug={slug} />
    </>
  );
}
