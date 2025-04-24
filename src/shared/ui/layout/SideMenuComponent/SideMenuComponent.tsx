'use client';

import styles from './SideMenuComponent.module.scss';

import { useMenu } from '@/context/MenuContext';
import {
  MENU_ITEMS,
  TTypeMenu,
} from '@/shared/ui/layout/SideMenuComponent/types/types';

import { useState } from 'react';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideMenuComponent() {
  const { isMenuOpen } = useMenu();
  const [active, setActive] = useState<TTypeMenu>('POPULAR');

  const menuVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.4, ease: 'easeIn' },
    },
    exit: {
      clipPath: 'inset( 0% 100% 0% 0% )',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className={styles.container}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.menuItems}>
            <nav className={styles.menuItem}>
              <div className={styles.titleContainer}>
                <span className={styles.title}>Меню</span>
                <span className={styles.titleNumber}>01</span>
              </div>
              <ul>
                {MENU_ITEMS.map(({ type, label, Icon }) => (
                  <li
                    key={type}
                    className={cx(styles.catalogItem, {
                      [styles.active]: active === type,
                    })}
                    onClick={() => setActive(type)}
                  >
                    <Icon />
                    {label}
                  </li>
                ))}
              </ul>
              <button className={styles.button}></button>
            </nav>

            {(() => {
              const item = MENU_ITEMS.find((i) => i.type === active)!;
              const ActiveComponent = item.Component;
              return <ActiveComponent />;
            })()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
