'use client';
import './QuantitySelector.scss';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

export default function QuantitySelector({
  value, // ← управляемое значение
  onChange,
  min = 0,
  max = 100,
}: Props) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const qty = clamp(value ?? 1);

  const update = (v: number) => onChange?.(clamp(v));

  return (
    <div className="qty">
      <button onClick={() => update(qty - 1)} disabled={qty <= min}>
        <MinusIcon className="w-4 h-4" />
      </button>
      <input
        type="number"
        value={qty}
        min={min}
        max={max}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isNaN(v)) update(v);
        }}
      />
      <button onClick={() => update(qty + 1)} disabled={qty >= max}>
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
