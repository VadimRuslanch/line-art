'use client';

import './CatalogProductList.scss';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useCallback, useState, useEffect } from 'react';
import { useProducts } from '@/features/product/product-list/model/useProducts';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';

const GAP = 20;
const ITEM_HEIGHT = 520;

const getCols = (w: number) => {
  switch (true) {
    case w < 768:
      return 1;
    case w < 1000:
      return 2;
    default:
      return 3;
  }
};

export default function CatalogProductList() {
  const { products, hasNextPage, loadMore } = useProducts();
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isItemLoaded = useCallback(
    (index: number) => index < products.length,
    [products.length],
  );

  const loadMoreItems = useCallback(async () => {
    if (hasNextPage) await loadMore();
  }, [hasNextPage, loadMore]);

  const cols = getCols(vw);
  const itemCount = hasNextPage ? products.length + cols : products.length;

  return (
    <div className="CatalogProductList" style={{ width: '100%' }}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        threshold={4}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => {
              const totalGap = GAP * (cols - 1);
              const colWidth = Math.floor((width - totalGap) / cols);
              const rowHeight = ITEM_HEIGHT + GAP;
              const rowCount = Math.ceil(itemCount / cols);

              return (
                <Grid
                  ref={ref}
                  height={height}
                  width={width}
                  columnCount={cols}
                  columnWidth={colWidth}
                  rowHeight={rowHeight}
                  rowCount={rowCount}
                  className="hide-scrollbar"
                  onItemsRendered={({
                    visibleRowStartIndex,
                    visibleRowStopIndex,
                    visibleColumnStartIndex,
                    visibleColumnStopIndex,
                  }) => {
                    const startIndex =
                      visibleRowStartIndex * cols + visibleColumnStartIndex;
                    const stopIndex =
                      visibleRowStopIndex * cols + visibleColumnStopIndex;
                    onItemsRendered({
                      overscanStartIndex: startIndex,
                      overscanStopIndex: stopIndex,
                      visibleStartIndex: startIndex,
                      visibleStopIndex: stopIndex,
                    });
                  }}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const index = rowIndex * cols + columnIndex;
                    if (index >= itemCount) return null;

                    // Внутри ячейки рисуем отступы, чтобы получить GAP визуально
                    const cellStyle: React.CSSProperties = {
                      ...style,
                      left: Number(style.left) + columnIndex,
                      top: style.top,
                      width: colWidth,
                      height: ITEM_HEIGHT,
                      marginRight: GAP,
                      marginBottom: GAP,
                    };

                    if (index >= products.length) {
                      return <div style={cellStyle} />;
                    }

                    return (
                      <div style={cellStyle}>
                        <ProductCard product={products[index]} />
                      </div>
                    );
                  }}
                </Grid>
              );
            }}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}
