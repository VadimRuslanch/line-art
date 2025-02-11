import MainSlider from '@/components/HomePage/MainSlider/MainSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainSliderDecorationItems from '@/components/HomePage/MainSlider/components/MainSliderDecorationItems/MainSliderDecorationItems';
import HomePopularProducts from '@/components/HomePage/HomePopularProducts';

export default async function Home() {
  return (
    <div className="HomePage">
      <MainSlider />
      <MainSliderDecorationItems />
      <HomePopularProducts />
    </div>
  );
}
