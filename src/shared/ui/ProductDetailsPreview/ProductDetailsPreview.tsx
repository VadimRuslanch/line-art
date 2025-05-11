'use client';

import styles from './ProductDetailsPreview.module.scss';
import IconChart from '@/shared/assets/svg/chart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
import IconHeart from '@/shared/assets/svg/heart.svg';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useProductDetails } from '@/app/features/product/details/hook/useProductDetails';
import ButtonToBack from '@/shared/ui/ButtonToBack/ButtonToBack';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/app/features/cart/hooks/useCart';

export default function ProductDetailsPreview({ slug }: { slug: string }) {
  const { product } = useProductDetails(slug);

  const quantityInCart = product?.quantity ?? 0;

  if (!product) return <p>Товар не найден</p>;
  if (!isSimpleProduct(product))
    return <p>Этот тип товара пока не поддерживается</p>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [qty, setQty] = useState<number>(quantityInCart);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (quantityInCart >= 0) setQty(quantityInCart);
  }, [quantityInCart]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { add, loading, error } = useCart();

  const handleAddToCart = () => {
    add(product.databaseId, qty)
      .then(() => {
        toast.success('Товар добавлен в корзину');
      })
      .catch((e) => {
        toast.error(e.message || 'Ошибка добавления');
      });
  };

  console.log(product.galleryImages);

  return (
    <div className={styles.container}>
      <ButtonToBack />

      <div className={styles.cart}>
        <ImagesPreview
          image={product.image!}
          galleryImages={product.galleryImages ?? undefined}
        />

        <div className={styles.cardLeft}>
          <Breadcrumbs nameProduct={product.name!} />

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
                  min={0}
                  max={100}
                  value={qty}
                  onChange={setQty}
                />

                <button
                  className={styles.cartAddButton}
                  onClick={handleAddToCart}
                  disabled={loading}
                  aria-label="Добавить в корзину"
                >
                  <IconCart />
                  {loading ? 'Добавляем…' : 'Добавить в корзину'}
                </button>
              </div>

              {error && (
                <p className={styles.error}>
                  Не удалось добавить товар: {error.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
