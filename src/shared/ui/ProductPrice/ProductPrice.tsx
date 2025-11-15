import type { HTMLAttributes } from 'react';
import styles from './ProductPrice.module.scss';
import { parseMoney } from '@/shared/lib/money';

type MoneyValue = string | number | null | undefined;
type PriceRangeValue = { min?: MoneyValue; max?: MoneyValue };
export type PriceValue = MoneyValue | PriceRangeValue;

interface ProductPriceProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  regularPrice?: PriceValue;
  salePrice?: PriceValue;
  minSalePrice?: MoneyValue;
  onSale?: boolean | null;
}

function isRangeValue(value: PriceValue): value is PriceRangeValue {
  if (!value || typeof value !== 'object') return false;
  return 'min' in value || 'max' in value;
}

function toNumber(value: MoneyValue): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = parseMoney(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function formatNumber(value: number | null): string | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded
    .toFixed(2)
    .replace(/\.00$/, '')
    .replace(/(\.\d)0$/, '$1');
}

function formatPrice(value?: PriceValue): string | null {
  if (!value) return null;

  if (isRangeValue(value)) {
    const min = toNumber(value.min ?? value.max ?? null);
    const max = toNumber(value.max ?? value.min ?? null);
    if (min === null && max === null) return null;

    if (min !== null && max !== null) {
      const lower = Math.min(min, max);
      const upper = Math.max(min, max);
      if (Math.abs(upper - lower) > 0.009) {
        return `${formatNumber(lower)} – ${formatNumber(upper)}`;
      }
      return formatNumber(lower);
    }

    return formatNumber(min ?? max);
  }

  return formatNumber(toNumber(value));
}

export default function ProductPrice({
  regularPrice,
  salePrice,
  minSalePrice,
  onSale,
  ...props
}: ProductPriceProps) {
  const regularDisplay = formatPrice(regularPrice);
  if (!regularDisplay) return null;

  const saleDisplay = onSale ? formatPrice(salePrice) : null;
  const minSaleDisplay = onSale ? formatNumber(toNumber(minSalePrice)) : null;

  return (
    <div className="containerPrice" {...props}>
      {saleDisplay ? (
        <div className={styles.productPriceSale}>
          <div>
            <p className="HeadlineH5">
              <span>{saleDisplay}</span> руб / <span>пог. метр</span>
            </p>
            {minSaleDisplay && (
              <p className={styles.saleMeta}>
                <span className="BodyB2">
                  от <span>{minSaleDisplay}</span> руб / <span>пог. метр</span>
                </span>
              </p>
            )}
          </div>
          <p className={styles.productPrice}>
            <span>{regularDisplay}</span> руб / <span>пог. метр</span>
          </p>
        </div>
      ) : (
        <div>
          <p className="HeadlineH5">
            <span>{regularDisplay}</span> руб / <span>пог. метр</span>
          </p>
        </div>
      )}
    </div>
  );
}
