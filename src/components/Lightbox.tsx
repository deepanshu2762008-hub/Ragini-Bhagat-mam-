import { useCallback, useEffect, useRef, type TouchEvent } from 'react';
import { useDialog } from '../hooks/useDialog';
import { IconArrowLeft, IconArrowRight, IconX } from './ui/Icons';
import type { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Accessible image lightbox: focus trap, Esc, arrow keys, swipe,
 * counter and caption. Code-split with React.lazy from the gallery.
 */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  useDialog({ open: true, onClose, dialogRef });

  const item = items[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );
  const goNext = useCallback(() => onNavigate((index + 1) % items.length), [index, items.length, onNavigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (start == null) return;
    const delta = event.changedTouches[0]?.clientX ?? start;
    const dx = delta - start;
    if (Math.abs(dx) > 45) (dx > 0 ? goPrev : goNext)();
  };

  if (!item) return null;

  return (
    <div
      className="lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}. ${item.caption}`}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        <span className="lightbox__counter">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          className="icon-btn lightbox__close"
          data-dialog-focus
          aria-label="Close gallery"
          onClick={onClose}
        >
          <IconX />
        </button>
      </div>

      <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={goPrev}>
        <IconArrowLeft />
      </button>

      <figure className="lightbox__figure">
        <img
          key={item.image}
          className="lightbox__img"
          src={item.image}
          alt={item.alt}
          width="1280"
          height="860"
          decoding="async"
        />
        <figcaption className="lightbox__caption">{item.caption}</figcaption>
      </figure>

      <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={goNext}>
        <IconArrowRight />
      </button>
    </div>
  );
}
