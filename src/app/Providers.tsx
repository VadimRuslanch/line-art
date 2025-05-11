'use client';
import React from 'react';
import { store } from '@/store/store';
import { ApolloProvider } from '@/app/lib/apollo/provider';
import { MenuProvider } from '@/context/MenuContext';
import { DrawerProvider } from '@/context/DrawerContext';
import { Provider } from 'react-redux';
import CartInitializer from '@/app/CartInitializer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <Provider store={store}>
        <CartInitializer />
        <MenuProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </MenuProvider>
      </Provider>
    </ApolloProvider>
  );
}
