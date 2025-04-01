import './HomePage.scss';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'swiper/css/navigation';
import SliderArticles from '@/pagesComponents/home/components/SliderArticles/SliderArticles';
import SliderInfo from '@/pagesComponents/home/components/SliderInfo/SliderInfo';
import PreviewSlider from '@/pagesComponents/home/components/PreviewSlider/PreviewSlider';
import PopularProducts from '@/pagesComponents/home/components/PopularProducts/PopularProducts';

export default async function HomePage() {
  return (
    <div className="HomePage">
      <PreviewSlider />
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
