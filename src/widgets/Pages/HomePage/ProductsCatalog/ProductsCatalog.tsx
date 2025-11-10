'use client';

import styles from './ProductsCatalog.module.scss';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import ProductsCatalogList from '@/widgets/Pages/HomePage/ProductsCatalog/ProductsCatalogList/ProductsCatalogList';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import { useGetProductListCategory } from '@/features/product/product-list/list-category/model/useGetProductListCategory';
import { useGetProductListAll } from '@/features/product/product-list/list-all/model/useGetProductListAll';
import type { ProductNode } from '@/features/product/product-list/model/useProductList';
import Link from 'next/link';

const PRODUCTS_PER_CATEGORY = 12;
const PRIMARY_CATEGORY_SLUGS: string[] = ['dlya-potolka', 'dlya-steny'];

type WithSlug = { slug?: string | null };

const isSimpleProductNode = (
  product: ProductNode | null | undefined,
): product is Extract<ProductNode, { __typename: 'SimpleProduct' }> => {
  return product?.__typename === 'SimpleProduct';
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

  const allHook = useGetProductListAll({ pageSize: PRODUCTS_PER_CATEGORY });
  const categoryHook = useGetProductListCategory({
    slug: activeSlug,
    pageSize: PRODUCTS_PER_CATEGORY,
  });

  const activeHook = activeIndex === 0 ? allHook : categoryHook;

  const products = useMemo(
    () => activeHook.products.filter(isSimpleProductNode),
    [activeHook.products],
  );

  const isLoading = activeHook.isInitialLoading;
  const error = activeHook.error;

  const refetchCategory = categoryHook.refetch;

  useEffect(() => {
    if (activeIndex !== 0 && activeSlug) {
      refetchCategory?.();
    }
  }, [activeIndex, activeSlug, refetchCategory]);

  const chips = [
    <UIChip
      key="all"
      onClick={() => setActiveIndex(0)}
      data-active={activeIndex === 0 ? 'active' : ''}
      data-type="default"
    >
      Все товары
    </UIChip>,
    ...categories.map((category, index) => (
      <UIChip
        key={category.id}
        onClick={() => setActiveIndex(index + 1)}
        data-active={index + 1 === activeIndex ? 'active' : ''}
        data-type="default"
      >
        {category.name}
      </UIChip>
    )),
  ];

  const cards = products.map((product, index) => {
    return (
      <ProductCard
        key={product?.id ?? `db-${product?.databaseId ?? index}`}
        product={product}
      />
    );
  });

  if (!categories.length) {
    return null;
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3 className="HeadlineH2">
          {'\u041a\u0430\u0442\u0430\u043b\u043e\u0433'}
        </h3>
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
          className={`ButtonBut2-medium ${styles.chipsCarouselLink}`}
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
      ) : (
        <ProductsCatalogList
          key={activeIndex === 0 ? 'ALL' : activeSlug}
          className={styles.list}
          resetOn={activeIndex === 0 ? 'ALL' : activeSlug}
          pageSize={8}
        >
          {cards}
        </ProductsCatalogList>
      )}
    </section>
  );
}
