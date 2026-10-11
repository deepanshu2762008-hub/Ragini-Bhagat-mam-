import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { Stat } from '../../types';

/**
 * Editorial number that counts up once when it enters the viewport.
 * Reduced motion shows the final value immediately; screen readers get the
 * final value only (the animated glyphs are aria-hidden).
 */
export default function Counter({ value, suffix = '', label }: Stat) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() => (reduced ? value : 0));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const startTime = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <div className="stat" ref={ref}>
      <p className="stat__value">
        <span aria-hidden="true">
          {display.toLocaleString()}
          {suffix}
        </span>
        <span className="sr-only">
          {value.toLocaleString()}
          {suffix}
        </span>
      </p>
      <p className="stat__label">{label}</p>
    </div>
  );
}
