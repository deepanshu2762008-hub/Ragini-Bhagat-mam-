import Reveal from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { IconArrowUp } from '../components/ui/Icons';
import { tagline, teacherName } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import { useSmoothScroll } from '../components/layout/SmoothScroll';

/** Section 15 — the closing page: name, thanks, drawn signature. */
export default function Signature() {
  const { scrollTo } = useSmoothScroll();
  const [signRef, drawn] = useInView<SVGSVGElement>({ threshold: 0.5 });

  return (
    <section
      id="signature"
      className="section section--screen signature"
      aria-labelledby="signature-title"
    >
      <TornDivider top fill="var(--color-paper)" />

      <div className="section__inner signature__inner">
        <Reveal y={18}>
          <h2 id="signature-title" className="signature__name">
            {teacherName}
          </h2>
          <p className="signature__tagline">{tagline}</p>
        </Reveal>

        <Reveal delay={220} y={14}>
          <p className="signature__thanks">Thank you for exploring my journey.</p>
        </Reveal>

        <div className={`signature__stroke${drawn ? ' is-drawn' : ''}`}>
          <svg
            ref={signRef}
            className="signature__svg"
            viewBox="0 0 460 150"
            width="460"
            height="150"
            role="img"
            aria-label={`Handwritten signature of ${teacherName}`}
          >
            {/* A hand-drawn cursive flourish — decorative, the name above is the text. */}
            <path
              className="signature__path signature__path--name"
              pathLength={1}
              d="M18 104c14-44 30-70 40-72 8-2 6 18 2 44-4 24-6 40 2 42 10 2 20-24 26-46 4-16 8-24 12-22 5 2 2 22 0 36-2 12 0 18 6 18 8 0 14-16 18-32 3-12 6-18 10-16 4 2 4 16 2 28-2 10 0 16 6 16 10 0 20-20 28-40 5-13 10-20 14-18 5 3 3 18 0 30-2 9 0 14 6 14 9 0 20-18 30-42 4-10 8-14 12-12 5 3 4 16 1 28-2 9 1 14 7 13 10-1 22-16 34-38 8-15 16-24 22-22 6 2 6 14 3 26-2 9 1 14 8 13 12-2 30-14 48-34"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="signature__path signature__path--flourish"
              pathLength={1}
              d="M300 126c46 10 98 6 142-12 8-3 6-10-4-8-38 8-84 14-124 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Reveal delay={420} y={12}>
          <button type="button" className="signature__top" onClick={() => scrollTo(0)}>
            <IconArrowUp />
            Back to top
          </button>
        </Reveal>
      </div>
    </section>
  );
}
