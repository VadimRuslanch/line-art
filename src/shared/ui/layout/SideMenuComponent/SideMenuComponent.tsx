'use client';

import styles from './SideMenuComponent.module.scss';
import './styles/CatalogMenuItems.scss';

import IconArrow from '@/shared/assets/svg/arrow-small.svg';
import {
  MENU_ITEMS,
  TTypeMenu,
} from '@/shared/ui/layout/SideMenuComponent/types/types';

import { useState } from 'react';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '@/context/UIContext';

export default function SideMenuComponent() {
  const { drawerType } = useUI();
  const [active, setActive] = useState<TTypeMenu>('POPULAR');
  const [isActiveMenuCategory, setIsActiveMenuCategory] = useState(true);

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

  const toggleCatalog = () => {
    setIsActiveMenuCategory(!isActiveMenuCategory);
  };

  const toggleAndSetType = (type: TTypeMenu) => {
    setActive(type);
    toggleCatalog();
  };

  return (
    <AnimatePresence>
      {drawerType === 'MENU' && (
        <motion.div
          className="container"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="menuItems">
            <nav
              className="menuItem"
              data-type="catalog"
              data-active={isActiveMenuCategory}
            >
              <div className="catalog__header">
                <div className="titleContainer">
                  <span>Меню</span>
                  <span className="titleNumber">01</span>
                </div>
              </div>
              <ul>
                {MENU_ITEMS.map(({ type, label, Icon }) => (
                  <>
                    <li
                      key={type}
                      className={cx('catalogItem', {
                        [styles.active]: active === type,
                      })}
                      onClick={() => toggleAndSetType(type)}
                    >
                      <Icon />
                      {label}
                      <IconArrow className="catalogItem_svg" />
                    </li>
                  </>
                ))}
              </ul>
              <button className={styles.button}></button>
            </nav>

            {(() => {
              const item = MENU_ITEMS.find((i) => i.type === active)!;
              const ActiveComponent = item.Component;
              return (
                <ActiveComponent
                  title={item.label}
                  toggleCatalog={toggleCatalog}
                  data-active={!isActiveMenuCategory}
                />
              );
            })()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
