import type React from 'react';
import './categories.scss';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { CategoriesSelect } from '@/features/catalog-filters/ui/CategoriesSelect/CategoriesSelect';
import ButtonFilter from '@/shared/ui/ButtonFilter/ButtonFilter';

type Props = {
  children: React.ReactNode;
};

export default function CategoriesLayout({ children }: Props) {
  return (
    <>
      <Breadcrumbs />
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
