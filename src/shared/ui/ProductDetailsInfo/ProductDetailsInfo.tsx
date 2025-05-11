'use client';

import styles from './ProductDetailsInfo.module.scss';
import {
  PRODUCT_INFO_ITEMS,
  TProductDetailsInfo,
} from '@/shared/ui/ProductDetailsInfo/types/types';
import Chip from '@/shared/ui/Chip/Chip';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProductDetailsInfoDelivery from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoDelivery';

export default function ProductDetailsInfo() {
  const [active, setActive] = useState<TProductDetailsInfo>('DELIVERY');
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
  const Chips = PRODUCT_INFO_ITEMS.map(({ type, label }) => (
    <Chip
      data-active={active === type}
      data-type="light"
      key={type}
      onClick={() => setActive(type)}
    >
      {label}
    </Chip>
  ));
  return (
    <section className={styles.container}>
      <div className="block-limiter">
        <div className={styles.top} ref={carouselRef}>
          <motion.div
            className={styles.chipsTrack}
            ref={innerRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {Chips}
          </motion.div>
        </div>

        <div className={styles.bottom}>
          <ProductDetailsInfoDelivery />
        </div>
      </div>
    </section>
  );
}
