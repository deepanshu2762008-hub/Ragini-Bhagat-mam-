import type { CSSProperties } from 'react';

interface DecorProps {
  className?: string;
  style?: CSSProperties;
}

/* Tape strip — sits across the corner of a photograph. */
export function TapeStrip({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--tape ${className}`.trim()}
      style={style}
      width="132"
      height="36"
      viewBox="0 0 132 36"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 5 L10 2 L16 6 L23 2 L30 6 L38 3 L46 6 L54 2 L62 6 L70 3 L78 6 L86 2 L94 6 L102 3 L110 6 L118 2 L126 5 L128 31 L120 34 L112 30 L104 34 L96 30 L88 34 L80 30 L72 34 L64 30 L56 34 L48 30 L40 34 L32 30 L24 34 L16 30 L8 34 L3 30 Z"
        fill="rgba(230, 220, 203, 0.82)"
        stroke="rgba(43, 39, 33, 0.14)"
        strokeWidth="1"
      />
      <path d="M12 8 L18 28 M34 7 L40 27 M60 8 L66 28 M88 7 L94 27 M114 8 L120 28" stroke="rgba(43, 39, 33, 0.07)" strokeWidth="1" />
    </svg>
  );
}

/* Paperclip — fastens a note to the page. */
export function PaperClip({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--clip ${className}`.trim()}
      style={style}
      width="46"
      height="92"
      viewBox="0 0 46 92"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M31 20 L31 66 C31 76 24 83 15 83 C7 83 2 77 2 69 L2 24 C2 13 10 5 21 5 C32 5 40 13 40 24 L40 63"
        fill="none"
        stroke="rgba(43, 39, 33, 0.45)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M12 24 L12 66 C12 71 15 74 20 74"
        fill="none"
        stroke="rgba(43, 39, 33, 0.28)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Pressed leaf — the botanical motif carried across sections. */
export function PressedLeaf({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--leaf ${className}`.trim()}
      style={style}
      width="120"
      height="180"
      viewBox="0 0 120 180"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M60 176 C58 132 56 96 60 58"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 60 C30 52 12 34 10 8 C38 8 58 26 60 58 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M60 88 C88 80 106 60 110 34 C82 34 63 54 60 86 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M60 58 C50 42 38 26 22 14 M60 84 C72 66 86 50 102 40" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path
        d="M60 120 C38 114 24 98 20 78 C44 78 58 94 60 118 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Pencil — a quiet nod to marking and margin notes. */
export function Pencil({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--pencil ${className}`.trim()}
      style={style}
      width="34"
      height="180"
      viewBox="0 0 34 180"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 18 L27 18 L27 152 L7 152 Z" fill="rgba(230, 220, 203, 0.9)" stroke="rgba(43, 39, 33, 0.35)" strokeWidth="1.5" />
      <path d="M17 18 L17 4" stroke="rgba(43, 39, 33, 0.35)" strokeWidth="1.5" />
      <path d="M7 152 L17 174 L27 152 Z" fill="rgba(244, 238, 227, 1)" stroke="rgba(43, 39, 33, 0.35)" strokeWidth="1.5" />
      <path d="M13 164 L17 174 L21 164 Z" fill="rgba(43, 39, 33, 0.75)" />
      <path d="M7 30 L27 30 M7 140 L27 140" stroke="rgba(43, 39, 33, 0.2)" strokeWidth="1.2" />
      <rect x="7" y="6" width="20" height="12" fill="rgba(166, 123, 91, 0.7)" stroke="rgba(43, 39, 33, 0.3)" strokeWidth="1.2" />
    </svg>
  );
}

/* Hand-drawn arrow used beside annotations. */
export function ScribbleArrow({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--arrow ${className}`.trim()}
      style={style}
      width="86"
      height="54"
      viewBox="0 0 86 54"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 46 C22 44 42 36 58 20 C63 15 67 11 72 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M72 8 L60 10 M72 8 L69 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* Small torn paper scrap used as floating confetti on the cover. */
export function PaperScrap({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor--scrap ${className}`.trim()}
      style={style}
      width="120"
      height="92"
      viewBox="0 0 120 92"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 10 L36 6 L64 11 L92 5 L114 10 L111 38 L115 64 L110 86 L80 89 L52 84 L24 90 L7 85 L10 58 L5 34 Z"
        fill="rgba(251, 248, 242, 0.92)"
        stroke="rgba(43, 39, 33, 0.16)"
        strokeWidth="1.2"
      />
      <path d="M18 26 L96 22 M18 40 L86 36 M18 54 L70 50" stroke="rgba(43, 39, 33, 0.16)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
