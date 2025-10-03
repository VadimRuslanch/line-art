'use client';

import { useCategoriesParents } from '@/entities/category/model/useCategoriesParents';
import SliderContainer from '@/shared/ui/Swiper/SliderContainer/SliderContainer';
import CategoryCard from '@/entities/category/ui/CategoryCard/CategoryCard';

export default function SliderCategoriesPopularCards() {
  const { categories } = useCategoriesParents();
  if (!categories) return null;
  return (
    <SliderContainer
      title="Популярные категории"
      items={categories}
      ItemComponent={CategoryCard}
      swiperProps={{
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 1.6, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 20 },
        },
      }}
    />
  );
}
