import SmoothScroll from './components/layout/SmoothScroll';
import ScrollProgress from './components/layout/ScrollProgress';
import Nav from './components/layout/Nav';

import Cover from './sections/Cover';
import About from './sections/About';
import Journey from './sections/Journey';
import Philosophy from './sections/Philosophy';
import Subjects from './sections/Subjects';
import Classroom from './sections/Classroom';
import Achievements from './sections/Achievements';
import SelectedWork from './sections/SelectedWork';
import BeyondClassroom from './sections/BeyondClassroom';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import BeyondTeaching from './sections/BeyondTeaching';
import LookingAhead from './sections/LookingAhead';
import Connect from './sections/Connect';
import Signature from './sections/Signature';
import NotFound from './sections/NotFound';

/** Unknown paths (SPA fallback / static 404) render the in-app 404 page. */
function resolveNotFound(): boolean {
  const base = import.meta.env.BASE_URL || '/';
  let path = window.location.pathname;
  if (base !== '/' && path.startsWith(base)) path = path.slice(base.length - 1);
  return path.replace(/\/+$/, '') !== '';
}

export default function App() {
  if (resolveNotFound()) {
    return (
      <SmoothScroll>
        <Nav />
        <main id="main-content">
          <NotFound />
        </main>
      </SmoothScroll>
    );
  }

  return (
    <SmoothScroll>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Cover />
        <About />
        <Journey />
        <Philosophy />
        <Subjects />
        <Classroom />
        <Achievements />
        <SelectedWork />
        <BeyondClassroom />
        <Skills />
        <Certificates />
        <BeyondTeaching />
        <LookingAhead />
        <Connect />
        <Signature />
      </main>
    </SmoothScroll>
  );
}
