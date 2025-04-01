'use client';

import styles from './SideMenuComponen.module.scss';
import { useMenu } from '@/context/MenuContext';
import { useState } from 'react';
import { useSuspenseQuery } from '@apollo/client';
import { getProductCategories } from '@/lib/queries/Catalog';
import { ICatalogProducts } from '@/interface/api/ICatalog';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideMenuComponent() {
  const { isMenuOpen } = useMenu();
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [subcategoryIndex, setSubcategoryIndex] = useState<number>(0);

  const menuVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.4, ease: 'easeIn' },
    },
    exit: {
      clipPath: 'inset( 0% 100% 0% 0% )',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const { data } = useSuspenseQuery<ICatalogProducts>(getProductCategories);

  const catalogCategoryData = data.productCategories.nodes;

  const catalogSubcategoryData =
    catalogCategoryData[categoryIndex]?.children?.nodes ?? [];

  const setIndexActiveCategory = (index: number) => {
    setCategoryIndex(index);
  };

  const setIndexActiveSubcategory = (index: number) => {
    setSubcategoryIndex(index);
  };

  const catalogCategoryElements = catalogCategoryData.map((category, index) => (
    <li
      key={category.id}
      onMouseEnter={() => setIndexActiveCategory(index)}
      className={styles.catalogItem}
    >
      {category.name}
    </li>
  ));

  const catalogSubcategoryElements = catalogSubcategoryData.map(
    (category, index) => (
      <li
        key={category.id}
        className={styles.catalogItem}
        onMouseEnter={() => setIndexActiveSubcategory(index)}
      >
        {category.name}
      </li>
    ),
  );

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className={styles.container}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.menuItems}>
            <nav className={styles.menuItem}>
              <div className={styles.titleContainer}>
                <span className={styles.title}>Меню</span>
                <span className={styles.titleNumber}>01</span>
              </div>
              <button className={styles.button}></button>
            </nav>
            <nav className={styles.menuItem}>
              <div className={styles.titleContainer}>
                <span className={styles.title}>Каталог товаров</span>
                <span className={styles.titleNumber}>02</span>
              </div>
              <ul>{catalogCategoryElements}</ul>
            </nav>
            <nav className={styles.menuItem}>
              <div className={styles.titleContainer}>
                <span className={styles.title}>Каталог товаров</span>
                <span className={styles.titleNumber}>02</span>
              </div>
              <ul>{catalogSubcategoryElements}</ul>
            </nav>
          </div>
          {catalogSubcategoryData[subcategoryIndex] && (
            <Image
              src={catalogSubcategoryData[subcategoryIndex].image.sourceUrl}
              alt="art"
              className={styles.image}
              width={602}
              height={770}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
