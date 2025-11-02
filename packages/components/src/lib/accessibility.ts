import * as React from "react";

/**
 * Traps focus within a container element.
 * Used for modals, dialogs, and dropdowns to ensure keyboard accessibility.
 *
 * @param enabled - Whether the focus trap is active
 * @param containerRef - Ref to the container element
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useFocusTrap(isOpen, ref);
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
) {
  React.useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store the element that had focus before trap
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);

    return () => {
      container.removeEventListener("keydown", handleTabKey);
      // Restore focus when trap is disabled
      previouslyFocused?.focus();
    };
  }, [enabled, containerRef]);
}

/**
 * Provides keyboard navigation for lists, tabs, and menus.
 * Handles arrow keys, home/end, and optional looping.
 *
 * @param options - Navigation configuration
 * @returns Object with current index and keyboard event handler
 *
 * @example
 * const { activeIndex, handleKeyDown } = useKeyboardNav({
 *   length: items.length,
 *   orientation: 'vertical',
 *   loop: true,
 * });
 */
export function useKeyboardNav(options: {
  length: number;
  orientation: "horizontal" | "vertical";
  loop?: boolean;
  onNavigate?: (index: number) => void;
  initialIndex?: number;
}) {
  const { length, orientation, loop = true, onNavigate, initialIndex = 0 } = options;
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
  const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = activeIndex;

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          newIndex = activeIndex + 1;
          if (newIndex >= length) {
            newIndex = loop ? 0 : length - 1;
          }
          break;

        case prevKey:
          e.preventDefault();
          newIndex = activeIndex - 1;
          if (newIndex < 0) {
            newIndex = loop ? length - 1 : 0;
          }
          break;

        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;

        case "End":
          e.preventDefault();
          newIndex = length - 1;
          break;

        default:
          return;
      }

      setActiveIndex(newIndex);
      onNavigate?.(newIndex);
    },
    [activeIndex, length, loop, nextKey, prevKey, onNavigate]
  );

  return { activeIndex, setActiveIndex, handleKeyDown };
}

/**
 * Announces a message to screen readers using ARIA live regions.
 *
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 *
 * @example
 * useAriaAnnounce('Item added to cart', 'polite');
 */
export function useAriaAnnounce(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  React.useEffect(() => {
    if (!message) return;

    const announcer = document.createElement("div");
    announcer.setAttribute("role", "status");
    announcer.setAttribute("aria-live", priority);
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    announcer.textContent = message;

    document.body.appendChild(announcer);

    const timeout = setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    };
  }, [message, priority]);
}

/**
 * Detects clicks outside a ref'd element.
 * Used for closing dropdowns, modals, and popovers.
 *
 * @param ref - Ref to the element
 * @param handler - Callback when click outside is detected
 * @param enabled - Whether the listener is active
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => setIsOpen(false), isOpen);
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
) {
  React.useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

/**
 * Manages escape key press to close modals, dropdowns, etc.
 *
 * @param handler - Callback when escape is pressed
 * @param enabled - Whether the listener is active
 *
 * @example
 * useEscapeKey(() => setIsOpen(false), isOpen);
 */
export function useEscapeKey(
  handler: () => void,
  enabled: boolean = true
) {
  React.useEffect(() => {
    if (!enabled) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handler, enabled]);
}

/**
 * Prevents body scroll when a modal or overlay is open.
 *
 * @param enabled - Whether to prevent scrolling
 *
 * @example
 * usePreventScroll(isModalOpen);
 */
export function usePreventScroll(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}

/**
 * Generates accessible IDs for form fields and their labels.
 *
 * @param prefix - Prefix for the ID
 * @returns Object with IDs for different elements
 *
 * @example
 * const ids = useAccessibleIds('email');
 * <label htmlFor={ids.input}>Email</label>
 * <input id={ids.input} aria-describedby={ids.description} />
 * <p id={ids.description}>Enter your email</p>
 */
export function useAccessibleIds(prefix: string) {
  const id = React.useId();

  return React.useMemo(
    () => ({
      input: `${prefix}-${id}`,
      label: `${prefix}-label-${id}`,
      description: `${prefix}-description-${id}`,
      error: `${prefix}-error-${id}`,
    }),
    [prefix, id]
  );
}
