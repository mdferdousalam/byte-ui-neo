/**
 * Skeleton Component
 * Framework-agnostic loading skeleton
 *
 * Features:
 * - Pulse and shimmer animations
 * - Multiple shape variants
 * - Custom dimensions
 * - Avatar, text, and rectangle presets
 * - Circular variant for avatars
 * - Accessibility support
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { cn } from '@hikmaui/core';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonAnimation = 'pulse' | 'shimmer' | 'none';

export interface SkeletonProps extends BaseComponentProps {
  /** Variant */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Number of text lines (for text variant) */
  lines?: number;
}

/**
 * Skeleton Component Class
 */
export class Skeleton extends BaseComponent<SkeletonProps> {
  private container: HTMLDivElement | null = null;

  constructor(props: SkeletonProps) {
    super(props, {
      base: 'hikma-skeleton',
    });
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-skeleton';
    this.container.setAttribute('aria-busy', 'true');
    this.container.setAttribute('aria-live', 'polite');

    const variant = this.props.variant || 'rectangular';

    if (variant === 'text' && this.props.lines && this.props.lines > 1) {
      // Multiple text lines
      this.createMultipleLines();
    } else {
      // Single skeleton element
      const skeleton = this.createSkeletonElement();
      this.container.appendChild(skeleton);
    }

    return this.container;
  }

  private createMultipleLines(): void {
    if (!this.container) return;

    this.container.className = cn(this.container.className, 'space-y-2');

    const lines = this.props.lines || 3;
    for (let i = 0; i < lines; i++) {
      const skeleton = this.createSkeletonElement();

      // Last line is typically shorter
      if (i === lines - 1) {
        skeleton.style.width = '80%';
      }

      this.container.appendChild(skeleton);
    }
  }

  private createSkeletonElement(): HTMLDivElement {
    const skeleton = document.createElement('div');
    skeleton.className = this.getSkeletonClasses();

    // Apply dimensions
    const width = this.getDimension(this.props.width);
    const height = this.getDimension(this.props.height);

    if (width) skeleton.style.width = width;
    if (height) skeleton.style.height = height;

    return skeleton;
  }

  private getSkeletonClasses(): string {
    const variant = this.props.variant || 'rectangular';
    const animation = this.props.animation ?? 'pulse';

    const variantClasses = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    };

    const animationClasses = {
      pulse: 'animate-pulse',
      shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer',
      none: '',
    };

    return cn(
      'bg-gray-200',
      variantClasses[variant],
      animationClasses[animation],
      // Default dimensions if not provided
      !this.props.width && variant === 'circular' && 'w-12',
      !this.props.height && variant === 'circular' && 'h-12',
      !this.props.width && variant === 'rectangular' && 'w-full',
      !this.props.height && variant === 'rectangular' && 'h-32'
    );
  }

  private getDimension(value?: string | number): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value}px`;
    return value;
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export function createSkeleton(props: SkeletonProps = {}): Skeleton {
  return new Skeleton(props);
}
