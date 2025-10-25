'use client';

import './CatalogProductList.scss';
import { useMemo } from 'react';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useProducts } from '@/features/product/product-list/model/useProducts';

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

const MAX_VISIBLE_PAGES = 5;

function buildPagination(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 1) return [];
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const pages: PaginationItem[] = [];
  const windowStart = Math.max(1, currentPage - 2);
  const windowEnd = Math.min(totalPages, currentPage + 2);

  if (windowStart > 1) {
    pages.push(1);
    if (windowStart > 2) {
      pages.push('ellipsis-start');
    }
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    pages.push(page);
  }

  if (windowEnd < totalPages) {
    if (windowEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    pages.push(totalPages);
  }

  return pages;
}

export default function CatalogProductList() {
  const {
    products,
    allProducts,
    currentPage,
    goToPage,
    canGoPrev,
    canGoNext,
    totalPages,
    isInitialLoading,
    isPageChanging,
    isFetchingMore,
  } = useProducts({ pageSize: 24 });

  const paginationItems = useMemo(
    () => buildPagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const showPagination = paginationItems.length > 0;
  const isEmptyState =
    !isInitialLoading && !isPageChanging && allProducts.length === 0;
  const showLoadingHint = (isPageChanging || isFetchingMore) && !isInitialLoading;

  return (
    <div className="CatalogProductList">
      {isInitialLoading ? (
        <div className="CatalogProductList__loader">Загрузка товаров...</div>
      ) : isEmptyState ? (
        <div className="CatalogProductList__empty">
          По выбранным фильтрам товары не найдены
        </div>
      ) : (
        <div className="CatalogProductList__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {showPagination && (
        <div className="CatalogProductList__pagination" aria-label="Пагинация">
          <button
            type="button"
            className="CatalogProductList__pagination-button CatalogProductList__pagination-button--control"
            onClick={() => goToPage(currentPage - 1)}
            disabled={!canGoPrev || isPageChanging || isInitialLoading}
          >
            Назад
          </button>

          <div className="CatalogProductList__pagination-pages">
            {paginationItems.map((item) =>
              typeof item === 'number' ? (
                <button
                  key={item}
                  type="button"
                  className={`CatalogProductList__pagination-button${
                    item === currentPage
                      ? ' CatalogProductList__pagination-button--active'
                      : ''
                  }`}
                  onClick={() => goToPage(item)}
                  disabled={item === currentPage || isPageChanging || isInitialLoading}
                  aria-current={item === currentPage ? 'page' : undefined}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  className="CatalogProductList__pagination-ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              ),
            )}
          </div>

          <button
            type="button"
            className="CatalogProductList__pagination-button CatalogProductList__pagination-button--control"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!canGoNext || isPageChanging || isInitialLoading}
          >
            Далее
          </button>
        </div>
      )}

      {showLoadingHint && (
        <div className="CatalogProductList__loading-hint">Загружаем товары...</div>
      )}
    </div>
  );
}
