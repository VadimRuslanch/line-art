'use client';
import './ImagesPreview.scss';

import { ImageCoreFragment, MediaItem } from '@/shared/api/gql/graphql';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  image?: ImageCoreFragment | null;
  galleryImages?: MediaItem[];
};

export default function ImagesPreview({ image, galleryImages }: Props) {
  const [previewImageSrc, setPreviewImageSrc] = useState<string>(
    image?.sourceUrl ?? '',
  );

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const direction = isDesktop ? 'vertical' : 'horizontal';

  return (
    <div className="ImagesPreview">
      <div>
        <Image
          className="ImagesPreview__main-image"
          src={previewImageSrc || '/images/product.png'}
          alt=""
          width={522}
          height={570}
          sizes="(max-width: 768px) 100vw, 522px"
        />
      </div>

      <div className="ImagesPreview__slider">
        {image && image.sourceUrl && (
          <Swiper
            direction={direction}
            slidesPerView="auto"
            spaceBetween={14}
            key={direction}
            mousewheel={isDesktop}
            className="ImagesPreview__swiper"
            modules={[Navigation]}
            navigation
          >
            <SwiperSlide>
              <button
                className="ImagesPreview__swiper-button-image"
                onClick={() => setPreviewImageSrc(image.sourceUrl!)}
              >
                <Image
                  className="ImagesPreview__swiper-image"
                  width={88}
                  height={88}
                  src={image.sourceUrl!}
                  alt={image.altText!}
                />
              </button>
            </SwiperSlide>
            {galleryImages?.length &&
              galleryImages.map((img: ImageCoreFragment) => (
                <SwiperSlide key={img?.id}>
                  <button
                    className="ImagesPreview__swiper-button-image"
                    onClick={() => setPreviewImageSrc(img.sourceUrl!)}
                  >
                    <Image
                      className="ImagesPreview__swiper-image"
                      src={img?.sourceUrl ?? ''}
                      alt={img?.altText ?? ''}
                      width={88}
                      height={88}
                    />
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
