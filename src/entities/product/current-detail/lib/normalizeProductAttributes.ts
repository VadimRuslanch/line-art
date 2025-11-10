import type {
  GlobalProductAttributeUI,
  NamedTermNode,
  SimpleProductGQL,
} from '@/entities/product/types';

type AttributeNode = NonNullable<
  NonNullable<SimpleProductGQL['attributes']>['nodes']
>[number];

type GlobalAttributeNode = Extract<
  AttributeNode,
  { __typename: 'GlobalProductAttribute' }
>;

type AttributeMetaFields = {
  label?: string | null;
  visible?: boolean | null;
};

function isNonNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

function isGlobalAttribute(
  attribute: AttributeNode | null | undefined,
): attribute is GlobalAttributeNode {
  return attribute?.__typename === 'GlobalProductAttribute';
}

function hasName<T>(value: T): value is T & { name?: string | null } {
  return Boolean(value && typeof value === 'object' && 'name' in (value as object));
}

export function extractGlobalAttributes(
  product: SimpleProductGQL | null | undefined,
): GlobalProductAttributeUI[] {
  if (!product) return [];

  const rawNodes = product.attributes?.nodes ?? [];

  return rawNodes
    .filter(isNonNull)
    .filter(isGlobalAttribute)
    .map<GlobalProductAttributeUI>((attribute) => {
      const attributeMeta = attribute as GlobalAttributeNode & AttributeMetaFields;

      return {
        __typename: 'GlobalProductAttribute',
        id: attribute.id,
        name: attribute.name,
        variation: attribute.variation,
        visible: attributeMeta.visible ?? null,
        label: attributeMeta.label ?? null,
        terms: attribute.terms
          ? {
              __typename: 'GlobalProductAttributeToTermNodeConnection',
              nodes: (attribute.terms.nodes ?? [])
                .filter(isNonNull)
                .filter(hasName) as NamedTermNode[],
            }
          : null,
      };
    });
}
