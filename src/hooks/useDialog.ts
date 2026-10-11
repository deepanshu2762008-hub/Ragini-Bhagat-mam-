import { useEffect, type RefObject } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface DialogOptions {
  open: boolean;
  onClose: () => void;
  /** The element that should receive focus when the dialog opens. */
  dialogRef: RefObject<HTMLElement | null>;
  /** Called when the dialog opens so the page behind can stop scrolling. */
  onLock?: () => void;
  onUnlock?: () => void;
}

/**
 * Accessible dialog behavior: focus trap, Esc to close, focus restoration
 * and a body scroll lock. Used by the lightbox, certificate viewer,
 * project detail and the mobile menu.
 */
export function useDialog({ open, onClose, dialogRef, onLock, onUnlock }: DialogOptions): void {
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;

    // Move focus into the dialog.
    const focusTarget =
      dialog?.querySelector<HTMLElement>('[data-dialog-focus]') ??
      dialog?.querySelector<HTMLElement>(FOCUSABLE) ??
      dialog;
    focusTarget?.focus({ preventScroll: true });

    // Lock page scroll behind the dialog.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    onLock?.();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      root.style.overflow = previousOverflow;
      onUnlock?.();
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, onClose, dialogRef, onLock, onUnlock]);
}
