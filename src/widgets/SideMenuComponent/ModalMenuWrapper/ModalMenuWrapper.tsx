import ModalMenuMobile from '@/widgets/SideMenuComponent/modile/ModalMenuMobile';
import { useCallback, useState } from 'react';
import { TTypeMenu } from '@/widgets/SideMenuComponent/types/types';
import { useAppDispatch } from '@/shared/model/hooks';
import { setActiveCategory } from '@/widgets/SideMenuComponent/model/store/slices/slice';
import ModalMenuDesktop from '@/widgets/SideMenuComponent/desktop/ModalMenuDesktop';

export default function ModalMenuWrapper() {
  const [typeActiveMenu, setActiveTypeMenu] = useState<TTypeMenu>('CATEGORIES');
  const dispatch = useAppDispatch();

  const changeTypeMenu = useCallback(
    (type: TTypeMenu) => {
      setActiveTypeMenu(type);
      dispatch(setActiveCategory(0));
    },
    [dispatch],
  );

  return (
    <>
      <ModalMenuDesktop
        toggleTypeMenu={changeTypeMenu}
        typeActiveMenu={typeActiveMenu}
      />
      <ModalMenuMobile
        toggleTypeMenu={changeTypeMenu}
        typeActiveMenu={typeActiveMenu}
      />
    </>
  );
}
