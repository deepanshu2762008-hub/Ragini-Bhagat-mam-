import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { journey } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!section || !track || !line) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Desktop: pin the section and travel the timeline sideways while the
         hand-drawn line draws itself along the track. */
      mm.add('(min-width: 1024px)', () => {
        const distance = () => Math.max(1, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + 200}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const drawn =
                (distance() * self.progress + window.innerWidth * 0.6) / track.scrollWidth;
              line.style.transform = `scaleX(${Math.min(1, Math.max(0.06, drawn))})`;
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      /* Mobile / tablet: the vertical line fills as the column scrolls. */
      mm.add('(max-width: 1023px)', () => {
        const tween = gsap.fromTo(
          line,
          { scaleY: 0.05 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'bottom 65%',
              scrub: 0.5,
            },
          },
        );
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
      id="journey"
      ref={sectionRef}
      className="section journey"
      aria-labelledby="journey-title"
    >
      <div className="journey__track" ref={trackRef}>
        <header className="journey__intro">
          <span className="section-eyebrow">chapter 03 — the path so far</span>
          <h2 id="journey-title" className="section-title">
            <WordReveal as="span" text="My Journey" />
          </h2>
          <p className="section-lede">
            Six stops along one continuous line — the milestones that shaped how I
            walk into a classroom.
          </p>
        </header>

        <div className="journey__rail">
          <span className="journey__line" aria-hidden="true">
            <span className="journey__line-fill" ref={lineRef} />
          </span>

          <ol className="journey__nodes">
            {journey.map((milestone, index) => (
              <li className="journey__node" key={milestone.label}>
                <span className="journey__dot" aria-hidden="true" />
                <Reveal delay={index * 60} y={18}>
                  <p className="journey__year">{milestone.year}</p>
                  <h3 className="journey__label">{milestone.label}</h3>
                  <p className="journey__desc">{milestone.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <TornDivider fill="var(--color-offwhite)" />
    </section>
  );
}
