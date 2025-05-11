'use client';

import Cart from '@/shared/ui/Cart/Cart';
import styles from './LayoutCart.module.scss';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import { useDrawer } from '@/context/DrawerContext';

export default function LayoutCart() {
  const { drawerType, closeCart, closeFavorites } = useDrawer();

  if (!drawerType) return null;

  const isCart = drawerType === 'CART';
  const title = isCart ? 'Корзина' : 'Избранное';
  const onClose = isCart ? closeCart : closeFavorites;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.containerTop}>
          <span className={styles.title}>{title}</span>
          <button onClick={onClose} className={styles.button}>
            <IconClose />
            Закрыть
          </button>
        </div>
        <Cart />
      </div>
    </div>
  );
}
