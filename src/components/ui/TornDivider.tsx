interface TornDividerProps {
  /** Background the divider should be painted in (usually the next section's). */
  fill: string;
  /** Position at the top edge instead of the bottom. */
  top?: boolean;
  className?: string;
}

/**
 * Soft torn-paper edge used to carry the reader from one "sheet" to the next.
 * The path is a fixed hand-irregular contour, stretched via preserveAspectRatio.
 */
export default function TornDivider({ fill, top = false, className = '' }: TornDividerProps) {
  return (
    <div className={`torn${top ? ' torn--top' : ''} ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" focusable="false">
        <path
          d="M0,40 L0,21 C36,15 64,25 104,22 C148,19 172,9 214,12 C262,16 286,27 332,25
             C378,23 404,11 452,14 C498,17 522,26 570,24 C618,22 644,12 692,15
             C740,18 762,27 810,25 C858,23 884,13 932,16 C980,19 1004,27 1052,25
             C1100,23 1126,12 1174,15 C1222,18 1246,26 1294,24 C1342,22 1368,13 1412,17
             C1424,18 1432,20 1440,19 L1440,40 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
