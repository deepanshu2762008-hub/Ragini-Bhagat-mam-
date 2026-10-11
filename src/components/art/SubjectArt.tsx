import type { ReactNode } from 'react';

/**
 * Hand-drawn line illustrations for the Subjects section.
 * Every mark uses currentColor so the artwork inherits the page palette.
 */
interface SubjectArtProps {
  name: string;
  className?: string;
}

const ink = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Art({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 170 120"
      width="170"
      height="120"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function Chalkboard({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <rect x="14" y="14" width="142" height="76" rx="3" {...ink} />
      <path d="M28 36c10-6 18 4 28-2s16 4 26-2" {...ink} />
      <path d="M28 52h56M28 64h44" {...ink} />
      <path d="M96 50l14 16 10-22" {...ink} />
      <path d="M62 90v14M108 90v14M52 108h66" {...ink} />
      <path d="M138 62l16 8-16 6z" {...ink} />
    </Art>
  );
}

function Pages({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <rect x="34" y="12" width="86" height="96" rx="2" {...ink} />
      <rect x="46" y="20" width="86" height="96" rx="2" {...ink} fill="rgba(251,248,242,0.9)" />
      <path d="M60 40h58M60 54h58M60 68h40M60 82h48" {...ink} />
      <path d="M104 84l8 8 14-18" {...ink} strokeWidth={2.2} />
      <path d="M24 30c-6 14-6 34 2 48" {...ink} strokeDasharray="4 6" />
    </Art>
  );
}

function Figures({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <circle cx="52" cy="40" r="14" {...ink} />
      <path d="M28 96c2-18 12-28 24-28s22 10 24 28" {...ink} />
      <circle cx="114" cy="52" r="11" {...ink} />
      <path d="M96 96c2-14 9-22 18-22s16 8 18 22" {...ink} />
      <path d="M74 26c8-10 22-10 30-2" {...ink} strokeDasharray="3 6" />
      <path d="M84 18l2 8 8-2-4 8" {...ink} strokeWidth={1.3} />
    </Art>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <circle cx="60" cy="52" r="34" {...ink} />
      <path d="M60 30v22l16 10" {...ink} strokeWidth={2.1} />
      <circle cx="60" cy="52" r="3" fill="currentColor" />
      <path d="M60 12v6M60 86v6M20 52h6M94 52h6" {...ink} />
      <rect x="112" y="30" width="44" height="8" rx="2" {...ink} />
      <rect x="112" y="50" width="44" height="8" rx="2" {...ink} />
      <rect x="112" y="70" width="30" height="8" rx="2" {...ink} />
    </Art>
  );
}

function Hands({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M42 104c-10-14-14-28-12-40 1-8 8-8 10 0l4 14V44c0-8 10-8 10 0v22-30c0-8 10-8 10 0v30-26c0-8 10-8 10 0v28l8-12c4-6 12-2 9 5L86 92c-4 8-12 14-22 14z" {...ink} />
      <circle cx="122" cy="34" r="12" {...ink} />
      <path d="M108 66l14-8 16 6" {...ink} strokeDasharray="4 6" />
      <path d="M118 88l8-6 10 4" {...ink} strokeDasharray="4 6" />
    </Art>
  );
}

function Laptop({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <rect x="34" y="24" width="102" height="62" rx="4" {...ink} />
      <path d="M24 96h122l-8-10H32z" {...ink} />
      <path d="M48 70l18-20 14 12 20-26" {...ink} strokeWidth={2.1} />
      <circle cx="100" cy="36" r="3.4" fill="currentColor" />
      <path d="M148 20c8 4 12 12 12 22" {...ink} strokeDasharray="3 6" />
    </Art>
  );
}

function Blocks({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <rect x="46" y="72" width="34" height="30" rx="2" {...ink} />
      <rect x="84" y="72" width="34" height="30" rx="2" {...ink} />
      <rect x="65" y="40" width="34" height="30" rx="2" {...ink} />
      <rect x="74" y="8" width="34" height="30" rx="2" {...ink} />
      <path d="M126 30c10 6 16 16 16 28" {...ink} strokeDasharray="4 6" />
      <path d="M138 52l4 8 8-4" {...ink} />
      <path d="M30 102h112" {...ink} />
    </Art>
  );
}

const ART: Record<string, (props: { className?: string }) => ReactNode> = {
  chalkboard: Chalkboard,
  pages: Pages,
  figures: Figures,
  clock: Clock,
  hands: Hands,
  laptop: Laptop,
  blocks: Blocks,
};

export default function SubjectArt({ name, className }: SubjectArtProps) {
  const Illustration = ART[name] ?? Chalkboard;
  return <>{Illustration({ className })}</>;
}
