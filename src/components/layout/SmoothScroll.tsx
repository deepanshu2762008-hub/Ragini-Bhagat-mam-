import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollApi {
  /** Smooth-scroll to a selector or an absolute position, with nav offset. */
  scrollTo: (target: string | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
  reduced: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function useSmoothScroll(): SmoothScrollApi {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScroll>');
  return ctx;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  /* Lenis drives the page; the GSAP ticker drives Lenis, and ScrollTrigger
     listens to Lenis so pins/scrubs stay perfectly in sync. Skipped entirely
     when the user prefers reduced motion. */
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  /* Layout can shift once fonts land — refresh pins and scrubs. */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const scrollTo = useCallback(
    (target: string | number, offset = 0) => {
      const lenis = lenisRef.current;

      if (typeof target === 'number') {
        const top = Math.max(0, target);
        if (lenis) lenis.scrollTo(top, { duration: 1.3 });
        else window.scrollTo({ top, behavior: 'auto' });
        return;
      }

      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;

      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);

      // Move keyboard focus to the destination without fighting the scroll.
      const previousTabIndex = el.getAttribute('tabindex');
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      if (previousTabIndex === null) {
        el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
      }

      if (lenis) lenis.scrollTo(top, { duration: 1.4 });
      else window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo<SmoothScrollApi>(
    () => ({ scrollTo, stop, start, reduced }),
    [scrollTo, stop, start, reduced],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
