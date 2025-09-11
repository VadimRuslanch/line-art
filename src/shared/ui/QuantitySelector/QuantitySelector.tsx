'use client';
import './QuantitySelector.scss';
import IconPlus from '@/shared/assets/svg/plus.svg';
import IconMinus from '@/shared/assets/svg/minus.svg';

type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChangeAction: (value: number) => void;
};

export default function QuantitySelector({
  value,
  onChangeAction,
  min = 0,
  max = 100,
}: Props) {
  const qty = value ?? 1;

  const update = (v: number) => onChangeAction(v);

  return (
    <div className="qty">
      <button onClick={() => update(qty - 1)} disabled={qty <= min}>
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

      <button onClick={() => update(qty + 1)} disabled={qty >= max}>
        <IconPlus className="w-4 h-4" />
      </button>
    </div>
  );
}
