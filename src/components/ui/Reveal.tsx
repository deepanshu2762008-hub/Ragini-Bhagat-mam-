import { createElement, type ElementType, type ReactNode, type CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in ms (reveal once on enter) */
  delay?: number;
  /** Travelling distance in px */
  y?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Reveal-on-enter wrapper. Uses IntersectionObserver, fires once, and only
 * ever animates opacity + transform. Without JS (or with reduced motion) the
 * content is simply visible.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 20,
  className = '',
  id,
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref: ref as never,
      id,
      className: `reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`.trim(),
      style: {
        ...style,
        '--reveal-delay': `${delay}ms`,
        '--reveal-y': `${y}px`,
      } as CSSProperties,
    },
    children,
  );
}

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each word */
  step?: number;
  base?: number;
}

/**
 * Staggered word-by-word reveal for headings. The full string is exposed to
 * assistive tech via aria-label; individual word spans are decorative.
 */
export function WordReveal({ text, as = 'span', className = '', step = 55, base = 0 }: WordRevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const words = text.split(' ');

  const content: ReactNode[] = [];
  words.forEach((word, index) => {
    content.push(
      <span
        key={`w-${index}`}
        className={`reveal reveal-word${inView ? ' is-in' : ''}`}
        aria-hidden="true"
        style={{ '--reveal-delay': `${base + index * step}ms` } as CSSProperties}
      >
        {word}
      </span>,
    );
    if (index < words.length - 1) content.push(` `);
  });

  return createElement(
    as,
    {
      ref: ref as never,
      className,
      'aria-label': text,
    },
    content,
  );
}
