/**
 * Smart class merger for HikmaUI utilities.
 * Zero-dependency replacement for tailwind-merge.
 *
 * Intelligently merges class names by detecting and resolving conflicts.
 * Later classes override earlier conflicting classes.
 *
 * @packageDocumentation
 */

import type { ClassValue } from './class-names';
import { cx } from './class-names';

/**
 * Utility type categories for conflict detection.
 * Classes in the same category conflict with each other.
 */
const utilityTypeMap: Record<string, RegExp> = {
  // Padding
  'padding': /^p-/,
  'padding-x': /^px-/,
  'padding-y': /^py-/,
  'padding-t': /^pt-/,
  'padding-r': /^pr-/,
  'padding-b': /^pb-/,
  'padding-l': /^pl-/,

  // Margin
  'margin': /^m-/,
  'margin-x': /^mx-/,
  'margin-y': /^my-/,
  'margin-t': /^mt-/,
  'margin-r': /^mr-/,
  'margin-b': /^mb-/,
  'margin-l': /^ml-/,

  // Width
  'width': /^w-/,
  'min-width': /^min-w-/,
  'max-width': /^max-w-/,

  // Height
  'height': /^h-/,
  'min-height': /^min-h-/,
  'max-height': /^max-h-/,

  // Display
  'display': /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|hidden)$/,

  // Position
  'position': /^(static|fixed|absolute|relative|sticky)$/,
  'top': /^top-/,
  'right': /^right-/,
  'bottom': /^bottom-/,
  'left': /^left-/,
  'inset': /^inset-/,

  // Flexbox
  'flex': /^flex-(?!row|col)/,  // flex-1, flex-auto, etc
  'flex-direction': /^flex-(row|col)/,
  'flex-wrap': /^flex-(wrap|nowrap)/,
  'justify-content': /^justify-/,
  'align-items': /^items-/,
  'align-content': /^content-/,
  'align-self': /^self-/,
  'order': /^order-/,
  'flex-grow': /^grow/,
  'flex-shrink': /^shrink/,

  // Grid
  'grid-cols': /^grid-cols-/,
  'grid-rows': /^grid-rows-/,
  'col-span': /^col-span-/,
  'row-span': /^row-span-/,
  'col-start': /^col-start-/,
  'row-start': /^row-start-/,
  'gap': /^gap-(?!x|y)/,
  'gap-x': /^gap-x-/,
  'gap-y': /^gap-y-/,

  // Typography
  'font-family': /^font-(?!thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
  'font-size': /^text-(xs|sm|base|lg|xl|2xl|3xl)/,
  'font-weight': /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  'text-align': /^text-(left|center|right|justify)$/,
  'text-color': /^text-(?!xs|sm|base|lg|xl|2xl|3xl|left|center|right|justify)/,
  'text-decoration': /^(underline|line-through|no-underline)$/,
  'text-transform': /^(uppercase|lowercase|capitalize|normal-case)$/,
  'line-height': /^leading-/,
  'letter-spacing': /^tracking-/,

  // Background
  'bg-color': /^bg-(?!gradient|contain|cover|auto|fixed|local|scroll|no-repeat|repeat|bottom|center|left|right|top)/,
  'bg-gradient': /^bg-gradient-/,
  'bg-size': /^bg-(contain|cover|auto)$/,
  'bg-position': /^bg-(bottom|center|left|right|top)/,
  'bg-repeat': /^bg-(no-repeat|repeat|repeat-x|repeat-y)$/,
  'bg-attachment': /^bg-(fixed|local|scroll)$/,

  // Border
  'border': /^border$/,
  'border-x': /^border-x$/,
  'border-y': /^border-y$/,
  'border-t': /^border-t$/,
  'border-r': /^border-r$/,
  'border-b': /^border-b$/,
  'border-l': /^border-l$/,
  'border-width': /^border-\d/,
  'border-color': /^border-(?!\d|x|y|t|r|b|l|solid|dashed|dotted|double|none|collapse|separate)/,
  'border-style': /^border-(solid|dashed|dotted|double|none)$/,
  'border-radius': /^rounded/,
  'divide-x': /^divide-x/,
  'divide-y': /^divide-y/,

  // Effects
  'box-shadow': /^shadow/,
  'opacity': /^opacity-/,
  'mix-blend': /^mix-blend-/,
  'bg-blend': /^bg-blend-/,

  // Transforms
  'scale': /^scale-/,
  'rotate': /^rotate-/,
  'translate-x': /^translate-x-/,
  'translate-y': /^translate-y-/,
  'skew-x': /^skew-x-/,
  'skew-y': /^skew-y-/,
  'transform-origin': /^origin-/,

  // Transitions
  'transition': /^transition(?!-)/,
  'duration': /^duration-/,
  'delay': /^delay-/,
  'ease': /^ease-/,

  // Filters
  'blur': /^blur-/,
  'brightness': /^brightness-/,
  'contrast': /^contrast-/,
  'grayscale': /^grayscale/,
  'hue-rotate': /^hue-rotate-/,
  'invert': /^invert/,
  'saturate': /^saturate-/,
  'sepia': /^sepia/,
  'backdrop-blur': /^backdrop-blur-/,

  // Z-index
  'z-index': /^z-/,

  // Overflow
  'overflow': /^overflow-(?!x|y)/,
  'overflow-x': /^overflow-x-/,
  'overflow-y': /^overflow-y-/,

  // Cursor
  'cursor': /^cursor-/,

  // User Select
  'user-select': /^select-/,

  // Pointer Events
  'pointer-events': /^pointer-events-/,
};

