'use client';

import './ProductDetailsPreview.scss';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ProductDetailsCharacteristics from '../ProductDetailsCharacteristics/ProductDetailsCharacteristics';
import { useProductDetails } from '@/entities/product/model/useProductDetails';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import Breadcrumbs from '@/widgets/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/entities/cart/model/useCart';

export default function ProductDetailsPreview({ slug }: { slug: string }) {
  const { product } = useProductDetails(slug);
  const { add, mutating, error } = useCart();
  const quantity = product?.quantity ?? 0;
  const [qty, setQty] = useState<number>(0);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  if (product === null) return <p>Товар не найден</p>;

  const {
    name,
    sku,
    image,
    galleryImages,
    regularPrice,
    salePrice,
    onSale,
    attributes,
    databaseId,
  } = product;

  const attributesNodes = attributes?.nodes ?? [];

  const handleAddToCart = async () => {
    try {
      await add(databaseId, qty);
      toast.success('Товар добавлен в корзину');
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Ошибка добавления');
      }
    }
  };

  const ITEMS_BREADCRUMBS = [
    {
      title: 'Каталог',
      href: '/categories',
    },
    {
      title: name ?? '',
    },
  ];

  return (
    <div className="ProductDetailsPreview">
      <Breadcrumbs items={ITEMS_BREADCRUMBS} />

      <div className="ProductDetailsPreview__content">
        <ImagesPreview
          image={image}
          galleryImages={galleryImages?.nodes ?? []}
        />

        <div className="ProductDetailsPreview__info">
          <section>
            <p className="ProductDetailsPreview__sku BodyB2">{sku}</p>
            <h1 className="HeadlineH3">{name}</h1>
          </section>

          <section className="ProductDetailsPreview__characteristics">
            {attributesNodes.map((attribute) => (
              <ProductDetailsCharacteristics
                key={attribute.id}
                attribute={attribute}
              />
            ))}
            <a href="#characteristics" className="attribute-link BodyB2">
              Все характеристики
            </a>
          </section>

          <div className="ProductDetailsPreview__actionsCard">
            <div className="price">
              <ProductPrice
                regularPrice={regularPrice}
                salePrice={salePrice}
                onSale={onSale}
              />
            </div>

            <div className="cartContainer">
              <button
                className="ProductDetailsPreview__cartAddButton ButtonBut2-bold"
                onClick={handleAddToCart}
                aria-label="Добавить в корзину"
                disabled={mutating}
              >
                {mutating ? 'Добавляем…' : 'В корзину'}
              </button>

              <QuantitySelector
                min={0}
                max={100}
                value={qty}
                onChangeAction={setQty}
              />
            </div>

            {error && <p className="error">Не удалось добавить товар</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


