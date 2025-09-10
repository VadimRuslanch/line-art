'use client';
import React from 'react';
import { ApolloProviderApp } from '@/app/providers/ApolloProvider/ApolloProvider';
// import CartInitializer from '@/app/CartInitializer';
import { UIProvider } from '@/context/UIContext';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/StoreProvider/config/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProviderApp>
      <Provider store={store}>
        {/*<CartInitializer />*/}
        <UIProvider>{children}</UIProvider>
      </Provider>
    </ApolloProviderApp>
  );
}
