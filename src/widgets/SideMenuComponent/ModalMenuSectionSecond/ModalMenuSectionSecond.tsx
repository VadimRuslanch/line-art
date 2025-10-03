import { TTypeMenu, MENU_ITEMS } from '@/widgets/SideMenuComponent/types/types';
import React from 'react';

type Props = {
  typeActiveMenu: TTypeMenu;
  onSelect?: () => void;
  onBack?: () => void;
};

export default function ModalMenuSectionSecond({
  typeActiveMenu,
  onSelect,
  onBack,
  ...rest
}: Props) {
  const item = MENU_ITEMS.find((menuItem) => menuItem.type === typeActiveMenu)!;
  const { Component, label } = item;

  return (
    <Component title={label} onSelect={onSelect} onBack={onBack} {...rest} />
  );
}
