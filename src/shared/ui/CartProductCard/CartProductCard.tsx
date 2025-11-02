'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CartProductCard.module.scss';
import type { CartSimpleProduct } from '@/entities/product/types';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { toast } from 'react-toastify';
import { useCart } from '@/entities/cart/model/useCart';
import { parseMoney } from '@/shared/lib/money';
import { useAppSelector } from '@/shared/model/hooks';
import { selectCartItemByProductId } from '@/entities/cart/model/cartSelectors';

export type CartProductCardProps = {
  product: CartSimpleProduct;
  productKey: string;
  quantity: number;
  lineTotal?: string | null;
};

export default function CartProductCard({
  product,
  productKey,
  quantity,
  lineTotal,
}: CartProductCardProps) {
  const { remove, updateQuantity } = useCart();
  const productId = product.databaseId;
  const cartItem = useAppSelector(
    selectCartItemByProductId(productId ?? undefined),
  );
  const resolvedKey = cartItem?.key ?? productKey;
  const serverQuantity = cartItem?.quantity ?? quantity;
  const serverLineTotal = cartItem?.total ?? lineTotal;
  const [qty, setQty] = useState<number>(serverQuantity ?? 1);
  const [updatingQty, setUpdatingQty] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer =
      typeof window !== 'undefined'
        ? window.setTimeout(() => {
            setQty(serverQuantity ?? 1);
            setUpdatingQty(false);
          }, 0)
        : null;

    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [serverQuantity]);

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1 || newQty === qty || updatingQty) return;
    setQty(newQty);
  };

  useEffect(() => {
    if (!resolvedKey) return;
    if (qty === (serverQuantity ?? qty)) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = null;
    }

    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      setUpdatingQty(true);

      updateQuantity(resolvedKey, qty)
        .then(() => {
          setUpdatingQty(false);
        })
        .catch((e) => {
          setUpdatingQty(false);
          setQty(serverQuantity ?? 1);
          toast.error(
            e?.message?.length
              ? e.message
              : 'Не удалось обновить количество товара в корзине',
          );
        });
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }
    };
  }, [qty, resolvedKey, updateQuantity, serverQuantity]);

  const lineTotalValue = useMemo(() => {
    if (serverLineTotal) {
      const parsed = parseMoney(serverLineTotal);
      if (Number.isFinite(parsed)) return parsed;
    }

    const unitPrice = product.onSale
      ? parseMoney(product.salePrice ?? product.regularPrice ?? 0)
      : parseMoney(product.regularPrice ?? 0);

    const computed = unitPrice * qty;
    return Number.isFinite(computed) ? computed : 0;
  }, [
    serverLineTotal,
    product.onSale,
    product.regularPrice,
    product.salePrice,
    qty,
  ]);

  const formattedLineTotal = useMemo(() => {
    const normalized = Number.isFinite(lineTotalValue) ? lineTotalValue : 0;
    return new Intl.NumberFormat('ru-RU').format(normalized);
  }, [lineTotalValue]);

  const handleDelete = async () => {
    if (!resolvedKey) return;
    remove(resolvedKey)
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
              onChangeAction={handleQtyChange}
              onRemoveAction={handleDelete}
              disabled={updatingQty}
            />
          </div>
          <p className={`${styles.productTotal} HeadlineH5`} aria-live="polite">
            <span>Итого:</span> <span>{formattedLineTotal}</span> ₽
          </p>
        </div>
      </div>
    </article>
  );
}
