import PreviewCategories from '@/app/components/PreviewCategories/PreviewCategories';
import PopularProducts from '@/app/features/product/popular/ui/PopularProducts/PopularProducts';
import SliderArticles from '@/app/components/SliderArticles/SliderArticles';
import SliderInfo from '@/app/components/SliderInfo/SliderInfo';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'swiper/css/navigation';

export default async function Home() {
  return (
    <div className="HomePage">
      <PreviewCategories />
      <PopularProducts />
      <div className="info">
        <div className="info__container">
          <SliderArticles />
          <SliderInfo />
        </div>
      </div>
    </div>
  );
}
