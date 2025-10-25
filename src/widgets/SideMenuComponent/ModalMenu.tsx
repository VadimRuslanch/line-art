'use client';

import './styles/CatalogMenuItems.scss';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useUI } from '@/context/UIContext';
import ModalMenuWrapper from '@/widgets/SideMenuComponent/ModalMenuWrapper/ModalMenuWrapper';

export default function ModalMenu() {
  const { drawerType, closeAll } = useUI();
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    if (lastPathnameRef.current !== pathname && drawerType === 'MENU') {
      closeAll();
    }
    lastPathnameRef.current = pathname;
  }, [pathname, drawerType, closeAll]);

  const menuVariants: Variants = {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.4, ease: 'easeIn' },
    },
    exit: {
      clipPath: 'inset(0 0% 100% 0% )',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {drawerType === 'MENU' && (
        <motion.div
          className="modal modal-catalog__container"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ModalMenuWrapper />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
