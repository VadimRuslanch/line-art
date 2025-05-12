'use client';
import React from 'react';
import { store } from '@/store/store';
import { ApolloProvider } from '@/app/lib/apollo/provider';
import { Provider } from 'react-redux';
import CartInitializer from '@/app/CartInitializer';
import { UIProvider } from '@/context/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <Provider store={store}>
        <CartInitializer />
        <UIProvider>{children}</UIProvider>
      </Provider>
    </ApolloProvider>
  );
}
