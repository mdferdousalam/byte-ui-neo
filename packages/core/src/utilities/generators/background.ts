/**
 * Background Utilities Generator
 * Generates background gradient, position, size, repeat, and attachment utilities (~60 utilities)
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class BackgroundGenerator {
  constructor(private config: HikmaConfig = {}) {}

  generate(utility: string): CompiledUtility | null {
    // Background gradients
    if (utility.startsWith('bg-gradient-')) {
      return this.generateGradient(utility);
    }

    // Background position
    if (utility.startsWith('bg-')) {
      // Check position first before other bg- utilities
      const position = this.generatePosition(utility);
      if (position) return position;

      // Background size
      const size = this.generateSize(utility);
      if (size) return size;

      // Background repeat
      const repeat = this.generateRepeat(utility);
      if (repeat) return repeat;

      // Background attachment
      const attachment = this.generateAttachment(utility);
      if (attachment) return attachment;

      // Background clip
      const clip = this.generateClip(utility);
      if (clip) return clip;

      // Background origin
      const origin = this.generateOrigin(utility);
      if (origin) return origin;
    }

    // Gradient color stops (from-*, via-*, to-*)
    if (utility.startsWith('from-') || utility.startsWith('via-') || utility.startsWith('to-')) {
      return this.generateGradientColor(utility);
    }

    return null;
  }

  // Background gradient directions
  private generateGradient(utility: string): CompiledUtility | null {
    const gradientMap: Record<string, string> = {
      'bg-gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'bg-gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'bg-gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'bg-gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'bg-gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'bg-gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'bg-gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'bg-gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    };

    const value = gradientMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-image', value },
      ],
    };
  }

  // Gradient color stops (from-*, via-*, to-*)
  private generateGradientColor(utility: string): CompiledUtility | null {
    const match = utility.match(/^(from|via|to)-(.+)$/);
    if (!match) return null;

    const [, position, colorValue] = match;
    const color = this.getColorValue(colorValue);
    if (!color) return null;

    let cssVarValue: string;
    let cssVarName: string;

    if (position === 'from') {
      cssVarValue = `${color}, var(--tw-gradient-to, ${color})`;
      cssVarName = '--tw-gradient-from';
      return {
        selector: `.${utility}`,
        declarations: [
          { property: '--tw-gradient-from', value: color },
          { property: '--tw-gradient-to', value: `${color}00` },
          { property: '--tw-gradient-stops', value: `var(--tw-gradient-from), var(--tw-gradient-to)` },
        ],
      };
    }

    if (position === 'via') {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: '--tw-gradient-to', value: `${color}00` },
          { property: '--tw-gradient-stops', value: `var(--tw-gradient-from), ${color}, var(--tw-gradient-to)` },
        ],
      };
    }

    // position === 'to'
    return {
      selector: `.${utility}`,
      declarations: [
        { property: '--tw-gradient-to', value: color },
      ],
    };
  }

  // Background position
  private generatePosition(utility: string): CompiledUtility | null {
    const positionMap: Record<string, string> = {
      'bg-bottom': 'bottom',
      'bg-center': 'center',
      'bg-left': 'left',
      'bg-left-bottom': 'left bottom',
      'bg-left-top': 'left top',
      'bg-right': 'right',
      'bg-right-bottom': 'right bottom',
      'bg-right-top': 'right top',
      'bg-top': 'top',
    };

    const value = positionMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-position', value },
      ],
    };
  }

  // Background size
  private generateSize(utility: string): CompiledUtility | null {
    const sizeMap: Record<string, string> = {
      'bg-auto': 'auto',
      'bg-cover': 'cover',
      'bg-contain': 'contain',
    };

    const value = sizeMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-size', value },
      ],
    };
  }

  // Background repeat
  private generateRepeat(utility: string): CompiledUtility | null {
    const repeatMap: Record<string, string> = {
      'bg-repeat': 'repeat',
      'bg-no-repeat': 'no-repeat',
      'bg-repeat-x': 'repeat-x',
      'bg-repeat-y': 'repeat-y',
      'bg-repeat-round': 'round',
      'bg-repeat-space': 'space',
    };

    const value = repeatMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-repeat', value },
      ],
    };
  }

  // Background attachment
  private generateAttachment(utility: string): CompiledUtility | null {
    const attachmentMap: Record<string, string> = {
      'bg-fixed': 'fixed',
      'bg-local': 'local',
      'bg-scroll': 'scroll',
    };

    const value = attachmentMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-attachment', value },
      ],
    };
  }

  // Background clip
  private generateClip(utility: string): CompiledUtility | null {
    const clipMap: Record<string, string> = {
      'bg-clip-border': 'border-box',
      'bg-clip-padding': 'padding-box',
      'bg-clip-content': 'content-box',
      'bg-clip-text': 'text',
    };

    const value = clipMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-clip', value },
        ...(value === 'text' ? [{ property: '-webkit-background-clip', value: 'text' }] : []),
      ],
    };
  }

  // Background origin
  private generateOrigin(utility: string): CompiledUtility | null {
    const originMap: Record<string, string> = {
      'bg-origin-border': 'border-box',
      'bg-origin-padding': 'padding-box',
      'bg-origin-content': 'content-box',
    };

    const value = originMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'background-origin', value },
      ],
    };
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
