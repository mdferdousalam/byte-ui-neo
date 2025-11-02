/**
 * Filter & Effects Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';

export function generateFilter(utility: string): CompiledUtility | null {
  // Blur
  if (utility.startsWith('blur-')) {
    return generateBlur(utility);
  }

  // Brightness
  if (utility.startsWith('brightness-')) {
    return generateBrightness(utility);
  }

  // Contrast
  if (utility.startsWith('contrast-')) {
    return generateContrast(utility);
  }

  // Grayscale
  if (utility.startsWith('grayscale')) {
    return generateGrayscale(utility);
  }

  // Saturate
  if (utility.startsWith('saturate-')) {
    return generateSaturate(utility);
  }

  // Backdrop blur
  if (utility.startsWith('backdrop-blur-')) {
    return generateBackdropBlur(utility);
  }

  return null;
}

function generateBlur(utility: string): CompiledUtility | null {
  const blurMap: Record<string, string> = {
    'blur-none': '0',
    'blur-sm': '4px',
    'blur': '8px',
    'blur-md': '12px',
    'blur-lg': '16px',
    'blur-xl': '24px',
    'blur-2xl': '40px',
    'blur-3xl': '64px',
  };

  const value = blurMap[utility];
  if (!value) return null;

  return {
    className: utility,
    css: `.${utility} { filter: blur(${value}); }`,
    variants: [],
    utility,
  };
}

function generateBrightness(utility: string): CompiledUtility | null {
  const match = utility.match(/^brightness-(\d+)$/);
  if (!match) return null;

  const [, value] = match;
  const brightness = parseInt(value) / 100;

  return {
    className: utility,
    css: `.${utility} { filter: brightness(${brightness}); }`,
    variants: [],
    utility,
  };
}

function generateContrast(utility: string): CompiledUtility | null {
  const match = utility.match(/^contrast-(\d+)$/);
  if (!match) return null;

  const [, value] = match;
  const contrast = parseInt(value) / 100;

  return {
    className: utility,
    css: `.${utility} { filter: contrast(${contrast}); }`,
    variants: [],
    utility,
  };
}

function generateGrayscale(utility: string): CompiledUtility | null {
  if (utility === 'grayscale') {
    return {
      className: utility,
      css: `.${utility} { filter: grayscale(100%); }`,
      variants: [],
      utility,
    };
  }

  if (utility === 'grayscale-0') {
    return {
      className: utility,
      css: `.${utility} { filter: grayscale(0%); }`,
      variants: [],
      utility,
    };
  }

  return null;
}

function generateSaturate(utility: string): CompiledUtility | null {
  const match = utility.match(/^saturate-(\d+)$/);
  if (!match) return null;

  const [, value] = match;
  const saturate = parseInt(value) / 100;

  return {
    className: utility,
    css: `.${utility} { filter: saturate(${saturate}); }`,
    variants: [],
    utility,
  };
}

function generateBackdropBlur(utility: string): CompiledUtility | null {
  const blurMap: Record<string, string> = {
    'backdrop-blur-none': '0',
    'backdrop-blur-sm': '4px',
    'backdrop-blur': '8px',
    'backdrop-blur-md': '12px',
    'backdrop-blur-lg': '16px',
    'backdrop-blur-xl': '24px',
    'backdrop-blur-2xl': '40px',
    'backdrop-blur-3xl': '64px',
  };

  const value = blurMap[utility];
  if (!value) return null;

  return {
    className: utility,
    css: `.${utility} { backdrop-filter: blur(${value}); -webkit-backdrop-filter: blur(${value}); }`,
    variants: [],
    utility,
  };
}
