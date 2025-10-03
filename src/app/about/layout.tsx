import type React from 'react';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';

type Props = {
  children: React.ReactNode;
};

const ITEMS_BREADCRUMBS = [
  {
    title: 'О компании',
  },
];

export default function AboutLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs items={ITEMS_BREADCRUMBS} />
      {children}
    </>
  );
}
