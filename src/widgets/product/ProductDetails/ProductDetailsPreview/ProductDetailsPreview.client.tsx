'use client';

import './ProductDetailsPreview.scss';
import { useEffect, useMemo, useState } from 'react';

import ProductDetailsCharacteristics from '../ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';
import AddToCart from '@/features/add-to-cart/ui/AddToCart';
import { extractGlobalAttributes } from '@/entities/product/current-detail/lib/normalizeProductAttributes';

import type { GetProductDetailsQuery } from '@/shared/api/gql/graphql';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { isVariableProduct } from '@/hooks/typeVariableProductGuards';
import ProductDetailsCharacteristicsSelect from '@/widgets/product/ProductDetails/ProductDetailsCharacteristicsSelect/ProductDetailsCharacteristicsSelect';

type PDPProduct = NonNullable<GetProductDetailsQuery['product']>;

type Props = { product: PDPProduct };

export default function ProductDetailsPreviewClient({ product }: Props) {
  const attributes = useMemo(() => extractGlobalAttributes(product), [product]);

  // Картинки/ценники
  const { name, sku, image, galleryImages, regularPrice, salePrice, onSale } =
    product as any;
  const title = name?.trim() ?? 'Untitled product';

  const breadcrumbItems = useMemo(
    () => [{ title: 'Каталог', href: '/categories' }, { title }],
    [title],
  );

  // ---- Собираем attributeId по имени атрибута (из product.attributes.nodes) ----
  // Пример: attrIdByName['pa_color'] -> number
  const attrIdByName = useMemo(() => {
    if (!isVariableProduct(product)) return {} as Record<string, number>;
    const nodes = (product.attributes?.nodes ?? []) as Array<{
      name?: string | null;
      attributeId?: number | null;
    } | null>;

    const map: Record<string, number> = {};
    for (const n of nodes) {
      const name = n?.name ?? undefined;
      const id = n?.attributeId ?? undefined;
      if (name && typeof id === 'number') map[name] = id;
    }
    return map;
  }, [product]);

  // если нужно — вот так берёте id для "pa_color"
  const colorAttributeId = attrIdByName['pa_color'];

  // ---- состояние выбора атрибутов (только для вариативных) ----
  // ключ = ИМЯ ИЗ БД (например, "pa_color"), значение = выбранный option (raw)
  const [selected, setSelected] = useState<Record<string, string>>({});

  // Инициализация: ставим первый доступный вариант для каждого variation-атрибута
  useEffect(() => {
    if (!isVariableProduct(product)) return;

    const next: Record<string, string> = {};
    attributes
      .filter((a) => a.variation)
      .forEach((a) => {
        const key = a.name ?? '';
        // Ищем сначала slug/value, если нет — падаем обратно на name
        const firstTerm: any = a.terms?.nodes?.[0] ?? null;
        const firstValue =
          (firstTerm?.slug as string | undefined) ??
          (firstTerm?.value as string | undefined) ??
          (firstTerm?.name as string | undefined) ??
          '';
        if (key && firstValue) next[key] = firstValue;
      });

    setSelected((prev) => ({ ...next, ...prev }));
  }, [product, attributes]);

  const setAttr = (attrName: string, value: string) => {
    setSelected((prev) => ({ ...prev, [attrName]: value }));
  };

  // ---- поиск подходящей вариации по выбранным атрибутам (raw сравнение) ----
  const variations = isVariableProduct(product)
    ? (product.variations?.nodes ?? [])
    : [];

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
      variations.find((v) => {
        const va = v?.attributes?.nodes ?? [];
        // сравниваем raw value: variationAttr.value === selected[attrName]
        return attributes
          .filter((a) => a.variation)
          .every((a) => {
            const key = a.name ?? '';
            const expected = selected[key];
            if (!key || !expected) return false;

            const inVar = va.find(
              (an: any) => an?.name === key && an?.value === expected,
            );
            return !!inVar;
          });
      }) ?? null
    );
  }, [product, attributes, variations, selected, selectedComplete]);

  // То, что уйдёт в AddToCart → variationAttributes (raw имена/значения)
  const variationId =
    isVariableProduct(product) && typeof colorAttributeId === 'number'
      ? colorAttributeId
      : undefined;

  const variationAttributes =
    isVariableProduct(product) && selectedComplete ? selected : undefined;

  return (
    <div className="ProductDetailsPreview">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="ProductDetailsPreview__content">
        <ImagesPreview
          image={image}
          galleryImages={galleryImages?.nodes ?? []}
          fallbackAlt={title}
        />

        <div className="ProductDetailsPreview__info">
          <section>
            <p className="ProductDetailsPreview__sku BodyB2">{sku}</p>
            <h1 className="HeadlineH3">{title}</h1>
          </section>

          <section className="ProductDetailsPreview__characteristics">
            {attributes.map((attribute) => {
              const key = attribute.name ?? '';
              const value = key ? selected[key] : undefined;

              if (attribute.variation && key) {
                return (
                  <>
                    <ProductDetailsCharacteristicsSelect
                      key={attribute.id}
                      attribute={attribute}
                    />
                    <ProductDetailsCharacteristics
                      key={attribute.id}
                      attribute={attribute}
                    />
                  </>
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
                regularPrice={regularPrice}
                salePrice={salePrice}
                onSale={(onSale as any) ?? false}
              />
            </div>

            {isSimpleProduct(product) ? (
              <AddToCart product={product} />
            ) : isVariableProduct(product) ? (
              <AddToCart
                product={product}
                variationId={variationId}
                variationAttributes={variationAttributes}
              />
            ) : null}

            {/* пример доступа к attributeId по имени */}
            {/* <pre>{JSON.stringify({ colorAttrId }, null, 2)}</pre> */}

            {isVariableProduct(product) && !variationId && (
              <p className="BodyB2" style={{ opacity: 0.8, marginTop: 8 }}>
                Пожалуйста, выберите все опции товара
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
