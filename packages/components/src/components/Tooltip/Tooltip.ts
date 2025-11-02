/**
 * Tooltip Component
 * Framework-agnostic tooltip with smart positioning
 *
 * Features:
 * - 12 positions: top/bottom/left/right × start/center/end
 * - Arrow pointing to trigger element
 * - Show/hide delays (customizable)
 * - Portal rendering to document.body
 * - Collision detection (auto-flip if offscreen)
 * - Mouse and focus trigger support
 * - WCAG AA compliant
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps extends BaseComponentProps {
  /** Content to display in tooltip */
  content: string | HTMLElement;
  /** Element that triggers the tooltip */
  trigger: HTMLElement;
  /** Preferred position (may flip on collision) */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  showDelay?: number;
  /** Delay before hiding (ms) */
  hideDelay?: number;
  /** Disable collision detection */
  disableFlip?: boolean;
}

interface Position {
  top: number;
  left: number;
  arrowPosition: { top?: number; left?: number; bottom?: number; right?: number };
}

/**
 * Tooltip Component Class
 */
export class Tooltip extends BaseComponent<TooltipProps> {
  private tooltip: HTMLDivElement | null = null;
  private arrow: HTMLDivElement | null = null;
  private showTimer: number | null = null;
  private hideTimer: number | null = null;
  private isVisible: boolean = false;

  constructor(props: TooltipProps) {
    super(props, {
      base: 'hikma-tooltip',
    });
  }

  public createElement(): HTMLDivElement {
    this.tooltip = document.createElement('div');
    this.tooltip.className = this.getTooltipClasses();
    this.tooltip.setAttribute('role', ARIA_ROLES.tooltip);
    this.tooltip.style.cssText = 'position: fixed; z-index: 9999; opacity: 0; pointer-events: none;';

    // Content
    const content = this.createContent();
    this.tooltip.appendChild(content);

    // Arrow
    this.arrow = this.createArrow();
    this.tooltip.appendChild(this.arrow);

    // Attach event listeners to trigger
    this.attachTriggerListeners();

    // Append to body (portal)
    document.body.appendChild(this.tooltip);

    return this.tooltip;
  }

  private getTooltipClasses(): string {
    return cn(
      'px-3 py-2 rounded-lg',
      'bg-gray-900 text-white text-sm',
      'shadow-lg',
      'max-w-xs',
      'transition-opacity duration-200'
    );
  }

  private createContent(): HTMLDivElement {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'relative z-10';

    if (typeof this.props.content === 'string') {
      contentContainer.textContent = this.props.content;
    } else {
      contentContainer.appendChild(this.props.content);
    }

    return contentContainer;
  }

  private createArrow(): HTMLDivElement {
    const arrow = document.createElement('div');
    arrow.className = 'absolute h-2 w-2 bg-gray-900 transform rotate-45';
    return arrow;
  }

  private attachTriggerListeners(): void {
    if (!this.props.trigger) return;

    this.props.trigger.addEventListener('mouseenter', () => this.scheduleShow());
    this.props.trigger.addEventListener('mouseleave', () => this.scheduleHide());
    this.props.trigger.addEventListener('focus', () => this.scheduleShow());
    this.props.trigger.addEventListener('blur', () => this.scheduleHide());

    // Add ARIA attributes to trigger
    const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
    if (this.tooltip) {
      this.tooltip.id = tooltipId;
    }
    this.props.trigger.setAttribute('aria-describedby', tooltipId);
  }

  private scheduleShow(): void {
    // Clear any pending hide
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    // Schedule show
    const delay = this.props.showDelay ?? 200;
    this.showTimer = window.setTimeout(() => {
      this.show();
    }, delay);
  }

  private scheduleHide(): void {
    // Clear any pending show
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }

