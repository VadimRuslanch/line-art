'use client';

import Cart from '@/shared/ui/Cart/Cart';
import styles from './LayoutCart.module.scss';
import IconClose from '@/shared/assets/svg/icon-close.svg';
import { useUI } from '@/context/UIContext';
import { AnimatePresence, motion } from 'framer-motion';

const panelVariants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)' },
};

export default function LayoutCart() {
  const { drawerType, closeAll } = useUI();
  const isOpen = drawerType === 'CART';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.layout}
          onClick={closeAll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.containerTop}>
              <span className={styles.title}>Корзина</span>
              <button onClick={closeAll} className={styles.button}>
                <IconClose />
                Закрыть
              </button>
            </div>
            <Cart />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
