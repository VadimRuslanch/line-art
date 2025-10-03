'use client';

import styles from './PopularProducts.module.scss';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductCard from '@/features/product/ui/ProductCard/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCategoryWithProduct } from '@/entities/category/model/useCategoryWithProduct';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import PopularProductsCardList from '@/widgets/Pages/HomePage/PopularProducts/PopularProductsCardList/PopularProductsCardList';

export default function PopularProducts() {
  const { categories } = useCategoryWithProduct();
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
  const products = categories?.[active]?.contentNodes?.nodes ?? [];
  const cards = products
    .filter((product) => isSimpleProduct(product))
    .map((product) => (
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
      <PopularProductsCardList className={styles.list} resetOn={active} pageSize={8}>
        {cards}
      </PopularProductsCardList>
    </section>
  );
}
