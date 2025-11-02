'use client';

import SliderContainer from '@/shared/ui/Swiper/SliderContainer/SliderContainer';
import CategoryCard from '@/entities/category/ui/CategoryCard/CategoryCard';
import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

export default function CategoriesPopularSlider() {
  const { categories } = useGetHomeCatalog();
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
