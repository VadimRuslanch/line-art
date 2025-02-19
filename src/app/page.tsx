import HomeMainSlider from '@/components/HomePage/HomeMainSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainSliderDecorationItems from '@/components/HomePage/components/MainSliderDecorationItems/MainSliderDecorationItems';
import HomePopularProducts from '@/components/HomePage/HomePopularProducts';
import HomePromotionalBlock from '@/components/HomePage/HomePromotionalBlock';

export default async function Home() {
  return (
    <div className="HomePage">
      <HomeMainSlider />
      <MainSliderDecorationItems />
      <HomePopularProducts />
      <HomePromotionalBlock />
    </div>
  );
}
