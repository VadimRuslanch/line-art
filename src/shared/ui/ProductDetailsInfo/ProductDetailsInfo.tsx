import './ProductDetailsInfo.scss';

import ProductDetailsSelect from '@/shared/ui/ProductDetailsInfo/components/ProductDetailsSelect/ProductDetailsSelect';

export default function ProductDetailsInfo() {
  return (
    <section className="ProductDetailsInfo">
      <h2 className="ProductDetailsInfo__title HeadlineH2">Информация</h2>
      <ProductDetailsSelect />
      <div className="ProductDetailsInfo__callback">
        <div className="ProductDetailsInfo__callback-wr">
          <h3 className="ProductDetailsInfo__callback-title HeadlineH3">
            Не нашли ответ?
          </h3>
          <span className="ProductDetailsInfo__callback-subtitle SubtitleS2">
            Наш менеджер бесплатно вас проконсультирует
          </span>
          <button className="ProductDetailsInfo__callback-button">
            <span className="ProductDetailsInfo__callback-button-text ButtonBut2-bold">
              Связаться с менеджером
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
