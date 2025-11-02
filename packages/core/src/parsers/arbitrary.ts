/**
 * Arbitrary Value Parser
 * Parses and validates arbitrary values like [342px], [#bada55], [50%]
 */

export class ArbitraryValueParser {
  /**
   * Parse arbitrary value from [...]
   */
  parse(value: string): string | null {
    // Remove brackets
    const cleaned = value.slice(1, -1);

    // Validate and normalize
    if (this.isValidLength(cleaned)) return cleaned;
    if (this.isValidColor(cleaned)) return cleaned;
    if (this.isValidPercentage(cleaned)) return cleaned;
    if (this.isValidNumber(cleaned)) return cleaned;

    return null;
  }

  private isValidLength(value: string): boolean {
    // px, rem, em, vh, vw, etc.
    return /^-?\d+(\.\d+)?(px|rem|em|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/.test(value);
  }

  private isValidColor(value: string): boolean {
    // Hex colors: #fff, #bada55
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return true;

    // rgb(a): rgb(255,0,0), rgba(255,0,0,0.5)
    if (/^rgba?\([^)]+\)$/.test(value)) return true;

    // hsl(a): hsl(0,100%,50%), hsla(0,100%,50%,0.5)
    if (/^hsla?\([^)]+\)$/.test(value)) return true;

    // Named colors
    const namedColors = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];
    if (namedColors.includes(value)) return true;

    return false;
  }

  private isValidPercentage(value: string): boolean {
    return /^-?\d+(\.\d+)?%$/.test(value);
  }

  private isValidNumber(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value);
  }
}
