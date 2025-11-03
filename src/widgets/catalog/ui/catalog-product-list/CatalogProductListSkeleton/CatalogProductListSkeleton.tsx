'use client';

const CARD_PLACEHOLDERS = 12;

export function CatalogProductListSkeleton() {
  return (
    <div className="CatalogProductList CatalogProductList--skeleton">
      <div className="CatalogProductList__grid">
        {Array.from({ length: CARD_PLACEHOLDERS }).map((_, index) => (
          <div className="ProductCardSkeleton" key={index}>
            <div className="skeleton skeleton--image" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--line-short" />
            <div className="skeleton skeleton--price" />
          </div>
        ))}
      </div>
    </div>
  );
}

