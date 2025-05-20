'use client';
import React from 'react';
import { ApolloProvider } from '@/app/lib/apollo/provider';
import CartInitializer from '@/app/CartInitializer';
import { UIProvider } from '@/context/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <CartInitializer />
      <UIProvider>{children}</UIProvider>
    </ApolloProvider>
  );
}
