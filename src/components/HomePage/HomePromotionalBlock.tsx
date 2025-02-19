'use client';
import Link from 'next/link';
import './style/HomePromotionalBlock.scss';
import { useEffect, useState } from 'react';
import { fetchHomeSliderPromotional } from '@/app/utils/API/wooCommerceApi';
import { PromotionalLink } from '@/shared/types/api';

export default function HomePromotionalBlock() {
  const [promotionalData, setPromotionalData] = useState<PromotionalLink[]>([]);
  const [noveltylData, setNoveltylData] = useState<PromotionalLink[]>([]);
  useEffect(() => {
    fetchHomeSliderPromotional().then((data) => {
      setPromotionalData(data.promotion);
      setNoveltylData(data.novelty);
    });
  }, []);

  return (
    <section className="MainOffset">
      <div className="MainOffset__container container">
        {promotionalData.length > 0 && (
          <Link
            href={promotionalData[0].link}
            className="MainOffset__block MainOffset__block--left"
          >
            <h3 className="MainOffset__title">Акции</h3>
            <img
              alt={promotionalData[0].alt}
              src={promotionalData[0].image.node.sourceUrl}
            />
          </Link>
        )}
        {noveltylData.length > 0 && (
          <Link
            href={noveltylData[0].link}
            className="MainOffset__block MainOffset__block--right"
          >
            <img
              alt={noveltylData[0].alt}
              src={noveltylData[0].image.node.sourceUrl}
            />
            <h3 className="MainOffset__title">Новинки</h3>
          </Link>
        )}
      </div>
    </section>
  );
}
