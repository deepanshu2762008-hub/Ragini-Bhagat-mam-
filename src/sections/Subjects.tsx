import { useState } from 'react';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import SubjectArt from '../components/art/SubjectArt';
import { subjects } from '../data/portfolio';

/** Section 5 — editorial subject rows with hover/tap illustration reveals. */
export default function Subjects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="subjects" className="section subjects" aria-labelledby="subjects-title">
      <TornDivider top fill="var(--color-paper)" />

      <div className="section__inner">
        <header className="subjects__header">
          <span className="section-eyebrow">chapter 05 — the craft</span>
          <h2 id="subjects-title" className="section-title">
            <WordReveal as="span" text="Subjects & Expertise" />
          </h2>
          <p className="section-lede">
            Seven working disciplines, sharpened over a decade of lesson plans,
            corridor conversations and very honest feedback.
          </p>
        </header>

        <ul className="subjects__list">
          {subjects.map((subject, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal as="li" key={subject.name} delay={index * 60} y={14}>
                <button
                  type="button"
                  className={`subject${isOpen ? ' is-open' : ''}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="subject__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="subject__body">
                    <span className="subject__name">{subject.name}</span>
                    <span className="subject__desc">{subject.shortDescription}</span>
                  </span>
                  <span className="subject__art" aria-hidden="true">
                    <SubjectArt name={subject.illustration} />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
