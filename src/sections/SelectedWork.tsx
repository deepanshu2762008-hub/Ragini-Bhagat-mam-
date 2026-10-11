import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import ProjectDetail from '../components/ProjectDetail';
import { projects } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/** Section 8 — pinned horizontal project pages on desktop, stack on mobile. */
export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const distance = () => Math.max(1, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + 160}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section work"
      aria-labelledby="work-title"
    >
      <TornDivider top fill="var(--color-offwhite)" />

      <div className="work__track" ref={trackRef}>
        <header className="work__intro">
          <span className="section-eyebrow">chapter 08 — selected work</span>
          <h2 id="work-title" className="section-title">
            <WordReveal as="span" text="Selected Work" />
          </h2>
          <p className="section-lede">
            Long-form projects that outlasted a single lesson — each one built
            with students, for an audience beyond the classroom wall.
          </p>
          <p className="work__hint" aria-hidden="true">
            Scroll sideways through the pages →
          </p>
        </header>

        {projects.map((project, index) => (
          <article className="work__page" key={project.name}>
            <Reveal className="work__sheet" delay={80} y={24}>
              <div className="work__meta">
                <span className="work__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="work__year">{project.year}</span>
              </div>

              <h3 className="work__name">{project.name}</h3>
              <p className="work__role">{project.role}</p>
              <p className="work__desc">{project.description}</p>

              <div className="work__images">
                {project.images.map((src, imageIndex) => (
                  <img
                    key={src}
                    className={`work__img work__img--${imageIndex % 2 === 0 ? 'a' : 'b'}`}
                    src={src}
                    alt={`${project.name} — plate ${imageIndex + 1}`}
                    width="640"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <button
                type="button"
                className="work__open"
                onClick={() => setOpenIndex(index)}
              >
                Open project notes
                <span aria-hidden="true"> →</span>
              </button>
            </Reveal>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectDetail
            key={projects[openIndex].name}
            project={projects[openIndex]}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
