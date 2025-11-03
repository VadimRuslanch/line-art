'use client';

import styles from './ProductsCatalog.module.scss';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import ProductsCatalogList from '@/widgets/Pages/HomePage/ProductsCatalog/ProductsCatalogList/ProductsCatalogList';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import {
  GetProductListCategoryDocument,
  type GetProductListCategoryQuery,
  type GetProductListCategoryQueryVariables,
} from '@/shared/api/gql/graphql';
import { useQuery } from '@apollo/client/react';
import type { CategorySimpleProduct } from '@/entities/product/types';

const PRODUCTS_PER_CATEGORY = 12;

export default function ProductsCatalog() {
  const { categories: fetchedCategories } = useGetCategoriesCatalog();
  const categories = useMemo(
    () => fetchedCategories.filter((category) => Boolean(category.slug)),
    [fetchedCategories],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [currentProducts, setCurrentProducts] = useState<
    CategorySimpleProduct[]
  >([]);

  const activeCategory = categories[activeIndex] ?? null;
  const activeSlug = activeCategory?.slug ?? null;

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!categories.length) {
        setActiveIndex(0);
        return;
      }

      setActiveIndex((prev) => (prev < categories.length ? prev : 0));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [categories.length]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!activeSlug) {
        setCurrentProducts([]);
        setIsCategoryLoading(false);
        return;
      }

      setIsCategoryLoading(true);
      setCurrentProducts([]);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSlug]);

  const {
    data,
    loading,
    error: categoryError,
  } = useQuery<
    GetProductListCategoryQuery,
    GetProductListCategoryQueryVariables
  >(GetProductListCategoryDocument, {
    variables: {
      n: PRODUCTS_PER_CATEGORY,
      after: null,
      slug: activeSlug ?? '',
      where: null,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    skip: !activeSlug,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (loading || !activeSlug) return;

    const frame = window.requestAnimationFrame(() => {
      const nodes = (data?.productCategory?.products?.nodes ??
        []) as (CategorySimpleProduct | null | undefined)[];

      const simpleProducts = nodes.filter(
        (node): node is CategorySimpleProduct =>
          !!node && node.__typename === 'SimpleProduct',
      );

      setCurrentProducts(simpleProducts);
      setIsCategoryLoading(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [loading, data, activeSlug]);

  useEffect(() => {
    if (!categoryError) return;

    const frame = window.requestAnimationFrame(() => {
      setIsCategoryLoading(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [categoryError]);

  const chips = categories.map((category, index) => (
    <UIChip
      key={category.id}
      onClick={() => setActiveIndex(index)}
      data-active={index === activeIndex ? 'active' : ''}
      data-type="default"
    >
      {category.name}
    </UIChip>
  ));

  const cards = currentProducts.map((product, index) => (
    <ProductCard
      key={product.id ?? `db-${product.databaseId ?? index}`}
      product={product}
    />
  ));

  if (!categories.length) {
    return null;
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3 className="HeadlineH2">Каталог товаров</h3>
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
      </div>

      {isCategoryLoading ? (
        <div className={styles.list}>
          <p className="BodyB2">Загружаем товары…</p>
        </div>
      ) : categoryError ? (
        <div className={styles.list}>
          <p className="BodyB2">
            Не удалось загрузить товары. Попробуйте позже.
          </p>
        </div>
      ) : (
        <ProductsCatalogList
          className={styles.list}
          resetOn={activeSlug}
          pageSize={8}
        >
          {cards}
        </ProductsCatalogList>
      )}
    </section>
  );
}
