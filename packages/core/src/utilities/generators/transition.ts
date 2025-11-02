/**
 * Transition & Animation Utilities Generator
 */

import type { CompiledUtility } from '../../types/utility';
import type { HikmaConfig } from '../../types/config';

export class TransitionGenerator {
  private config: HikmaConfig;

  constructor(config: HikmaConfig) {
    this.config = config;
  }

  generate(utility: string): CompiledUtility | null {
    // Transition property
    if (utility.startsWith('transition-')) {
      return this.generateTransitionProperty(utility);
    }

    if (utility === 'transition') {
      return {
        className: utility,
        css: `.${utility} { transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }`,
        variants: [],
        utility,
      };
    }

    // Duration
    if (utility.startsWith('duration-')) {
      return this.generateDuration(utility);
    }

    // Timing function (ease)
    if (utility.startsWith('ease-')) {
      return this.generateEase(utility);
    }

    // Delay
    if (utility.startsWith('delay-')) {
      return this.generateDelay(utility);
    }

    // Animation
    if (utility.startsWith('animate-')) {
      return this.generateAnimation(utility);
    }

    return null;
  }

  private generateTransitionProperty(utility: string): CompiledUtility | null {
    const propertyMap: Record<string, string> = {
      'transition-none': 'none',
      'transition-all': 'all',
      'transition-colors': 'background-color, border-color, color, fill, stroke',
      'transition-opacity': 'opacity',
      'transition-shadow': 'box-shadow',
      'transition-transform': 'transform',
    };

    const property = propertyMap[utility];
    if (!property) return null;

    return {
      className: utility,
      css: `.${utility} { transition-property: ${property}; }`,
      variants: [],
      utility,
    };
  }

  private generateDuration(utility: string): CompiledUtility | null {
    const match = utility.match(/^duration-(\d+)$/);
    if (!match) return null;

    const [, ms] = match;
    return {
      className: utility,
      css: `.${utility} { transition-duration: ${ms}ms; }`,
      variants: [],
      utility,
    };
  }

  private generateEase(utility: string): CompiledUtility | null {
    const easeMap: Record<string, string> = {
      'ease-linear': 'linear',
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    };

    const timing = easeMap[utility];
    if (!timing) return null;

    return {
      className: utility,
      css: `.${utility} { transition-timing-function: ${timing}; }`,
      variants: [],
      utility,
    };
  }

  private generateDelay(utility: string): CompiledUtility | null {
    const match = utility.match(/^delay-(\d+)$/);
    if (!match) return null;

    const [, ms] = match;
    return {
      className: utility,
      css: `.${utility} { transition-delay: ${ms}ms; }`,
      variants: [],
      utility,
    };
  }

  private generateAnimation(utility: string): CompiledUtility | null {
    const animationMap: Record<string, string> = {
      'animate-none': 'none',
      'animate-spin': 'spin 1s linear infinite',
      'animate-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      'animate-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'animate-bounce': 'bounce 1s infinite',
    };

    const animation = animationMap[utility];
    if (!animation) return null;

    // Include keyframes
    const keyframes = this.getAnimationKeyframes(utility);

    return {
      className: utility,
      css: `${keyframes}\n.${utility} { animation: ${animation}; }`,
      variants: [],
      utility,
    };
  }

  private getAnimationKeyframes(utility: string): string {
    if (utility === 'animate-spin') {
      return '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    }

    if (utility === 'animate-ping') {
      return '@keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }';
    }

    if (utility === 'animate-pulse') {
      return '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }';
    }

    if (utility === 'animate-bounce') {
      return '@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }';
    }

    return '';
  }
}
