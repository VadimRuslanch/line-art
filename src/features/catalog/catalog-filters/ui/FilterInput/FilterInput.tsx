import './FilterInput.scss';
import React from 'react';
import type { ReactNode } from 'react';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  count?: number | null;
  children: ReactNode;
};

export default function FilterInput({
  checked,
  onChange,
  disabled = false,
  count,
  children,
}: Props) {
  return (
    <div className="filters__wr">
      <label className="filters__label">
        <input
          type="checkbox"
          className="filters__input"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="filters__text">{children}</span>
      </label>
      <span className="filters__count">{count}</span>
    </div>
  );
}
