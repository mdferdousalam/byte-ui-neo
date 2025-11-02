/**
 * Utility Generator
 * Generates CSS for utility classes
 */

import type { HikmaConfig } from '../types/config';
import type { CompiledUtility } from '../types/utility';
import { ArbitraryValueParser } from '../parsers/arbitrary';
import { generateDisplay } from './generators/display';
import { PositionGenerator } from './generators/position';
import { generateTransform } from './generators/transform';
import { generateFilter } from './generators/filter';
import { BorderGenerator } from './generators/border';
import { TransitionGenerator } from './generators/transition';
import { TypographyGenerator } from './generators/typography';
import { SpacingGenerator } from './generators/spacing';
import { SizingGenerator } from './generators/sizing';
import { LayoutGenerator } from './generators/layout';
import { BackgroundGenerator } from './generators/background';
import { EffectsGenerator } from './generators/effects';

export class UtilityGenerator {
  private config: HikmaConfig;
  private arbitraryParser: ArbitraryValueParser;
  private positionGenerator: PositionGenerator;
  private borderGenerator: BorderGenerator;
  private transitionGenerator: TransitionGenerator;
  private typographyGenerator: TypographyGenerator;
  private spacingGenerator: SpacingGenerator;
  private sizingGenerator: SizingGenerator;
  private layoutGenerator: LayoutGenerator;
  private backgroundGenerator: BackgroundGenerator;
  private effectsGenerator: EffectsGenerator;

  constructor(config: HikmaConfig) {
    this.config = config;
    this.arbitraryParser = new ArbitraryValueParser();
    this.positionGenerator = new PositionGenerator(config);
    this.borderGenerator = new BorderGenerator(config);
    this.transitionGenerator = new TransitionGenerator(config);
    this.typographyGenerator = new TypographyGenerator();
    this.spacingGenerator = new SpacingGenerator(config);
    this.sizingGenerator = new SizingGenerator(config);
    this.layoutGenerator = new LayoutGenerator(config);
    this.backgroundGenerator = new BackgroundGenerator(config);
    this.effectsGenerator = new EffectsGenerator(config);
  }

  /**
   * Generate CSS for a utility class
   */
  generate(utility: string, value?: string): CompiledUtility | null {
    // Check for arbitrary values: w-[342px]
    if (value?.startsWith('[') && value?.endsWith(']')) {
      return this.generateArbitrary(utility, value);
    }

    // Spacing utilities (check early as m/p prefixes are very common)
    const spacing = this.spacingGenerator.generate(utility);
    if (spacing) return spacing;

    // Sizing utilities (w/h prefixes are very common)
    const sizing = this.sizingGenerator.generate(utility);
    if (sizing) return sizing;

    // Layout utilities (flex/grid/justify/items/gap are very common)
    const layout = this.layoutGenerator.generate(utility);
    if (layout) return layout;

    // Background utilities (bg- prefix is very common)
    const background = this.backgroundGenerator.generate(utility);
    if (background) return background;

    // Effects utilities (shadow, opacity, blend modes)
    const effects = this.effectsGenerator.generate(utility);
    if (effects) return effects;

    // Typography utilities (check first as text- prefix is common)
    const typography = this.typographyGenerator.generate(utility);
    if (typography) return typography;

    // Display utilities
    const display = generateDisplay(utility);
    if (display) return display;

    // Position utilities
    const position = this.positionGenerator.generate(utility);
    if (position) return position;

    // Transform utilities
    const transform = generateTransform(utility);
    if (transform) return transform;

    // Filter utilities
    const filter = generateFilter(utility);
    if (filter) return filter;

    // Border utilities
    const border = this.borderGenerator.generate(utility);
    if (border) return border;

    // Transition utilities
    const transition = this.transitionGenerator.generate(utility);
    if (transition) return transition;

    // Legacy utilities (for backward compatibility - most are now in dedicated generators)
    if (utility.startsWith('p-')) return this.generatePadding(utility);
    if (utility.startsWith('m-')) return this.generateMargin(utility);
    if (utility.startsWith('w-')) return this.generateWidth(utility);
    if (utility.startsWith('h-')) return this.generateHeight(utility);
    if (utility.startsWith('text-')) return this.generateText(utility);
    if (utility.startsWith('rounded')) return this.generateBorderRadius(utility);

    // Display utilities for flex and grid (basic ones)
    if (utility === 'flex') {
      return {
        selector: `.${utility}`,
        declarations: [{ property: 'display', value: 'flex' }],
      };
    }
    if (utility === 'grid') {
      return {
        selector: `.${utility}`,
        declarations: [{ property: 'display', value: 'grid' }],
      };
    }

    return null;
  }

  /**
   * Generate arbitrary value utility
   */
  private generateArbitrary(utility: string, value: string): CompiledUtility | null {
    const parsedValue = this.arbitraryParser.parse(value);
    if (!parsedValue) return null;

    const className = `${utility}${value}`;
    let css = '';

    // Map utility to CSS property
    if (utility.startsWith('w-')) {
      css = `.${this.escapeClassName(className)} { width: ${parsedValue}; }`;
    } else if (utility.startsWith('h-')) {
      css = `.${this.escapeClassName(className)} { height: ${parsedValue}; }`;
    } else if (utility.startsWith('p-')) {
      css = `.${this.escapeClassName(className)} { padding: ${parsedValue}; }`;
    } else if (utility.startsWith('m-')) {
      css = `.${this.escapeClassName(className)} { margin: ${parsedValue}; }`;
    } else if (utility.startsWith('bg-')) {
      css = `.${this.escapeClassName(className)} { background-color: ${parsedValue}; }`;
    } else if (utility.startsWith('text-')) {
      css = `.${this.escapeClassName(className)} { color: ${parsedValue}; }`;
    }

    return css ? { className, css, variants: [], utility } : null;
  }

