import './AddToCart.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import UIButton from '@/shared/ui/UIElements/UIButton/UIButton';
import { useCart } from '@/entities/cart/model/useCart';
import type { SimpleProductLike } from '@/entities/product/types';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/shared/model/hooks';
import { selectCartItemByProductId } from '@/entities/cart/model/cartSelectors';

type Props = {
  product: SimpleProductLike;
  initialQty?: number;
};

const MAX_QTY = 100;
const DEBOUNCE_MS = 400;

export default function AddToCart({ product, initialQty = 0 }: Props) {
  const productId = product.databaseId;
  const selector = useMemo(
    () => selectCartItemByProductId(productId),
    [productId],
  );
  const cartItem = useAppSelector(selector);

  const { add, updateQuantity, remove, mutating } = useCart();

  const inCart = Boolean(cartItem);
  const [qty, setQty] = useState<number>(
    cartItem?.quantity ?? Math.max(initialQty, 0),
  );
  const [updatingQty, setUpdatingQty] = useState(false);
  const [pendingAction, setPendingAction] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inCart) {
      setQty(cartItem?.quantity ?? 1);
      setUpdatingQty(false);
    } else {
      setUpdatingQty(false);
      setQty(Math.max(initialQty, 0));
    }
  }, [inCart, cartItem?.quantity, initialQty]);

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1 || newQty > MAX_QTY) return;
    setQty(newQty);
  };

  useEffect(() => {
    if (!inCart || !cartItem?.key) return;
    if (qty === (cartItem.quantity ?? qty)) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = null;
    }

    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      setUpdatingQty(true);

      updateQuantity(cartItem.key, qty)
        .then(() => {
          setUpdatingQty(false);
        })
        .catch((e) => {
          setUpdatingQty(false);
          setQty(cartItem.quantity ?? 1);
          toast.error(
            e instanceof Error && e.message
              ? e.message
              : 'Не удалось обновить количество товара в корзине',
          );
        });
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }
    };
  }, [qty, inCart, cartItem?.key, cartItem?.quantity, updateQuantity]);

  const handleAdd = async (quantity: number) => {
    if (!productId) return;
    try {
      setPendingAction(true);
      await add(productId, quantity);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Не удалось добавить товар в корзину';
      toast.error(message);
    } finally {
      setPendingAction(false);
    }
  };

  const handleRemove = async () => {
    if (!cartItem?.key) return;

    try {
      setPendingAction(true);
      await remove(cartItem.key);
      setQty(0);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Не удалось удалить товар из корзины';
      toast.error(message);
    } finally {
      setPendingAction(false);
    }
  };

  const handleButtonClick = async () => {
    if (!productId) return;

    if (!inCart) {
      const nextQty = Math.max(qty, 1);
      setQty(nextQty);
      await handleAdd(nextQty);
      return;
    }

    await handleRemove();
  };

  const isDisabled = pendingAction || mutating || updatingQty || !productId;
  const showQuantitySelector =
    inCart && (cartItem?.quantity ?? qty) > 0 && !pendingAction;
  const buttonLabel = showQuantitySelector ? 'Удалить' : 'В корзину';

  return (
    <div className="AddToCart">
      <UIButton handleAdd={handleButtonClick} disabled={isDisabled}>
        <span className="ButtonBut2-bold">{buttonLabel}</span>
      </UIButton>

      {showQuantitySelector && (
        <div className="AddToCart__item">
          <QuantitySelector
            min={1}
            max={MAX_QTY}
            value={qty}
            onChangeAction={handleQtyChange}
            onRemoveAction={handleRemove}
            disabled={updatingQty || pendingAction}
          />
        </div>
      )}
    </div>
  );
}
