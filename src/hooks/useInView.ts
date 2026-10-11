import { useCallback, useEffect, useState, type RefCallback } from 'react';

interface InViewOptions {
  /** Leave visible once seen (default true — reveals happen once only). */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * IntersectionObserver-based visibility with a callback ref, so the element is
 * (re)observed whenever its DOM node changes. Falls back to "always visible"
 * when IO is unavailable, reveals elements that were flicked past, and keeps
 * content visible rather than stuck hidden.
 */
export function useInView<T extends Element = HTMLElement>(
  options: InViewOptions = {},
): [RefCallback<T>, boolean] {
  const { once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options;
  const [element, setElement] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback<RefCallback<T>>((node) => setElement(node), []);

  useEffect(() => {
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (once && entry.boundingClientRect.bottom <= 0) {
            // Flicked past faster than the observer could sample it.
            setInView(true);
            observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, once, threshold, rootMargin]);

  return [ref, inView];
}
