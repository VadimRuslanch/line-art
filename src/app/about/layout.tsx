import type React from 'react';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';

type Props = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
