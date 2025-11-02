/**
 * Button Component
 * Framework-agnostic button with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - Keyboard navigation (Enter, Space)
 * - Focus management
 * - Loading states
 * - Icon support
 * - All standard button variants
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { buttonVariants, type ButtonVariants } from '../../core/component-variants';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';

export interface ButtonProps extends BaseComponentProps, ButtonVariants {
  /**
   * Button type (button, submit, reset)
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Button click handler
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Icon element (start position)
   */
  iconStart?: HTMLElement | string;

  /**
   * Icon element (end position)
   */
  iconEnd?: HTMLElement | string;

  /**
   * Button text content
   */
  children?: string | HTMLElement;

  /**
   * Href for link-style buttons
   */
  href?: string;

  /**
   * Target for link buttons
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
}

/**
 * Button Component Class
 * Framework-agnostic implementation
 */
export class Button extends BaseComponent<ButtonProps> {
  private element: HTMLButtonElement | HTMLAnchorElement | null = null;

  constructor(props: ButtonProps) {
    const variantClasses = buttonVariants({
      variant: props.variant,
      size: props.size,
      fullWidth: props.fullWidth,
    });

    super(props, {
      base: variantClasses,
      disabled: 'opacity-50 cursor-not-allowed',
    });
  }

  /**
   * Create the button element
   */
  public createElement(): HTMLButtonElement | HTMLAnchorElement {
    // Use anchor tag if href is provided
    if (this.props.href) {
      this.element = this.createLinkButton();
    } else {
      this.element = this.createStandardButton();
    }

    this.attachEventListeners();
    return this.element;
  }

  /**
   * Create standard button element
   */
  private createStandardButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = this.props.type || 'button';
    button.className = this.getClassNames();
    button.id = this.id;
    button.disabled = Boolean(this.props.disabled || this.props.loading);

    // ARIA attributes
    if (this.props.ariaLabel) {
      button.setAttribute('aria-label', this.props.ariaLabel);
    }
    if (this.props.loading) {
      button.setAttribute('aria-busy', 'true');
    }

    // Data attributes
    if (this.props.dataTestId) {
      button.setAttribute('data-testid', this.props.dataTestId);
    }

    // Add content
    this.setContent(button);

    return button;
  }

  /**
   * Create link-style button (anchor tag)
   */
  private createLinkButton(): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = this.props.href || '#';
    link.className = this.getClassNames();
    link.id = this.id;
    link.role = ARIA_ROLES.button;

    if (this.props.target) {
      link.target = this.props.target;
      // Security best practice for target="_blank"
      if (this.props.target === '_blank') {
        link.rel = 'noopener noreferrer';
      }
    }

    if (this.props.disabled || this.props.loading) {
      link.setAttribute('aria-disabled', 'true');
      link.style.pointerEvents = 'none';
    }

    // ARIA attributes
    if (this.props.ariaLabel) {
      link.setAttribute('aria-label', this.props.ariaLabel);
    }

    // Add content
    this.setContent(link);

    return link;
  }

  /**
   * Set button content (icons + text)
   */
  private setContent(element: HTMLElement): void {
    // Clear existing content
    element.innerHTML = '';

    // Loading spinner
    if (this.props.loading) {
      const spinner = this.createSpinner();
      element.appendChild(spinner);
    }

    // Start icon
    if (this.props.iconStart && !this.props.loading) {
      const iconWrapper = this.createIconWrapper(this.props.iconStart);
      iconWrapper.classList.add('mr-2');
      element.appendChild(iconWrapper);
    }

    // Text content
    if (this.props.children) {
      const textNode = typeof this.props.children === 'string'
        ? document.createTextNode(this.props.children)
        : this.props.children;
      element.appendChild(textNode);
    }

    // End icon
    if (this.props.iconEnd && !this.props.loading) {
      const iconWrapper = this.createIconWrapper(this.props.iconEnd);
      iconWrapper.classList.add('ml-2');
      element.appendChild(iconWrapper);
    }
  }

  /**
   * Create icon wrapper element
   */
  private createIconWrapper(icon: HTMLElement | string): HTMLElement {
    const wrapper = document.createElement('span');
    wrapper.className = 'inline-flex items-center';

    if (typeof icon === 'string') {
      wrapper.innerHTML = icon;
    } else {
      wrapper.appendChild(icon);
    }

    return wrapper;
  }

  /**
   * Create loading spinner
   */
  private createSpinner(): HTMLElement {
    const spinner = document.createElement('span');
    spinner.className = 'inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent';
    spinner.setAttribute('aria-hidden', 'true');
    return spinner;
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    if (!this.element) return;

    // Click handler
    if (this.props.onClick) {
      this.element.addEventListener('click', (event) => {
        if (this.props.disabled || this.props.loading) {
          event.preventDefault();
          return;
        }
        this.props.onClick?.(event);
      });
    }

    // Keyboard handler for link buttons (Space key should activate)
    if (this.element instanceof HTMLAnchorElement) {
      this.element.addEventListener('keydown', (event) => {
        if (event.key === KEYS.SPACE) {
          event.preventDefault();
          this.element?.click();
        }
      });
    }
  }

  /**
   * Update button state
   */
  public setLoading(loading: boolean): void {
    this.props.loading = loading;
    if (this.element) {
      if (loading) {
        this.element.setAttribute('aria-busy', 'true');
        if (this.element instanceof HTMLButtonElement) {
          this.element.disabled = true;
        } else {
          this.element.setAttribute('aria-disabled', 'true');
          this.element.style.pointerEvents = 'none';
        }
      } else {
        this.element.removeAttribute('aria-busy');
        if (this.element instanceof HTMLButtonElement) {
          this.element.disabled = Boolean(this.props.disabled);
        } else {
          if (!this.props.disabled) {
            this.element.removeAttribute('aria-disabled');
            this.element.style.pointerEvents = '';
          }
        }
      }
      this.setContent(this.element);
    }
  }

  /**
   * Set disabled state
   */
  public setDisabled(disabled: boolean): void {
    this.props.disabled = disabled;
    if (this.element) {
      if (this.element instanceof HTMLButtonElement) {
        this.element.disabled = disabled;
      } else {
        if (disabled) {
          this.element.setAttribute('aria-disabled', 'true');
          this.element.style.pointerEvents = 'none';
        } else {
          this.element.removeAttribute('aria-disabled');
          this.element.style.pointerEvents = '';
        }
      }
    }
  }

  /**
   * Focus the button
   */
  public focus(): void {
    this.element?.focus();
  }

  /**
   * Blur the button
   */
  public blur(): void {
    this.element?.blur();
  }

  /**
   * Destroy button and cleanup
   */
  public destroy(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Factory function for creating buttons
 */
export function createButton(props: ButtonProps): Button {
  return new Button(props);
}
