'use client';

import styles from './ProductsCatalog.module.scss';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import ProductsCatalogList from '@/widgets/Pages/HomePage/ProductsCatalog/ProductsCatalogList/ProductsCatalogList';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import type { SelectedFilters } from '@/features/catalog/catalog-filters/model/slice';
import { useGetProductListCategory } from '@/features/product/product-list/list-category/model/useGetProductListCategory';
import { useGetProductListAll } from '@/features/product/product-list/list-all/model/useGetProductListAll';
import type { ProductNode } from '@/features/product/product-list/model/useProductList';
import Link from 'next/link';
import Pagination from '@/shared/ui/Pagination/Pagination';

const PRODUCTS_PER_CATEGORY = 12;
const PRIMARY_CATEGORY_SLUGS: string[] = [
  'dlya-potolka',
  'dlya-steny',
  'skrytyj-plintus',
];

const EMPTY_FILTERS: SelectedFilters = {
  category: [],
  backlights: [],
  color: [],
  glubina: [],
  shadowGap: [],
  width: [],
  price: undefined,
};

type WithSlug = { slug?: string | null };

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

function filterBySlugs<T extends WithSlug>(
  items: T[],
  slugs: string | string[],
): T[] {
  const wanted = (Array.isArray(slugs) ? slugs : [slugs])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const set = new Set(wanted);
  return items.filter(
    (it) => !!it?.slug && set.has(String(it.slug).toLowerCase()),
  );
}

export default function ProductsCatalog() {
  const { categories: fetchedCategories } = useGetCategoriesCatalog();

  const categories = useMemo(
    () => filterBySlugs(fetchedCategories, PRIMARY_CATEGORY_SLUGS),
    [fetchedCategories],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'append' | 'page'>('append');

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    setCurrentPage(1);
    setDisplayMode('append');
  };
  const activeCategory = categories[activeIndex - 1] ?? null;
  const activeSlug = activeCategory?.slug ?? '';

  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (carouselRef.current && innerRef.current) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        const scrollable = innerWidth - carouselWidth;
        setDragWidth(scrollable > 0 ? scrollable : 0);
      }
    });

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const allHook = useGetProductListAll({
    pageSize: PRODUCTS_PER_CATEGORY,
    selectedFilters: EMPTY_FILTERS,
  });
  const categoryHook = useGetProductListCategory({
    slug: activeSlug,
    pageSize: PRODUCTS_PER_CATEGORY,
    skip: !activeSlug,
    selectedFilters: EMPTY_FILTERS,
  });

  const activeHook = activeIndex === 0 ? allHook : categoryHook;

  const products = useMemo(
    () => activeHook.products.filter(isCatalogProductNode),
    [activeHook.products],
  );

  const isLoading = activeHook.isInitialLoading;
  const error = activeHook.error;
  const hasNextPage = activeHook.hasNextPage;
  const isFetchingMore = activeHook.isFetchingMore;
  const loadMore = activeHook.loadMore;

  const refetchCategory = categoryHook.refetch;

  useEffect(() => {
    if (activeIndex !== 0 && activeSlug) {
      refetchCategory?.();
    }
  }, [activeIndex, activeSlug, refetchCategory]);

  const chips = [
    <UIChip
      key="all"
      onClick={() => selectCategory(0)}
      data-active={activeIndex === 0 ? 'active' : ''}
      data-type="default"
    >
      Все товары
    </UIChip>,
    ...categories.map((category, index) => (
      <UIChip
        key={category.id}
        onClick={() => selectCategory(index + 1)}
        data-active={index + 1 === activeIndex ? 'active' : ''}
        data-type="default"
      >
        {category.name}
      </UIChip>
    )),
  ];

  const totalAllCount = useMemo(
    () => categories.reduce((sum, category) => sum + (category?.count ?? 0), 0),
    [categories],
  );

  const totalCount =
    activeIndex === 0 ? totalAllCount : (activeCategory?.count ?? 0);

  const pageCount =
    totalCount > 0
      ? Math.ceil(totalCount / PRODUCTS_PER_CATEGORY)
      : Math.ceil(products.length / PRODUCTS_PER_CATEGORY) || 0;

  const effectivePage =
    displayMode === 'page'
      ? Math.max(1, Math.min(currentPage, pageCount || 1))
      : 1;

  useEffect(() => {
    if (displayMode !== 'page') return;
    const required = effectivePage * PRODUCTS_PER_CATEGORY;
    if (!hasNextPage) return;
    if (products.length >= required) return;

    let cancelled = false;
    const ensure = async () => {
      if (cancelled) return;
      try {
        await loadMore();
      } catch {
        // noop
      }
    };

    void ensure();

    return () => {
      cancelled = true;
    };
  }, [effectivePage, hasNextPage, loadMore, products.length, displayMode]);

  const visibleProducts = useMemo(() => {
    if (!products.length) return [];
    if (displayMode === 'append') return products;
    const start = (effectivePage - 1) * PRODUCTS_PER_CATEGORY;
    return products.slice(start, start + PRODUCTS_PER_CATEGORY);
  }, [products, effectivePage, displayMode]);

  const cards = visibleProducts.map((product, index) => {
    return (
      <ProductCard
        key={
          product?.id ?? `page-${currentPage}-${product?.databaseId ?? index}`
        }
        product={product}
      />
    );
  });
  const waitingForPage =
    displayMode === 'page' &&
    !isLoading &&
    !error &&
    visibleProducts.length === 0 &&
    products.length > 0 &&
    (hasNextPage || isFetchingMore);

  const handleLoadMore = async () => {
    setDisplayMode('append');
    await loadMore();
  };

  const handlePageChange = (page: number) => {
    setDisplayMode('page');
    setCurrentPage(page);
  };

  if (!categories.length) {
    return null;
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3 className="HeadlineH2">Каталог</h3>
        <Link
          className={`ButtonBut2-medium ProductsCatalog-link-header ${styles.chipsCarouselLink}`}
          href="/categories"
        >
          Перейти в каталог
        </Link>
      </header>

      <div className={styles.chipsCarousel} ref={carouselRef}>
        <motion.div
          className={styles.chipsTrack}
          ref={innerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {chips}
        </motion.div>
        <Link
          className={`ButtonBut2-medium ProductsCatalog-link-carousel ${styles.chipsCarouselLink}`}
          href="/categories"
        >
          Перейти в каталог
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.list}>
          <p className="BodyB2">Loading...</p>
        </div>
      ) : error ? (
        <div className={styles.list}>
          <p className="BodyB2">Failed to load. Try later.</p>
        </div>
      ) : waitingForPage ? (
        <div className={styles.list}>
          <p className="BodyB2">Loading...</p>
        </div>
      ) : (
        <>
        <ProductsCatalogList
          key={activeIndex === 0 ? 'ALL' : activeSlug}
          className={styles.list}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingMore}
          onLoadMore={handleLoadMore}
        >
          {cards}
        </ProductsCatalogList>
        {/*<Pagination*/}
        {/*  pageCount={pageCount}*/}
        {/*  page={effectivePage}*/}
        {/*  onPageChange={handlePageChange}*/}
        {/*/>*/}
        </>
      )}
    </section>
  );
}
