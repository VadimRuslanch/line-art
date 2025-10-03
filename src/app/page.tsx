

import SliderCategoriesPopularCards from '@/widgets/Pages/HomePage/SliderCategoriesPopularCards';
import PopularProducts from '@/widgets/Pages/HomePage/PopularProducts/PopularProducts';
import PreviewHomePage from '@/widgets/Pages/HomePage/PreviewHomePage/PreviewHomePage';
import SliderArticlesNewsCards from '@/widgets/Pages/HomePage/SliderArticlesNewsCards';
import FAQHomePage from '@/widgets/Pages/HomePage/FAQHomePage/FAQHomePage';

export default async function HomePage() {
  return (
    <div className="HomePage">
      <PreviewHomePage />
      <SliderCategoriesPopularCards />
      <PopularProducts />
      <SliderArticlesNewsCards />
      <FAQHomePage />
    </div>
  );
}
