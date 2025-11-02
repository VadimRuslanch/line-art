'use client';

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type TDrawerType = 'CART' | 'MENU' | 'FILTERS' | null;

interface UIContextProps {
  drawerType: TDrawerType;
  toggleCart: () => void;
  toggleMenu: () => void;
  toggleFilters: () => void;
  openFilters: () => void;
  closeFilters: () => void;
  closeAll: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [drawerType, setDrawerType] = useState<TDrawerType>(null);
  const pathname = usePathname();

  useLockBodyScroll(drawerType !== null);

  const closeAll = useCallback(() => setDrawerType(null), []);

  const toggleCart = useCallback(() => {
    setDrawerType((old) => (old === 'CART' ? null : 'CART'));
  }, []);

  const toggleMenu = useCallback(() => {
    setDrawerType((old) => (old === 'MENU' ? null : 'MENU'));
  }, []);

  const toggleFilters = useCallback(() => {
    setDrawerType((old) => (old === 'FILTERS' ? null : 'FILTERS'));
  }, []);

  const openFilters = useCallback(() => {
    setDrawerType('FILTERS');
  }, []);

  const closeFilters = useCallback(() => {
    setDrawerType((old) => (old === 'FILTERS' ? null : old));
  }, []);

  useEffect(() => {
    if (drawerType === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDrawerType(null);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [drawerType, pathname]);

  const value = useMemo(
    () => ({
      drawerType,
      toggleCart,
      toggleMenu,
      toggleFilters,
      openFilters,
      closeFilters,
      closeAll,
    }),
    [
      drawerType,
      toggleCart,
      toggleMenu,
      toggleFilters,
      openFilters,
      closeFilters,
      closeAll,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
