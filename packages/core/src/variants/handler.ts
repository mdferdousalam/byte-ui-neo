/**
 * Variant Handler
 * Handles responsive, state, and theme variants
 */

import type { HikmaConfig } from '../types/config';
import type { ParsedClass } from '../types/variant';

export class VariantHandler {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  /**
   * Parse class name with variants
   * Example: "md:hover:bg-blue-500" -> { variants: ['md', 'hover'], utility: 'bg', value: 'blue-500' }
   */
  parse(className: string): ParsedClass | null {
    const separator = this.config.separator || ':';
    const parts = className.split(separator);

    if (parts.length === 1) {
      // No variants, just utility
      const match = this.parseUtility(parts[0]);
      return match ? { variants: [], ...match } : null;
    }

    // Last part is the utility, rest are variants
    const utility = parts[parts.length - 1];
    const variants = parts.slice(0, -1);

    const parsedUtility = this.parseUtility(utility);
    if (!parsedUtility) return null;

    return {
      variants,
      ...parsedUtility,
    };
  }

  /**
   * Parse utility class name
   */
  private parseUtility(utility: string): { utility: string; value?: string } | null {
    // Check for arbitrary values
    const arbitraryMatch = utility.match(/^(.+?)(\[.+\])$/);
    if (arbitraryMatch) {
      return {
        utility: arbitraryMatch[1],
        value: arbitraryMatch[2],
      };
    }

    // Standard utility
    return { utility };
  }

  /**
   * Apply variants to CSS
   */
  apply(css: string, variants: string[]): string {
    let result = css;

    // Sort variants by specificity (responsive last)
    const sorted = this.sortVariants(variants);

    for (const variant of sorted) {
      result = this.applyVariant(result, variant);
    }

    return result;
  }

  /**
   * Apply single variant to CSS
   */
  private applyVariant(css: string, variant: string): string {
    // Responsive variants
    if (this.isResponsiveVariant(variant)) {
      return this.applyResponsiveVariant(css, variant);
    }

    // State variants
    if (this.isStateVariant(variant)) {
      return this.applyStateVariant(css, variant);
    }

    // Theme variants
    if (this.isThemeVariant(variant)) {
      return this.applyThemeVariant(css, variant);
    }

    // Group variants
    if (variant.startsWith('group-')) {
      return this.applyGroupVariant(css, variant);
    }

    // Peer variants
    if (variant.startsWith('peer-')) {
      return this.applyPeerVariant(css, variant);
    }

    return css;
  }

  /**
   * Apply responsive variant (md:, lg:, etc.)
   */
  private applyResponsiveVariant(css: string, breakpoint: string): string {
    const screens = this.config.theme?.screens;
    if (!screens || !screens[breakpoint]) return css;

    const minWidth = screens[breakpoint];

    // Wrap CSS in media query
    return `@media (min-width: ${minWidth}) {\n  ${css}\n}`;
  }

  /**
   * Apply state variant (hover:, focus:, etc.)
   */
  private applyStateVariant(css: string, state: string): string {
    const stateMap: Record<string, string> = {
      'hover': ':hover',
      'focus': ':focus',
      'active': ':active',
      'disabled': ':disabled',
      'visited': ':visited',
      'focus-within': ':focus-within',
      'focus-visible': ':focus-visible',
      'checked': ':checked',
      'enabled': ':enabled',
      'required': ':required',
      'invalid': ':invalid',
      'valid': ':valid',
      'first': ':first-child',
      'last': ':last-child',
      'odd': ':nth-child(odd)',
      'even': ':nth-child(even)',
    };

    const pseudoClass = stateMap[state];
    if (!pseudoClass) return css;

    // Add pseudo-class to selector
    return css.replace(/(\.[^\s{]+)/g, `$1${pseudoClass}`);
  }

  /**
   * Apply theme variant (dark:, light:)
   */
  private applyThemeVariant(css: string, theme: string): string {
    const darkMode = this.config.darkMode;

    if (theme === 'dark') {
      if (darkMode === 'class') {
        // Use .dark class on parent
        return css.replace(/(\.[^\s{]+)/g, '.dark $1');
      } else if (darkMode === 'media') {
        // Use media query
        return `@media (prefers-color-scheme: dark) {\n  ${css}\n}`;
      }
    }

    if (theme === 'light') {
      if (darkMode === 'class') {
        return css.replace(/(\.[^\s{]+)/g, '.light $1');
      } else if (darkMode === 'media') {
        return `@media (prefers-color-scheme: light) {\n  ${css}\n}`;
      }
    }

    return css;
  }

  /**
   * Apply group variant (group-hover:, etc.)
   */
  private applyGroupVariant(css: string, variant: string): string {
    const state = variant.replace('group-', '');
    const stateMap: Record<string, string> = {
      'hover': ':hover',
      'focus': ':focus',
      'active': ':active',
    };

    const pseudoClass = stateMap[state];
    if (!pseudoClass) return css;

    // Add .group parent with pseudo-class
    return css.replace(/(\.[^\s{]+)/g, `.group${pseudoClass} $1`);
  }

  /**
   * Apply peer variant (peer-checked:, etc.)
   */
  private applyPeerVariant(css: string, variant: string): string {
    const state = variant.replace('peer-', '');
    const stateMap: Record<string, string> = {
      'checked': ':checked',
      'focus': ':focus',
      'disabled': ':disabled',
    };

    const pseudoClass = stateMap[state];
    if (!pseudoClass) return css;

    // Add .peer sibling with pseudo-class
    return css.replace(/(\.[^\s{]+)/g, `.peer${pseudoClass} ~ $1`);
  }

  // Helper methods

  private isResponsiveVariant(variant: string): boolean {
    const screens = this.config.theme?.screens;
    return screens ? variant in screens : false;
  }

  private isStateVariant(variant: string): boolean {
    const states = ['hover', 'focus', 'active', 'disabled', 'visited',
                    'focus-within', 'focus-visible', 'checked', 'enabled',
                    'required', 'invalid', 'valid', 'first', 'last', 'odd', 'even'];
    return states.includes(variant);
  }

  private isThemeVariant(variant: string): boolean {
    return variant === 'dark' || variant === 'light';
  }

  private sortVariants(variants: string[]): string[] {
    // Sort by priority: theme > state > responsive
    return variants.sort((a, b) => {
      const aPriority = this.getVariantPriority(a);
      const bPriority = this.getVariantPriority(b);
      return aPriority - bPriority;
    });
  }

  private getVariantPriority(variant: string): number {
    if (this.isThemeVariant(variant)) return 1;
    if (this.isStateVariant(variant)) return 2;
    if (this.isResponsiveVariant(variant)) return 3;
    return 4;
  }
}
