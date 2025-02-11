'use client';
import ButtonMenuCatalog from '@/shared/ui/ButtonMenuCatalog/ButtonMenuCatalog';
import ModalMenuCatalog from '@/shared/ui/ModalMenuCatalog/ModalMenuCatalog';
import { useState, useEffect } from 'react';
import { fetchWooCommerceProductsCategories } from '@/app/utils/API/wooCommerceApi';
import { Catalog } from '@/shared/types/api';

export default function HeaderMenuCatalog() {
  const [isOpenMenuCatalog, setIsOpenMenuCatalog] = useState<boolean>(false);
  const [categories, setCategories] = useState<Catalog[] | null>(null);
  useEffect(() => {
    fetchWooCommerceProductsCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error('Ошибка при загрузке категорий:', error));
  }, []);

  const toggleMenuCatalog = () => {
    setIsOpenMenuCatalog(!isOpenMenuCatalog);
  };

  return (
    <div className={'header-grid-aria-button relative'}>
      <ButtonMenuCatalog onClick={toggleMenuCatalog} />
      {isOpenMenuCatalog && categories && (
        <ModalMenuCatalog categories={categories} />
      )}
    </div>
  );
}
