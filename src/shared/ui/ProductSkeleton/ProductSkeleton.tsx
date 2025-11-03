import { ProductDetailsPreviewSkeleton, ProductDetailsAboutSkeleton } from '@/widgets/product/ProductDetails/ProductDetailsSkeletons/ProductDetailsSkeletons';

export default function ProductSkeleton() {
  return (
    <div className="ProductSkeleton">
      <ProductDetailsPreviewSkeleton />
      <ProductDetailsAboutSkeleton />
    </div>
  );
}
