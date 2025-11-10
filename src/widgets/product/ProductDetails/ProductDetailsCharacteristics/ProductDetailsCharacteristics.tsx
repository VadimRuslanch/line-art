'use client';

import './ProductDetailsCharacteristics.scss';
import type { GlobalProductAttributeUI } from '@/entities/product/types';

type Props = {
  attribute: GlobalProductAttributeUI;
  type?: boolean;
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

function prettifyAttributeName(name: string): string {
  const map: Record<string, string> = {
    pa_color: 'Цвет',
    pa_backlights: 'Подсветка',
    pa_width: 'Ширина',
    pa_glubina: 'Глубина',
    'pa_shadow-gap': 'Теневой зазор',
  };

  return map[name] ?? name.replace(/^pa_/, '').replace(/_/g, ' ');
}

export default function ProductDetailsCharacteristics({
  attribute,
  type,
}: Props) {
  const attrName = (attribute.name ?? '').trim().toLowerCase();
  console.log('attrName', attrName === 'pa_color', 'type', type);
  if (attrName === 'pa_color' && type) return null;

  const values = extractValues(attribute);
  const label = prettifyAttributeName(attrName);

  if (!label || values.length === 0) return null;

  return (
    <div className="product-attribute">
      <span className="attribute-label BodyB2">{label}</span>

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
