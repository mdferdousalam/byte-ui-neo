/**
 * Base Component Class
 * Framework-agnostic foundation for all HikmaUI components
 *
 * Philosophy:
 * - Pure TypeScript/JavaScript (no framework dependencies)
 * - Accessibility-first (WCAG AA compliance)
 * - Styling via HikmaUI utilities
 * - Event handling abstraction for framework adapters
 */

import { cn } from '@hikmaui/core';

export interface BaseComponentProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Component ID (auto-generated if not provided)
   */
  id?: string;

  /**
   * Whether component is disabled
   */
  disabled?: boolean;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * ARIA described by (for error messages, hints)
   */
  ariaDescribedBy?: string;

  /**
   * Data test ID for testing
   */
  dataTestId?: string;
}

export interface ComponentStyles {
  /**
   * Base styles applied to all variants
   */
  base: string;

  /**
   * Styles for disabled state
   */
  disabled?: string;

  /**
   * Styles for focus state
   */
  focus?: string;

  /**
   * Styles for hover state
   */
  hover?: string;

  /**
   * Styles for active/pressed state
   */
  active?: string;
}

/**
 * Base component class that all HikmaUI components extend
 * Provides common functionality for accessibility, styling, and state management
 */
export abstract class BaseComponent<TProps extends BaseComponentProps = BaseComponentProps> {
  protected props: TProps;
  protected id: string;
  protected styles: ComponentStyles;

  constructor(props: TProps, styles: ComponentStyles) {
    this.props = props;
    this.styles = styles;
    this.id = props.id || this.generateId();
  }

  /**
   * Generate unique ID for component
   */
  protected generateId(): string {
    const prefix = this.constructor.name.toLowerCase();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}-${random}`;
  }

  /**
   * Get computed class names for component
   */
  protected getClassNames(): string {
    const classes: string[] = [this.styles.base];

    if (this.props.disabled && this.styles.disabled) {
      classes.push(this.styles.disabled);
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    return cn(...classes);
  }

  /**
   * Get ARIA attributes for accessibility
   */
  protected getAriaAttributes(): Record<string, string | undefined> {
    return {
      'aria-label': this.props.ariaLabel,
      'aria-describedby': this.props.ariaDescribedBy,
      'aria-disabled': this.props.disabled ? 'true' : undefined,
    };
  }

  /**
   * Get data attributes (for testing, etc.)
   */
  protected getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-testid': this.props.dataTestId,
      'data-disabled': this.props.disabled ? 'true' : undefined,
    };
  }

  /**
   * Get all HTML attributes for component
   */
  public getAttributes(): Record<string, any> {
    return {
      id: this.id,
      className: this.getClassNames(),
      disabled: this.props.disabled,
      ...this.getAriaAttributes(),
      ...this.getDataAttributes(),
    };
  }

  /**
   * Update component props
   */
  public updateProps(props: Partial<TProps>): void {
    this.props = { ...this.props, ...props };
  }

  /**
   * Get current props
   */
  public getProps(): TProps {
    return { ...this.props };
  }

  /**
   * Get component ID
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Check if component is disabled
   */
  public isDisabled(): boolean {
    return Boolean(this.props.disabled);
  }
}
