import type { ReactNode } from 'react';

/**
 * Hand-drawn line illustrations for the Beyond Teaching journal pages.
 * Decorative only — the interest name in the text carries the meaning.
 */
interface InterestArtProps {
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

function Reading({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M85 34c-14-10-32-12-50-8v58c18-4 36-2 50 8 14-10 32-12 50-8V26c-18-4-36-2-50 8z" {...ink} />
      <path d="M85 34v58" {...ink} />
      <path d="M46 46c8-2 16-2 24 0M46 58c8-2 16-2 24 0M100 46c8-2 16-2 24 0M100 58c8-2 16-2 24 0" {...ink} strokeWidth={1.2} />
      <path d="M132 16c6-4 12-4 18 0" {...ink} strokeDasharray="3 5" />
    </Art>
  );
}

function ArtBrush({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M30 96c14-6 24-16 30-30l10-24c3-8 14-6 13 3l-4 26" {...ink} />
      <path d="M74 74l16 8c6 3 4 12-3 11l-20-3z" {...ink} />
      <circle cx="122" cy="38" r="12" {...ink} />
      <path d="M104 76c10 2 18 8 22 18" {...ink} strokeDasharray="4 6" />
      <path d="M118 96h26M130 88v16" {...ink} strokeWidth={1.3} />
      <path d="M112 20c4-6 12-8 18-4" {...ink} strokeWidth={1.3} />
    </Art>
  );
}

function Travel({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M16 92l40-52 24 30 18-22 36 44z" {...ink} />
      <circle cx="126" cy="30" r="12" {...ink} />
      <path d="M16 92h132" {...ink} />
      <path d="M44 40c4-6 12-8 18-4" {...ink} strokeWidth={1.3} strokeDasharray="3 5" />
      <path d="M76 66l14 10-4 10-12-4z" {...ink} strokeWidth={1.3} />
    </Art>
  );
}

function Nature({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M84 104V44" {...ink} />
      <path d="M84 52C64 48 50 34 46 14c24 0 40 14 38 38z" {...ink} />
      <path d="M84 74c20-4 34-18 38-38-24 0-40 14-38 38z" {...ink} />
      <path d="M46 104c8-6 20-10 38-10s30 4 38 10" {...ink} strokeWidth={1.3} />
      <path d="M28 92c4-4 10-6 14-4" {...ink} strokeDasharray="3 5" strokeWidth={1.3} />
    </Art>
  );
}

function Learning({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M85 18c-16 0-28 12-28 27 0 12 7 19 14 25 4 3 5 7 5 11h18c0-4 1-8 5-11 7-6 14-13 14-25 0-15-12-27-28-27z" {...ink} />
      <path d="M74 90h22M77 99h16" {...ink} />
      <path d="M85 40v20M76 50h18" {...ink} strokeWidth={1.3} />
      <path d="M128 30c8 2 14 8 16 16M42 30c-8 2-14 8-16 16" {...ink} strokeDasharray="3 6" strokeWidth={1.3} />
    </Art>
  );
}

function Creativity({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <path d="M56 92l12-34 26-26c6-6 16-6 22 0s6 16 0 22L90 84z" {...ink} />
      <path d="M68 58l26 26" {...ink} />
      <path d="M56 92c-8 6-14 6-22 4 4-6 4-12 0-18 8 0 16 4 22 14z" {...ink} />
      <path d="M116 22l8-10M128 34l12-4M104 14l-2-12" {...ink} strokeWidth={1.4} />
      <path d="M34 40c-6 8-8 18-6 28" {...ink} strokeDasharray="3 6" strokeWidth={1.3} />
    </Art>
  );
}

const ART: Record<string, (props: { className?: string }) => ReactNode> = {
  reading: Reading,
  art: ArtBrush,
  travel: Travel,
  nature: Nature,
  learning: Learning,
  creativity: Creativity,
};

export default function InterestArt({ name, className }: InterestArtProps) {
  const Illustration = ART[name] ?? Reading;
  return <>{Illustration({ className })}</>;
}
