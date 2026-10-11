import { useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../data/nav';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useDialog } from '../../hooks/useDialog';
import { teacherName } from '../../data/portfolio';
import { DURATION, EASE } from '../../styles/motion';
import { useSmoothScroll } from './SmoothScroll';

const NAV_OFFSET = 84;

/** Floating sticky navigation: pill on desktop, paper overlay menu on mobile. */
export default function Nav() {
  const { activeItem } = useActiveSection();
  const { scrollTo } = useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useDialog({
    open: menuOpen,
    onClose: () => setMenuOpen(false),
    dialogRef: menuRef,
  });

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo(href, NAV_OFFSET);
  };

  return (
    <header className="site-header">
      <div className="progress-slot" aria-hidden="true" />

      <nav className="nav" aria-label="Primary">
        <a
          className="nav__brand"
          href="#home"
          onClick={(event) => navigate(event, '#home')}
        >
          {teacherName}
        </a>

        <ul className="nav__list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem?.label === item.label;
            return (
              <li key={item.label}>
                <a
                  className={`nav__link${isActive ? ' is-active' : ''}`}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => navigate(event, item.href)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={burgerRef}
          type="button"
          className={`burger${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="burger__line" />
          <span className="burger__line" />
          <span className="burger__line" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
          >
            <div className="menu__inner">
              <ul className="menu__list">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeItem?.label === item.label;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DURATION.base,
                        ease: EASE,
                        delay: 0.06 + index * 0.04,
                      }}
                    >
                      <a
                        className={`menu__link${isActive ? ' is-active' : ''}`}
                        href={item.href}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={(event) => navigate(event, item.href)}
                      >
                        <span className="menu__index" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <p className="menu__note">A digital sketchbook — scroll gently.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
