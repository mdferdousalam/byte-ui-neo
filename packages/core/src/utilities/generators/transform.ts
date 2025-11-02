/**
 * Transform Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';

export function generateTransform(utility: string): CompiledUtility | null {
  // Scale
  if (utility.startsWith('scale-')) {
    return generateScale(utility);
  }

  // Rotate
  if (utility.startsWith('rotate-')) {
    return generateRotate(utility);
  }

  // Translate
  if (utility.startsWith('translate-')) {
    return generateTranslate(utility);
  }

  // Skew
  if (utility.startsWith('skew-')) {
    return generateSkew(utility);
  }

  // Transform origin
  if (utility.startsWith('origin-')) {
    return generateTransformOrigin(utility);
  }

  return null;
}

function generateScale(utility: string): CompiledUtility | null {
  const match = utility.match(/^scale-([xy]?)-?(\d+)$/);
  if (!match) return null;

  const [, axis, value] = match;
  const scale = parseInt(value) / 100;

  let css = '';
  if (!axis) {
    css = `.${utility} { transform: scale(${scale}); }`;
  } else if (axis === 'x') {
    css = `.${utility} { transform: scaleX(${scale}); }`;
  } else if (axis === 'y') {
    css = `.${utility} { transform: scaleY(${scale}); }`;
  }

  return css ? { className: utility, css, variants: [], utility } : null;
}

function generateRotate(utility: string): CompiledUtility | null {
  const match = utility.match(/^rotate-(-?\d+)$/);
  if (!match) return null;

  const [, degrees] = match;
  const css = `.${utility} { transform: rotate(${degrees}deg); }`;

  return { className: utility, css, variants: [], utility };
}

function generateTranslate(utility: string): CompiledUtility | null {
  const match = utility.match(/^translate-([xy])-(-?[\d.]+|full|1\/2|1\/3|2\/3|1\/4|3\/4)$/);
  if (!match) return null;

  const [, axis, value] = match;
  let translateValue = '';

  // Named values
  if (value === 'full') translateValue = '100%';
  else if (value === '1/2') translateValue = '50%';
  else if (value === '1/3') translateValue = '33.333333%';
  else if (value === '2/3') translateValue = '66.666667%';
  else if (value === '1/4') translateValue = '25%';
  else if (value === '3/4') translateValue = '75%';
  else translateValue = `${value}rem`;

  let css = '';
  if (axis === 'x') {
    css = `.${utility} { transform: translateX(${translateValue}); }`;
  } else if (axis === 'y') {
    css = `.${utility} { transform: translateY(${translateValue}); }`;
  }

  return css ? { className: utility, css, variants: [], utility } : null;
}

function generateSkew(utility: string): CompiledUtility | null {
  const match = utility.match(/^skew-([xy])-(-?\d+)$/);
  if (!match) return null;

  const [, axis, degrees] = match;

  let css = '';
  if (axis === 'x') {
    css = `.${utility} { transform: skewX(${degrees}deg); }`;
  } else if (axis === 'y') {
    css = `.${utility} { transform: skewY(${degrees}deg); }`;
  }

  return css ? { className: utility, css, variants: [], utility } : null;
}

function generateTransformOrigin(utility: string): CompiledUtility | null {
  const originMap: Record<string, string> = {
    'origin-center': 'center',
    'origin-top': 'top',
    'origin-top-right': 'top right',
    'origin-right': 'right',
    'origin-bottom-right': 'bottom right',
    'origin-bottom': 'bottom',
    'origin-bottom-left': 'bottom left',
    'origin-left': 'left',
    'origin-top-left': 'top left',
  };

  const origin = originMap[utility];
  if (!origin) return null;

  return {
    className: utility,
    css: `.${utility} { transform-origin: ${origin}; }`,
    variants: [],
    utility,
  };
}