/**
 * Class merger that handles utility conflicts intelligently.
 */
export class ClassMerger {
  /**
   * Cache for utility type lookups to improve performance.
   */
  private typeCache = new Map<string, string | null>();

  /**
   * Determines the utility type category for a class name.
   *
   * @param className - Class name to categorize
   * @returns Utility type category or null if not a utility
   */
  private getUtilityType(className: string): string | null {
    // Check cache first
    if (this.typeCache.has(className)) {
      return this.typeCache.get(className)!;
    }

    // Strip variant prefixes (hover:, focus:, sm:, etc.)
    const baseClass = this.stripVariants(className);

    // Test against each utility type pattern
    for (const [type, pattern] of Object.entries(utilityTypeMap)) {
      if (pattern.test(baseClass)) {
        this.typeCache.set(className, type);
        return type;
      }
    }

    // Not a recognized utility - treat as unique
    this.typeCache.set(className, null);
    return null;
  }

  /**
   * Strips variant prefixes from a class name.
   *
   * @param className - Class with possible variants
   * @returns Base class without variants
   *
   * @example
   * stripVariants('hover:bg-blue-500') // => 'bg-blue-500'
   * stripVariants('sm:md:lg:p-4') // => 'p-4'
   */
  private stripVariants(className: string): string {
    // Split by : and take the last part
    const parts = className.split(':');
    return parts[parts.length - 1];
  }

  /**
   * Merges class names, resolving conflicts intelligently.
   * Later classes override earlier conflicting classes.
   *
   * @param classes - Class values to merge
   * @returns Merged class string with conflicts resolved
   *
   * @example
   * merge('px-4 py-2', 'px-6') // => 'py-2 px-6'
   * merge('text-sm', 'text-lg') // => 'text-lg'
   */
  public merge(...classes: ClassValue[]): string {
    // First, combine all inputs with cx()
    const combined = cx(...classes);
    if (!combined) return '';

    // Split into individual classes
    const classList = combined.split(' ').filter(Boolean);

    // Track utility types and their latest class
    const utilityMap = new Map<string, string>();

    // Process classes in order (later wins)
    for (const className of classList) {
      const type = this.getUtilityType(className);

      if (type) {
        // It's a utility - store by type (overwrites earlier)
        utilityMap.set(`${type}:${className}`, className);
      } else {
        // Not a utility - always include (treat as unique)
        utilityMap.set(className, className);
      }
    }

    // Return merged classes
    return Array.from(utilityMap.values()).join(' ');
  }

  /**
   * Clears the utility type cache.
   * Useful for testing or memory management.
   */
  public clearCache(): void {
    this.typeCache.clear();
  }
}

/**
 * Singleton instance for convenience.
 */
const merger = new ClassMerger();

/**
 * Convenience function for merging classes.
 * Uses singleton ClassMerger instance.
 *
 * @param classes - Class values to merge
 * @returns Merged class string
 *
 * @example
 * merge('px-4 py-2', 'px-6') // => 'py-2 px-6'
 * merge('btn', { 'btn-active': true }, 'px-8') // => 'btn btn-active px-8'
 */
export function merge(...classes: ClassValue[]): string {
  return merger.merge(...classes);
}

/**
 * Alias for merge() for compatibility with tailwind-merge
 */
export const twMerge = merge;

/**
 * Combined utility: cx() + merge()
 * Combines classes conditionally AND resolves conflicts.
 *
 * @param classes - Class values to combine and merge
 * @returns Merged class string
 *
 * @example
 * cn('btn', { active: true }, 'px-4 px-8') // => 'btn active px-8'
 */
export function cn(...classes: ClassValue[]): string {
  return merge(...classes);
}
