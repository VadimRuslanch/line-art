'use client';
import './ImagesPreview.scss';

import {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';

import type { ImageCoreFragment } from '@/shared/api/gql/graphql';
import ClientPortal from '@/shared/ui/Portal/ClientPortal';

type Props = {
  image?: ImageCoreFragment | null;
  galleryImages?: ImageCoreFragment[];
  fallbackAlt?: string;
};

type NormalizedImage = {
  id: string;
  src: string;
  alt: string;
};

function normalizeAlt(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export default function ImagesPreview({
  image,
  galleryImages,
  fallbackAlt = 'Product image',
}: Props) {
  const images = useMemo<NormalizedImage[]>(() => {
    const items: NormalizedImage[] = [];

    if (image?.sourceUrl) {
      items.push({
        id: image.id ?? 'primary',
        src: image.sourceUrl,
        alt: normalizeAlt(image.altText, fallbackAlt),
      });
    }

    (galleryImages ?? [])
      .filter((img): img is ImageCoreFragment => Boolean(img?.sourceUrl))
      .forEach((img, index) => {
        items.push({
          id: img.id ?? `gallery-${index}`,
          src: img.sourceUrl ?? '',
          alt: normalizeAlt(img.altText, fallbackAlt),
        });
      });

    return items;
  }, [fallbackAlt, galleryImages, image]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImages = images.length > 0;

  const normalizedIndex = useMemo(() => {
    if (!hasImages) return 0;
    const modulus = selectedIndex % images.length;
    return modulus < 0 ? modulus + images.length : modulus;
  }, [hasImages, images.length, selectedIndex]);

  const previewImage = hasImages ? images[normalizedIndex] : undefined;
  const previewSrc = previewImage?.src ?? '/images/product.png';
  const previewAlt = previewImage?.alt ?? fallbackAlt;

  const swiperProps = useMemo<SwiperProps>(
    () => ({
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 14,
      mousewheel: { enabled: false },
      modules: [Navigation, Mousewheel],
      navigation: true,
      breakpoints: {
        768: {
          direction: 'vertical',
          mousewheel: { enabled: true },
        },
      },
      className: 'ImagesPreview__swiper',
    }),
    [],
  );

  const openModal = useCallback(() => {
    if (!hasImages) return;
    setIsModalOpen(true);
  }, [hasImages]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (images.length === 0) return prev;
      const modulus = prev % images.length;
      const current = modulus < 0 ? modulus + images.length : modulus;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (images.length === 0) return prev;
      const modulus = prev % images.length;
      const current = modulus < 0 ? modulus + images.length : modulus;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (images.length < 2) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, images.length, isModalOpen, showNext, showPrev]);

  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const modalActive = isModalOpen && hasImages;

  return (
    <div className="ImagesPreview">
      <div className="ImagesPreview__main">
        <button
          type="button"
          className="ImagesPreview__main-button"
          onClick={openModal}
          disabled={!hasImages}
          aria-label="Open product image"
        >
          <Image
            className="ImagesPreview__main-image"
            src={previewSrc}
            alt={previewAlt}
            width={522}
            height={570}
            sizes="(max-width: 768px) 100vw, 522px"
          />
          {hasImages && (
            <span className="ImagesPreview__zoom-hint">Open image</span>
          )}
        </button>
      </div>

      <div className="ImagesPreview__slider">
        {hasImages && (
          <Swiper {...swiperProps}>
            {images.map((item, index) => (
              <SwiperSlide key={item.id || `${item.src}-${index}`}>
                <button
                  type="button"
                  className="ImagesPreview__swiper-button-image"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={normalizedIndex === index}
                >
                  <Image
                    className="ImagesPreview__swiper-image"
                    src={item.src}
                    alt={item.alt}
                    width={88}
                    height={88}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {modalActive && (
        <ClientPortal>
          <div
            className="ImagesPreviewModal"
            role="dialog"
            aria-modal="true"
            aria-label="Product gallery"
          >
            <button
              type="button"
              className="ImagesPreviewModal__overlay"
              onClick={closeModal}
              aria-label="Close viewer"
            />
            <div className="ImagesPreviewModal__body">
              <button
                type="button"
                className="ImagesPreviewModal__close"
                onClick={closeModal}
                aria-label="Close viewer"
              >
                ×
              </button>

              <div className="ImagesPreviewModal__image-wrapper">
                <Image
                  src={previewSrc}
                  alt={previewAlt}
                  width={900}
                  height={900}
                  sizes="(max-width: 1200px) 90vw, 900px"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="ImagesPreviewModal__nav ImagesPreviewModal__nav--prev"
                    onClick={showPrev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="ImagesPreviewModal__nav ImagesPreviewModal__nav--next"
                    onClick={showNext}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="ImagesPreviewModal__counter">
                {normalizedIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </ClientPortal>
      )}
    </div>
  );
}

