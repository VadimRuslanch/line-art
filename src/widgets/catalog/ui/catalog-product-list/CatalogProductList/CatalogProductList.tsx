'use client';

import './CatalogProductList.scss';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import {
  type ProductNode,
  type UseProductListResult,
} from '@/features/product/product-list/model/useProductList';
import { useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { CatalogProductListSkeleton } from '@/widgets/catalog/ui/catalog-product-list/CatalogProductListSkeleton/CatalogProductListSkeleton';
import { useGetProductListCategory } from '@/features/product/product-list/list-category/model/useGetProductListCategory';
import { useGetProductListAll } from '@/features/product/product-list/list-all/model/useGetProductListAll';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import Pagination from '@/shared/ui/Pagination/Pagination';

const CATALOG_PAGE_SIZE = 12;

type CatalogCategory = ReturnType<
  typeof useGetCategoriesCatalog
>['categories'][number];

const getTotalCount = (
  categories: CatalogCategory[],
  slug?: string | null,
): number => {
  if (slug) {
    const match = categories.find((category) => category?.slug === slug);
    return match?.count ?? 0;
  }

  return categories.reduce((sum, category) => sum + (category?.count ?? 0), 0);
};

export default function CatalogProductList() {
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const categorySlug = selectedFilters.category?.[0] ?? null;
  const { categories } = useGetCategoriesCatalog();
  const resetKey = useMemo(
    () => JSON.stringify(selectedFilters),
    [selectedFilters],
  );

  if (categorySlug) {
    return (
      <CatalogProductListCategory
        key={categorySlug}
        slug={categorySlug}
        categories={categories}
        resetKey={resetKey}
      />
    );
  }

  return <CatalogProductListAll categories={categories} resetKey={resetKey} />;
}

const CatalogProductListAll = ({
  categories,
  resetKey,
}: {
  categories: CatalogCategory[];
  resetKey: string;
}) => {
  const hookResult = useGetProductListAll();
  return (
    <CatalogProductListView
      key={`${resetKey}-all`}
      hookResult={hookResult}
      categories={categories}
      pageSize={CATALOG_PAGE_SIZE}
    />
  );
};

const CatalogProductListCategory = ({
  slug,
  categories,
  resetKey,
}: {
  slug: string;
  categories: CatalogCategory[];
  resetKey: string;
}) => {
  const hookResult = useGetProductListCategory({ slug });
  return (
    <CatalogProductListView
      key={`${resetKey}-${slug}`}
      hookResult={hookResult}
      categories={categories}
      selectedCategorySlug={slug}
      pageSize={CATALOG_PAGE_SIZE}
    />
  );
};

const isCatalogProductNode = (
  product: ProductNode | null | undefined,
): product is Extract<
  ProductNode,
  { __typename: 'SimpleProduct' | 'VariableProduct' }
> => {
  return (
    product?.__typename === 'SimpleProduct' ||
    product?.__typename === 'VariableProduct'
  );
};

type CatalogProductListViewProps = {
  hookResult: UseProductListResult;
  categories: CatalogCategory[];
  selectedCategorySlug?: string | null;
  pageSize?: number;
};

const CatalogProductListView = ({
  hookResult,
  categories,
  selectedCategorySlug,
  pageSize = CATALOG_PAGE_SIZE,
}: CatalogProductListViewProps) => {
  const { products, loadMore, hasNextPage, isFetchingMore, isInitialLoading } =
    hookResult;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'append' | 'page'>('append');

  const normalizedProducts = useMemo(
    () => products.filter(isCatalogProductNode),
    [products],
  );

  const isEmpty = normalizedProducts.length === 0;

  const totalCount = useMemo(
    () => getTotalCount(categories, selectedCategorySlug),
    [categories, selectedCategorySlug],
  );

  const pageCount = useMemo(() => {
    const baseCount =
      totalCount > 0
        ? Math.ceil(totalCount / pageSize)
        : Math.ceil(normalizedProducts.length / pageSize);
    return Number.isFinite(baseCount) && baseCount > 0 ? baseCount : 0;
  }, [totalCount, pageSize, normalizedProducts.length]);

  const effectivePage =
    displayMode === 'page'
      ? Math.max(1, Math.min(currentPage, pageCount || 1))
      : 1;

  useEffect(() => {
    if (displayMode !== 'page') return;
    const required = effectivePage * pageSize;
    if (!hasNextPage) return;
    if (normalizedProducts.length >= required) return;

    let cancelled = false;
    const ensure = async () => {
      if (cancelled) return;
      try {
        await loadMore();
      } catch {
        // ignore network errors here; hook already exposes error state
      }
    };

    void ensure();

    return () => {
      cancelled = true;
    };
  }, [
    effectivePage,
    pageSize,
    hasNextPage,
    loadMore,
    normalizedProducts.length,
    displayMode,
  ]);

  const visibleProducts = useMemo(() => {
    if (displayMode === 'append') {
      return normalizedProducts;
    }
    if (!normalizedProducts.length) return [];
    const start = (effectivePage - 1) * pageSize;
    return normalizedProducts.slice(start, start + pageSize);
  }, [normalizedProducts, displayMode, effectivePage, pageSize]);

  const waitingForPage =
    displayMode === 'page' &&
    visibleProducts.length === 0 &&
    !isEmpty &&
    (isFetchingMore || hasNextPage);

  const canShowLoadMoreButton =
    hasNextPage && !waitingForPage && !isEmpty && !isInitialLoading;

  const handleLoadMore = async () => {
    setDisplayMode('append');
    await loadMore();
  };

  const handlePageChange = (page: number) => {
    setDisplayMode('page');
    setCurrentPage(page);
  };

  if (isInitialLoading && normalizedProducts.length === 0) {
    return <CatalogProductListSkeleton />;
  }

  return (
    <div className="CatalogProductList">
      {isEmpty ? (
        <div className="CatalogProductList__empty">Загрузить еще</div>
      ) : waitingForPage ? (
        <div className="CatalogProductList__loader">Loading...</div>
      ) : (
        <div className="CatalogProductList__grid">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id ?? `db-${product.databaseId ?? index}`}
              product={product}
            />
          ))}
        </div>
      )}

      {canShowLoadMoreButton && (
        <div className="CatalogProductList__load-more">
          <button
            type="button"
            className="CatalogProductList__load-more-button"
            onClick={() => void handleLoadMore()}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Loading...' : 'Загрузить ещё'}
          </button>
        </div>
      )}

      <Pagination
        pageCount={pageCount}
        page={effectivePage}
        onPageChange={handlePageChange}
        className="CatalogProductList__pagination"
      />
    </div>
  );
};
