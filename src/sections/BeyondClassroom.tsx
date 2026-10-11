import { useEffect, useRef, useState } from 'react';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { classroomMemories, testimonials } from '../data/portfolio';

/** Section 9 — emotional storytelling: testimonials focus one at a time. */
export default function BeyondClassroom() {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-testimonial]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(items.indexOf(entry.target as HTMLElement));
          }
        }
      },
      // Thin band at the middle of the viewport: one voice in focus at a time.
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="beyond-classroom"
      className="section impact"
      aria-labelledby="impact-title"
    >
      <TornDivider top fill="var(--color-paper)" />

      <div className="section__inner">
        <header className="impact__header">
          <span className="section-eyebrow">chapter 09 — beyond lesson plans</span>
          <h2 id="impact-title" className="section-title">
            <WordReveal as="span" text="Beyond the Classroom" />
          </h2>
          <p className="section-lede">
            The work that never shows up on a report card: the words people
            remember afterwards.
          </p>
        </header>

        <span className="impact__mark impact__mark--open" aria-hidden="true">
          “
        </span>

        <div className="impact__list" ref={listRef}>
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={`${testimonial.name}-${testimonial.year}`}
              data-testimonial=""
              className={`testimonial${index === activeIndex ? ' is-active' : ''}`}
            >
              <Reveal y={22}>
                <p className="testimonial__quote">{testimonial.quote}</p>
                <footer className="testimonial__meta">
                  <span className="testimonial__name">{testimonial.name}</span>
                  <span className="testimonial__relation">
                    {testimonial.relation} · {testimonial.year}
                  </span>
                </footer>
              </Reveal>
            </blockquote>
          ))}
        </div>

        <span className="impact__mark impact__mark--close" aria-hidden="true">
          ”
        </span>

        <div className="memories">
          <h3 className="memories__title">Classroom memories</h3>
          <ul className="memories__list">
            {classroomMemories.map((memory, index) => (
              <Reveal as="li" key={memory.text} className="memory" delay={index * 120} y={16}>
                <div className="memory__sheet">
                  <span className="memory__label" aria-hidden="true">
                    {memory.label}
                  </span>
                  <p className="memory__text">{memory.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
