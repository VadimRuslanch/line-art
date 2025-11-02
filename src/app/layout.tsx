import './index.scss';

import '@/styles/globals.scss';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/Providers';
import LayoutCart from '@/widgets/LayoutCart/LayoutCart';
import Header from '@/widgets/Header/Header';
import FooterComponent from '@/widgets/FooterComponent/FooterComponent';
import CartInitializer from '@/app/CartInitializer';
import InitLoad from '@/features/load/InitLoad';
import ModalMenu from '@/widgets/SideMenuComponent/ModalMenu';

const fontInter = Inter({
  variable: '--font-inter-sans',
  subsets: ['cyrillic'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lineart alumo',
  description: 'Лучшие дизайнерские решения для вашего дома',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fontInter.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <FooterComponent />
          <ModalMenu />
          <LayoutCart />
          <CartInitializer />
          <InitLoad />
        </Providers>
      </body>
    </html>
  );
}
