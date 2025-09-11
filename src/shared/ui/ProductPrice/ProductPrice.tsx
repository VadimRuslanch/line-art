import styles from './ProductPrice.module.scss';
import { parseMoney } from '@/features/catalog-filters/model/utils';

interface ProductPriceProps {
  regularPrice?: string;
  salePrice?: string | null;
  onSale?: boolean;
}

export default function ProductPrice({
  regularPrice,
  salePrice,
  onSale,
  ...props
}: ProductPriceProps) {
  if (!regularPrice) return null;
  return (
    <div className="containerPrice" {...props}>
      {onSale ? (
        <div className={styles.productPriceSale}>
          {salePrice && (
            <p>
              <span>{parseMoney(salePrice)}</span> ₽ / <span>метр</span>
            </p>
          )}
          <p className={styles.productPrice}>
            <span>{parseMoney(regularPrice)}</span> ₽ / <span>метр</span>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <span>{parseMoney(regularPrice)}</span> ₽ / <span>метр</span>
          </p>
        </div>
      )}
    </div>
  );
}
