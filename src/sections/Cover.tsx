import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import SketchbookCover from '../components/SketchbookCover';
import { PaperScrap, Pencil, PressedLeaf } from '../components/ui/Decorations';
import { intro, tagline, teacherName } from '../data/portfolio';
import { useSmoothScroll } from '../components/layout/SmoothScroll';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const NAV_OFFSET = 84;

export default function Cover() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();

  // Drives the "pause decorative animation when off-screen" behaviour.
  const [liveRef, live] = useInView<HTMLDivElement>({ once: false, threshold: 0.02 });

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!section || !stage || !inner) return;

    const ctx = gsap.context(() => {
      // First scroll: the cover turns like a page into the story.
      gsap.to(inner, {
        yPercent: -7,
        rotateX: 8,
        opacity: 0.12,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      });

      // Floating elements drift at different depths.
      gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((el) => {
        const depth = Number(el.dataset.depth || 1);
        gsap.to(el, {
          yPercent: -18 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section cover"
      aria-labelledby="cover-title"
      data-active={live ? 'true' : 'false'}
    >
      {/* Slow-drifting paper grain */}
      <div className="cover__noise" aria-hidden="true" />

      {/*
        ── SKETCHBOOK COVER SLOT ──────────────────────────────────────────────
        MengToSketchbookLandingPage does not exist in this project (verified
        before building). <SketchbookCover /> is the marked drop-in point for
        the real component; until then it renders nothing and the authored
        cover below stands on its own.
      */}
      <SketchbookCover />

      <div className="cover__stage" ref={stageRef}>
        {/* Floating desk ephemera */}
        <span className="cover__decor cover__decor--leaf" data-depth="3" aria-hidden="true">
          <PressedLeaf />
        </span>
        <span className="cover__decor cover__decor--pencil" data-depth="2" aria-hidden="true">
          <Pencil />
        </span>
        <span className="cover__decor cover__decor--scrap" data-depth="1" aria-hidden="true">
          <PaperScrap />
        </span>
        <span className="cover__decor cover__decor--leaf-b" data-depth="2" aria-hidden="true">
          <PressedLeaf />
        </span>

        <div className="cover__inner" ref={innerRef}>
          <div ref={liveRef}>
            <Reveal as="p" className="cover__kicker" delay={120} y={10}>
              the sketchbook of
            </Reveal>

            <h1 id="cover-title" className="cover__title">
              <WordReveal as="span" text={teacherName} step={90} />
            </h1>

            <Reveal as="p" className="cover__tagline" delay={640} y={12}>
              {tagline}
            </Reveal>

            <Reveal as="p" className="cover__intro" delay={820} y={14}>
              {intro}
            </Reveal>

            <Reveal delay={1020} y={10}>
              <button
                type="button"
                className="cover__cta"
                onClick={() => scrollTo('#about', NAV_OFFSET)}
              >
                Scroll to explore
                <span className="cover__cta-arrow" aria-hidden="true">
                  ↓
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
