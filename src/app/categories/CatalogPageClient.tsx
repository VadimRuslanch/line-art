'use client';

import CatalogProductList from '@/widgets/catalog/ui/catalog-product-list/CatalogProductList/CatalogProductList';
import CatalogFiltersSidebar from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersSidebar/CatalogFiltersSidebar';
import ClientPortal from '@/shared/ui/Portal/ClientPortal';
import CatalogFiltersModal from '@/widgets/catalog/ui/catalog-filters/CatalogFiltersModal/CatalogFiltersModal';
import { useUI } from '@/context/UIContext';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';
import { setCategory } from '@/features/catalog/catalog-filters/model/slice';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CatalogPageClient() {
  const { drawerType } = useUI();
  const isFiltersOpen = drawerType === 'FILTERS';

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const selectedCategory = selectedFilters.category?.[0] ?? '';

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const searchCategory = searchParams.get('category') ?? '';

  const hasHydratedRef = useRef(false);
  const skipNextSyncRef = useRef(false);

  useEffect(() => {
    if (!hasHydratedRef.current) return;

    if (selectedCategory === searchCategory) return;

    const params = new URLSearchParams(searchParamsString);
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');

    skipNextSyncRef.current = true;

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [
    selectedCategory,
    searchCategory,
    searchParamsString,
    router,
    pathname,
  ]);

  useEffect(() => {
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      hasHydratedRef.current = true;
      return;
    }

    hasHydratedRef.current = true;

    if (searchCategory === selectedCategory) return;
    dispatch(setCategory(searchCategory));
  }, [dispatch, searchCategory, selectedCategory]);

  return (
    <section className="CatalogShell">
      <div className="CatalogShell__sidebar--decktop">
        <CatalogFiltersSidebar />
      </div>
      <CatalogProductList />
      {isFiltersOpen && (
        <ClientPortal>
          <CatalogFiltersModal />
        </ClientPortal>
      )}
    </section>
  );
}
