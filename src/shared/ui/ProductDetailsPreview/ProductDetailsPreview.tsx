'use client';

import './ProductDetailsPreview.scss';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useProductDetails } from '@/entities/product/product-details/model/useProductDetails';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/entities/cart/model/useCart';

export default function ProductDetailsPreview({ slug }: { slug: string }) {
  const { product } = useProductDetails(slug);
  const { add, cartLoading, mutating, error } = useCart();
  const quantityInCart = product?.quantity ?? 0;
  const [qty, setQty] = useState<number>(quantityInCart);

  if (!product) return <p>Товар не найден</p>;

  const handleAddToCart = () => {
    add(product.databaseId, qty)
      .then(() => {
        toast.success('Товар добавлен в корзину');
      })
      .catch((e) => {
        toast.error(e.message || 'Ошибка добавления');
      });
  };

  return (
    <div className="ProductDetailsPreview">
      <Breadcrumbs nameProduct={product.name!} />
      <div className="ProductDetailsPreview__content">
        <ImagesPreview
          image={product.image!}
          galleryImages={product.galleryImages?.nodes ?? []}
        />

        <div className="ProductDetailsPreview__info">
          <div className="product">
            <div>
              <p className="ProductDetailsPreview__sku Body/B2">
                {product.sku}
              </p>
              <h1 className="ProductDetailsPreview__name HeadlineH3">
                {product.name}
              </h1>
              {product.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>

            <div className="actionsCard">
              <div className="price">
                <ProductPrice
                  regularPrice={product.regularPrice!}
                  salePrice={product.salePrice}
                  onSale={product.onSale!}
                />
              </div>

              <div className="cartContainer">
                <button
                  className="cartAddButton ButtonBut2-bold"
                  onClick={handleAddToCart}
                  aria-label="Добавить в корзину"
                  disabled={cartLoading || mutating}
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
    </div>
  );
}
