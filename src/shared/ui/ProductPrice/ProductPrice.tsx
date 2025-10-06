import styles from './ProductPrice.module.scss';
import { parseMoney } from '@/features/catalog/catalog-filters/model/utils';

interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale?: boolean | null;
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
            <p className='HeadlineH5'>
              <span>{parseMoney(salePrice)}</span> ₽ / <span>метр</span>
            </p>
          )}
          <p className={styles.productPrice}>
            <span>{parseMoney(regularPrice)}</span> ₽ / <span>метр</span>
          </p>
        </div>
      ) : (
        <div>
          <p className='HeadlineH5'>
            <span>{parseMoney(regularPrice)}</span> ₽ / <span>метр</span>
          </p>
        </div>
      )}
    </div>
  );
}
