import styles from './ImagesPreview.module.scss';
import Image from 'next/image';
import { useState } from 'react';

export default function ImagesPreview({ image, galleryImages }) {
  const [previewImageSrc, setPreviewImageSrc] = useState<string>(
    image.sourceUrl,
  );
  return (
    <div className={styles.images}>
      <div className={styles.imagesList}>
        <button onClick={() => setPreviewImageSrc(image.sourceUrl)}>
          <Image
            className={styles.image}
            width={125}
            height={125}
            src={image.sourceUrl}
            alt={image.altText}
          />
        </button>
        {galleryImages?.nodes?.length
          ? galleryImages.nodes.map((img) => (
              <button
                key={img?.id}
                onClick={() => setPreviewImageSrc(img?.sourceUrl)}
              >
                <Image
                  className={styles.image}
                  src={img?.sourceUrl ?? ''}
                  alt={img?.altText ?? ''}
                  width={125}
                  height={125}
                />
              </button>
            ))
          : null}
      </div>
      <div className={styles.previewImageContainer}>
        <Image
          className={styles.previewImage}
          src={previewImageSrc}
          alt=""
          width={714}
          height={560}
        />
      </div>
    </div>
  );
}
