import CategoriesPopularSlider from '@/widgets/Pages/HomePage/CategoriesPopularSlider';
import ProductsCatalog from '@/widgets/Pages/HomePage/ProductsCatalog/ProductsCatalog';
import PreviewHomePage from '@/widgets/Pages/HomePage/PreviewHomePage/PreviewHomePage';
import SliderArticlesNewsCards from '@/widgets/Pages/HomePage/SliderArticlesNewsCards';
import FAQHomePage from '@/widgets/Pages/HomePage/FAQHomePage/FAQHomePage';

export default async function HomePage() {
  return (
    <div className="HomePage">
      <PreviewHomePage />
      <CategoriesPopularSlider />
      <ProductsCatalog />
      <SliderArticlesNewsCards />
      <FAQHomePage />
    </div>
  );
}
