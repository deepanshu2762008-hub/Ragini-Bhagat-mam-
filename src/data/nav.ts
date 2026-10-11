/**
 * Navigation model. Section ids must match the ids rendered by the sections
 * (see the mapping table in the README).
 */

export interface NavItem {
  label: string;
  /** Section ids that highlight this nav item, in document order */
  ids: string[];
  /** Anchor scrolled to when clicked */
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', ids: ['home'], href: '#home' },
  { label: 'About', ids: ['about'], href: '#about' },
  { label: 'Journey', ids: ['journey'], href: '#journey' },
  { label: 'Philosophy', ids: ['philosophy'], href: '#philosophy' },
  { label: 'Experience', ids: ['subjects', 'classroom'], href: '#subjects' },
  { label: 'Achievements', ids: ['achievements'], href: '#achievements' },
  { label: 'Projects', ids: ['projects'], href: '#projects' },
  { label: 'Impact', ids: ['beyond-classroom', 'skills'], href: '#beyond-classroom' },
  { label: 'Certificates', ids: ['certificates'], href: '#certificates' },
  {
    label: 'Contact',
    ids: ['beyond-teaching', 'looking-ahead', 'connect', 'signature'],
    href: '#connect',
  },
];

/** All section ids in document order — drives active-section tracking. */
export const SECTION_IDS: string[] = NAV_ITEMS.flatMap((item) => item.ids);
