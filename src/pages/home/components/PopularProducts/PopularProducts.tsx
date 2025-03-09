import styles from './PopularProducts.module.scss';
import Chip from '@/shared/ui/Chip/Chip';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import Link from 'next/link';

export default function PopularProducts() {
  return (
    <section className={`${styles.container} block-limiter`}>
      <header className={styles.header}>
        <h2 className={`heading ${styles.title}`}>Популярные товары</h2>
        <div className={styles.chips}>
          <Chip>Плинтус</Chip>
          <Chip>Для потолка</Chip>
          <Chip>С подстветкой</Chip>
          <Chip>Для стеновых панелей</Chip>
          <Chip>Полки</Chip>
        </div>
      </header>

      <div className={styles.list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <Link className={styles.link} href={'#/'}>
        Смотреть все товары
      </Link>
    </section>
  );
}
