/**
 * Progress Component
 * Framework-agnostic progress indicator
 *
 * Features:
 * - Linear and circular variants
 * - Determinate and indeterminate modes
 * - Custom colors
 * - Size variants
 * - Label and percentage display
 * - SVG-based circular progress
 * - WCAG AA compliant
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends BaseComponentProps {
  /** Progress value (0-100) */
  value?: number;
  /** Max value (default: 100) */
  max?: number;
  /** Indeterminate state (animated) */
  indeterminate?: boolean;
  /** Variant */
  variant?: ProgressVariant;
  /** Size */
  size?: ProgressSize;
  /** Show label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Custom color (overrides default) */
  color?: string;
}

/**
 * Progress Component Class
 */
export class Progress extends BaseComponent<ProgressProps> {
  private container: HTMLDivElement | null = null;

  constructor(props: ProgressProps) {
    super(props, {
      base: 'hikma-progress',
    });
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-progress';
    this.container.setAttribute('role', ARIA_ROLES.progressbar);
    this.container.setAttribute('aria-valuemin', '0');
    this.container.setAttribute('aria-valuemax', String(this.props.max || 100));

    if (!this.props.indeterminate && this.props.value !== undefined) {
      this.container.setAttribute('aria-valuenow', String(this.props.value));
    }

    const variant = this.props.variant || 'linear';

    if (variant === 'circular') {
      const circular = this.createCircularProgress();
      this.container.appendChild(circular);
    } else {
      const linear = this.createLinearProgress();
      this.container.appendChild(linear);
    }

    return this.container;
  }

  private createLinearProgress(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'space-y-1';

    // Label
    if (this.props.showLabel) {
      const label = this.createLabel();
      wrapper.appendChild(label);
    }

    // Progress track
    const track = document.createElement('div');
    track.className = this.getTrackClasses();

    // Progress bar
    const bar = document.createElement('div');
    bar.className = this.getBarClasses();

    if (this.props.indeterminate) {
      bar.style.width = '40%';
      bar.classList.add('animate-progress-indeterminate');
    } else {
      const percentage = this.getPercentage();
      bar.style.width = `${percentage}%`;
    }

    track.appendChild(bar);
    wrapper.appendChild(track);

    return wrapper;
  }

  private getTrackClasses(): string {
    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    return cn(
      'w-full bg-gray-200 rounded-full overflow-hidden',
      sizeClasses[this.props.size || 'md']
    );
  }

  private getBarClasses(): string {
    const colorClass = this.props.color || 'bg-blue-600';

    return cn(
      'h-full rounded-full transition-all duration-300 ease-out',
      colorClass
    );
  }

  private createCircularProgress(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col items-center gap-2';

    // SVG
    const svg = this.createCircularSVG();
    wrapper.appendChild(svg);

    // Label
    if (this.props.showLabel) {
      const label = this.createLabel();
      wrapper.appendChild(label);
    }

    return wrapper;
  }

  private createCircularSVG(): SVGElement {
    const size = this.getSizeValue();
    const strokeWidth = this.getStrokeWidth();
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = this.getPercentage();
    const offset = circumference - (percentage / 100) * circumference;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.classList.add('transform', '-rotate-90');

    // Background circle
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('cx', String(size / 2));
    bgCircle.setAttribute('cy', String(size / 2));
    bgCircle.setAttribute('r', String(radius));
    bgCircle.setAttribute('fill', 'none');
    bgCircle.setAttribute('stroke', '#e5e7eb'); // gray-200
    bgCircle.setAttribute('stroke-width', String(strokeWidth));
    svg.appendChild(bgCircle);

    // Progress circle
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    progressCircle.setAttribute('cx', String(size / 2));
    progressCircle.setAttribute('cy', String(size / 2));
    progressCircle.setAttribute('r', String(radius));
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('stroke', this.props.color || '#2563eb'); // blue-600
    progressCircle.setAttribute('stroke-width', String(strokeWidth));
    progressCircle.setAttribute('stroke-dasharray', String(circumference));
    progressCircle.setAttribute('stroke-linecap', 'round');

    if (this.props.indeterminate) {
      progressCircle.setAttribute('stroke-dashoffset', String(circumference * 0.25));
      progressCircle.classList.add('animate-spin');
    } else {
      progressCircle.setAttribute('stroke-dashoffset', String(offset));
      progressCircle.classList.add('transition-all', 'duration-300', 'ease-out');
    }

    svg.appendChild(progressCircle);

    // Percentage text (inside circle)
    if (!this.props.indeterminate && this.props.showLabel) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '50%');
      text.setAttribute('y', '50%');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'currentColor');
      text.setAttribute('font-size', this.getFontSize());
      text.setAttribute('font-weight', '600');
      text.classList.add('transform', 'rotate-90');
      text.textContent = `${Math.round(percentage)}%`;
      svg.appendChild(text);
    }

    return svg;
  }

  private getSizeValue(): number {
    const sizes = {
      sm: 64,
      md: 96,
      lg: 128,
    };
    return sizes[this.props.size || 'md'];
  }

  private getStrokeWidth(): number {
    const widths = {
      sm: 4,
      md: 6,
      lg: 8,
    };
    return widths[this.props.size || 'md'];
  }

  private getFontSize(): string {
    const sizes = {
      sm: '14',
      md: '18',
      lg: '24',
    };
    return sizes[this.props.size || 'md'];
  }

  private createLabel(): HTMLDivElement {
    const label = document.createElement('div');
    label.className = 'flex items-center justify-between text-sm text-gray-700';

    const labelText = document.createElement('span');
    labelText.textContent = this.props.label || 'Progress';
    label.appendChild(labelText);

    if (!this.props.indeterminate && this.props.variant === 'linear') {
      const percentage = document.createElement('span');
      percentage.className = 'font-medium';
      percentage.textContent = `${Math.round(this.getPercentage())}%`;
      label.appendChild(percentage);
    }

    return label;
  }

  private getPercentage(): number {
    if (this.props.value === undefined) return 0;
    const max = this.props.max || 100;
    return Math.min(100, Math.max(0, (this.props.value / max) * 100));
  }

  public setValue(value: number): void {
    if (!this.container) return;

    this.container.setAttribute('aria-valuenow', String(value));

    if (this.props.variant === 'circular') {
      // Update circular SVG
      const svg = this.container.querySelector('svg');
      const progressCircle = svg?.querySelectorAll('circle')[1];
      if (progressCircle) {
        const radius = Number.parseFloat(progressCircle.getAttribute('r') || '0');
        const circumference = radius * 2 * Math.PI;
        const max = this.props.max || 100;
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.setAttribute('stroke-dashoffset', String(offset));
      }
    } else {
      // Update linear bar
      const bar = this.container.querySelector('[class*="bg-"]');
      if (bar) {
        const max = this.props.max || 100;
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        (bar as HTMLElement).style.width = `${percentage}%`;
      }
    }
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export function createProgress(props: ProgressProps): Progress {
  return new Progress(props);
}
