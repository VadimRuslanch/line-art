import type React from 'react';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';

type Props = {
  children: React.ReactNode;
};

const ITEMS_BREADCRUMBS = [
  {
    title: 'Сотрудничество',
  },
];

export default function PartnersLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs items={ITEMS_BREADCRUMBS} />
      {children}
    </>
  );
}
