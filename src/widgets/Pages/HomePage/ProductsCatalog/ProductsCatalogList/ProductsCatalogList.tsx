import './ProductsCatalogList.scss';

import React, { useEffect, useState } from 'react';

type PopularProductsCardListProps = {
  children: React.ReactNode;
  className?: string;
  pageSize?: number;
  resetOn?: unknown;
};

export default function ProductsCatalogList({
  children,
  className,
  pageSize = 8,
  resetOn,
}: PopularProductsCardListProps) {
  const items = React.Children.toArray(children).filter(Boolean);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [resetOn, pageSize]);

  const showMore = () =>
    setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
  const hasMore = visibleCount < items.length;

  return (
    <div className={className}>
      {items.slice(0, visibleCount)}
      {hasMore && (
        <button
          type="button"
          className={'PopularProductsCardList__button'}
          onClick={showMore}
          aria-label="Показать ещё товары"
        >
          <span className={'SubtitleS1'}>Показать ещё</span>
        </button>
      )}
    </div>
  );
}
