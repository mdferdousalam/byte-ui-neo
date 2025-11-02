/**
 * Spacing Utilities Generator
 * Generates margin, padding, and space-between utilities
 * Complete 0-96 scale with fractional values
 */

import type { CompiledUtility } from '../../types';
import type { HikmaConfig } from '../../types/config';

export class SpacingGenerator {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  /**
   * Complete spacing scale (0-96 + fractions)
   */
  private getSpacingValue(size: string): string | null {
    // Check config first
    if (this.config.theme?.spacing?.[size]) {
      return this.config.theme.spacing[size] as string;
    }

    // Fractional values
    if (size.includes('/')) {
      const [num, den] = size.split('/');
      const percent = (parseFloat(num) / parseFloat(den)) * 100;
      return `${percent}%`;
    }

    // Numeric values (0-96) → 0.25rem scale
    const numericSize = parseInt(size);
    if (!isNaN(numericSize) && numericSize >= 0 && numericSize <= 96) {
      return `${numericSize * 0.25}rem`;
    }

    // Named values
    const namedValues: Record<string, string> = {
      'px': '1px',
      'auto': 'auto',
      'full': '100%',
      'screen': '100vw',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    };

    return namedValues[size] || null;
  }

  /**
   * Get spacing properties based on direction
   */
  private getSpacingProperties(type: 'padding' | 'margin', direction: string): string[] {
    const prefix = type === 'padding' ? 'padding' : 'margin';

    if (!direction) return [prefix];
    if (direction === 't') return [`${prefix}-top`];
    if (direction === 'r') return [`${prefix}-right`];
    if (direction === 'b') return [`${prefix}-bottom`];
    if (direction === 'l') return [`${prefix}-left`];
    if (direction === 'x') return [`${prefix}-left`, `${prefix}-right`];
    if (direction === 'y') return [`${prefix}-top`, `${prefix}-bottom`];
    if (direction === 's') return [`${prefix}-inline-start`];
    if (direction === 'e') return [`${prefix}-inline-end`];

    return [];
  }

  /**
   * Generate padding utilities
   * p-0, p-1, ..., p-96, px-4, py-8, pt-2, pr-4, pb-6, pl-8
   * p-1/2, p-1/3, p-2/3, p-1/4, p-3/4, p-full, p-px
   */
  generatePadding(utility: string): CompiledUtility | null {
    const match = utility.match(/^p([trblxyse]?)-(.+)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = this.getSpacingValue(size);
    if (!value) return null;

    const properties = this.getSpacingProperties('padding', direction);
    if (properties.length === 0) return null;

    const css = properties.map(p => `${p}: ${value};`).join('\n  ');
    return { className: utility, css };
  }

  /**
   * Generate margin utilities
   * m-0, m-1, ..., m-96, mx-4, my-8, mt-2, mr-4, mb-6, ml-8, m-auto
   * m-1/2, m-1/3, m-2/3, m-1/4, m-3/4, m-full, m-px
   */
  generateMargin(utility: string): CompiledUtility | null {
    const match = utility.match(/^m([trblxyse]?)-(.+)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = size === 'auto' ? 'auto' : this.getSpacingValue(size);
    if (!value) return null;

    const properties = this.getSpacingProperties('margin', direction);
    if (properties.length === 0) return null;

    const css = properties.map(p => `${p}: ${value};`).join('\n  ');
    return { className: utility, css };
  }

  /**
   * Generate negative margin utilities
   * -m-1, -m-2, -mx-4, -my-8, -mt-2, etc.
   */
  generateNegativeMargin(utility: string): CompiledUtility | null {
    const match = utility.match(/^-m([trblxyse]?)-(.+)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = this.getSpacingValue(size);
    if (!value || value === 'auto') return null;

    // Add negative sign to value
    const negativeValue = value.startsWith('-') ? value : `-${value}`;

    const properties = this.getSpacingProperties('margin', direction);
    if (properties.length === 0) return null;

    const css = properties.map(p => `${p}: ${negativeValue};`).join('\n  ');
    return { className: utility, css };
  }

  /**
   * Generate space-between utilities
   * space-x-4, space-y-8, space-x-reverse, space-y-reverse
   */
  generateSpace(utility: string): CompiledUtility | null {
    // space-x-reverse
    if (utility === 'space-x-reverse') {
      return {
        className: utility,
        css: '--byte-space-x-reverse: 1;',
      };
    }

    // space-y-reverse
    if (utility === 'space-y-reverse') {
      return {
        className: utility,
        css: '--byte-space-y-reverse: 1;',
      };
    }

    // space-x-{size}
    const xMatch = utility.match(/^space-x-(.+)$/);
    if (xMatch) {
      const [, size] = xMatch;
      const value = this.getSpacingValue(size);
      if (!value) return null;

      return {
        className: utility,
        css: `--byte-space-x-reverse: 0;
  margin-right: calc(${value} * var(--byte-space-x-reverse));
  margin-left: calc(${value} * calc(1 - var(--byte-space-x-reverse)));`,
      };
    }

    // space-y-{size}
    const yMatch = utility.match(/^space-y-(.+)$/);
    if (yMatch) {
      const [, size] = yMatch;
      const value = this.getSpacingValue(size);
      if (!value) return null;

      return {
        className: utility,
        css: `--byte-space-y-reverse: 0;
  margin-top: calc(${value} * calc(1 - var(--byte-space-y-reverse)));
  margin-bottom: calc(${value} * var(--byte-space-y-reverse));`,
      };
    }

    return null;
  }

  /**
   * Main generate method
   */
  generate(utility: string): CompiledUtility | null {
    // Padding
    if (utility.startsWith('p-') || utility.match(/^p[trblxyse]-/)) {
      return this.generatePadding(utility);
    }

    // Negative margin
    if (utility.startsWith('-m')) {
      return this.generateNegativeMargin(utility);
    }

    // Margin
    if (utility.startsWith('m-') || utility.match(/^m[trblxyse]-/)) {
      return this.generateMargin(utility);
    }

    // Space-between
    if (utility.startsWith('space-')) {
      return this.generateSpace(utility);
    }

    return null;
  }
}

/**
 * Standalone function for backward compatibility
 */
export function generateSpacing(utility: string, config: HikmaConfig): CompiledUtility | null {
  const generator = new SpacingGenerator(config);
  return generator.generate(utility);
}
