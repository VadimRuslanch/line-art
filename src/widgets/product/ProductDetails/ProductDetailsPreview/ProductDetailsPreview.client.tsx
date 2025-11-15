'use client';

import './ProductDetailsPreview.scss';
import { useMemo, useState } from 'react';

import ProductDetailsCharacteristics from '../ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
import { extractGlobalAttributes } from '@/entities/product/current-detail/lib/normalizeProductAttributes';

import type {
  GlobalProductAttributeUI,
  SimpleProductGQL,
} from '@/entities/product/types';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { isVariableProduct } from '@/hooks/typeVariableProductGuards';
import ProductDetailsCharacteristicsSelect from '@/widgets/product/ProductDetails/ProductDetailsCharacteristicsSelect/ProductDetailsCharacteristicsSelect';

type PDPProduct = SimpleProductGQL;
type VariableProductNode = Extract<
  PDPProduct,
  { __typename: 'VariableProduct' }
>;
type VariationNode = NonNullable<
  NonNullable<NonNullable<VariableProductNode['variations']>['nodes']>[number]
>;
type VariationAttributeNode = NonNullable<
  NonNullable<NonNullable<VariationNode['attributes']>['nodes']>[number]
>;

type Props = { product: PDPProduct };

type AttributeTermLike = { name?: string | null; slug?: string | null };

function normalizeValue(value?: string | null) {
  return value?.trim().toLowerCase() ?? '';
}

function findFirstSelectableValue(attribute: GlobalProductAttributeUI) {
  const nodes = (attribute.terms?.nodes ?? []) as AttributeTermLike[];
  for (const term of nodes) {
    const label = term?.name?.trim();
    const slug = term?.slug?.trim();
    const value = slug && slug.length > 0 ? slug : label;
    if (value) return value;
  }
  return undefined;
}

function getAttributeTermLabel(
  attribute: GlobalProductAttributeUI,
  slugValue: string,
) {
  const nodes = (attribute.terms?.nodes ?? []) as AttributeTermLike[];
  const normalizedSlug = normalizeValue(slugValue);
  if (!normalizedSlug) return undefined;
  const term = nodes.find(
    (node) => normalizeValue(node?.slug) === normalizedSlug,
  );
  return term?.name ?? undefined;
}

