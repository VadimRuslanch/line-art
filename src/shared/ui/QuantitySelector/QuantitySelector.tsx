'use client';
import './QuantitySelector.scss';
import IconPlus from '@/shared/assets/svg/plus.svg';
import IconMinus from '@/shared/assets/svg/minus.svg';

type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChangeAction: (value: number) => void;
  onRemoveAction?: () => void;
  disabled?: boolean;
};

export default function QuantitySelector({
  value,
  onChangeAction,
  onRemoveAction,
  min = 0,
  max = 100,
  disabled = false,
}: Props) {
  const qty = value ?? 1;

  const update = (v: number) => onChangeAction(v);
  const handleDecrease = () => {
    const next = qty - 1;
    if (next <= 0 && onRemoveAction) {
      onRemoveAction();
      return;
    }
    if (next < min) return;
    update(next);
  };
  const handleIncrease = () => {
    const next = qty + 1;
    if (next > max) return;
    update(next);
  };
  const canDecrease = !(disabled || (qty <= min && !onRemoveAction));

  return (
    <div className="qty">
      <button
        onClick={handleDecrease}
        disabled={!canDecrease}
      >
        <IconMinus className="w-4 h-4" />
      </button>

      <label className="ButtonBut2">
        {qty}
        {/*<input*/}
        {/*  type="number"*/}
        {/*  value={qty}*/}
        {/*  min={min}*/}
        {/*  max={max}*/}
        {/*  onChange={(e) => {*/}
        {/*    const v = Number(e.target.value);*/}
        {/*    if (!Number.isNaN(v)) update(v);*/}
        {/*  }}*/}
        {/*/>*/}
      </label>

      <button onClick={handleIncrease} disabled={disabled || qty >= max}>
        <IconPlus className="w-4 h-4" />
      </button>
    </div>
  );
}
