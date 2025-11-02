/**
 * Sizing Utilities Generator
 * Generates width, height, min-width, max-width, min-height, max-height utilities
 */

import type { CompiledUtility } from '../../types';
import type { HikmaConfig } from '../../types/config';

export class SizingGenerator {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  /**
   * Get size value from config or predefined values
   */
  private getSizeValue(size: string): string | null {
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
      'screen': '100vw',  // For width
      'svw': '100svw',
      'lvw': '100lvw',
      'dvw': '100dvw',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    };

    return namedValues[size] || null;
  }

  /**
   * Get height-specific value
   */
  private getHeightValue(size: string): string | null {
    // Screen for height means viewport height
    if (size === 'screen') return '100vh';
    if (size === 'svh') return '100svh';
    if (size === 'lvh') return '100lvh';
    if (size === 'dvh') return '100dvh';

    return this.getSizeValue(size);
  }

  /**
   * Generate width utilities
   * w-0, w-1, ..., w-96
   * w-auto, w-full, w-screen, w-min, w-max, w-fit
   * w-1/2, w-1/3, w-2/3, w-1/4, w-3/4, w-1/5, etc.
   */
  generateWidth(utility: string): CompiledUtility | null {
    const match = utility.match(/^w-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getSizeValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `width: ${value};`,
    };
  }

  /**
   * Generate height utilities
   * h-0, h-1, ..., h-96
   * h-auto, h-full, h-screen, h-min, h-max, h-fit
   * h-1/2, h-1/3, h-2/3, h-1/4, h-3/4, etc.
   */
  generateHeight(utility: string): CompiledUtility | null {
    const match = utility.match(/^h-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getHeightValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `height: ${value};`,
    };
  }

  /**
   * Generate min-width utilities
   * min-w-0, min-w-full, min-w-min, min-w-max, min-w-fit
   */
  generateMinWidth(utility: string): CompiledUtility | null {
    const match = utility.match(/^min-w-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getSizeValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `min-width: ${value};`,
    };
  }

  /**
   * Generate max-width utilities
   * max-w-0, max-w-full, max-w-min, max-w-max, max-w-fit
   * max-w-xs, max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl, ..., max-w-7xl
   * max-w-prose, max-w-screen-sm, max-w-screen-md, max-w-screen-lg
   */
  generateMaxWidth(utility: string): CompiledUtility | null {
    const match = utility.match(/^max-w-(.+)$/);
    if (!match) return null;

    const [, size] = match;

    // Predefined max-width values
    const maxWidthValues: Record<string, string> = {
      'none': 'none',
      'xs': '20rem',      // 320px
      'sm': '24rem',      // 384px
      'md': '28rem',      // 448px
      'lg': '32rem',      // 512px
      'xl': '36rem',      // 576px
      '2xl': '42rem',     // 672px
      '3xl': '48rem',     // 768px
      '4xl': '56rem',     // 896px
      '5xl': '64rem',     // 1024px
      '6xl': '72rem',     // 1152px
      '7xl': '80rem',     // 1280px
      'prose': '65ch',
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px',
    };

    const value = maxWidthValues[size] || this.getSizeValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `max-width: ${value};`,
    };
  }

  /**
   * Generate min-height utilities
   * min-h-0, min-h-full, min-h-screen, min-h-min, min-h-max, min-h-fit
   */
  generateMinHeight(utility: string): CompiledUtility | null {
    const match = utility.match(/^min-h-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getHeightValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `min-height: ${value};`,
    };
  }

  /**
   * Generate max-height utilities
   * max-h-0, max-h-full, max-h-screen, max-h-min, max-h-max, max-h-fit
   */
  generateMaxHeight(utility: string): CompiledUtility | null {
    const match = utility.match(/^max-h-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getHeightValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `max-height: ${value};`,
    };
  }

  /**
   * Generate size utilities (width and height together)
   * size-0, size-1, ..., size-96, size-full, size-auto
   */
  generateSize(utility: string): CompiledUtility | null {
    const match = utility.match(/^size-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    const value = this.getSizeValue(size);
    if (!value) return null;

    return {
      className: utility,
      css: `width: ${value};\n  height: ${value};`,
    };
  }

  /**
   * Main generate method
   */
  generate(utility: string): CompiledUtility | null {
    // Size (width + height)
    if (utility.startsWith('size-')) {
      return this.generateSize(utility);
    }

    // Min/Max width
    if (utility.startsWith('min-w-')) {
      return this.generateMinWidth(utility);
    }
    if (utility.startsWith('max-w-')) {
      return this.generateMaxWidth(utility);
    }

    // Min/Max height
    if (utility.startsWith('min-h-')) {
      return this.generateMinHeight(utility);
    }
    if (utility.startsWith('max-h-')) {
      return this.generateMaxHeight(utility);
    }

    // Width
    if (utility.startsWith('w-')) {
      return this.generateWidth(utility);
    }

    // Height
    if (utility.startsWith('h-')) {
      return this.generateHeight(utility);
    }

    return null;
  }
}

/**
 * Standalone function for backward compatibility
 */
export function generateSizing(utility: string, config: HikmaConfig): CompiledUtility | null {
  const generator = new SizingGenerator(config);
  return generator.generate(utility);
}
