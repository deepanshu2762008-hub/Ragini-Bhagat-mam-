import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import { PressedLeaf } from '../components/ui/Decorations';
import { designation, philosophy } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  /* Multi-layer botanical parallax — three depths, one easing language. */
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = Number(el.dataset.speed || -20);
        gsap.fromTo(
          el,
          { yPercent: -speed * 0.5 },
          {
            yPercent: speed * 0.5,
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
      id="philosophy"
      ref={sectionRef}
      className="section section--screen philosophy paper-dotted"
      aria-labelledby="philosophy-title"
    >
      <span className="philosophy__botanical philosophy__botanical--a" data-speed="-26" aria-hidden="true">
        <PressedLeaf />
      </span>
      <span className="philosophy__botanical philosophy__botanical--b" data-speed="-52" aria-hidden="true">
        <PressedLeaf />
      </span>
      <span className="philosophy__botanical philosophy__botanical--c" data-speed="-14" aria-hidden="true">
        <PressedLeaf />
      </span>

      <div className="section__inner philosophy__inner">
        <span className="section-eyebrow philosophy__eyebrow">chapter 04 — what I believe</span>
        <h2 id="philosophy-title" className="philosophy__label">
          <WordReveal as="span" text="Teaching Philosophy" />
        </h2>

        <blockquote className="philosophy__quote">
          <p>
            <span className="philosophy__line">
              <Reveal as="span" delay={80} y={26}>
                “{philosophy.quote[0]}
              </Reveal>
            </span>
            <span className="philosophy__line">
              <Reveal as="span" delay={340} y={26}>
                {philosophy.quote[1]}”
              </Reveal>
            </span>
          </p>
        </blockquote>

        <Reveal delay={560} y={16}>
          <p className="philosophy__support">{philosophy.paragraph}</p>
        </Reveal>

        <Reveal delay={720} y={12}>
          <p className="philosophy__sign">{designation}</p>
        </Reveal>
      </div>
    </section>
  );
}
