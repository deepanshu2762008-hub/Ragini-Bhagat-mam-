import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { ScribbleArrow, TapeStrip } from '../components/ui/Decorations';
import { bio, education, experience, portraitImage, teacherName } from '../data/portfolio';

const ANNOTATIONS = [
  { text: 'Educator', className: 'portrait__note--tl' },
  { text: 'Mentor', className: 'portrait__note--tr' },
  { text: 'Explorer', className: 'portrait__note--bl' },
  { text: 'Lifelong Learner', className: 'portrait__note--br' },
];

export default function About() {
  return (
    <section id="about" className="section about paper-ruled" aria-labelledby="about-title">
      <TornDivider top fill="var(--color-offwhite)" />

      <div className="section__inner">
        <header className="about__header">
          <span className="section-eyebrow">chapter 02 — about me</span>
          <h2 id="about-title" className="section-title">
            <WordReveal as="span" text="About Me" />
          </h2>
        </header>

        <div className="about__grid">
          {/* Layered portrait: backing sheet, print, tape, annotations */}
          <figure className="portrait">
            <span className="portrait__backing" aria-hidden="true" />
            <img
              className="portrait__img"
              src={portraitImage}
              width="720"
              height="900"
              loading="lazy"
              decoding="async"
              alt={`Portrait photograph of ${teacherName}`}
            />
            <TapeStrip className="portrait__tape portrait__tape--tl" />
            <TapeStrip className="portrait__tape portrait__tape--br" />

            {ANNOTATIONS.map((note) => (
              <span key={note.text} className={`portrait__note ${note.className}`} aria-hidden="true">
                <ScribbleArrow className="portrait__arrow" />
                {note.text}
              </span>
            ))}

            <figcaption className="portrait__caption">
              {teacherName} — photographed between lessons
            </figcaption>
          </figure>

          {/* Biography */}
          <div className="about__text">
            <div className="about__bio">
              {bio.map((paragraph, index) => (
                <Reveal
                  key={index}
                  as="p"
                  className="about__para"
                  delay={index * 110}
                  y={16}
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <Reveal delay={280} className="about__creds">
              <h3 className="about__creds-title">Education</h3>
              <ul className="cred-list">
                {education.map((entry) => (
                  <li className="cred-list__item" key={`${entry.year}-${entry.title}`}>
                    <span className="cred-list__year">{entry.year}</span>
                    <div className="cred-list__body">
                      <p className="cred-list__title">{entry.title}</p>
                      <p className="cred-list__org">{entry.organization}</p>
                      <p className="cred-list__desc">{entry.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="about__creds-title">Teaching experience</h3>
              <ul className="cred-list">
                {experience.map((entry) => (
                  <li className="cred-list__item" key={`${entry.year}-${entry.title}`}>
                    <span className="cred-list__year">{entry.year}</span>
                    <div className="cred-list__body">
                      <p className="cred-list__title">{entry.title}</p>
                      <p className="cred-list__org">{entry.organization}</p>
                      <p className="cred-list__desc">{entry.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
