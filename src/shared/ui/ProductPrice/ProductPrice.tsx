import styles from './ProductPrice.module.scss';
import { replacePrice } from '@/shared/utils/ustils';

interface ProductPriceProps {
  regularPrice: string;
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
          <p>
            <span>{replacePrice(salePrice!)}</span> / <span>метр</span>
          </p>
          <p className={styles.productPrice}>
            <span>{replacePrice(regularPrice)}</span> / <span>метр</span>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <span>{replacePrice(regularPrice)}</span> / <span>метр</span>
          </p>
        </div>
      )}
    </div>
  );
}
