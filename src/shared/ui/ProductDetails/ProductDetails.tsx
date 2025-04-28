'use client';

import styles from './ProductDetails.module.scss';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';

import { useState } from 'react';
import { useDetailsProduct } from '@/app/features/product/details/hook/useDetailsProduct';
import ButtonToBack from '@/shared/ui/ButtonToBack/ButtonToBack';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';

export default function ProductDetails({ slug }: { slug: string }) {
  const { product } = useDetailsProduct(slug);
  if (!product) return <p>Товар не найден</p>;
  if (!isSimpleProduct(product))
    return <p>Этот тип товара пока не поддерживается</p>;

  const [qty, setQty] = useState<number>(1);

  return (
    <div className={`${styles.container} block-limiter`}>
      <ButtonToBack />

      <div className={styles.cart}>
        <ImagesPreview
          image={product.image}
          galleryImages={product.galleryImages}
        />

        <div className={styles.cardLeft}>
          <Breadcrumbs nameProduct={product.name} />

          <div className={styles.product}>
            <div className={styles.actions}>
              <button className={styles.actionsButton}>
                <IconChart />
                Сравнить
              </button>
              <button className={styles.actionsButton}>
                <IconHeart />
                Избранное
              </button>
            </div>

            <div className={styles.info}>
              <h1 className={styles.title}>{product.name}</h1>
              {product.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>

            <div className={styles.actionsCard}>
              <div className={styles.price}>
                <ProductPrice
                  regularPrice={product.regularPrice!}
                  salePrice={product.salePrice}
                  onSale={product.onSale!}
                />
              </div>

              <div className={styles.cartContainer}>
                <QuantitySelector
                  min={1}
                  max={100}
                  initial={1}
                  onChange={(v) => setQty(v)}
                />
                <button className={styles.cartAddButton}>
                  <IconCart />
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
