'use client';
import styles from './Cart.module.scss';

import CallbackForm from '@/shared/ui/CallbackForm/CallbackForm';
import CartProductCard from '@/shared/ui/CartProductCard/CartProductCard';
import { useCart } from '@/entities/cart/model/useCart';

export default function Cart() {
  const { simpleProducts } = useCart();

  return (
    <div className={styles.container}>
      {simpleProducts.map((product) => (
        <CartProductCard
          product={product.product!.node!}
          productKey={product.key}
          quantity={product.quantity!}
          lineTotal={product.total}
          key={product.key}
        />
      ))}
      <CallbackForm />
    </div>
  );
}
