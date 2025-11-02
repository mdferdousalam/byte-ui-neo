/**
 * Card Component
 * Framework-agnostic card container with variants
 *
 * Features:
 * - Multiple variants (elevated, outline, glass, flat)
 * - Padding options
 * - Interactive state (clickable)
 * - Keyboard navigation for interactive cards
 * - Focus management
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { cardVariants, type CardVariants } from '../../core/component-variants';
import { KEYS } from '../../core/accessibility';

export interface CardProps extends BaseComponentProps, CardVariants {
  /**
   * Card content (HTML element or string)
   */
  children?: HTMLElement | string;

  /**
   * Click handler (for interactive cards)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Href for link-style cards
   */
  href?: string;

  /**
   * Target for link cards
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * As prop for polymorphic component
   */
  as?: 'div' | 'article' | 'section' | 'aside';
}

/**
 * Card Component Class
 * Framework-agnostic implementation
 */
export class Card extends BaseComponent<CardProps> {
  private element: HTMLDivElement | HTMLAnchorElement | null = null;

  constructor(props: CardProps) {
    const variantClasses = cardVariants({
      variant: props.variant,
      padding: props.padding,
      interactive: props.interactive || Boolean(props.onClick || props.href),
    });

    super(props, {
      base: variantClasses,
      disabled: 'opacity-50 cursor-not-allowed',
    });
  }

  /**
   * Create the card element
   */
  public createElement(): HTMLDivElement | HTMLAnchorElement {
    // Use anchor tag if href is provided
    if (this.props.href) {
      this.element = this.createLinkCard();
    } else {
      this.element = this.createStandardCard();
    }

    // Add content
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        this.element.innerHTML = this.props.children;
      } else {
        this.element.appendChild(this.props.children);
      }
    }

    this.attachEventListeners();
    return this.element;
  }

  /**
   * Create standard card element
   */
  private createStandardCard(): HTMLDivElement {
    const tagName = this.props.as || 'div';
    const card = document.createElement(tagName) as HTMLDivElement;
    card.className = this.getClassNames();
    card.id = this.id;

    // Make interactive cards focusable
    if (this.props.interactive || this.props.onClick) {
      card.tabIndex = this.props.disabled ? -1 : 0;
      card.setAttribute('role', 'button');
    }

    // ARIA attributes
    if (this.props.ariaLabel) {
      card.setAttribute('aria-label', this.props.ariaLabel);
    }

    if (this.props.disabled) {
      card.setAttribute('aria-disabled', 'true');
    }

    // Data attributes
    if (this.props.dataTestId) {
      card.setAttribute('data-testid', this.props.dataTestId);
    }

    return card;
  }

  /**
   * Create link-style card (anchor tag)
   */
  private createLinkCard(): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = this.props.href || '#';
    link.className = this.getClassNames();
    link.id = this.id;

    if (this.props.target) {
      link.target = this.props.target;
      // Security best practice for target="_blank"
      if (this.props.target === '_blank') {
        link.rel = 'noopener noreferrer';
      }
    }

    if (this.props.disabled) {
      link.setAttribute('aria-disabled', 'true');
      link.style.pointerEvents = 'none';
    }

    // ARIA attributes
    if (this.props.ariaLabel) {
      link.setAttribute('aria-label', this.props.ariaLabel);
    }

    return link;
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    if (!this.element) return;

    // Click handler
    if (this.props.onClick) {
      this.element.addEventListener('click', (event) => {
        if (this.props.disabled) {
          event.preventDefault();
          return;
        }
        this.props.onClick?.(event);
      });
    }

    // Keyboard handler for interactive cards (Enter and Space)
    if ((this.props.interactive || this.props.onClick) && !(this.element instanceof HTMLAnchorElement)) {
      this.element.addEventListener('keydown', (event) => {
        if (this.props.disabled) return;

        if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
          event.preventDefault();
          this.element?.click();
        }
      });
    }
  }

  /**
   * Set card content
   */
  public setContent(content: HTMLElement | string): void {
    if (!this.element) return;

    if (typeof content === 'string') {
      this.element.innerHTML = content;
    } else {
      this.element.innerHTML = '';
      this.element.appendChild(content);
    }

    this.props.children = content;
  }

  /**
   * Set disabled state
   */
  public setDisabled(disabled: boolean): void {
    this.props.disabled = disabled;
    if (this.element) {
      if (disabled) {
        this.element.setAttribute('aria-disabled', 'true');
        if (this.element instanceof HTMLAnchorElement) {
          this.element.style.pointerEvents = 'none';
        } else if (this.props.interactive || this.props.onClick) {
          this.element.tabIndex = -1;
        }
      } else {
        this.element.removeAttribute('aria-disabled');
        if (this.element instanceof HTMLAnchorElement) {
          this.element.style.pointerEvents = '';
        } else if (this.props.interactive || this.props.onClick) {
          this.element.tabIndex = 0;
        }
      }
    }
  }

  /**
   * Focus the card
   */
  public focus(): void {
    this.element?.focus();
  }

  /**
   * Blur the card
   */
  public blur(): void {
    this.element?.blur();
  }

  /**
   * Destroy card and cleanup
   */
  public destroy(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Factory function for creating cards
 */
export function createCard(props: CardProps): Card {
  return new Card(props);
}
