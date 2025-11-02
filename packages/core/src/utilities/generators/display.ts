/**
 * Display Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';

export function generateDisplay(utility: string): CompiledUtility | null {
  const displayMap: Record<string, string> = {
    'block': 'display: block',
    'inline-block': 'display: inline-block',
    'inline': 'display: inline',
    'flex': 'display: flex',
    'inline-flex': 'display: inline-flex',
    'grid': 'display: grid',
    'inline-grid': 'display: inline-grid',
    'table': 'display: table',
    'table-cell': 'display: table-cell',
    'table-row': 'display: table-row',
    'flow-root': 'display: flow-root',
    'contents': 'display: contents',
    'hidden': 'display: none',
  };

  const css = displayMap[utility];
  if (!css) return null;

  return {
    className: utility,
    css: `.${utility} { ${css}; }`,
    variants: [],
    utility,
  };
}
