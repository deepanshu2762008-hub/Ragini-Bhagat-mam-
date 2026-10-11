import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { skills } from '../data/portfolio';

/** Size gently scaled by level — typography instead of a progress bar. */
function skillFontSize(level: number): string {
  const clamped = Math.min(100, Math.max(0, level));
  return `calc(1.55rem + ${(clamped - 70).toFixed(0)} * 0.022rem)`;
}

/** Section 10 — skill names as animated type with hand-drawn marks. */
export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <TornDivider top fill="var(--color-offwhite)" />

      <div className="section__inner">
        <header className="skills__header">
          <span className="section-eyebrow">chapter 10 — the toolkit</span>
          <h2 id="skills-title" className="section-title">
            <WordReveal as="span" text="Professional Skills" />
          </h2>
          <p className="section-lede">
            Not a dashboard — a page of notes on the things I am trusted to do,
            and how often I get to do them.
          </p>
        </header>

        <ul className="skills__list">
          {skills.map((skill, index) => (
            <Reveal as="li" key={skill.name} className="skill" delay={index * 70} y={14}>
              <div className="skill__head">
                <span className="skill__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="skill__name" style={{ fontSize: skillFontSize(skill.level) }}>
                  {skill.name}
                  {/* Hand-drawn circle for the signature strengths */}
                  {skill.level >= 94 && (
                    <svg
                      className="skill__circle"
                      viewBox="0 0 300 70"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        pathLength={1}
                        d="M28 14C90 2 210 0 268 12c30 6 30 40-4 48-70 16-196 14-244 2C-6 56 0 26 40 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              </div>

              <svg
                className="skill__mark"
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  pathLength={1}
                  d="M4 9C70 3 150 11 220 6c40-3 70 2 96-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1 + (skill.level / 100) * 2.2}
                  strokeLinecap="round"
                />
              </svg>

              <div className="skill__foot">
                {skill.note && <span className="skill__note">{skill.note}</span>}
                {/* Ink dots, decorative echo of the level value */}
                <span className="skill__dots" aria-hidden="true">
                  {Array.from({ length: Math.round(skill.level / 10) }).map((_, dot) => (
                    <span className="skill__dot" key={dot} />
                  ))}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
