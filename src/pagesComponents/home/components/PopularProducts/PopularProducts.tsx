'use client';

import styles from './PopularProducts.module.scss';

import Link from 'next/link';
import Chip from '@/shared/ui/Chip/Chip';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import { useState } from 'react';
import { useSuspenseQuery } from '@apollo/client';
import { getPopularProductCategories } from '@/lib/queries/Catalog';

interface Product {
  id: string;
  name: string;
  price: string;
  image: { sourceUrl: string };
}

interface Category {
  node: {
    id: string;
    name: string;
    products: {
      edges: { node: Product }[];
    };
  };
}

interface PopularProductsProps {
  productCategories: { edges: Category[] };
}

export default function PopularProducts() {
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const { data } = useSuspenseQuery<PopularProductsProps>(
    getPopularProductCategories,
  );

  if (!data) return null;

  const categoryEdge = data.productCategories.edges[categoryIndex];

  if (!categoryEdge) return null;

  const setActiveChip = (index: number) => {
    setCategoryIndex(index);
  };

  const listChips = data.productCategories.edges.map((category, index) => (
    <Chip
      onClick={() => setActiveChip(index)}
      {...(categoryIndex === index
        ? { 'data-active': 'active' }
        : { 'data-active': 'inactive' })}
      key={category.node.id}
    >
      {category.node.name}
    </Chip>
  ));

  const listProductCards = categoryEdge.node.products.edges.map(({ node }) => {
    return <ProductCard key={node.id} />;
  });

  return (
    <section className={`${styles.container} block-limiter`}>
      <header className={styles.header}>
        <h2 className={`heading ${styles.title}`}>
          <span>Популярные</span>
          <span>товары</span>
        </h2>
        <div className={styles.chips}>{listChips}</div>
      </header>

      <div className={styles.list}>{listProductCards}</div>

      <Link className={styles.link} href="/public#">
        Смотреть все товары
      </Link>
    </section>
  );
}
