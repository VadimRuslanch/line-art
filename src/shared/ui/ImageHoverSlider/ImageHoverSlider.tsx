'use client';

import './ImageHoverSlider.scss';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import cn from 'classnames';

type Img = { src: string; alt?: string | null; id?: string | number };

type Props = {
  images: Img[];
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  resetOnLeave?: boolean;
};

export default function ImageHoverSlider({
  images,
  width,
  height,
  className,
  priority = false,
  resetOnLeave = true,
}: Props) {
  const safeImages = useMemo(
    () => images.filter(Boolean).filter((i) => i?.src),
    [images],
  );

  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const setIndexFromClientX = useCallback(
    (clientX: number) => {
      const el = wrapRef.current;
      if (!el || safeImages.length === 0) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const ratio = x / rect.width;
      const next = Math.min(
        safeImages.length - 1,
        Math.floor(ratio * safeImages.length),
      );
      if (next !== idx) setIdx(next);
    },
    [idx, safeImages.length],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIndexFromClientX(e.clientX);
    },
    [setIndexFromClientX],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches && e.touches[0]) {
        setIndexFromClientX(e.touches[0].clientX);
      }
    },
    [setIndexFromClientX],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (safeImages.length <= 1) return;
      if (e.key === 'ArrowRight') {
        setIdx((v) => Math.min(safeImages.length - 1, v + 1));
      } else if (e.key === 'ArrowLeft') {
        setIdx((v) => Math.max(0, v - 1));
      } else if (e.key === 'Home') {
        setIdx(0);
      } else if (e.key === 'End') {
        setIdx(safeImages.length - 1);
      }
    },
    [safeImages.length],
  );

  const onMouseLeave = useCallback(() => {
    if (resetOnLeave) setIdx(0);
  }, [resetOnLeave]);

  if (safeImages.length === 0) return null;

  return (
    <div
      ref={wrapRef}
      className={cn('ImageHoverSlider', className)}
      role="group"
      aria-roledescription="image scrubber"
      tabIndex={0}
      onPointerMove={onPointerMove}
      onTouchMove={onTouchMove}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      style={{ height }}
    >
      <div className="ImageHoverSlider__stack">
        <AnimatePresence initial={false} mode="popLayout">
          {safeImages.map((img, i) => (
            <motion.div
              key={img.id ?? img.src}
              className={cn('ImageHoverSlider__item', {
                'is-active': i === idx,
              })}
              initial={{ opacity: i === idx ? 1 : 0 }}
              animate={{ opacity: i === idx ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Image
                src={img.src}
                alt={img.alt ?? ''}
                width={width}
                height={height}
                sizes={`${width}px`}
                priority={priority && i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="ImageHoverSlider__img"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {safeImages.length > 1 && (
        <div className="ImageHoverSlider__dots" aria-hidden>
          {safeImages.map((_, i) => (
            <span
              key={i}
              className={cn('ImageHoverSlider__dot', {
                'is-active': i === idx,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
