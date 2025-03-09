import './HomePage.scss';
import PreviewSlider from '@/pages/home/components/PreviewSlider/PreviewSlider';
import PopularProducts from '@/pages/home/components/PopularProducts/PopularProducts';
import SliderArticles from '@/pages/home/components/SliderArticles/SliderArticles';

export default function HomePage() {
  return (
    <div className="HomePage">
      <PreviewSlider />
      <PopularProducts />
      <SliderArticles />
    </div>
  );
}
