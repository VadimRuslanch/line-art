import './ProductDetailsCharacteristics.scss';
import type { GlobalProductAttributeUI } from '@/features/product/product-details/model/useProductDetails';

type Props = { attribute: GlobalProductAttributeUI };

type TermLike = { name?: string | null };

export default function ProductDetailsCharacteristics({ attribute }: Props) {
  const nodes = (attribute.terms?.nodes ?? []) as unknown as TermLike[];

  const values =
    nodes
      .map((n) => n.name?.trim() || null)
      .filter((v): v is string => !!v && v.length > 0) ?? [];

  const label = attribute.label ?? attribute.name ?? '';

  if (!label || values.length === 0) return null;

  return (
    <div className="product-attribute">
      <label className="attribute-label BodyB2">{label}:</label>
      {values.map((value, index) => (
        <span
          key={`${attribute.id}-${value}-${index}`}
          className="attribute-option"
        >
          {value}
        </span>
      ))}
    </div>
  );
}
