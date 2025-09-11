import './AddToCart.scss';
import { useCart } from '@/entities/cart/model/useCart';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { useState, useMemo, useEffect } from 'react';
import UIButton from '@/shared/ui/UIButton/UIButton';
import { ProductWithCategoriesFragment } from '@/shared/api/gql/graphql';

type Props = {
  product: ProductWithCategoriesFragment;
  initialQty?: number;
};

export default function AddToCart({ product, initialQty = 1 }: Props) {
  const { simpleProducts, add, remove, loading } = useCart();

  const line = useMemo(
    () =>
      simpleProducts.find(
        (i) => i.product.node.databaseId === product.databaseId,
      ),
    [simpleProducts, product.databaseId],
  );

  const inCart = !!line;
  const key = line?.key ?? undefined;
  const quantityInCart = line?.quantity ?? 0;

  const [qty, setQty] = useState<number>(quantityInCart || initialQty);

  useEffect(() => {
    if (inCart) setQty(quantityInCart);
  }, [inCart, quantityInCart]);

  const handleAdd = async () => {
    if (inCart && key) {
      await remove(key);
    } else {
      await add(product.databaseId, qty);
    }
  };

  return (
    <div className="AddToCart">
      <UIButton handleAdd={handleAdd} state={loading}>
        <span className="ButtonBut2-bold">
          {inCart ? 'Удалить' : 'В корзину'}
        </span>
      </UIButton>

      <div className="AddToCart__item">
        <QuantitySelector
          min={0}
          max={100}
          value={qty}
          onChangeAction={setQty}
        />
      </div>
    </div>
  );
}
