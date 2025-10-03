'use client';
import SliderContainer from '@/shared/ui/Swiper/SliderContainer/SliderContainer';
import ArticleCard from '@/entities/article/ui/ArticleCard/ArticleCard';

export type TArticleCard = {
  databaseId: number;
  text: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
};

export default function SliderArticlesNewsCards() {
  const items: TArticleCard[] = [
    {
      databaseId: 1,
      text: 'Статьи  / . 14 Июн 2024',
      title: 'Алюминий в современном интерьере',
      image: {
        url: '/images/image-news.jpg',
        alt: 'alt',
      },
    },
    {
      databaseId: 123,
      text: 'Статьи  / . 14 Июн 2024',
      title: 'Алюминий в современном интерьере',
      image: {
        url: '/images/image-news.jpg',
        alt: 'alt',
      },
    },
    {
      databaseId: 14324,
      text: 'Статьи  / . 14 Июн 2024',
      title: 'Алюминий в современном интерьере',
      image: {
        url: '/images/image-news.jpg',
        alt: 'alt',
      },
    },
    {
      databaseId: 43421,
      text: 'Статьи  / . 14 Июн 2024',
      title: 'Алюминий в современном интерьере',
      image: {
        url: '/images/image-news.jpg',
        alt: 'alt',
      },
    },
    {
      databaseId: 12423,
      text: 'Статьи  / . 14 Июн 2024',
      title: 'Алюминий в современном интерьере',
      image: {
        url: '/images/image-news.jpg',
        alt: 'alt',
      },
    },
  ];

  return (
    <SliderContainer
      title="Новости Lineart"
      items={items}
      ItemComponent={ArticleCard}
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
