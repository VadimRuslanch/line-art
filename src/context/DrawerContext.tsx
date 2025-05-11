'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type TDrawerType = 'CART' | 'FAVORITES' | null;

interface DrawerContextProps {
  drawerType: TDrawerType;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openFavorites: () => void;
  closeFavorites: () => void;
  toggleFavorites: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [drawerType, setDrawerType] = useState<TDrawerType>(null);

  useLockBodyScroll(drawerType !== null);

  const openCart = () => setDrawerType('CART');
  const closeCart = () =>
    setDrawerType((prev) => (prev === 'CART' ? null : prev));
  const toggleCart = () =>
    setDrawerType((prev) => (prev === 'CART' ? null : 'CART'));

  const openFavorites = () => setDrawerType('FAVORITES');
  const closeFavorites = () =>
    setDrawerType((prev) => (prev === 'FAVORITES' ? null : prev));
  const toggleFavorites = () =>
    setDrawerType((prev) => (prev === 'FAVORITES' ? null : 'FAVORITES'));

  return (
    <DrawerContext.Provider
      value={{
        drawerType,
        openCart,
        closeCart,
        toggleCart,
        openFavorites,
        closeFavorites,
        toggleFavorites,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer must be used within a DrawerProvider');
  return ctx;
};
