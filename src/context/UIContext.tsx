'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type TDrawerType = 'CART' | 'MENU' | null;

interface UIContextProps {
  drawerType: TDrawerType;
  toggleCart: () => void;
  toggleMenu: () => void;
  closeAll: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [drawerType, setDrawerType] = useState<TDrawerType>(null);

  useLockBodyScroll(drawerType !== null);

  const toggleCart = () =>
    setDrawerType((old) => (old === 'CART' ? null : 'CART'));

  const toggleMenu = () =>
    setDrawerType((old) => (old === 'MENU' ? null : 'MENU'));

  const closeAll = () => setDrawerType(null);

  return (
    <UIContext.Provider
      value={{ drawerType, toggleCart, toggleMenu, closeAll }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
