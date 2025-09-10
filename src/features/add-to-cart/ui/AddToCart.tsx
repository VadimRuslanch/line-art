import './AddToCart.scss';
import { useCart } from '@/entities/cart/model/useCart';
import { ProductProduct } from '@/entities/product/ui/ProductCard/ProductCard';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { useState } from 'react';
import UIButton from '@/shared/ui/UIButton/UIButton';

export default function AddToCart({ product }: { product: ProductProduct }) {
  const quantityInCart = product?.quantity ?? 0;
  const [qty, setQty] = useState<number>(quantityInCart);
  const handleAdd = async () => {
    if (product.inCart) {
      await remove(product.key!);
    } else {
      await add(product.databaseId);
    }
  };

  const { add, remove, loading } = useCart();
  return (
    <div className="AddToCart">
      <div className="AddToCart__item">
        <UIButton handleAdd={handleAdd} state={loading}>
          В корзину
        </UIButton>
      </div>
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
