import { Suspense, lazy, useState } from 'react';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { PaperClip } from '../components/ui/Decorations';
import { IconDownload } from '../components/ui/Icons';
import { certificates } from '../data/portfolio';

const CertificateViewer = lazy(() => import('../components/CertificateViewer'));

/** Section 11 — documents pinned to the board, calm and quiet. */
export default function Certificates() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="certificates"
      className="section certificates"
      aria-labelledby="certificates-title"
    >
      <TornDivider top fill="var(--color-beige)" />

      <div className="section__inner">
        <header className="certificates__header">
          <span className="section-eyebrow">chapter 11 — papers worth keeping</span>
          <h2 id="certificates-title" className="section-title">
            <WordReveal as="span" text="Certificates & Documents" />
          </h2>
          <p className="section-lede">
            Pinned to the board rather than filed away — the qualifications
            behind the classroom.
          </p>
        </header>

        <ul className="certs">
          {certificates.map((certificate, index) => (
            <Reveal as="li" key={certificate.title} className="cert" delay={index * 110} y={20}>
              <span className="cert__clip" aria-hidden="true">
                <PaperClip />
              </span>

              <button
                type="button"
                className="cert__btn"
                onClick={() => setOpenIndex(index)}
                aria-label={`Preview certificate: ${certificate.title}`}
              >
                <img
                  className="cert__thumb"
                  src={certificate.thumbnail}
                  alt={`Certificate: ${certificate.title} issued by ${certificate.issuer} in ${certificate.year}`}
                  width="640"
                  height="460"
                  loading="lazy"
                  decoding="async"
                />
              </button>

              <div className="cert__meta">
                <h3 className="cert__title">{certificate.title}</h3>
                <p className="cert__issuer">
                  {certificate.issuer} · {certificate.year}
                </p>
                <div className="cert__actions">
                  <button type="button" className="cert__preview" onClick={() => setOpenIndex(index)}>
                    Preview
                  </button>
                  {certificate.downloadable && (
                    <a
                      className="cert__download"
                      href={certificate.pdf ?? certificate.fullImage}
                      download={
                        certificate.pdf
                          ? certificate.pdf.split('/').pop()
                          : `${certificate.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`
                      }
                    >
                      <IconDownload />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Suspense fallback={null}>
          <CertificateViewer
            items={certificates}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        </Suspense>
      )}
    </section>
  );
}
