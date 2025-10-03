import type React from 'react';
import './categories.scss';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';
import { CategoriesSelect } from '@/features/catalog/catalog-filters/ui/CategoriesSelect/CategoriesSelect';
import ButtonFilter from '@/shared/ui/ButtonFilter/ButtonFilter';

type Props = {
  children: React.ReactNode;
};

const ITEMS_BREADCRUMBS = [
  {
    title: 'Каталог',
  },
];

export default function CategoriesLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs items={ITEMS_BREADCRUMBS} />
      <div className="categories-top">
        <h1 className="HeadlineH1">Каталог</h1>
        <div className="categories-buttons">
          <CategoriesSelect />
          <ButtonFilter />
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