  /**
   * Generate padding utilities
   */
  private generatePadding(utility: string): CompiledUtility | null {
    const match = utility.match(/^p([trblxy]?)-(\w+)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = this.getSpacingValue(size);
    if (!value) return null;

    const properties = this.getSpacingProperties('padding', direction);
    const css = `.${utility} { ${properties.map(p => `${p}: ${value}`).join('; ')}; }`;

    return { className: utility, css, variants: [], utility };
  }

  /**
   * Generate margin utilities
   */
  private generateMargin(utility: string): CompiledUtility | null {
    const match = utility.match(/^m([trblxy]?)-(\w+|auto)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = size === 'auto' ? 'auto' : this.getSpacingValue(size);
    if (!value) return null;

    const properties = this.getSpacingProperties('margin', direction);
    const css = `.${utility} { ${properties.map(p => `${p}: ${value}`).join('; ')}; }`;

    return { className: utility, css, variants: [], utility };
  }

  /**
   * Generate width utilities
   */
  private generateWidth(utility: string): CompiledUtility | null {
    const match = utility.match(/^w-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    let value: string | null = null;

    // Named sizes
    if (size === 'full') value = '100%';
    else if (size === 'screen') value = '100vw';
    else if (size === 'min') value = 'min-content';
    else if (size === 'max') value = 'max-content';
    else if (size === 'fit') value = 'fit-content';
    else if (size.includes('/')) {
      // Fractions: w-1/2, w-3/4
      const [num, den] = size.split('/');
      value = `${(parseFloat(num) / parseFloat(den)) * 100}%`;
    } else {
      value = this.getSpacingValue(size);
    }

    if (!value) return null;

    const css = `.${utility} { width: ${value}; }`;
    return { className: utility, css, variants: [], utility };
  }

  /**
   * Generate height utilities
   */
  private generateHeight(utility: string): CompiledUtility | null {
    const match = utility.match(/^h-(.+)$/);
    if (!match) return null;

    const [, size] = match;
    let value: string | null = null;

    if (size === 'full') value = '100%';
    else if (size === 'screen') value = '100vh';
    else if (size === 'min') value = 'min-content';
    else if (size === 'max') value = 'max-content';
    else if (size === 'fit') value = 'fit-content';
    else value = this.getSpacingValue(size);

    if (!value) return null;

    const css = `.${utility} { height: ${value}; }`;
    return { className: utility, css, variants: [], utility };
  }

  /**
   * Generate text utilities
   */
  private generateText(utility: string): CompiledUtility | null {
    const match = utility.match(/^text-(.+)$/);
    if (!match) return null;

    const [, value] = match;

    // Text size
    if (this.config.theme?.fontSize?.[value]) {
      const size = this.config.theme.fontSize[value];
      const fontSize = Array.isArray(size) ? size[0] : size;
      const lineHeight = Array.isArray(size) ? size[1]?.lineHeight : undefined;

      let css = `.${utility} { font-size: ${fontSize};`;
      if (lineHeight) css += ` line-height: ${lineHeight};`;
      css += ' }';

      return { className: utility, css, variants: [], utility };
    }

    // Text color
    const color = this.getColorValue(value);
    if (color) {
      const css = `.${utility} { color: ${color}; }`;
      return { className: utility, css, variants: [], utility };
    }

    // Text alignment
    if (['left', 'center', 'right', 'justify'].includes(value)) {
      const css = `.${utility} { text-align: ${value}; }`;
      return { className: utility, css, variants: [], utility };
    }

    return null;
  }



  /**
   * Generate border-radius utilities
   */
  private generateBorderRadius(utility: string): CompiledUtility | null {
    const match = utility.match(/^rounded(-\w+)?$/);
    if (!match) return null;

    const [, suffix] = match;
    const size = suffix ? suffix.slice(1) : 'DEFAULT';
    const value = this.config.theme?.borderRadius?.[size];

    if (!value) return null;

    const css = `.${utility} { border-radius: ${value}; }`;
    return { className: utility, css, variants: [], utility };
  }


  // Helper methods

  private getSpacingValue(size: string): string | null {
    return this.config.theme?.spacing?.[size] || null;
  }

  private getColorValue(colorString: string): string | null {
    const parts = colorString.split('-');
    const colorName = parts.slice(0, -1).join('-');
    const shade = parts[parts.length - 1];

    const colors = this.config.theme?.colors;
    if (!colors) return null;

    // Single value color (e.g., bg-white)
    if (typeof colors[colorString] === 'string') {
      return colors[colorString] as string;
    }

    // Color with shade (e.g., bg-primary-500)
    const colorGroup = colors[colorName];
    if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
      return colorGroup[shade as keyof typeof colorGroup] as string;
    }

    return null;
  }

  private getSpacingProperties(type: 'padding' | 'margin', direction: string): string[] {
    const prefix = type === 'padding' ? 'padding' : 'margin';

    if (!direction) return [prefix];
    if (direction === 't') return [`${prefix}-top`];
    if (direction === 'r') return [`${prefix}-right`];
    if (direction === 'b') return [`${prefix}-bottom`];
    if (direction === 'l') return [`${prefix}-left`];
    if (direction === 'x') return [`${prefix}-left`, `${prefix}-right`];
    if (direction === 'y') return [`${prefix}-top`, `${prefix}-bottom`];

    return [];
  }

  private escapeClassName(className: string): string {
    // Escape special characters for CSS class names
    return className
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\#/g, '\\#')
      .replace(/\./g, '\\.')
      .replace(/\//g, '\\/');
  }
}
