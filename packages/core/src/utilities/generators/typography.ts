/**
 * Typography Utilities Generator
 * Generates font-family, font-size, font-weight, line-height, letter-spacing utilities
 */

import type { CompiledUtility } from '../../types';

export class TypographyGenerator {
  /**
   * Font family utilities
   */
  private static readonly FONT_FAMILIES: Record<string, string> = {
    'font-sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    'font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    'font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  };

  /**
   * Font size utilities with line-height
   */
  private static readonly FONT_SIZES: Record<string, { fontSize: string; lineHeight: string }> = {
    'text-xs': { fontSize: '0.75rem', lineHeight: '1rem' },
    'text-sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
    'text-base': { fontSize: '1rem', lineHeight: '1.5rem' },
    'text-lg': { fontSize: '1.125rem', lineHeight: '1.75rem' },
    'text-xl': { fontSize: '1.25rem', lineHeight: '1.75rem' },
    'text-2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    'text-3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    'text-4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    'text-5xl': { fontSize: '3rem', lineHeight: '1' },
    'text-6xl': { fontSize: '3.75rem', lineHeight: '1' },
    'text-7xl': { fontSize: '4.5rem', lineHeight: '1' },
    'text-8xl': { fontSize: '6rem', lineHeight: '1' },
    'text-9xl': { fontSize: '8rem', lineHeight: '1' },
  };

  /**
   * Font weight utilities
   */
  private static readonly FONT_WEIGHTS: Record<string, string> = {
    'font-thin': '100',
    'font-extralight': '200',
    'font-light': '300',
    'font-normal': '400',
    'font-medium': '500',
    'font-semibold': '600',
    'font-bold': '700',
    'font-extrabold': '800',
    'font-black': '900',
  };

  /**
   * Line height utilities
   */
  private static readonly LINE_HEIGHTS: Record<string, string> = {
    'leading-none': '1',
    'leading-tight': '1.25',
    'leading-snug': '1.375',
    'leading-normal': '1.5',
    'leading-relaxed': '1.625',
    'leading-loose': '2',
    'leading-3': '0.75rem',
    'leading-4': '1rem',
    'leading-5': '1.25rem',
    'leading-6': '1.5rem',
    'leading-7': '1.75rem',
    'leading-8': '2rem',
    'leading-9': '2.25rem',
    'leading-10': '2.5rem',
  };

  /**
   * Letter spacing utilities
   */
  private static readonly LETTER_SPACINGS: Record<string, string> = {
    'tracking-tighter': '-0.05em',
    'tracking-tight': '-0.025em',
    'tracking-normal': '0em',
    'tracking-wide': '0.025em',
    'tracking-wider': '0.05em',
    'tracking-widest': '0.1em',
  };

  /**
   * Text alignment utilities
   */
  private static readonly TEXT_ALIGNS: Record<string, string> = {
    'text-left': 'left',
    'text-center': 'center',
    'text-right': 'right',
    'text-justify': 'justify',
    'text-start': 'start',
    'text-end': 'end',
  };

  /**
   * Text decoration utilities
   */
  private static readonly TEXT_DECORATIONS: Record<string, string> = {
    'underline': 'underline',
    'overline': 'overline',
    'line-through': 'line-through',
    'no-underline': 'none',
  };

  /**
   * Text transform utilities
   */
  private static readonly TEXT_TRANSFORMS: Record<string, string> = {
    'uppercase': 'uppercase',
    'lowercase': 'lowercase',
    'capitalize': 'capitalize',
    'normal-case': 'none',
  };

  /**
   * Text overflow utilities
   */
  private static readonly TEXT_OVERFLOWS = {
    'truncate': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    'text-ellipsis': { textOverflow: 'ellipsis' },
    'text-clip': { textOverflow: 'clip' },
  };

  /**
   * Whitespace utilities
   */
  private static readonly WHITESPACES: Record<string, string> = {
    'whitespace-normal': 'normal',
    'whitespace-nowrap': 'nowrap',
    'whitespace-pre': 'pre',
    'whitespace-pre-line': 'pre-line',
    'whitespace-pre-wrap': 'pre-wrap',
    'whitespace-break-spaces': 'break-spaces',
  };

  /**
   * Word break utilities
   */
  private static readonly WORD_BREAKS = {
    'break-normal': {
      overflowWrap: 'normal',
      wordBreak: 'normal',
    },
    'break-words': { overflowWrap: 'break-word' },
    'break-all': { wordBreak: 'break-all' },
    'break-keep': { wordBreak: 'keep-all' },
  };

  /**
   * Text color utilities (using theme colors)
   */
  private generateTextColor(color: string, shade?: string): CompiledUtility | null {
    const className = shade ? `text-${color}-${shade}` : `text-${color}`;

    // This will be enhanced to use theme colors from config
    return {
      className,
      css: `color: var(--byte-color-${color}${shade ? `-${shade}` : ''});`,
    };
  }

  /**
   * Generate typography utility
   */
  generate(utility: string): CompiledUtility | null {
    // Font family
    if (utility in TypographyGenerator.FONT_FAMILIES) {
      return {
        className: utility,
        css: `font-family: ${TypographyGenerator.FONT_FAMILIES[utility]};`,
      };
    }

    // Font size
    if (utility in TypographyGenerator.FONT_SIZES) {
      const { fontSize, lineHeight } = TypographyGenerator.FONT_SIZES[utility];
      return {
        className: utility,
        css: `font-size: ${fontSize};\n  line-height: ${lineHeight};`,
      };
    }

    // Font weight
    if (utility in TypographyGenerator.FONT_WEIGHTS) {
      return {
        className: utility,
        css: `font-weight: ${TypographyGenerator.FONT_WEIGHTS[utility]};`,
      };
    }

    // Line height
    if (utility in TypographyGenerator.LINE_HEIGHTS) {
      return {
        className: utility,
        css: `line-height: ${TypographyGenerator.LINE_HEIGHTS[utility]};`,
      };
    }

    // Letter spacing
    if (utility in TypographyGenerator.LETTER_SPACINGS) {
      return {
        className: utility,
        css: `letter-spacing: ${TypographyGenerator.LETTER_SPACINGS[utility]};`,
      };
    }

    // Text alignment
    if (utility in TypographyGenerator.TEXT_ALIGNS) {
      return {
        className: utility,
        css: `text-align: ${TypographyGenerator.TEXT_ALIGNS[utility]};`,
      };
    }

    // Text decoration
    if (utility in TypographyGenerator.TEXT_DECORATIONS) {
      return {
        className: utility,
        css: `text-decoration-line: ${TypographyGenerator.TEXT_DECORATIONS[utility]};`,
      };
    }

    // Text transform
    if (utility in TypographyGenerator.TEXT_TRANSFORMS) {
      return {
        className: utility,
        css: `text-transform: ${TypographyGenerator.TEXT_TRANSFORMS[utility]};`,
      };
    }

    // Text overflow
    if (utility in TypographyGenerator.TEXT_OVERFLOWS) {
      const properties = TypographyGenerator.TEXT_OVERFLOWS[utility as keyof typeof TypographyGenerator.TEXT_OVERFLOWS];
      const css = Object.entries(properties)
        .map(([prop, value]) => {
          const kebabProp = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
          return `${kebabProp}: ${value};`;
        })
        .join('\n  ');

      return { className: utility, css };
    }

    // Whitespace
    if (utility in TypographyGenerator.WHITESPACES) {
      return {
        className: utility,
        css: `white-space: ${TypographyGenerator.WHITESPACES[utility]};`,
      };
    }

    // Word break
    if (utility in TypographyGenerator.WORD_BREAKS) {
      const properties = TypographyGenerator.WORD_BREAKS[utility as keyof typeof TypographyGenerator.WORD_BREAKS];
      const css = Object.entries(properties)
        .map(([prop, value]) => {
          const kebabProp = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
          return `${kebabProp}: ${value};`;
        })
        .join('\n  ');

      return { className: utility, css };
    }

    // Font style
    if (utility === 'italic') {
      return { className: utility, css: 'font-style: italic;' };
    }
    if (utility === 'not-italic') {
      return { className: utility, css: 'font-style: normal;' };
    }

    // Text decoration style
    if (utility === 'decoration-solid') {
      return { className: utility, css: 'text-decoration-style: solid;' };
    }
    if (utility === 'decoration-double') {
      return { className: utility, css: 'text-decoration-style: double;' };
    }
    if (utility === 'decoration-dotted') {
      return { className: utility, css: 'text-decoration-style: dotted;' };
    }
    if (utility === 'decoration-dashed') {
      return { className: utility, css: 'text-decoration-style: dashed;' };
    }
    if (utility === 'decoration-wavy') {
      return { className: utility, css: 'text-decoration-style: wavy;' };
    }

    // Text decoration thickness
    const decorationThicknessMatch = utility.match(/^decoration-(auto|from-font|\d+)$/);
    if (decorationThicknessMatch) {
      const value = decorationThicknessMatch[1];
      const thickness = value === 'auto' ? 'auto' : value === 'from-font' ? 'from-font' : `${value}px`;
      return {
        className: utility,
        css: `text-decoration-thickness: ${thickness};`,
      };
    }

    // Text underline offset
    const underlineOffsetMatch = utility.match(/^underline-offset-(\d+)$/);
    if (underlineOffsetMatch) {
      const value = underlineOffsetMatch[1];
      return {
        className: utility,
        css: `text-underline-offset: ${value}px;`,
      };
    }

    // Text indent
    const textIndentMatch = utility.match(/^indent-(\d+)$/);
    if (textIndentMatch) {
      const value = textIndentMatch[1];
      return {
        className: utility,
        css: `text-indent: ${parseInt(value) * 0.25}rem;`,
      };
    }

    // Vertical align
    const verticalAligns = ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'];
    if (utility.startsWith('align-')) {
      const align = utility.substring(6);
      if (verticalAligns.includes(align)) {
        return {
          className: utility,
          css: `vertical-align: ${align};`,
        };
      }
    }

    // List style type
    const listStyles = {
      'list-none': 'none',
      'list-disc': 'disc',
      'list-decimal': 'decimal',
    };
    if (utility in listStyles) {
      return {
        className: utility,
        css: `list-style-type: ${listStyles[utility as keyof typeof listStyles]};`,
      };
    }

    // List style position
    if (utility === 'list-inside') {
      return { className: utility, css: 'list-style-position: inside;' };
    }
    if (utility === 'list-outside') {
      return { className: utility, css: 'list-style-position: outside;' };
    }

    return null;
  }
}

/**
 * Standalone function for backward compatibility
 */
export function generateTypography(utility: string): CompiledUtility | null {
  const generator = new TypographyGenerator();
  return generator.generate(utility);
}
