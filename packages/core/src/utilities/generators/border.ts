/**
 * Border Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class BorderGenerator {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  generate(utility: string): CompiledUtility | null {
    // Border width
    if (utility.startsWith('border-') && /^border-\d+$/.test(utility)) {
      return this.generateBorderWidth(utility);
    }

    // Border style
    if (this.isBorderStyle(utility)) {
      return this.generateBorderStyle(utility);
    }

    // Border color
    if (utility.startsWith('border-') && !utility.match(/^border-[trblxy]?-?\d+$/)) {
      return this.generateBorderColor(utility);
    }

    // Border sides
    if (utility.match(/^border-[trblxy]-\d+$/)) {
      return this.generateBorderSide(utility);
    }

    // Divide utilities
    if (utility.startsWith('divide-')) {
      return this.generateDivide(utility);
    }

    // Ring utilities
    if (utility.startsWith('ring-')) {
      return this.generateRing(utility);
    }

    return null;
  }

  private generateBorderWidth(utility: string): CompiledUtility | null {
    const match = utility.match(/^border-(\d+)$/);
    if (!match) return null;

    const [, width] = match;
    return {
      className: utility,
      css: `.${utility} { border-width: ${width}px; }`,
      variants: [],
      utility,
    };
  }

  private isBorderStyle(utility: string): boolean {
    return ['border-solid', 'border-dashed', 'border-dotted', 'border-double', 'border-none'].includes(utility);
  }

  private generateBorderStyle(utility: string): CompiledUtility {
    const style = utility.replace('border-', '');
    return {
      className: utility,
      css: `.${utility} { border-style: ${style}; }`,
      variants: [],
      utility,
    };
  }

  private generateBorderColor(utility: string): CompiledUtility | null {
    const match = utility.match(/^border-(.+)$/);
    if (!match) return null;

    const [, colorString] = match;
    const color = this.getColorValue(colorString);
    if (!color) return null;

    return {
      className: utility,
      css: `.${utility} { border-color: ${color}; }`,
      variants: [],
      utility,
    };
  }

  private generateBorderSide(utility: string): CompiledUtility | null {
    const match = utility.match(/^border-([trblxy])-(\d+)$/);
    if (!match) return null;

    const [, side, width] = match;
    const properties = this.getBorderSideProperties(side);
    const css = `.${utility} { ${properties.map(p => `${p}: ${width}px`).join('; ')}; }`;

    return { className: utility, css, variants: [], utility };
  }

  private generateDivide(utility: string): CompiledUtility | null {
    // divide-y-2, divide-x-4
    const match = utility.match(/^divide-([xy])-(\d+)$/);
    if (!match) return null;

    const [, axis, width] = match;
    const property = axis === 'x' ? 'border-left-width' : 'border-top-width';

    return {
      className: utility,
      css: `.${utility} > * + * { ${property}: ${width}px; }`,
      variants: [],
      utility,
    };
  }

  private generateRing(utility: string): CompiledUtility | null {
    // ring-2, ring-primary-500, ring-offset-2
    if (utility.match(/^ring-\d+$/)) {
      const match = utility.match(/^ring-(\d+)$/);
      if (!match) return null;

      const [, width] = match;
      return {
        className: utility,
        css: `.${utility} { box-shadow: 0 0 0 ${width}px var(--ring-color, rgba(59, 130, 246, 0.5)); }`,
        variants: [],
        utility,
      };
    }

    if (utility.startsWith('ring-offset-')) {
      const match = utility.match(/^ring-offset-(\d+)$/);
      if (!match) return null;

      const [, width] = match;
      return {
        className: utility,
        css: `.${utility} { --ring-offset-width: ${width}px; }`,
        variants: [],
        utility,
      };
    }

    return null;
  }

  private getBorderSideProperties(side: string): string[] {
    if (side === 't') return ['border-top-width'];
    if (side === 'r') return ['border-right-width'];
    if (side === 'b') return ['border-bottom-width'];
    if (side === 'l') return ['border-left-width'];
    if (side === 'x') return ['border-left-width', 'border-right-width'];
    if (side === 'y') return ['border-top-width', 'border-bottom-width'];
    return [];
  }

  private getColorValue(colorString: string): string | null {
    const parts = colorString.split('-');
    const colorName = parts.slice(0, -1).join('-');
    const shade = parts[parts.length - 1];

    const colors = this.config.theme?.colors;
    if (!colors) return null;

    if (typeof colors[colorString] === 'string') {
      return colors[colorString] as string;
    }

    const colorGroup = colors[colorName];
    if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
      return colorGroup[shade as keyof typeof colorGroup] as string;
    }

    return null;
  }
}
