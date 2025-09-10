'use client';

import './ProductDetailsPreview.scss';
// import IconChart from '@/shared/assets/svg/chart.svg';
import IconCart from '@/shared/assets/svg/cart.svg';
// import IconHeart from '@/shared/assets/svg/heart.svg';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useProductDetails } from '@/entities/product/product-details/model/useProductDetails';
import ImagesPreview from '@/shared/ui/ImagesPreview/ImagesPreview';
import ProductPrice from '@/shared/ui/ProductPrice/ProductPrice';
import QuantitySelector from '@/shared/ui/QuantitySelector/QuantitySelector';
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/entities/cart/model/useCart';

export default function ProductDetailsPreview({ slug }: { slug: string }) {
  const { product } = useProductDetails(slug);
  const { add, loading, error } = useCart();
  const quantityInCart = product?.quantity ?? 0;

  useEffect(() => {
    if (quantityInCart >= 0) setQty(quantityInCart);
  }, [quantityInCart]);
  const [qty, setQty] = useState<number>(quantityInCart);
  console.log(product);
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
            <div className="">
              <p>{product.sku}</p>
              <h1 className="title">{product.name}</h1>
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
                <QuantitySelector
                  min={0}
                  max={100}
                  value={qty}
                  onChangeAction={setQty}
                />

                <button
                  className="cartAddButton"
                  onClick={handleAddToCart}
                  disabled={loading}
                  aria-label="Добавить в корзину"
                >
                  <IconCart />
                  {loading ? 'Добавляем…' : 'Добавить в корзину'}
                </button>
              </div>

              {error && <p className="error">Не удалось добавить товар</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
