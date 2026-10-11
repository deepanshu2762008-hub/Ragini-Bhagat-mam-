import { useCallback, useEffect, useRef, useState } from 'react';
import { useDialog } from '../hooks/useDialog';
import { IconArrowLeft, IconArrowRight, IconDownload, IconX, IconZoom } from './ui/Icons';
import type { Certificate } from '../types';

interface CertificateViewerProps {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen certificate preview: zoom, next/prev, Esc and arrow keys,
 * focus trap, and a download button where the data marks a file downloadable.
 * Code-split with React.lazy from the Certificates section.
 */
export default function CertificateViewer({ items, index, onClose, onNavigate }: CertificateViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);

  useDialog({ open: true, onClose, dialogRef });

  const item = items[index];

  const goPrev = useCallback(
    () => {
      setZoomed(false);
      onNavigate((index - 1 + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );
  const goNext = useCallback(
    () => {
      setZoomed(false);
      onNavigate((index + 1) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === '+' || event.key === '=') setZoomed(true);
      if (event.key === '-') setZoomed(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  if (!item) return null;

  const downloadHref = item.pdf ?? item.fullImage;
  const downloadName = item.pdf
    ? item.pdf.split('/').pop() ?? 'certificate.pdf'
    : `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;

  return (
    <div
      className="lightbox certview"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate preview: ${item.title}, ${item.issuer}, ${item.year}`}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox__bar">
        <span className="lightbox__counter">
          {index + 1} / {items.length}
        </span>
        <div className="certview__actions">
          {item.downloadable && (
            <a
              className="icon-btn certview__download"
              href={downloadHref}
              download={downloadName}
              aria-label={`Download ${item.title}`}
            >
              <IconDownload />
            </a>
          )}
          <button
            type="button"
            className="icon-btn lightbox__close"
            data-dialog-focus
            aria-label="Close certificate preview"
            onClick={onClose}
          >
            <IconX />
          </button>
        </div>
      </div>

      <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" aria-label="Previous certificate" onClick={goPrev}>
        <IconArrowLeft />
      </button>

      <figure className={`lightbox__figure certview__figure${zoomed ? ' is-zoomed' : ''}`}>
        <div className="certview__scroller">
          <img
            key={item.fullImage}
            className="certview__img lightbox__img"
            src={item.fullImage}
            alt={`Certificate: ${item.title} issued by ${item.issuer} in ${item.year}`}
            width="1200"
            height="860"
            decoding="async"
          />
        </div>
        <figcaption className="lightbox__caption">
          <span className="certview__title">{item.title}</span>
          {' — '}
          {item.issuer}, {item.year}
        </figcaption>
      </figure>

      <button
        type="button"
        className="icon-btn certview__zoom lightbox__nav--inline"
        aria-pressed={zoomed}
        aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        onClick={() => setZoomed((z) => !z)}
      >
        <IconZoom />
      </button>

      <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" aria-label="Next certificate" onClick={goNext}>
        <IconArrowRight />
      </button>
    </div>
  );
}
