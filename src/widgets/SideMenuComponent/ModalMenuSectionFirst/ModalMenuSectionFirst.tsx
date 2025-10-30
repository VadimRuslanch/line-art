import '../styles/CatalogMenuItems.scss';
import {
  MENU_ITEMS,
  MENU_ITEMS_LINK,
  type TTypeMenu,
} from '@/widgets/SideMenuComponent/types/types';
import IconArrow from '@/shared/assets/svg/arrow-small.svg';
import cx from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

type Props = {
  toggleItem: (value: TTypeMenu) => void;
  typeActiveMenu: TTypeMenu;
  onSelect?: () => void;
};

export default function ModalMenuSectionFirst({
  toggleItem,
  typeActiveMenu,
  onSelect,
}: Props) {
  const { categories, popular, newArrivals, discounted } = useGetHomeCatalog();

  const filteredMenuItems = useMemo(() => {
    const hasTopCategories = (categories ?? []).some(
      (category) => Boolean(category?.name) && Boolean(category?.uri),
    );

    return MENU_ITEMS.filter(({ type }) => {
      switch (type) {
        case 'CATEGORIES':
          return hasTopCategories;
        case 'POPULAR':
          return popular.categories.length > 0;
        case 'NEW':
          return newArrivals.categories.length > 0;
        case 'SALE':
          return discounted.categories.length > 0;
        default:
          return true;
      }
    });
  }, [
    categories,
    popular.categories,
    newArrivals.categories,
    discounted.categories,
  ]);

  return (
    <nav className="menuItem">
      <div className="catalog__header">
        <span className="SubtitleS1">Меню</span>
        <span className="SubtitleS1">01</span>
      </div>
      <ul>
        {filteredMenuItems.map(({ type, label, Icon }) => (
          <li
            key={type}
            className={cx('BodyB1 catalogItem', {
              active: typeActiveMenu === type,
            })}
            onMouseEnter={() => toggleItem(type)}
            onClick={() => {
              onSelect?.();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect?.();
            }}
          >
            <Icon />
            {label}
            <IconArrow className="catalogItem_svg" />
          </li>
        ))}
        {MENU_ITEMS_LINK.map(({ title, Icon, link }, index) => (
          <li key={index}>
            <Link href={link} className={'catalogItem BodyB1'}>
              <Icon />
              {title}
              <IconArrow className="catalogItem_svg" />
            </Link>
          </li>
        ))}
      </ul>
      {/*<button*/}
      {/*  className="menuItem__button"*/}
      {/*  aria-label="close menu"*/}
      {/*  onClick={onBack}*/}
      {/*/>*/}
    </nav>
  );
}
