'use client';

import styles from './ProductCard.module.scss';
import clsx from 'clsx';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import { ProductWithCategoriesFragment } from '@/generated/graphql';

import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import { useCart } from '@/app/features/cart/hooks/useCart';

export interface ProductProduct extends ProductWithCategoriesFragment {
  inCart: boolean;
  key?: string;
}

export default function ProductCard({ product }: { product: ProductProduct }) {
  const handleAdd = async () => {
    if (product.inCart) {
      console.log(product.key);
      await remove(product.key!);
    } else {
      await add(product.databaseId);
    }
  };

  const { add, remove, loading } = useCart();

  return (
    <article className={styles.card}>
      <div className={styles.productActions} role="toolbar">
        <button type="button" className={styles.productButton}>
          <IconHeart className={styles.productIcon} />
        </button>
        <button
          type="button"
          onClick={handleAdd}
          disabled={loading}
          className={styles.productButton}
        >
          <IconCart
            className={clsx(
              styles.productIcon,
              product.inCart && styles.inCartIcon,
            )}
          />
        </button>
        <button type="button" className={styles.productButton}>
          <IconChart className={styles.productIcon} />
        </button>
      </div>

      <Link href={product.uri!} className={styles.cardContainer}>
        <Image
          width={388}
          height={372}
          src={product.image?.sourceUrl ?? ''}
          className={styles.image}
          alt={product.image?.altText ?? ''}
        />

        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.name}</h3>

          <div className={styles.productPrice}>
            <ProductPrice
              regularPrice={product.regularPrice!}
              salePrice={product.salePrice}
              onSale={product.onSale!}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
