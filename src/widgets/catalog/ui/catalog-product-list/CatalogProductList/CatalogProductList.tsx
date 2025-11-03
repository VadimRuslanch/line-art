'use client';

import './CatalogProductList.scss';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import {
  useProductAllList,
  useProductCategoryList,
  type UseProductListResult,
} from '@/features/product/product-list/model/useProductList';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { CatalogProductListSkeleton } from '@/widgets/catalog/ui/catalog-product-list/CatalogProductListSkeleton/CatalogProductListSkeleton';

export default function CatalogProductList() {
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const categorySlug = selectedFilters.category?.[0] ?? null;

  if (categorySlug) {
    return (
      <CatalogProductListCategory key={categorySlug} slug={categorySlug} />
    );
  }

  return <CatalogProductListAll />;
}

const CatalogProductListAll = () => {
  const hookResult = useProductAllList();
  return <CatalogProductListView hookResult={hookResult} />;
};

const CatalogProductListCategory = ({ slug }: { slug: string }) => {
  const hookResult = useProductCategoryList({ slug });
  return <CatalogProductListView hookResult={hookResult} />;
};

const CatalogProductListView = ({
  hookResult,
}: {
  hookResult: UseProductListResult;
}) => {
  const { products, loadMore, hasNextPage, isFetchingMore, isInitialLoading } =
    hookResult;

  if (isInitialLoading) {
    return <CatalogProductListSkeleton />;
  }

  const isEmpty = products.length === 0;
  const canShowLoadMore = hasNextPage && !isEmpty;

  return (
    <div className="CatalogProductList">
      {isEmpty ? (
        <div className="CatalogProductList__empty">
          Товаров нет, выберите другую категорию
        </div>
      ) : (
        <div className="CatalogProductList__grid">
          {products.map((product, index) => {
            if (!product || product.__typename !== 'SimpleProduct') return null;
            return (
              <ProductCard
                key={product.id ?? `db-${product.databaseId ?? index}`}
                product={product}
              />
            );
          })}
        </div>
      )}

      {canShowLoadMore && (
        <div className="CatalogProductList__load-more">
          <button
            type="button"
            className="CatalogProductList__load-more-button"
            onClick={loadMore}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Loading...' : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
};

