/**
 * Effects Utilities Generator
 * Generates box-shadow, drop-shadow, opacity, and blend mode utilities (~50 utilities)
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class EffectsGenerator {
  constructor(private config: HikmaConfig = {}) {}

  generate(utility: string): CompiledUtility | null {
    // Box shadow
    if (utility.startsWith('shadow')) {
      return this.generateBoxShadow(utility);
    }

    // Drop shadow (filter)
    if (utility.startsWith('drop-shadow')) {
      return this.generateDropShadow(utility);
    }

    // Opacity
    if (utility.startsWith('opacity-')) {
      return this.generateOpacity(utility);
    }

    // Mix blend mode
    if (utility.startsWith('mix-blend-')) {
      return this.generateMixBlend(utility);
    }

    // Background blend mode
    if (utility.startsWith('bg-blend-')) {
      return this.generateBgBlend(utility);
    }

    return null;
  }

  // Box shadow utilities
  private generateBoxShadow(utility: string): CompiledUtility | null {
    // Check for shadow color (shadow-primary-500, shadow-red-200, etc.)
    if (utility.startsWith('shadow-') && !this.isShadowSize(utility)) {
      return this.generateShadowColor(utility);
    }

    // Shadow sizes from config or defaults
    const shadowSizes = this.config.theme?.boxShadow || this.getDefaultShadows();

    // Extract size from utility (shadow, shadow-sm, shadow-md, etc.)
    const size = utility === 'shadow' ? 'DEFAULT' : utility.replace('shadow-', '');

    const value = shadowSizes[size];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'box-shadow', value: value as string },
      ],
    };
  }

  // Shadow color utilities (shadow-{color})
  private generateShadowColor(utility: string): CompiledUtility | null {
    const colorValue = utility.replace('shadow-', '');
    const color = this.getColorValue(colorValue);
    if (!color) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: '--tw-shadow-color', value: color },
        { property: '--tw-shadow', value: `var(--tw-shadow-colored)` },
      ],
    };
  }

  // Check if utility is a shadow size (not a color)
  private isShadowSize(utility: string): boolean {
    const sizes = ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner', 'shadow-none'];
    return sizes.includes(utility);
  }

  // Drop shadow (CSS filter)
  private generateDropShadow(utility: string): CompiledUtility | null {
    const dropShadowMap: Record<string, string> = {
      'drop-shadow-sm': 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
      'drop-shadow': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
      'drop-shadow-md': 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      'drop-shadow-lg': 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      'drop-shadow-xl': 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
      'drop-shadow-2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
      'drop-shadow-none': 'drop-shadow(0 0 #0000)',
    };

    const value = dropShadowMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'filter', value },
      ],
    };
  }

  // Opacity utilities
  private generateOpacity(utility: string): CompiledUtility | null {
    const match = utility.match(/^opacity-(\d+)$/);
    if (!match) return null;

    const value = match[1];
    const opacity = this.config.theme?.opacity?.[value] || this.getDefaultOpacity(value);

    if (!opacity) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'opacity', value: opacity as string },
      ],
    };
  }

  // Mix blend mode utilities
  private generateMixBlend(utility: string): CompiledUtility | null {
    const blendModes: Record<string, string> = {
      'mix-blend-normal': 'normal',
      'mix-blend-multiply': 'multiply',
      'mix-blend-screen': 'screen',
      'mix-blend-overlay': 'overlay',
      'mix-blend-darken': 'darken',
      'mix-blend-lighten': 'lighten',
      'mix-blend-color-dodge': 'color-dodge',
      'mix-blend-color-burn': 'color-burn',
      'mix-blend-hard-light': 'hard-light',
      'mix-blend-soft-light': 'soft-light',
      'mix-blend-difference': 'difference',
      'mix-blend-exclusion': 'exclusion',
      'mix-blend-hue': 'hue',
      'mix-blend-saturation': 'saturation',
      'mix-blend-color': 'color',
      'mix-blend-luminosity': 'luminosity',
      'mix-blend-plus-lighter': 'plus-lighter',
    };

    const value = blendModes[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'mix-blend-mode', value },
      ],
    };
  }

  // Background blend mode utilities
  private generateBgBlend(utility: string): CompiledUtility | null {
    const bgBlendModes: Record<string, string> = {
      'bg-blend-normal': 'normal',
      'bg-blend-multiply': 'multiply',
      'bg-blend-screen': 'screen',
      'bg-blend-overlay': 'overlay',
      'bg-blend-darken': 'darken',
      'bg-blend-lighten': 'lighten',
      'bg-blend-color-dodge': 'color-dodge',
      'bg-blend-color-burn': 'color-burn',
      'bg-blend-hard-light': 'hard-light',
      'bg-blend-soft-light': 'soft-light',
      'bg-blend-difference': 'difference',
      'bg-blend-exclusion': 'exclusion',
      'bg-blend-hue': 'hue',
      'bg-blend-saturation': 'saturation',
      'bg-blend-color': 'color',
      'bg-blend-luminosity': 'luminosity',
    };

    const value = bgBlendModes[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-blend-mode', value },
      ],
    };
  }

  // Helper: Get default shadow values
  private getDefaultShadows(): Record<string, string> {
    return {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: '0 0 #0000',
    };
  }

  // Helper: Get default opacity values
  private getDefaultOpacity(value: string): string | null {
    const opacities: Record<string, string> = {
      '0': '0',
      '5': '0.05',
      '10': '0.1',
      '15': '0.15',
      '20': '0.2',
      '25': '0.25',
      '30': '0.3',
      '35': '0.35',
      '40': '0.4',
      '45': '0.45',
      '50': '0.5',
      '55': '0.55',
      '60': '0.6',
      '65': '0.65',
      '70': '0.7',
      '75': '0.75',
      '80': '0.8',
      '85': '0.85',
      '90': '0.9',
      '95': '0.95',
      '100': '1',
    };

    return opacities[value] || null;
  }

  // Helper: Get color value from config
  private getColorValue(colorString: string): string | null {
    // Check for CSS color keywords
    const cssColors = ['transparent', 'current', 'inherit', 'black', 'white'];
    if (cssColors.includes(colorString)) {
      if (colorString === 'current') return 'currentColor';
      return colorString;
    }

    // Parse color-shade format (e.g., "primary-500", "gray-900")
    const parts = colorString.split('-');

    // Single color (e.g., "white", "black")
    if (parts.length === 1) {
      const colors = this.config.theme?.colors;
      if (!colors) return null;

      if (typeof colors[colorString] === 'string') {
        return colors[colorString] as string;
      }
      return null;
    }

    // Color with shade (e.g., "primary-500")
    const shade = parts[parts.length - 1];
    const colorName = parts.slice(0, -1).join('-');

    const colors = this.config.theme?.colors;
    if (!colors) return null;

    const colorGroup = colors[colorName];
    if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
      return colorGroup[shade as keyof typeof colorGroup] as string;
    }

    return null;
  }
}
