import './ModalMenuMobile.scss';

import { useState } from 'react';
import ModalMenuSectionFirst from '@/widgets/SideMenuComponent/ModalMenuSectionFirst/ModalMenuSectionFirst';
import ModalMenuSectionThird from '@/widgets/SideMenuComponent/ModalMenuSectionThird/ModalMenuSectionThird';
import ModalMenuSectionSecond from '@/widgets/SideMenuComponent/ModalMenuSectionSecond/ModalMenuSectionSecond';
import { type TTypeMenu } from '@/widgets/SideMenuComponent/types/types';

type Level = 1 | 2 | 3;

type Props = {
  toggleTypeMenu: (value: TTypeMenu) => void;
  typeActiveMenu: TTypeMenu;
};

export default function ModalMenuMobile({
  toggleTypeMenu,
  typeActiveMenu,
}: Props) {
  const [level, setLevel] = useState<Level>(1);

  const handleSelectFirst = () => {
    setLevel(2);
  };

  const handleSelectSecond = () => {
    setLevel(3);
  };

  const backToFirst = () => {
    setLevel(1);
  };

  const backToSecond = () => {
    setLevel(2);
  };

  return (
    <div className="ModalMenuMobile menuItems">
      {level === 1 && (
        <ModalMenuSectionFirst
          toggleItem={toggleTypeMenu}
          typeActiveMenu={typeActiveMenu}
          onSelect={handleSelectFirst}
        />
      )}

      {level === 2 && (
        <ModalMenuSectionSecond
          typeActiveMenu={typeActiveMenu}
          onSelect={handleSelectSecond}
          onBack={backToFirst}
        />
      )}

      {level === 3 && (
        <ModalMenuSectionThird
          typeActiveMenu={typeActiveMenu}
          onBack={backToSecond}
        />
      )}
    </div>
  );
}
