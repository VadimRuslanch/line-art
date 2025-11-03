'use client';

export function CatalogFiltersSkeleton() {
  return (
    <div className="CatalogFiltersSkeleton">
      <div className="skeleton skeleton--title" />
      <div className="CatalogFiltersSkeleton__groups">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="CatalogFiltersSkeleton__group" key={index}>
            <div className="skeleton skeleton--label" />
            <div className="CatalogFiltersSkeleton__chips">
              <span className="skeleton skeleton--chip" />
              <span className="skeleton skeleton--chip" />
              <span className="skeleton skeleton--chip" />
            </div>
          </div>
        ))}
      </div>
      <div className="skeleton skeleton--button" />
    </div>
  );
}

