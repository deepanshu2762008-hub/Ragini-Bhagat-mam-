import { useEffect, useState } from 'react';
import { NAV_ITEMS, SECTION_IDS, type NavItem } from '../data/nav';

/**
 * Active-section tracking via IntersectionObserver over a thin band at the
 * middle of the viewport, so exactly one nav item is ever highlighted.
 */
export function useActiveSection(): { activeSection: string | null; activeItem: NavItem | null } {
  const [activeSection, setActiveSection] = useState<string | null>(SECTION_IDS[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();

    const recompute = () => {
      if (visible.size === 0) return;
      // Deepest intersecting section in document order wins.
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        if (visible.has(id)) current = id;
      }
      setActiveSection(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        recompute();
      },
      // Thin band across the middle of the viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    let observed = 0;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed += 1;
      }
    }

    // No tracked sections on the page (e.g. the 404 route): no link is active.
    if (observed === 0) setActiveSection(null);

    return () => observer.disconnect();
  }, []);

  const activeItem =
    activeSection === null
      ? null
      : (NAV_ITEMS.find((item) => item.ids.includes(activeSection)) ?? NAV_ITEMS[0]);

  return { activeSection, activeItem };
}
