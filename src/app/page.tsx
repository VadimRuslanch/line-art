import PreviewCategories from '@/shared/ui/PreviewCategories/PreviewCategories';
import PopularProducts from '@/shared/ui/PopularProducts/PopularProducts';
import SliderArticles from '@/shared/ui/SliderArticles/SliderArticles';
import SliderInfo from '@/shared/ui/SliderInfo/SliderInfo';
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
