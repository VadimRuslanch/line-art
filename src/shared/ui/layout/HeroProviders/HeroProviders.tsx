'use client';
import { HeroUIProvider } from '@heroui/react';
import { ReactNode } from 'react';

export default function HeroProviders({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
