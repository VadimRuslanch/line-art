import '../ProductDetailsPreview/ProductDetailsPreview.scss';
import '../ProductDetailsAbout/ProductDetailsAbout.scss';

export function ProductDetailsPreviewSkeleton() {
  return (
    <div className="ProductDetailsPreview ProductDetailsPreview--skeleton">
      <div className="ProductDetailsPreview__content">
        <div className="ProductDetailsPreview__media-skeleton">
          <span className="skeleton skeleton--image-lg" />
          <div className="ProductDetailsPreview__thumbs-skeleton">
            {Array.from({ length: 4 }).map((_, index) => (
              <span className="skeleton skeleton--thumb" key={index} />
            ))}
          </div>
        </div>

        <div className="ProductDetailsPreview__info ProductDetailsPreview__info--skeleton">
          <span className="skeleton skeleton--line-xs" />
          <span className="skeleton skeleton--title" />

          <div className="ProductDetailsPreview__characteristics">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="product-attribute" key={index}>
                <span className="skeleton skeleton--line skeleton--line-short" />
                <div className="ProductDetailsPreview__characteristics-values">
                  <span className="skeleton skeleton--chip" />
                  <span className="skeleton skeleton--chip" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsAboutSkeleton() {
  return (
    <div className="ProductDetailsAbout ProductDetailsAbout--skeleton">
      <span className="skeleton skeleton--title" />

      <div className="ProductDetailsAbout__description ProductDetailsAbout__description--skeleton">
        {Array.from({ length: 3 }).map((_, index) => (
          <span className="skeleton skeleton--paragraph" key={index} />
        ))}
      </div>

      <section className="ProductDetailsAbout__characteristics ProductDetailsAbout__characteristics--skeleton">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="ProductDetailsAbout__characteristics-row" key={index}>
            <span className="skeleton skeleton--line skeleton--line-short" />
            <span className="skeleton skeleton--chip" />
          </div>
        ))}
      </section>
    </div>
  );
}
