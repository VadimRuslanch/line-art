'use client';

import * as Slider from '@radix-ui/react-slider';
import { IMaskInput } from 'react-imask';
import { useEffect, useMemo, useState } from 'react';
import './PriceRange.scss';
import { useGetPriceCatalog } from '@/features/catalog/catalog-filters/api/useGetPriceCatalog';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { setPrice } from '@/features/catalog/catalog-filters/model/slice';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';

type Props = {
  step?: number;
  id?: string;
};

export default function PriceRange({ step = 100, id = 'price-range' }: Props) {
  const price = useGetPriceCatalog();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const { min, max } = price;
  const defaultRange = useMemo<[number, number]>(() => [min, max], [min, max]);
  const appliedRange = selectedFilters.price;
  const [priceValue, setPriceValue] = useState<[number, number]>(
    appliedRange ?? defaultRange,
  );

  useEffect(() => {
    if (appliedRange) {
      setPriceValue(appliedRange);
      return;
    }
    setPriceValue(defaultRange);
  }, [appliedRange, defaultRange]);

  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(Math.max(v, lo), hi);

  function onChange(v: [number, number]) {
    setPriceValue(v);
  }

  function onCommit(v: [number, number]) {
    setPriceValue(v);
    dispatch(setPrice(v));
  }

  return (
    <div className="price-range">
      <div className="price-range__label">
        <label className="SubtitleS1" htmlFor={id}>
          Цена, ₽
        </label>
      </div>

      <Slider.Root
        id={id}
        min={min}
        max={max}
        step={step}
        value={priceValue}
        orientation="horizontal"
        minStepsBetweenThumbs={1}
        onValueChange={onChange}
        onValueCommit={onCommit}
        className="price-range__slider"
      >
        <Slider.Track className="price-range__track">
          <Slider.Range className="price-range__range" />
        </Slider.Track>
        <Slider.Thumb
          aria-label="Минимальная цена"
          className="price-range__thumb"
        />
        <Slider.Thumb
          aria-label="Максимальная цена"
          className="price-range__thumb"
        />
      </Slider.Root>

      <div className="price-range__inputs">
        <IMaskInput
          className="price-range__input"
          mask={Number}
          scale={0}
          thousandsSeparator=" "
          value={String(priceValue[0])}
          inputMode="numeric"
          aria-label="Минимальная цена"
          onAccept={(raw: unknown) => {
            const parsed = Number(String(raw).replace(/\s/g, ''));
            if (!Number.isNaN(parsed)) {
              const nextMax = clamp(parsed, 0, max);
              onChange([nextMax, priceValue[1]]);
            }
          }}
          onBlur={() => onCommit(priceValue)}
          onKeyDown={(e) => e.key === 'Enter' && onCommit(priceValue)}
        />

        <IMaskInput
          className="price-range__input price-range__input--right"
          mask={Number}
          scale={0}
          thousandsSeparator=" "
          value={String(priceValue[1])}
          inputMode="numeric"
          onAccept={(raw: unknown) => {
            const parsed = Number(String(raw).replace(/\s/g, ''));
            if (!Number.isNaN(parsed)) {
              const nextMax = clamp(parsed, 0, max);
              onChange([priceValue[0], nextMax]);
            }
          }}
          onBlur={() => onCommit(priceValue)}
          onKeyDown={(e) => e.key === 'Enter' && onCommit(priceValue)}
          aria-label="Максимальная цена"
        />
      </div>
    </div>
  );
}
