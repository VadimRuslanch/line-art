'use client';

import styles from './ProductsCatalog.module.scss';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProductsCatalogList from '@/widgets/Pages/HomePage/ProductsCatalog/ProductsCatalogList/ProductsCatalogList';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

export default function ProductsCatalog() {
  const { popular } = useGetHomeCatalog();
  const categories = popular.categories;
  const [active, setActive] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (carouselRef.current && innerRef.current) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        const scrollable = innerWidth - carouselWidth;
        setWidth(scrollable > 0 ? scrollable : 0);
      }
    });

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      if (categories.length === 0) {
        setActive(0);
        return;
      }

      setActive((prev) => (prev < categories.length ? prev : 0));
    };

    const timer =
      typeof window !== 'undefined' ? window.setTimeout(update, 0) : null;

    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [categories.length]);

  const chips = categories.map((c, i) => (
    <UIChip
      key={c.id}
      onClick={() => setActive(i)}
      data-active={i === active ? 'active' : ''}
      data-type={'default'}
    >
      {c.name}
    </UIChip>
  ));

  if (!categories || categories.length === 0) return null;
  const products = categories?.[active]?.products ?? [];
  const cards = products.map((product) => (
    <ProductCard key={product.databaseId} product={product} />
  ));

  return (
    <section className={`${styles.container}`}>
      <header className={styles.header}>
        <h3 className="HeadlineH2">Каталог</h3>
      </header>

      <div className={styles.chipsCarousel} ref={carouselRef}>
        <motion.div
          className={styles.chipsTrack}
          ref={innerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {chips}
        </motion.div>
      </div>
      <ProductsCatalogList
        className={styles.list}
        resetOn={active}
        pageSize={8}
      >
        {cards}
      </ProductsCatalogList>
    </section>
  );
}
