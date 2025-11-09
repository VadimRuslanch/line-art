'use client';

import './ProductDetailsCharacteristics.scss';
import type { GlobalProductAttributeUI } from '@/entities/product/types';

type Props = {
  attribute: GlobalProductAttributeUI;
};

type TermLike = { name?: string | null };

function extractValues(attribute: GlobalProductAttributeUI): string[] {
  const nodes = (attribute.terms?.nodes ?? []) as unknown as TermLike[];
  return (
    nodes
      .map((n) => n.name?.trim() || null)
      .filter((v): v is string => !!v && v.length > 0) ?? []
  );
}

export default function ProductDetailsCharacteristics({ attribute }: Props) {
  const attrName = (attribute.name ?? '').trim().toLowerCase();
  if (attrName === 'pa_color') return null;

  const values = extractValues(attribute);
  const label = attribute.label ?? attribute.name ?? '';

  if (!label || values.length === 0) return null;

  return (
    <div className="product-attribute">
      <span className="attribute-label BodyB2">{label}:</span>

      <div className="attribute-values">
        {values.map((v, index) => (
          <span
            key={`${attribute.id ?? attribute.name}-${v}-${index}`}
            className="attribute-text"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
