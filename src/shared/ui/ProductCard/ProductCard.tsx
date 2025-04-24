import styles from './ProductCard.module.scss';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import Image from 'next/image';
import { ProductWithCategoriesFragment } from '@/generated/graphql';
import Link from 'next/link';

export default function ProductCard({
  product,
}: {
  product: ProductWithCategoriesFragment;
}) {
  const replacePrice = (price: string): string => {
    return price.replace(/&nbsp;/g, ' ');
  };

  return (
    <article>
      <Link href={product.uri!} className={styles.card}>
        <Image
          width={388}
          height={372}
          src={product.image?.sourceUrl ?? ''}
          className={styles.image}
          alt={product.image?.altText ?? ''}
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
          <h3 className={styles.productTitle}>{product.name}</h3>

          {!product.onSale && (
            <div>
              <p>
                <span>{replacePrice(product.regularPrice!)}</span> /{' '}
                <span>метр</span>
              </p>
            </div>
          )}

          {product.onSale && (
            <div className={styles.productPriceSale}>
              <p>
                <span>{replacePrice(product.salePrice!)}</span> /{' '}
                <span>метр</span>
              </p>

              <p className={styles.productPrice}>
                <span>{replacePrice(product.regularPrice!)}</span> /{' '}
                <span>метр</span>
              </p>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
