import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import Counter from '../components/ui/Counter';
import { achievements, stats } from '../data/portfolio';
import type { AchievementCategory } from '../types';

const CATEGORY_ORDER: AchievementCategory[] = [
  'Award',
  'Certification',
  'Professional Development',
  'Workshop',
  'Responsibility',
  'Student Achievement',
  'School Contribution',
];

const CATEGORY_HEADINGS: Record<AchievementCategory, string> = {
  Award: 'Awards',
  Certification: 'Certifications',
  'Professional Development': 'Professional Development',
  Workshop: 'Workshops',
  Responsibility: 'Special Responsibilities',
  'Student Achievement': 'Student Achievements',
  'School Contribution': 'School Contributions',
};

/** Section 7 — big editorial counters over a notebook index page. */
export default function Achievements() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: achievements.filter((entry) => entry.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="achievements" className="section achievements" aria-labelledby="achievements-title">
      <TornDivider top fill="var(--color-paper)" />

      <div className="section__inner">
        <header className="achievements__header">
          <span className="section-eyebrow">chapter 07 — the record</span>
          <h2 id="achievements-title" className="section-title">
            <WordReveal as="span" text="Achievements" />
          </h2>
        </header>

        <div className="stats">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 120} className="stats__cell" y={16}>
              <Counter {...stat} />
            </Reveal>
          ))}
        </div>

        <div className="index-page">
          {grouped.map((group) => (
            <div className="index-group" key={group.category}>
              <Reveal as="h3" className="index-group__title" y={12}>
                {CATEGORY_HEADINGS[group.category]}
              </Reveal>
              <ul className="index-list">
                {group.items.map((entry, index) => (
                  <Reveal as="li" key={entry.title} delay={index * 50} y={10}>
                    <div className="index-list__row">
                      <span className="index-list__title">{entry.title}</span>
                      <span className="index-list__leader" aria-hidden="true" />
                      <span className="index-list__year">{entry.year}</span>
                    </div>
                    <p className="index-list__desc">{entry.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
