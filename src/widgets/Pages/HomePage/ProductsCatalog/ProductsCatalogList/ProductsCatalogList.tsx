import './ProductsCatalogList.scss';

import React from 'react';

type PopularProductsCardListProps = {
  children: React.ReactNode;
  className?: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void | Promise<void>;
};

export default function ProductsCatalogList({
  children,
  className,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: PopularProductsCardListProps) {
  const items = React.Children.toArray(children).filter(Boolean);
  const canLoadMore = Boolean(hasMore && onLoadMore);

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      onLoadMore?.();
    }
  };

  return (
    <div className={className}>
      {items}
      {canLoadMore && (
        <button
          type="button"
          className="PopularProductsCardList__button"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          aria-label="Загрузить ещё товары"
        >
          <span className="SubtitleS1">
            {isLoadingMore ? 'Загрузка...' : 'Загрузить ещё'}
          </span>
        </button>
      )}
    </div>
  );
}
