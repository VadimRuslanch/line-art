import ProductDetailsPreview from '@/shared/ui/ProductDetailsPreview/ProductDetailsPreview';

type Params = Promise<{ slug: string }>;

export default async function ProductDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  return (
    <div className="block-limiter">
      <ProductDetailsPreview slug={slug} />
    </div>
  );
}
