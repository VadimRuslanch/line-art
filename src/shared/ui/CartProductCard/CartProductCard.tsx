'use client';

import React, { useState } from 'react';
import styles from './CartProductCard.module.scss';
import { ProductWithCategoriesFragment } from '@/generated/graphql';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { toast } from 'react-toastify';
import { useCart } from '@/app/features/cart/hooks/useCart';

export type CartProductCardProps = {
  product: ProductWithCategoriesFragment;
  productKey: string;
  quantity: number;
};

export default function CartProductCard({
  product,
  productKey,
  quantity,
}: CartProductCardProps) {
  const { remove } = useCart();

  console.log(quantity);
  const [qty, setQty] = useState<number>(quantity);

  const handleQtyChange = (newQty: number) => {
    setQty(newQty);
  };

  const handleDelete = async () => {
    remove(productKey)
      .then(() => {
        toast.success('Товар удалён из корзины');
      })
      .catch((e) => {
        toast.error(e.message || 'Ошибка удаления');
      });
  };

  return (
    <article className={styles.card}>
      <button
        className={styles.buttonDelete}
        onClick={handleDelete}
        aria-label="Удалить товар"
      >
        <IconClose />
      </button>

      <div className={styles.cardContainer}>
        {product.image?.sourceUrl && (
          <Link href={product.uri ?? '#'}>
            <Image
              className={styles.image}
              width={609}
              height={322}
              src={product.image.sourceUrl}
              alt={product.image?.altText ?? product.name ?? 'Изображение'}
            />
          </Link>
        )}

        <div className={styles.productInfo}>
          <Link href={product.uri ?? '#'} className={styles.productLink}>
            <h3 className={styles.productTitle}>{product.name}</h3>
          </Link>

          {product.description && (
            <div
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          <div className={styles.productControls}>
            <div className={styles.productPrice}>
              <ProductPrice
                regularPrice={product.regularPrice!}
                salePrice={product.salePrice}
                onSale={product.onSale!}
                data-font-size="big"
              />
            </div>
            <QuantitySelector
              min={1}
              max={100}
              value={qty}
              onChange={handleQtyChange}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
