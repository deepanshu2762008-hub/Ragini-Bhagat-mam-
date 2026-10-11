import { Suspense, lazy, useState, type CSSProperties } from 'react';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { gallery } from '../data/portfolio';

const Lightbox = lazy(() => import('../components/Lightbox'));

/** Section 6 — scrapbook gallery with tape mounts and a code-split lightbox. */
export default function Classroom() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section id="classroom" className="section classroom" aria-labelledby="classroom-title">
      <TornDivider top fill="var(--color-beige)" />

      <div className="section__inner">
        <header className="classroom__header">
          <span className="section-eyebrow">chapter 06 — snapshots</span>
          <h2 id="classroom-title" className="section-title">
            <WordReveal as="span" text="Inside the Classroom" />
          </h2>
          <p className="section-lede">
            Prints pinned to the page: ordinary mornings, marked proofs and the
            small evidence that a room is alive.
          </p>
        </header>

        <div className="gallery">
          {gallery.map((item, itemIndex) => (
            <figure
              key={`${item.image}-${itemIndex}`}
              className={`gallery__item gallery__item--${item.size}`}
              style={{ '--tilt': `${item.rotation}deg` } as CSSProperties}
            >
              <button
                type="button"
                className="gallery__btn"
                onClick={() => {
                  setIndex(itemIndex);
                  setOpen(true);
                }}
                aria-label={`Open image: ${item.caption}`}
              >
                <img
                  className="gallery__img"
                  src={item.image}
                  alt={item.alt}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery__tape" aria-hidden="true" />
              </button>
              <figcaption className="gallery__caption">{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="classroom__hint">Tap any print to open the full page.</p>
        </Reveal>
      </div>

      {open && (
        <Suspense fallback={null}>
          <Lightbox items={gallery} index={index} onClose={() => setOpen(false)} onNavigate={setIndex} />
        </Suspense>
      )}
    </section>
  );
}
