import './ModalMenuDesktop.scss';
import type { TTypeMenu } from '@/widgets/SideMenuComponent/types/types';
import ModalMenuSectionFirst from '@/widgets/SideMenuComponent/ModalMenuSectionFirst/ModalMenuSectionFirst';
import ModalMenuSectionSecond from '@/widgets/SideMenuComponent/ModalMenuSectionSecond/ModalMenuSectionSecond';
import ModalMenuSectionThird from '@/widgets/SideMenuComponent/ModalMenuSectionThird/ModalMenuSectionThird';

type Props = {
  toggleTypeMenu: (value: TTypeMenu) => void;
  typeActiveMenu: TTypeMenu;
};
export default function ModalMenuDesktop({
  toggleTypeMenu,
  typeActiveMenu,
}: Props) {
  return (
    <div className="ModalMenuDesktop menuItems">
      <ModalMenuSectionFirst
        toggleItem={toggleTypeMenu}
        typeActiveMenu={typeActiveMenu}
      />
      <ModalMenuSectionSecond typeActiveMenu={typeActiveMenu} />
      <ModalMenuSectionThird typeActiveMenu={typeActiveMenu} />
    </div>
  );
}
