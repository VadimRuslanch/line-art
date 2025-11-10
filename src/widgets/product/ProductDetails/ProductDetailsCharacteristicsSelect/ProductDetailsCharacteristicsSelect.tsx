'use client';

import Arrow from './icon/arrow.svg';
import type { GlobalProductAttributeUI } from '@/entities/product/types';
import { useState } from 'react';

type Props = {
  attribute: GlobalProductAttributeUI;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

type TermLike = { name?: string | null; slug?: string | null };

type SelectOption = { label: string; value: string };

const PLACEHOLDER_PATTERN = /�?�<�+��?��'��/i;

function isPlaceholderLabel(label?: string | null) {
  if (!label) return false;
  return PLACEHOLDER_PATTERN.test(label.trim().toLowerCase());
}

function extractValues(attribute: GlobalProductAttributeUI): SelectOption[] {
  const nodes = (attribute.terms?.nodes ?? []) as unknown as TermLike[];
  return (
    nodes
      .map((n) => {
        const label = n.name?.trim();
        if (!label || isPlaceholderLabel(label)) return null;
        const slug = n.slug?.trim();
        const value = slug && slug.length > 0 ? slug : label;
        if (!value.length) return null;
        return { label, value };
      })
      .filter((option): option is SelectOption => option !== null) ?? []
  );
}

export default function ProductDetailsCharacteristicsSelect({
  attribute,
  value,
  onChange,
  className,
}: Props) {
  const options = extractValues(attribute);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(
    () => value ?? options[0]?.value ?? '',
  );

  if (options.length === 0) {
    return null;
  }

  const selectedValue = options.some((option) => option.value === current)
    ? current
    : options[0].value;
  const selected = options.find((o) => o.value === selectedValue) ?? options[0];

  const pick = (v: string) => {
    setCurrent(v);
    setOpen(false);
    onChange?.(v);
  };

  return (
    <div className={['attr-select', className].filter(Boolean).join(' ')}>
      <span className="attribute-label BodyB2">Цвет</span>

      <div className="attr-select__control" onClick={() => setOpen(!open)}>
        <span className={`attribute-label-color ${selected.value}`} />
        <span className="attr-select__value">{selected.label}</span>
        <Arrow className={`attr-select__icon ${open ? 'open' : ''}`} />
      </div>

      {open && (
        <div className="attr-select__menu" onClick={(e) => e.stopPropagation()}>
          {options.map((o) => (
            <div
              key={`${attribute.id ?? attribute.name}-${o.value}`}
              className={
                'attr-select__option' +
                (o.value === current ? ' is-selected' : '')
              }
              onClick={() => pick(o.value)}
            >
              <span className={`attribute-label-color ${o.value}`} />
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
