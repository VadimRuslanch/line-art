'use client';
import './QuantitySelector.scss';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type Props = {
  /** начальное значение (по умолчанию 1) */
  initial?: number;
  /** минимальное (по умолчанию 1) */
  min?: number;
  /** максимальное (по умолчанию 100) */
  max?: number;
  /** колбэк родителю */
  onChange?: (value: number) => void;
};

export default function QuantitySelector({
  initial = 1,
  min = 1,
  max = 100,
  onChange,
}: Props) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const [qty, setQty] = useState<number>(clamp(initial));

  const update = (v: number) => {
    const next = clamp(v);
    setQty(next);
    onChange?.(next);
  };

  return (
    <div className="qty">
      <button
        type="button"
        onClick={() => update(qty - 1)}
        disabled={qty <= min}
      >
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
        onWheel={(e) => (e.target as HTMLInputElement).blur()} // отключаем скролломеню
      />
      <button
        type="button"
        onClick={() => update(qty + 1)}
        disabled={qty >= max}
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
