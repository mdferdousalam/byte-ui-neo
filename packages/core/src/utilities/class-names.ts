/**
 * Conditional class names utility.
 * Zero-dependency replacement for clsx.
 *
 * Combines class names with support for:
 * - Strings
 * - Booleans (false/null/undefined filtered out)
 * - Arrays (recursive)
 * - Objects (key applied if value is truthy)
 *
 * @packageDocumentation
 */

/**
 * Valid class value types that can be passed to cx()
 */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

/**
 * Combines class names intelligently.
 *
 * @param inputs - Class values to combine
 * @returns Space-separated class string
 *
 * @example
 * // Strings
 * cx('btn', 'btn-primary') // => 'btn btn-primary'
 *
 * @example
 * // Conditionals
 * cx('btn', { 'btn-active': isActive, 'btn-disabled': false })
 * // => 'btn btn-active'
 *
 * @example
 * // Arrays
 * cx('btn', ['px-4', 'py-2'], null) // => 'btn px-4 py-2'
 *
 * @example
 * // Mixed
 * cx('btn', { 'active': true }, ['px-4', null, 'rounded'])
 * // => 'btn active px-4 rounded'
 */
export function cx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    // Skip falsy values
    if (!input) continue;

    const type = typeof input;

    // String or number - add directly
    if (type === 'string' || type === 'number') {
      classes.push(String(input));
      continue;
    }

    // Array - recursively process
    if (Array.isArray(input)) {
      const nested = cx(...input);
      if (nested) classes.push(nested);
      continue;
    }

    // Object - add keys with truthy values
    if (type === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Alias for cx() for compatibility
 */
export const classNames = cx;

/**
 * Alias for cx() for compatibility
 */
export const clsx = cx;
