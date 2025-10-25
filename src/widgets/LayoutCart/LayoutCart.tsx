'use client';

import Cart from '@/shared/ui/Cart/Cart';
import styles from './LayoutCart.module.scss';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import { useUI } from '@/context/UIContext';

export default function LayoutCart() {
  const { drawerType, closeAll } = useUI();

  if (!drawerType) return null;

  if (drawerType === 'CART')
    return (
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <span className={styles.title}>Корзина</span>
            <button onClick={closeAll} className={styles.button}>
              <IconClose />
              Закрыть
            </button>
          </div>
          <Cart />
        </div>
      </div>
    );
}
