/**
 * HikmaUI Presets
 * Pre-configured themes for different use cases
 */

export { minimalPreset } from './minimal';
export { defaultPreset } from './default';
export { completePreset } from './complete';

// Re-export for convenience
export const presets = {
  minimal: () => import('./minimal').then(m => m.minimalPreset),
  default: () => import('./default').then(m => m.defaultPreset),
  complete: () => import('./complete').then(m => m.completePreset),
};
