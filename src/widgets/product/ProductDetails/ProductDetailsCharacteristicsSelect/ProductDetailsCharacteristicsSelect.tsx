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

type TermLike = { name?: string | null };

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

function extractValues(attribute: GlobalProductAttributeUI): string[] {
  const nodes = (attribute.terms?.nodes ?? []) as unknown as TermLike[];
  return (
    nodes
      .map((n) => n.name?.trim() || null)
      .filter((v): v is string => !!v && v.length > 0) ?? []
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
  const values = extractValues(attribute);

  if (values.length === 0) return null;

  const label = attribute.label ?? attribute.name ?? '';

  return (
    <div className="product-attribute">
      <span className="attribute-label BodyB2">{label}:</span>

      <div className="attribute-values">
        <select
          id={controlId}
          className={className ?? 'attribute-select BodyB2'}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {values.map((v) => (
            <option key={`${attribute.id ?? attribute.name}-${v}`} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
