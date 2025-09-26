import type React from 'react';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';

type Props = {
  children: React.ReactNode;
};

export default function DeliveryLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs />

      {children}
    </>
  );
}
