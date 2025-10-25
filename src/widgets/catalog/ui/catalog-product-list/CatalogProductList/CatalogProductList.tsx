'use client';

import './CatalogProductList.scss';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useProducts } from '@/features/product/product-list/model/useProducts';

export default function CatalogProductList() {
  const {
    products,
    loadMore,
    hasNextPage,
    isFetchingMore,
    isInitialLoading,
  } = useProducts();

  const isEmpty = !isInitialLoading && products.length === 0;
  const canShowLoadMore = hasNextPage && !isInitialLoading && !isEmpty;

  return (
    <div className="CatalogProductList">
      {isInitialLoading ? (
        <div className="CatalogProductList__loader">Загрузка товаров...</div>
      ) : isEmpty ? (
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

      {canShowLoadMore && (
        <div className="CatalogProductList__load-more">
          <button
            type="button"
            className="CatalogProductList__load-more-button"
            onClick={loadMore}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Загружаем ещё...' : 'Показать ещё'}
          </button>
        </div>
      )}
    </div>
  );
}
