'use client';

import CatalogProductList from '@/widgets/catalog/ui/catalog-product-list/CatalogProductList/CatalogProductList';
import CatalogFiltersSidebar from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersSidebar/CatalogFiltersSidebar';
import ClientPortal from '@/shared/ui/Portal/ClientPortal';
import CatalogFiltersModal from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersModal/CatalogFiltersModal';
import { useSelector } from 'react-redux';
import { selectIsFiltersModalOpen } from '@/features/catalog/catalog-filters';

export default function CatalogPage() {
  const isOpen = useSelector(selectIsFiltersModalOpen);
  return (
    <section className="CatalogShell">
      <div className="CatalogShell__sidebar--decktop">
        <CatalogFiltersSidebar />
      </div>
      <CatalogProductList />
      {isOpen && (
        <ClientPortal>
          <CatalogFiltersModal />
        </ClientPortal>
      )}
    </section>
  );
}
