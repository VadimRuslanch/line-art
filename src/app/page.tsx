import { fetchWooCommerceProducts } from '@/app/utils/wooCommerceApi';
import { Product } from '@/app/utils/wooCommerceApi';
import MainSlider from '@/components/HomePage/MainSlider/MainSlider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainSliderDecorationItems from '@/components/HomePage/MainSlider/components/MainSliderDecorationItems/MainSliderDecorationItems';

export default async function Home() {
  const wooCommerceProducts = await fetchWooCommerceProducts().catch(
    (error) => {
      console.error('Error fetching WooCommerce products:', error);
      return null;
    },
  );

  if (!wooCommerceProducts) {
    return (
      <div>
        <h1>Failed to load products.</h1>
      </div>
    );
  }

  const products: Product[] = wooCommerceProducts.data;

  return (
    <div className="HomePage">
      <MainSlider />
      <MainSliderDecorationItems />
      {/*<div>*/}
      {/*  <ul>*/}
      {/*    {products.map((product) => (*/}
      {/*      <li key={product.id}>{product.name}</li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  );
}
