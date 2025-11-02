/**
 * Layout Utilities Generator
 * Generates flexbox, grid, and container utilities (~80 utilities)
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class LayoutGenerator {
  constructor(private config: HikmaConfig = {}) {}

  generate(utility: string): CompiledUtility | null {
    // Flexbox utilities
    if (utility.startsWith('justify-')) {
      return this.generateJustify(utility);
    }
    if (utility.startsWith('items-')) {
      return this.generateItems(utility);
    }
    if (utility.startsWith('content-')) {
      return this.generateContent(utility);
    }
    if (utility.startsWith('self-')) {
      return this.generateSelf(utility);
    }
    if (utility.startsWith('flex-')) {
      return this.generateFlex(utility);
    }
    if (utility.startsWith('order-')) {
      return this.generateOrder(utility);
    }
    if (utility === 'grow' || utility === 'grow-0') {
      return this.generateGrow(utility);
    }
    if (utility === 'shrink' || utility === 'shrink-0') {
      return this.generateShrink(utility);
    }

    // Grid utilities
    if (utility.startsWith('grid-cols-')) {
      return this.generateGridCols(utility);
    }
    if (utility.startsWith('grid-rows-')) {
      return this.generateGridRows(utility);
    }
    if (utility.startsWith('col-')) {
      return this.generateColSpan(utility);
    }
    if (utility.startsWith('row-')) {
      return this.generateRowSpan(utility);
    }
    if (utility.startsWith('gap-') || utility.startsWith('gap-x-') || utility.startsWith('gap-y-')) {
      return this.generateGap(utility);
    }
    if (utility.startsWith('grid-flow-')) {
      return this.generateGridFlow(utility);
    }
    if (utility.startsWith('auto-cols-')) {
      return this.generateAutoCols(utility);
    }
    if (utility.startsWith('auto-rows-')) {
      return this.generateAutoRows(utility);
    }

    // Container utilities
    if (utility === 'container') {
      return this.generateContainer();
    }

    return null;
  }

  // Flexbox: justify-content
  private generateJustify(utility: string): CompiledUtility | null {
    const justifyMap: Record<string, string> = {
      'justify-start': 'flex-start',
      'justify-end': 'flex-end',
      'justify-center': 'center',
      'justify-between': 'space-between',
      'justify-around': 'space-around',
      'justify-evenly': 'space-evenly',
      'justify-stretch': 'stretch',
    };

    const value = justifyMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'justify-content', value },
      ],
    };
  }

  // Flexbox: align-items
  private generateItems(utility: string): CompiledUtility | null {
    const itemsMap: Record<string, string> = {
      'items-start': 'flex-start',
      'items-end': 'flex-end',
      'items-center': 'center',
      'items-baseline': 'baseline',
      'items-stretch': 'stretch',
    };

    const value = itemsMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'align-items', value },
      ],
    };
  }

  // Flexbox: align-content
  private generateContent(utility: string): CompiledUtility | null {
    const contentMap: Record<string, string> = {
      'content-start': 'flex-start',
      'content-end': 'flex-end',
      'content-center': 'center',
      'content-between': 'space-between',
      'content-around': 'space-around',
      'content-evenly': 'space-evenly',
      'content-stretch': 'stretch',
    };

    const value = contentMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'align-content', value },
      ],
    };
  }

  // Flexbox: align-self
  private generateSelf(utility: string): CompiledUtility | null {
    const selfMap: Record<string, string> = {
      'self-auto': 'auto',
      'self-start': 'flex-start',
      'self-end': 'flex-end',
      'self-center': 'center',
      'self-baseline': 'baseline',
      'self-stretch': 'stretch',
    };

    const value = selfMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'align-self', value },
      ],
    };
  }

  // Flexbox: flex (basis, direction, wrap)
  private generateFlex(utility: string): CompiledUtility | null {
    // flex-direction
    const directionMap: Record<string, string> = {
      'flex-row': 'row',
      'flex-row-reverse': 'row-reverse',
      'flex-col': 'column',
      'flex-col-reverse': 'column-reverse',
    };

    if (directionMap[utility]) {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'flex-direction', value: directionMap[utility] },
        ],
      };
    }

    // flex-wrap
    const wrapMap: Record<string, string> = {
      'flex-wrap': 'wrap',
      'flex-wrap-reverse': 'wrap-reverse',
      'flex-nowrap': 'nowrap',
    };

    if (wrapMap[utility]) {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'flex-wrap', value: wrapMap[utility] },
        ],
      };
    }

    // flex shorthand
    const flexMap: Record<string, string> = {
      'flex-1': '1 1 0%',
      'flex-auto': '1 1 auto',
      'flex-initial': '0 1 auto',
      'flex-none': 'none',
    };

    if (flexMap[utility]) {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'flex', value: flexMap[utility] },
        ],
      };
    }

    return null;
  }

  // Flexbox: order
  private generateOrder(utility: string): CompiledUtility | null {
    const match = utility.match(/^order-(-?\d+|first|last|none)$/);
    if (!match) return null;

    const orderValue = match[1];
    let value: string;

    if (orderValue === 'first') {
      value = '-9999';
    } else if (orderValue === 'last') {
      value = '9999';
    } else if (orderValue === 'none') {
      value = '0';
    } else {
      value = orderValue;
    }

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'order', value },
      ],
    };
  }

  // Flexbox: flex-grow
  private generateGrow(utility: string): CompiledUtility | null {
    const growMap: Record<string, string> = {
      'grow': '1',
      'grow-0': '0',
    };

    const value = growMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'flex-grow', value },
      ],
    };
  }

  // Flexbox: flex-shrink
  private generateShrink(utility: string): CompiledUtility | null {
    const shrinkMap: Record<string, string> = {
      'shrink': '1',
      'shrink-0': '0',
    };

    const value = shrinkMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'flex-shrink', value },
      ],
    };
  }

  // Grid: grid-template-columns
  private generateGridCols(utility: string): CompiledUtility | null {
    const match = utility.match(/^grid-cols-(\d+|none|subgrid)$/);
    if (!match) return null;

    const cols = match[1];
    let value: string;

    if (cols === 'none') {
      value = 'none';
    } else if (cols === 'subgrid') {
      value = 'subgrid';
    } else {
      const colCount = parseInt(cols);
      if (colCount >= 1 && colCount <= 12) {
        value = `repeat(${colCount}, minmax(0, 1fr))`;
      } else {
        return null;
      }
    }

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'grid-template-columns', value },
      ],
    };
  }

  // Grid: grid-template-rows
  private generateGridRows(utility: string): CompiledUtility | null {
    const match = utility.match(/^grid-rows-(\d+|none|subgrid)$/);
    if (!match) return null;

    const rows = match[1];
    let value: string;

    if (rows === 'none') {
      value = 'none';
    } else if (rows === 'subgrid') {
      value = 'subgrid';
    } else {
      const rowCount = parseInt(rows);
      if (rowCount >= 1 && rowCount <= 12) {
        value = `repeat(${rowCount}, minmax(0, 1fr))`;
      } else {
        return null;
      }
    }

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'grid-template-rows', value },
      ],
    };
  }

  // Grid: column span
  private generateColSpan(utility: string): CompiledUtility | null {
    const match = utility.match(/^col-(span-(\d+|full)|auto|start-(\d+|auto)|end-(\d+|auto))$/);
    if (!match) return null;

    // col-span-*
    if (match[2]) {
      const span = match[2];
      const value = span === 'full' ? '1 / -1' : `span ${span} / span ${span}`;
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-column', value },
        ],
      };
    }

    // col-auto
    if (utility === 'col-auto') {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-column', value: 'auto' },
        ],
      };
    }

    // col-start-*
    if (match[3]) {
      const start = match[3];
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-column-start', value: start },
        ],
      };
    }

    // col-end-*
    if (match[4]) {
      const end = match[4];
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-column-end', value: end },
        ],
      };
    }

    return null;
  }

  // Grid: row span
  private generateRowSpan(utility: string): CompiledUtility | null {
    const match = utility.match(/^row-(span-(\d+|full)|auto|start-(\d+|auto)|end-(\d+|auto))$/);
    if (!match) return null;

    // row-span-*
    if (match[2]) {
      const span = match[2];
      const value = span === 'full' ? '1 / -1' : `span ${span} / span ${span}`;
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-row', value },
        ],
      };
    }

    // row-auto
    if (utility === 'row-auto') {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-row', value: 'auto' },
        ],
      };
    }

    // row-start-*
    if (match[3]) {
      const start = match[3];
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-row-start', value: start },
        ],
      };
    }

    // row-end-*
    if (match[4]) {
      const end = match[4];
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'grid-row-end', value: end },
        ],
      };
    }

    return null;
  }

  // Grid: gap
  private generateGap(utility: string): CompiledUtility | null {
    // gap-x-*, gap-y-*, gap-*
    const match = utility.match(/^gap-(x-|y-)?(.+)$/);
    if (!match) return null;

    const direction = match[1]; // 'x-', 'y-', or undefined
    const size = match[2];

    const gapValue = this.getSpacingValue(size);
    if (!gapValue) return null;

    if (direction === 'x-') {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'column-gap', value: gapValue },
        ],
      };
    }

    if (direction === 'y-') {
      return {
        selector: `.${utility}`,
        declarations: [
          { property: 'row-gap', value: gapValue },
        ],
      };
    }

    // gap-* (both directions)
    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'gap', value: gapValue },
      ],
    };
  }

  // Grid: grid-auto-flow
  private generateGridFlow(utility: string): CompiledUtility | null {
    const flowMap: Record<string, string> = {
      'grid-flow-row': 'row',
      'grid-flow-col': 'column',
      'grid-flow-row-dense': 'row dense',
      'grid-flow-col-dense': 'column dense',
      'grid-flow-dense': 'dense',
    };

    const value = flowMap[utility];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'grid-auto-flow', value },
      ],
    };
  }

  // Grid: grid-auto-columns
  private generateAutoCols(utility: string): CompiledUtility | null {
    const match = utility.match(/^auto-cols-(auto|min|max|fr)$/);
    if (!match) return null;

    const autoColsMap: Record<string, string> = {
      'auto': 'auto',
      'min': 'min-content',
      'max': 'max-content',
      'fr': 'minmax(0, 1fr)',
    };

    const value = autoColsMap[match[1]];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'grid-auto-columns', value },
      ],
    };
  }

  // Grid: grid-auto-rows
  private generateAutoRows(utility: string): CompiledUtility | null {
    const match = utility.match(/^auto-rows-(auto|min|max|fr)$/);
    if (!match) return null;

    const autoRowsMap: Record<string, string> = {
      'auto': 'auto',
      'min': 'min-content',
      'max': 'max-content',
      'fr': 'minmax(0, 1fr)',
    };

    const value = autoRowsMap[match[1]];
    if (!value) return null;

    return {
      selector: `.${utility}`,
      declarations: [
        { property: 'grid-auto-rows', value },
      ],
    };
  }

  // Container with responsive max-widths
  private generateContainer(): CompiledUtility {
    const screens = this.config.theme?.screens || {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };

    // Base container styles
    const declarations = [
      { property: 'width', value: '100%' },
    ];

    // Generate media queries for responsive max-widths
    const mediaQueries: Array<{ query: string; declarations: Array<{ property: string; value: string }> }> = [];

    for (const [breakpoint, width] of Object.entries(screens)) {
      mediaQueries.push({
        query: `@media (min-width: ${width})`,
        declarations: [
          { property: 'max-width', value: width as string },
        ],
      });
    }

    return {
      selector: '.container',
      declarations,
      mediaQueries,
    };
  }

  // Helper: Get spacing value from config
  private getSpacingValue(size: string): string | null {
    // Check config first
    if (this.config.theme?.spacing?.[size]) {
      return this.config.theme.spacing[size] as string;
    }

    // Fractional values: 1/2, 1/3, 2/3, 1/4, 3/4
    if (size.includes('/')) {
      const [num, den] = size.split('/');
      return `${(parseFloat(num) / parseFloat(den)) * 100}%`;
    }

    // Named values
    if (size === 'px') return '1px';
    if (size === 'full') return '100%';

    // Numeric 0-96: multiply by 0.25rem
    const numericSize = parseFloat(size);
    if (!isNaN(numericSize) && numericSize >= 0 && numericSize <= 96) {
      return `${numericSize * 0.25}rem`;
    }

    return null;
  }
}
