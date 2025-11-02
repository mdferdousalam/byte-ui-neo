/**
 * Badge Component
 * Framework-agnostic badge for status indicators and labels
 *
 * Features:
 * - Multiple variants (solid, outline, dot)
 * - Color options (blue, green, red, yellow, gray)
 * - Size options (sm, md, lg)
 * - Accessible labels
 * - Dismissible option
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { badgeVariants, type BadgeVariants } from '../../core/component-variants';

export interface BadgeProps extends BaseComponentProps, BadgeVariants {
  /**
   * Badge content (text or HTML)
   */
  children?: string | HTMLElement;

  /**
   * Whether badge is dismissible
   */
  dismissible?: boolean;

  /**
   * Dismiss handler
   */
  onDismiss?: () => void;

  /**
   * Icon element (optional)
   */
  icon?: HTMLElement | string;
}

/**
 * Badge Component Class
 * Framework-agnostic implementation
 */
export class Badge extends BaseComponent<BadgeProps> {
  private element: HTMLSpanElement | null = null;

  constructor(props: BadgeProps) {
    const variantClasses = badgeVariants({
      variant: props.variant,
      color: props.color,
      size: props.size,
    });

    super(props, {
      base: variantClasses,
    });
  }

  /**
   * Create the badge element
   */
  public createElement(): HTMLSpanElement {
    this.element = document.createElement('span');
    this.element.className = this.getClassNames();
    this.element.id = this.id;

    // ARIA attributes
    if (this.props.ariaLabel) {
      this.element.setAttribute('aria-label', this.props.ariaLabel);
    }

    // Data attributes
    if (this.props.dataTestId) {
      this.element.setAttribute('data-testid', this.props.dataTestId);
    }

    // Add content
    this.setContent();

    return this.element;
  }

  /**
   * Set badge content
   */
  private setContent(): void {
    if (!this.element) return;

    this.element.innerHTML = '';

    // Dot variant (for "dot" badges)
    if (this.props.variant === 'dot') {
      const dot = document.createElement('span');
      dot.className = `inline-block h-2 w-2 rounded-full ${this.getDotColor()}`;
      dot.setAttribute('aria-hidden', 'true');
      this.element.appendChild(dot);
    }

    // Icon
    if (this.props.icon) {
      const iconWrapper = this.createIconWrapper(this.props.icon);
      this.element.appendChild(iconWrapper);
    }

    // Text content
    if (this.props.children) {
      const textNode = typeof this.props.children === 'string'
        ? document.createTextNode(this.props.children)
        : this.props.children;
      this.element.appendChild(textNode);
    }

    // Dismiss button
    if (this.props.dismissible) {
      const dismissButton = this.createDismissButton();
      this.element.appendChild(dismissButton);
    }
  }

  /**
   * Get dot color based on badge color
   */
  private getDotColor(): string {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-500',
      gray: 'bg-gray-600',
    };

    return colorMap[this.props.color || 'blue'] || 'bg-blue-600';
  }

  /**
   * Create icon wrapper
   */
  private createIconWrapper(icon: HTMLElement | string): HTMLElement {
    const wrapper = document.createElement('span');
    wrapper.className = 'inline-flex items-center mr-1';

    if (typeof icon === 'string') {
      wrapper.innerHTML = icon;
    } else {
      wrapper.appendChild(icon);
    }

    return wrapper;
  }

  /**
   * Create dismiss button
   */
  private createDismissButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'inline-flex items-center justify-center ml-1 h-4 w-4 rounded-full hover:bg-black/10 transition-colors';
    button.setAttribute('aria-label', 'Dismiss');

    // X icon
    button.innerHTML = `
      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;

    // Click handler
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dismiss();
    });

    return button;
  }

  /**
   * Dismiss the badge
   */
  public dismiss(): void {
    if (this.element) {
      // Add fade-out animation
      this.element.style.transition = 'opacity 200ms, transform 200ms';
      this.element.style.opacity = '0';
      this.element.style.transform = 'scale(0.9)';

      // Remove after animation
      setTimeout(() => {
        this.element?.remove();
        this.props.onDismiss?.();
      }, 200);
    }
  }

  /**
   * Update badge content
   */
  public updateContent(content: string | HTMLElement): void {
    this.props.children = content;
    this.setContent();
  }

  /**
   * Destroy badge and cleanup
   */
  public destroy(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Factory function for creating badges
 */
export function createBadge(props: BadgeProps): Badge {
  return new Badge(props);
}
