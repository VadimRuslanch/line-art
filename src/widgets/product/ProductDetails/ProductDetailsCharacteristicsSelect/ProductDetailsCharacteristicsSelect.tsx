'use client';

import type { GlobalProductAttributeUI } from '@/entities/product/types';

type Props = {
  attribute: GlobalProductAttributeUI;
  value?: string;
  onChange?: (value: string) => void;
  /** Если нужно связать label htmlFor с select — можно прокинуть готовый id */
  id?: string;
  /** Кастомный класс для стилизации (по умолчанию как в исходном компоненте) */
  className?: string;
};

type TermLike = { name?: string | null; slug?: string | null };

type SelectOption = { label: string; value: string };

const PLACEHOLDER_PATTERN = /выберите/i;

function getControlId(attribute: GlobalProductAttributeUI): string {
  const candidates = [attribute.id, attribute.name, attribute.label, 'color'];

  for (const raw of candidates) {
    const cleaned = (raw ?? '').replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleaned) {
      return `attribute-${cleaned}`.toLowerCase();
    }
  }
  return 'attribute-color';
}

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
  id,
  className,
}: Props) {
  const controlId = id || getControlId(attribute);
  const options = extractValues(attribute);

  if (options.length === 0) return null;

  const label = attribute.label ?? attribute.name ?? '';
  const resolvedValue = value ?? options[0]?.value ?? '';

  return (
    <div className="product-attribute">
      <span className="attribute-label BodyB2">{label}:</span>

      <div className="attribute-values">
        <select
          id={controlId}
          className={className ?? 'attribute-select BodyB2'}
          value={resolvedValue}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((option) => (
            <option
              key={`${attribute.id ?? attribute.name}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
