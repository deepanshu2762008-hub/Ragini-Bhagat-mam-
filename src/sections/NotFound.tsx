import Reveal from '../components/ui/Reveal';
import { useSmoothScroll } from '../components/layout/SmoothScroll';

/** Simple in-app 404 route (a standalone public/404.html covers static hosts). */
export default function NotFound() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="section section--screen notfound" aria-labelledby="notfound-title">
      <div className="section__inner notfound__inner">
        <Reveal y={16}>
          <p className="notfound__code" aria-hidden="true">
            404
          </p>
          <h1 id="notfound-title" className="notfound__title">
            This page isn’t in the notebook
          </h1>
          <p className="notfound__text">
            The page you were looking for has been moved, or never written down.
          </p>
          <button type="button" className="btn btn--solid" onClick={() => scrollTo(0)}>
            Back to the cover
          </button>
        </Reveal>
      </div>
    </section>
  );
}
