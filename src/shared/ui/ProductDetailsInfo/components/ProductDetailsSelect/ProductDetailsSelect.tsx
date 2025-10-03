'use client';
import { useMemo, useState } from 'react';

import {
  IProductDetailsInfo,
  PRODUCT_INFO_ITEMS,
} from '@/shared/ui/ProductDetailsInfo/types/types';
import UIChip from '@/shared/ui/UIElements/UIChip/UIChip';
import ProductDetailsInfoTech from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoPlacing/ProductDetailsInfoPlacing';
import ProductDetailsInfoContacts from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoContacts/ProductDetailsInfoContacts';
import ProductDetailsInfoPay from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoPay/ProductDetailsInfoPay';
import ProductDetailsInfoDelivery from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsInfoDelivery/ProductDetailsInfoDelivery';
import UISelect from '@/shared/ui/UIElements/UISelect/UISelect';

export default function ProductDetailsSelect() {
  const [active, setActive] = useState<IProductDetailsInfo>(
    PRODUCT_INFO_ITEMS[0],
  );

  const chipClickHandlers = useMemo(() => {
    const map = new Map<IProductDetailsInfo['type'], () => void>();
    for (const item of PRODUCT_INFO_ITEMS) {
      map.set(item.type, () => setActive(item));
    }
    return map;
  }, []);

  const Chips = useMemo(
    () =>
      PRODUCT_INFO_ITEMS.map((item) => (
        <UIChip
          data-active={active.type === item.type ? 'active' : ''}
          data-type={'product-details'}
          key={item.type}
          onClick={chipClickHandlers.get(item.type)!}
        >
          {item.label}
        </UIChip>
      )),
    [active, chipClickHandlers],
  );

  return (
    <div className="ProductDetailsInfo__left">
      <UISelect activeItem={active} action={setActive} />
      <div className="ProductDetailsInfo__top">{Chips}</div>
      <div>
        {active.type === 'TECHNICAL' && <ProductDetailsInfoTech />}
        {active.type === 'CONTACT' && <ProductDetailsInfoContacts />}
        {active.type === 'PAY' && <ProductDetailsInfoPay />}
        {active.type === 'DELIVERY' && <ProductDetailsInfoDelivery />}
      </div>
    </div>
  );
}
