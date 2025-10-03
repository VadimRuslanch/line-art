import '../styles/CatalogMenuItems.scss';
import {
  MENU_ITEMS,
  MENU_ITEMS_LINK,
  type TTypeMenu,
} from '@/widgets/SideMenuComponent/types/types';
import IconArrow from '@/shared/assets/svg/arrow-small.svg';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

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
  return (
    <nav className="menuItem">
      <div className="catalog__header">
        <span className="SubtitleS1">Меню</span>
        <span className="SubtitleS1">01</span>
      </div>
      <ul>
        {MENU_ITEMS.map(({ type, label, Icon }) => (
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
