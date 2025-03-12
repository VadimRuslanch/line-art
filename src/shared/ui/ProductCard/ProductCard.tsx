import styles from './ProductCard.module.scss';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import Image from 'next/image';

export default function ProductCard() {
  return (
    <article className={styles.card}>
      <Image
        width={388}
        height={372}
        src="/images/product.png"
        className={styles.image}
        alt="Название товара"
      />

      <div className={styles.productActions} role="toolbar">
        <button type="button" className={styles.productButton}>
          <IconHeart className={styles.productIcon} />
        </button>
        <button type="button" className={styles.productButton}>
          <IconCart className={styles.productIcon} />
        </button>
        <button type="button" className={styles.productButton}>
          <IconChart className={styles.productIcon} />
        </button>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>
          Теневой плинтус LINEART ALUMO SC 1211 золотой
        </h3>
        <p className={styles.productPrice}>
          <span>1277₽</span> / <span>метр</span>
        </p>
      </div>
    </article>
  );
}
