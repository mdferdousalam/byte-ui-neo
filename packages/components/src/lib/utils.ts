/**
 * Re-export utilities from @hikmaui/core.
 * All utilities are now provided by HikmaUI core - zero external dependencies!
 */
export { cx, cn, merge, type ClassValue } from '@hikmaui/core';

/**
 * Composes multiple refs into a single ref callback.
 * Useful for components that need to forward refs while also using them internally.
 *
 * @param refs - Array of refs to compose
 * @returns Ref callback that updates all provided refs
 *
 * @example
 * const myRef = useRef(null);
 * <div ref={composeRefs(ref, myRef)} />
 */
export function composeRefs<T = any>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

/**
 * Generates a unique ID for accessibility purposes.
 * Uses crypto.randomUUID() if available, falls back to Math.random().
 *
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 *
 * @example
 * const id = generateId('button'); // => 'button-a1b2c3d4'
 */
export function generateId(prefix?: string): string {
  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Debounces a function call.
 *
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 *
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function call.
 *
 * @param func - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 *
 * @example
 * const throttledScroll = throttle((e) => handleScroll(e), 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
