import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { PressedLeaf, ScribbleArrow } from '../components/ui/Decorations';
import InterestArt from '../components/art/InterestArt';
import { interests } from '../data/portfolio';

/** Section 12 — a softer journal spread of personal interests. */
export default function BeyondTeaching() {
  return (
    <section
      id="beyond-teaching"
      className="section personal"
      aria-labelledby="personal-title"
    >
      <TornDivider top fill="var(--color-paper)" />

      <span className="personal__leaf" aria-hidden="true">
        <PressedLeaf />
      </span>

      <div className="section__inner">
        <header className="personal__header">
          <span className="section-eyebrow">chapter 12 — between the lessons</span>
          <h2 id="personal-title" className="section-title">
            <WordReveal as="span" text="Beyond Teaching" />
          </h2>
          <p className="section-lede">
            The pages of the notebook that have nothing to do with lesson plans
            — and everything to do with why there are lesson plans at all.
          </p>
        </header>

        <ul className="journal">
          {interests.map((interest, index) => (
            <Reveal
              as="li"
              key={interest.name}
              className={`journal__page journal__page--${index % 2 === 0 ? 'left' : 'right'}`}
              delay={index * 80}
              y={20}
            >
              <span className="journal__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="journal__art">
                <InterestArt name={interest.illustration} />
              </span>
              <span className="journal__name">{interest.name}</span>
              <ScribbleArrow className="journal__arrow" />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="personal__note">sketched in the margins, kept for later</p>
        </Reveal>
      </div>
    </section>
  );
}