    // Schedule hide
    const delay = this.props.hideDelay ?? 0;
    this.hideTimer = window.setTimeout(() => {
      this.hide();
    }, delay);
  }

  private show(): void {
    if (this.isVisible || !this.tooltip) return;

    this.isVisible = true;
    this.updatePosition();
    this.tooltip.style.opacity = '1';
    this.tooltip.style.pointerEvents = 'auto';
  }

  private hide(): void {
    if (!this.isVisible || !this.tooltip) return;

    this.isVisible = false;
    this.tooltip.style.opacity = '0';
    this.tooltip.style.pointerEvents = 'none';
  }

  private updatePosition(): void {
    if (!this.tooltip || !this.arrow || !this.props.trigger) return;

    const triggerRect = this.props.trigger.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const position = this.props.position || 'top';

    let finalPosition = position;

    // Check collision and flip if needed
    if (!this.props.disableFlip) {
      finalPosition = this.checkCollisionAndFlip(position, triggerRect, tooltipRect);
    }

    const coords = this.calculatePosition(finalPosition, triggerRect, tooltipRect);

    this.tooltip.style.top = `${coords.top}px`;
    this.tooltip.style.left = `${coords.left}px`;

    // Position arrow
    if (coords.arrowPosition.top !== undefined) this.arrow.style.top = `${coords.arrowPosition.top}px`;
    if (coords.arrowPosition.left !== undefined) this.arrow.style.left = `${coords.arrowPosition.left}px`;
    if (coords.arrowPosition.bottom !== undefined) this.arrow.style.bottom = `${coords.arrowPosition.bottom}px`;
    if (coords.arrowPosition.right !== undefined) this.arrow.style.right = `${coords.arrowPosition.right}px`;
  }

  private checkCollisionAndFlip(
    position: TooltipPosition,
    triggerRect: DOMRect,
    tooltipRect: DOMRect
  ): TooltipPosition {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const testCoords = this.calculatePosition(position, triggerRect, tooltipRect);

    // Check if tooltip would go offscreen
    const offscreenTop = testCoords.top < 0;
    const offscreenBottom = testCoords.top + tooltipRect.height > viewport.height;
    const offscreenLeft = testCoords.left < 0;
    const offscreenRight = testCoords.left + tooltipRect.width > viewport.width;

    // Flip vertical positions
    if (position.startsWith('top') && offscreenTop) {
      return position.replace('top', 'bottom') as TooltipPosition;
    }
    if (position.startsWith('bottom') && offscreenBottom) {
      return position.replace('bottom', 'top') as TooltipPosition;
    }

    // Flip horizontal positions
    if (position.startsWith('left') && offscreenLeft) {
      return position.replace('left', 'right') as TooltipPosition;
    }
    if (position.startsWith('right') && offscreenRight) {
      return position.replace('right', 'left') as TooltipPosition;
    }

    return position;
  }

  private calculatePosition(
    position: TooltipPosition,
    triggerRect: DOMRect,
    tooltipRect: DOMRect
  ): Position {
    const gap = 8; // Space between trigger and tooltip
    const arrowSize = 4; // Half of arrow width/height

    const positions: Record<TooltipPosition, Position> = {
      top: {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        arrowPosition: { bottom: -arrowSize, left: tooltipRect.width / 2 - arrowSize },
      },
      'top-start': {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.left,
        arrowPosition: { bottom: -arrowSize, left: triggerRect.width / 2 - arrowSize },
      },
      'top-end': {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.right - tooltipRect.width,
        arrowPosition: { bottom: -arrowSize, right: triggerRect.width / 2 - arrowSize },
      },
      bottom: {
        top: triggerRect.bottom + gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        arrowPosition: { top: -arrowSize, left: tooltipRect.width / 2 - arrowSize },
      },
      'bottom-start': {
        top: triggerRect.bottom + gap,
        left: triggerRect.left,
        arrowPosition: { top: -arrowSize, left: triggerRect.width / 2 - arrowSize },
      },
      'bottom-end': {
        top: triggerRect.bottom + gap,
        left: triggerRect.right - tooltipRect.width,
        arrowPosition: { top: -arrowSize, right: triggerRect.width / 2 - arrowSize },
      },
      left: {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.left - tooltipRect.width - gap,
        arrowPosition: { top: tooltipRect.height / 2 - arrowSize, right: -arrowSize },
      },
      'left-start': {
        top: triggerRect.top,
        left: triggerRect.left - tooltipRect.width - gap,
        arrowPosition: { top: triggerRect.height / 2 - arrowSize, right: -arrowSize },
      },
      'left-end': {
        top: triggerRect.bottom - tooltipRect.height,
        left: triggerRect.left - tooltipRect.width - gap,
        arrowPosition: { bottom: triggerRect.height / 2 - arrowSize, right: -arrowSize },
      },
      right: {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.right + gap,
        arrowPosition: { top: tooltipRect.height / 2 - arrowSize, left: -arrowSize },
      },
      'right-start': {
        top: triggerRect.top,
        left: triggerRect.right + gap,
        arrowPosition: { top: triggerRect.height / 2 - arrowSize, left: -arrowSize },
      },
      'right-end': {
        top: triggerRect.bottom - tooltipRect.height,
        left: triggerRect.right + gap,
        arrowPosition: { bottom: triggerRect.height / 2 - arrowSize, left: -arrowSize },
      },
    };

    return positions[position];
  }

  public destroy(): void {
    // Clear timers
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);

    // Remove tooltip from DOM
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }

    this.arrow = null;
  }
}

export function createTooltip(props: TooltipProps): Tooltip {
  return new Tooltip(props);
}
