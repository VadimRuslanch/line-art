import styles from './ImagesPreview.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { ImageCoreFragment, MediaItem } from '@/shared/api/gql/graphql';

export default function ImagesPreview({
  image,
  galleryImages,
}: {
  image: ImageCoreFragment;
  galleryImages?: MediaItem[];
}) {
  const [previewImageSrc, setPreviewImageSrc] = useState<string>(
    image.sourceUrl!,
  );
  return (
    <div className={styles.images}>
      <div className={styles.imagesList}>
        <button onClick={() => setPreviewImageSrc(image.sourceUrl!)}>
          <Image
            className={styles.image}
            width={125}
            height={125}
            src={image.sourceUrl!}
            alt={image.altText!}
          />
        </button>
        {galleryImages?.length
          ? galleryImages.map((img: ImageCoreFragment) => (
              <button
                key={img?.id}
                onClick={() => setPreviewImageSrc(img.sourceUrl!)}
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
          width={522}
          height={570}
        />
      </div>
    </div>
  );
}
