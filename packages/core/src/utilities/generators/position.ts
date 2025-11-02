/**
 * Position Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class PositionGenerator {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  generate(utility: string): CompiledUtility | null {
    // Position types
    if (this.isPositionType(utility)) {
      return this.generatePositionType(utility);
    }

    // Inset utilities (top, right, bottom, left)
    if (this.isInset(utility)) {
      return this.generateInset(utility);
    }

    // Z-index
    if (utility.startsWith('z-')) {
      return this.generateZIndex(utility);
    }

    return null;
  }

  private isPositionType(utility: string): boolean {
    return ['static', 'relative', 'absolute', 'fixed', 'sticky'].includes(utility);
  }

  private generatePositionType(utility: string): CompiledUtility {
    return {
      className: utility,
      css: `.${utility} { position: ${utility}; }`,
      variants: [],
      utility,
    };
  }

  private isInset(utility: string): boolean {
    return /^(top|right|bottom|left|inset)-/.test(utility) ||
           /^(inset-x|inset-y)-/.test(utility);
  }

  private generateInset(utility: string): CompiledUtility | null {
    // inset-0, top-4, right-auto, etc.
    const match = utility.match(/^(top|right|bottom|left|inset|inset-x|inset-y)-(.+)$/);
    if (!match) return null;

    const [, direction, size] = match;
    const value = size === 'auto' ? 'auto' : this.getSpacingValue(size);
    if (!value) return null;

    const properties = this.getInsetProperties(direction);
    const css = `.${utility} { ${properties.map(p => `${p}: ${value}`).join('; ')}; }`;

    return { className: utility, css, variants: [], utility };
  }

  private generateZIndex(utility: string): CompiledUtility | null {
    const match = utility.match(/^z-(.+)$/);
    if (!match) return null;

    const [, value] = match;
    const zIndex = this.config.theme?.zIndex?.[value] || value;

    return {
      className: utility,
      css: `.${utility} { z-index: ${zIndex}; }`,
      variants: [],
      utility,
    };
  }

  private getInsetProperties(direction: string): string[] {
    if (direction === 'inset') return ['top', 'right', 'bottom', 'left'];
    if (direction === 'inset-x') return ['left', 'right'];
    if (direction === 'inset-y') return ['top', 'bottom'];
    return [direction];
  }

  private getSpacingValue(size: string): string | null {
    return this.config.theme?.spacing?.[size] || null;
  }
}