export default function ProductDetailsPreviewClient({ product }: Props) {
  const attributes = useMemo(() => extractGlobalAttributes(product), [product]);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    if (!isVariableProduct(product)) return {};

    const defaults: Record<string, string> = {};
    attributes
      .filter((attribute) => attribute.variation)
      .forEach((attribute) => {
        const key = attribute.name ?? '';
        const firstValue = findFirstSelectableValue(attribute);
        if (key && firstValue) {
          defaults[key] = firstValue;
        }
      });

    return defaults;
  });

  function pickDisplayPrice(
    product: PDPProduct,
    variation: VariationNode | null,
  ) {
    const baseRegular = product.regularPrice ?? product.price ?? undefined;
    const baseSale = product.salePrice ?? undefined;
    const baseOnSale = Boolean(product.onSale);

    if (!variation) {
      return {
        regularPrice: baseRegular,
        salePrice: baseSale,
        onSale: baseOnSale,
      };
    }

    const vOnSale = Boolean(variation.onSale);
    const vRegular = variation.regularPrice ?? baseRegular;
    const vSale =
      variation.salePrice ??
      (vOnSale ? variation.price : undefined) ??
      baseSale;

    return {
      regularPrice: vRegular,
      salePrice: vSale,
      onSale: vOnSale,
    };
  }

  const { name, sku, image, galleryImages } = product;
  const title = name?.trim() ?? 'Untitled product';

  const breadcrumbItems = useMemo(
    () => [{ title: 'Категории', href: '/categories' }, { title }],
    [title],
  );

  const setAttr = (attrName: string, value: string) => {
    setSelected((prev) => ({ ...prev, [attrName]: value }));
  };

  const variations = useMemo<VariationNode[]>(() => {
    if (!isVariableProduct(product)) return [];
    return (product.variations?.nodes ?? []).filter(
      (node): node is VariationNode => Boolean(node),
    );
  }, [product]);

  const selectedComplete = useMemo(() => {
    if (!isVariableProduct(product)) return false;
    const variationAttrs = attributes.filter((a) => a.variation);
    if (variationAttrs.length === 0) return false;
    return variationAttrs.every((a) => {
      const key = a.name ?? '';
      return !!key && !!selected[key];
    });
  }, [product, attributes, selected]);

  const matchedVariation = useMemo(() => {
    if (!isVariableProduct(product) || !selectedComplete) return null;

    return (
      variations.find((variation) => {
        const variationAttributesNodes = (
          variation.attributes?.nodes ?? []
        ).filter((node): node is VariationAttributeNode => Boolean(node));
        return attributes
          .filter((attribute) => attribute.variation)
          .every((attribute) => {
            const key = attribute.name ?? '';
            const slugValue = key ? selected[key] : undefined;
            if (!key || !slugValue) return false;

            const normalizedSlug = normalizeValue(slugValue);
            const normalizedLabel = normalizeValue(
              getAttributeTermLabel(attribute, slugValue),
            );
            const expectedValues = [normalizedSlug, normalizedLabel].filter(
              Boolean,
            );
            if (expectedValues.length === 0) return false;

            return variationAttributesNodes.some((variationAttribute) => {
              if (variationAttribute.name !== key) return false;
              const actualValues = [
                normalizeValue(variationAttribute.value),
                normalizeValue(variationAttribute.label),
              ].filter(Boolean);
              if (actualValues.length === 0) return false;

              return actualValues.some((actual) =>
                expectedValues.some((expected) => actual === expected),
              );
            });
          });
      }) ?? null
    );
  }, [product, attributes, variations, selected, selectedComplete]);

  const displayPrice = useMemo(() => {
    return pickDisplayPrice(product, matchedVariation);
  }, [product, matchedVariation]);

  const variationPriceValue =
    displayPrice.salePrice ?? displayPrice.regularPrice ?? null;

  const variationId =
    isVariableProduct(product) && matchedVariation
      ? (matchedVariation.databaseId ?? undefined)
      : undefined;

  const variationAttributes =
    isVariableProduct(product) && matchedVariation && selectedComplete
      ? selected
      : undefined;

  return (
    <div className="ProductDetailsPreview">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="ProductDetailsPreview__content">
        <ImagesPreview
          image={matchedVariation?.image ?? image}
          galleryImages={galleryImages?.nodes ?? []}
          fallbackAlt={title}
        />

        <div className="ProductDetailsPreview__info">
          <section>
            <p className="ProductDetailsPreview__sku BodyB2">
              {matchedVariation?.sku?.trim() || sku}{' '}
            </p>
            <h1 className="HeadlineH3">{title}</h1>
          </section>

          <section className="ProductDetailsPreview__characteristics">
            {attributes.map((attribute) => {
              const key = attribute.name ?? '';
              const value = key ? selected[key] : undefined;

              if (attribute.variation && key) {
                return (
                  <div key={key}>
                    <ProductDetailsCharacteristicsSelect
                      key={`${attribute.id}-select`}
                      attribute={attribute}
                      value={value}
                      onChange={(next) => setAttr(key, next)}
                    />
                    <ProductDetailsCharacteristics
                      key={`${attribute.id}-info`}
                      attribute={attribute}
                      type={true}
                    />
                  </div>
                );
              }

              return (
                <ProductDetailsCharacteristics
                  key={attribute.id}
                  attribute={attribute}
                />
              );
            })}

            <a href="#characteristics" className="attribute-link BodyB2">
              Все характеристики
            </a>
          </section>

          <div className="ProductDetailsPreview__actionsCard">
            <div className="price">
              <ProductPrice
                regularPrice={displayPrice.regularPrice}
                salePrice={displayPrice.salePrice}
                onSale={displayPrice.onSale}
              />
            </div>

            {isSimpleProduct(product) ? (
              <AddToCart product={product} />
            ) : isVariableProduct(product) ? (
              <AddToCart
                product={product}
                variationId={variationId}
                variationAttributes={variationAttributes}
                variationPrice={variationPriceValue}
              />
            ) : null}

            {isVariableProduct(product) && !variationId && (
              <p className="BodyB2" style={{ opacity: 0.8, marginTop: 8 }}>
                Выберите вариант, чтобы увидеть цену
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
