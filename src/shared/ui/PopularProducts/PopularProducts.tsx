'use client';

import styles from './PopularProducts.module.scss';

import Link from 'next/link';
import Chip from '@/shared/ui/Chip/Chip';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCategoriesProductsPopular } from '@/app/features/category/popular/hooks/useCategoriesProductsPopular';

export default function PopularProducts() {
  const { categories } = useCategoriesProductsPopular();
  const [active, setActive] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

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

  const chips = categories.map((c, i) => (
    <Chip
      key={c.id}
      onClick={() => setActive(i)}
      data-active={i === active ? 'active' : 'inactive'}
      data-type="dark"
    >
      {c.name}
    </Chip>
  ));

  if (!categories || categories.length === 0) return null;
  const activeCategory = categories[active];
  if (!activeCategory) return null;
  const { products } = activeCategory;
  if (!products || products.length === 0) return null;

  const cards = products.map((product) => (
    <ProductCard key={product.databaseId} product={product} />
  ));

  return (
    <section className={`${styles.container} block-limiter`}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <span className="heading">Популярные&nbsp;</span>
          <span className="heading">товары</span>
        </h2>

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
      </header>

      <div className={styles.list}>{cards}</div>

      <Link className={styles.link} href="/catalog">
        Смотреть все товары
      </Link>
    </section>
  );
}
