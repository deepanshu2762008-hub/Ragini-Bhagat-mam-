import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { PressedLeaf } from '../components/ui/Decorations';
import { futureVision } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/** Section 13 — cinematic full-screen close with slow parallax. */
export default function LookingAhead() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-ahead-speed]').forEach((el) => {
        const speed = Number(el.dataset.aheadSpeed || 20);
        gsap.fromTo(
          el,
          { yPercent: speed * 0.6 },
          {
            yPercent: -speed * 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="looking-ahead"
      ref={sectionRef}
      className="section section--screen ahead"
      aria-labelledby="ahead-title"
    >
      <TornDivider top fill="var(--color-green-deep)" />

      {/* Slow parallax layers */}
      <span className="ahead__ghost" data-ahead-speed="12" aria-hidden="true">
        onwards
      </span>
      <span className="ahead__grain" data-ahead-speed="6" aria-hidden="true" />
      <span className="ahead__leaf ahead__leaf--a" data-ahead-speed="22" aria-hidden="true">
        <PressedLeafInline />
      </span>
      <span className="ahead__leaf ahead__leaf--b" data-ahead-speed="34" aria-hidden="true">
        <PressedLeafInline />
      </span>

      <div className="section__inner ahead__inner">
        <span className="section-eyebrow ahead__eyebrow">chapter 13 — next</span>
        <h2 id="ahead-title" className="ahead__title">
          <WordReveal as="span" text="Looking Ahead" />
        </h2>

        <Reveal delay={240} y={26}>
          <p className="ahead__statement">{futureVision.statement}</p>
        </Reveal>

        <Reveal delay={460} y={18}>
          <p className="ahead__paragraph">{futureVision.paragraph}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* Local alias keeps the JSX above easy to scan. */
function PressedLeafInline() {
  return <PressedLeaf />;
}
