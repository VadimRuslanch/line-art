'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CartProductCard.module.scss';
import type {
  CartSimpleProduct,
  CartVariableProduct,
} from '@/entities/product/types';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { toast } from 'react-toastify';
import { useCart } from '@/entities/cart/model/useCart';
import type { CartVariationDisplayAttribute } from '@/entities/cart/model/useCart';

const COLOR_ATTRIBUTE_KEYS = new Set(['pa_color', 'color']);

type AttributeTermNode = {
  name?: string | null;
  slug?: string | null;
  value?: string | null;
} | null;

type AttributeNode = {
  name?: string | null;
  label?: string | null;
  terms?: {
    nodes?: AttributeTermNode[];
  } | null;
} | null;

function normalizeAttributeKey(name?: string | null) {
  return name
    ?.trim()
    .replace(/^attribute_pa_/i, 'pa_')
    .replace(/^attribute_/i, '')
    .trim()
    .toLowerCase();
}

function normalizeSlug(value?: string | null) {
  return value?.trim().toLowerCase();
}

function resolveAttributeTermLabel(
  product: CartProduct,
  attributeKey: string,
  slugValue?: string | null,
) {
  const normalizedKey = normalizeAttributeKey(attributeKey);
  const normalizedSlug = normalizeSlug(slugValue);
  if (!normalizedKey || !normalizedSlug) return null;

  const nodes =
    (product.attributes?.nodes as AttributeNode[] | undefined | null) ?? [];

  for (const attribute of nodes) {
    if (!attribute) continue;
    const attrKey = normalizeAttributeKey(attribute.name ?? attribute.label);
    if (!attrKey || attrKey !== normalizedKey) continue;

    const terms = (attribute.terms?.nodes ?? []) as AttributeTermNode[];
    const term = terms.find((candidate) => {
      const candidateSlug = normalizeSlug(candidate?.slug ?? candidate?.value);
      return candidateSlug && candidateSlug === normalizedSlug;
    });
    if (term?.name) return term.name;
  }

  return null;
}
import { parseMoney } from '@/shared/lib/money';
import { useAppSelector } from '@/shared/model/hooks';
import { makeSelectCartItemByKey } from '@/entities/cart/model/cartSelectors';

type CartProduct = CartSimpleProduct | CartVariableProduct;

type VariationPricing = {
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale?: boolean | null;
};

export type CartProductCardProps = {
  product: CartProduct;
  productKey: string;
  quantity: number;
  lineTotal?: string | null;
  variationPricing?: VariationPricing | null;
  variationAttributes?: CartVariationDisplayAttribute[] | null;
};

export default function CartProductCard({
  product,
  productKey,
  quantity,
  lineTotal,
  variationPricing,
  variationAttributes,
}: CartProductCardProps) {
  const { remove, updateQuantity } = useCart();
  const cartItemSelector = useMemo(
    () => makeSelectCartItemByKey(productKey),
    [productKey],
  );
  const cartItem = useAppSelector(cartItemSelector);
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

  const unitPrice = useMemo(() => {
    const quantityValue =
      typeof serverQuantity === 'number' && serverQuantity > 0
        ? serverQuantity
        : null;
    if (!quantityValue) return null;

    const normalizedTotal = Number.isFinite(lineTotalValue)
      ? lineTotalValue
      : null;
    if (normalizedTotal === null) return null;

    const perUnit = normalizedTotal / quantityValue;
    return Number.isFinite(perUnit) ? perUnit : null;
  }, [lineTotalValue, serverQuantity]);

  const baseRegularPrice = product.regularPrice ?? product.price ?? null;
  const baseSalePrice = product.salePrice ?? null;
  const baseOnSale = product.onSale ?? null;

  const priceDisplay = useMemo(() => {
    if (variationPricing) {
      const regularValue =
        variationPricing.regularPrice ??
        (!variationPricing.onSale ? variationPricing.price : null) ??
        unitPrice ??
        baseRegularPrice;
      const saleValue = variationPricing.onSale
        ? (variationPricing.salePrice ?? variationPricing.price ?? null)
        : null;
      const onSaleValue =
        typeof variationPricing.onSale === 'boolean'
          ? variationPricing.onSale
          : Boolean(saleValue && regularValue && saleValue !== regularValue);

      return {
        regularPrice: regularValue ?? baseRegularPrice ?? unitPrice,
        salePrice: saleValue,
        onSale: onSaleValue,
      };
    }

    if (unitPrice !== null) {
      return {
        regularPrice: unitPrice,
        salePrice: null,
        onSale: false,
      };
    }

    return {
      regularPrice: baseRegularPrice,
      salePrice: baseSalePrice,
      onSale: baseOnSale,
    };
  }, [
    variationPricing,
    unitPrice,
    baseRegularPrice,
    baseSalePrice,
    baseOnSale,
  ]);

  const colorValue = useMemo(() => {
    if (!variationAttributes?.length) return null;

    for (const attribute of variationAttributes) {
      if (!attribute) continue;
      if (!attribute.key || !COLOR_ATTRIBUTE_KEYS.has(attribute.key)) continue;

      const resolvedLabel = resolveAttributeTermLabel(
        product,
        attribute.key,
        attribute.value ?? attribute.label ?? undefined,
      );

      return resolvedLabel ?? attribute.label ?? attribute.value ?? null;
    }

    return null;
  }, [variationAttributes, product]);

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

          {colorValue && (
            <p className={`${styles.productVariant} BodyB2`}>
              <span>Цвет:&nbsp;</span>
              <span>{colorValue}</span>
            </p>
          )}

          <div className={styles.productControls}>
            <div className={styles.productPrice}>
              <ProductPrice
                regularPrice={priceDisplay.regularPrice ?? undefined}
                salePrice={priceDisplay.salePrice ?? undefined}
                onSale={priceDisplay.onSale ?? undefined}
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
