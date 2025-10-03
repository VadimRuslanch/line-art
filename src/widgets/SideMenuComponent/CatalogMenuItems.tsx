import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow-small.svg';
import React from 'react';
import { CategoryWithProducts } from '@/shared/types/general';
export type CategoryWithUriAndName = { uri: string; name: string };
import { ProductProduct } from '@/features/product/ui/ProductCard/ProductCard';

type CategoryItem = CategoryWithProducts | CategoryWithUriAndName;
type MenuItem = CategoryItem | ProductProduct;
// export interface CategoryWithUriAndName {
//   uri?: string | null;
//   name?: string | null;
//   children?: { nodes?: unknown[] | null } | null;
// }

type Props = {
  title: string;
  titleNumber?: string;
  categoriesItems: MenuItem[];
  handleCategoryChange?: (index: number) => void;
  onSelect?: (id: string) => void;
  onBack?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export default function CatalogMenuItems({
  title,
  titleNumber,
  categoriesItems,
  handleCategoryChange,
  onSelect,
  onBack,
}: Props) {
  // const itemsToRender = (categoriesItems ?? []).filter((cat: CategoryWithUriAndName) => {
  //   const nodes = cat.children?.nodes;
  //   if (nodes === undefined) return true; // нет children — оставляем элемент
  //   return Array.isArray(nodes) ? nodes.length > 0 : false; // есть children — оставляем только с непустыми nodes
  // });

  const getItemId = (category: CategoryItem | ProductProduct, index: number) =>
    (category.uri ?? category.name ?? String(index)) as string;

  // const hasChildren = (category: T) => {
  //   const nodes = category.children?.nodes;
  //   if (nodes === undefined || nodes === null) return false;
  //   return Array.isArray(nodes) && nodes.length > 0;
  // };

  return (
    <nav className="menuItem">
      <div className="catalog__header">
        <button onClick={onBack} className="catalog__button" aria-label="Назад">
          <IconArrow />
        </button>
        <span className="SubtitleS1">{title}</span>
        <span className="SubtitleS1">{titleNumber}</span>
      </div>
      <ul>
        {categoriesItems.map((category, index) => {
          const id = getItemId(category, index);

          return (
            <li
              key={category.name}
              onMouseEnter={() => handleCategoryChange?.(index)}
            >
              {onSelect ? (
                <button
                  className="catalogItem"
                  onClick={() => onSelect?.(id)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect?.(id);
                  }}
                >
                  <span className="BodyB1">{category.name}</span>
                  <IconArrow className="catalogItem_svg" />
                </button>
              ) : (
                <Link href={category.uri ?? ''} className="BodyB1 catalogItem">
                  {category.name}
                  <IconArrow className="catalogItem_svg" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
