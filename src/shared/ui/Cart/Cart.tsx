'use client';
import styles from './Cart.module.scss';

import CallbackForm from '@/shared/ui/CallbackForm/CallbackForm';
import CartProductCard from '@/shared/ui/CartProductCard/CartProductCard';
import { useCart } from '@/entities/cart/model/useCart';

export default function Cart() {
  const { simpleProducts } = useCart();

  return (
    <div className={styles.container}>
      {simpleProducts.map(
        ({
          product,
          key,
          quantity,
          total,
          variationPricing,
          variationDisplayAttributes,
        }) => (
          <CartProductCard
            product={product}
            productKey={key}
            quantity={quantity}
            lineTotal={total}
            variationPricing={variationPricing}
            variationAttributes={variationDisplayAttributes}
            key={key}
          />
        ),
      )}
      <CallbackForm />
    </div>
  );
}
