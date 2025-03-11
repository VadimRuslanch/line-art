import './HomePage.scss';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'swiper/css/navigation';
import PreviewSlider from '@/pages/home/components/PreviewSlider/PreviewSlider';
import PopularProducts from '@/pages/home/components/PopularProducts/PopularProducts';
import SliderArticles from '@/pages/home/components/SliderArticles/SliderArticles';
import InfoSlider from '@/pages/home/components/InfoSlider/InfoSlider';

export default function HomePage() {
  return (
    <div className="HomePage">
      <PreviewSlider />
      <PopularProducts />
      <div className="info">
        <div className="info__container">
          <SliderArticles />
          <InfoSlider />
        </div>
      </div>
    </div>
  );
}
