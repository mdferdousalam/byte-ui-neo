/**
 * Radio Component
 * Framework-agnostic radio button with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - Radio groups with automatic management
 * - Error/validation states
 * - Keyboard navigation (Arrow keys, Space)
 * - Label support with positioning
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface RadioProps extends BaseComponentProps {
  /**
   * Radio name attribute (groups radios with same name)
   */
  name: string;

  /**
   * Radio value
   */
  value: string;

  /**
   * Whether radio is checked
   */
  checked?: boolean;

  /**
   * Default checked state
   */
  defaultChecked?: boolean;

  /**
   * Whether radio is required
   */
  required?: boolean;

  /**
   * Change handler
   */
  onChange?: (event: Event, value: string) => void;

  /**
   * Label text
   */
  label?: string;

  /**
   * Label position
   */
  labelPosition?: 'start' | 'end';

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Error message
   */
  errorMessage?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Radio Component Class
 * Framework-agnostic implementation
 */
export class Radio extends BaseComponent<RadioProps> {
  private container: HTMLDivElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private radioWrapper: HTMLLabelElement | null = null;
  private checked: boolean;

  constructor(props: RadioProps) {
    super(props, {
      base: 'hikma-radio',
    });

    this.checked = props.checked ?? props.defaultChecked ?? false;
  }

  /**
   * Create the radio element and container
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-radio-container';

    // Radio wrapper (label + input)
    this.radioWrapper = document.createElement('label');
    this.radioWrapper.className = this.getWrapperClasses();

    // Input element
    this.inputElement = this.createInput();

    // Custom radio visual
    const radioVisual = this.createRadioVisual();

    // Label position
    if (this.props.labelPosition === 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.radioWrapper.appendChild(labelText);
    }

    this.radioWrapper.appendChild(this.inputElement);
    this.radioWrapper.appendChild(radioVisual);

    if (this.props.labelPosition !== 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.radioWrapper.appendChild(labelText);
    }

    this.container.appendChild(this.radioWrapper);

    // Helper text or error message
    if (this.props.helperText || this.props.errorMessage) {
      const helper = this.createHelperText();
      this.container.appendChild(helper);
    }

    return this.container;
  }

  /**
   * Get wrapper classes
   */
  private getWrapperClasses(): string {
    return cn(
      'inline-flex items-center gap-2 cursor-pointer select-none',
      this.props.disabled && 'opacity-50 cursor-not-allowed'
    );
  }

  /**
   * Get radio size classes
   */
  private getSizeClasses(): string {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    return sizes[this.props.size || 'md'];
  }

  /**
   * Create input element
   */
  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = this.id;
    input.name = this.props.name;
    input.value = this.props.value;
    input.className = 'sr-only peer'; // Screen reader only, peer for sibling styling
    input.checked = this.checked;

    if (this.props.required) input.required = true;
    if (this.props.disabled) input.disabled = true;

    // ARIA attributes
    input.setAttribute('role', ARIA_ROLES.radio);
    if (this.props.ariaLabel) {
      input.setAttribute('aria-label', this.props.ariaLabel);
    }
    if (this.props.errorMessage) {
      input.setAttribute('aria-invalid', 'true');
    }

    // Event listeners
    input.addEventListener('change', (event) => {
      this.checked = input.checked;
      this.props.onChange?.(event, this.props.value);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    return input;
  }

  /**
   * Create radio visual element
   */
  private createRadioVisual(): HTMLSpanElement {
    const visual = document.createElement('span');
    visual.className = cn(
      'flex items-center justify-center rounded-full border-2 transition-all',
      this.getSizeClasses(),
      // Default state
      'border-gray-300 bg-white',
      // Checked state (peer-checked)
      'peer-checked:border-blue-600 peer-checked:bg-blue-600',
      // Focus state
      'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2',
      // Hover state
      'peer-hover:border-blue-500',
      // Disabled state
      this.props.disabled && 'bg-gray-100',
      // Error state
      this.props.errorMessage && 'border-red-500 peer-checked:border-red-600 peer-checked:bg-red-600'
    );

    // Inner dot (shown when checked)
    const dot = document.createElement('span');
    dot.className = 'hidden peer-checked:block rounded-full bg-white';

    // Size the dot based on radio size
    const dotSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };
    dot.className += ` ${dotSizes[this.props.size || 'md']}`;

    visual.appendChild(dot);

    return visual;
  }

  /**
   * Create label text element
   */
  private createLabelText(): HTMLSpanElement {
    const label = document.createElement('span');
    label.className = 'text-sm font-medium text-gray-700';
    label.textContent = this.props.label || '';

    if (this.props.required) {
      const asterisk = document.createElement('span');
      asterisk.className = 'text-red-500 ml-1';
      asterisk.textContent = '*';
      asterisk.setAttribute('aria-label', 'required');
      label.appendChild(asterisk);
    }

    return label;
  }

  /**
   * Create helper text element
   */
  private createHelperText(): HTMLParagraphElement {
    const helper = document.createElement('p');
    helper.className = this.props.errorMessage
      ? 'mt-1 text-sm text-red-600'
      : 'mt-1 text-sm text-gray-500';
    helper.textContent = this.props.errorMessage || this.props.helperText || '';

    if (this.props.errorMessage) {
      helper.setAttribute('role', 'alert');
    }

    return helper;
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    // Arrow key navigation within radio group
    if ([KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT].includes(key)) {
      event.preventDefault();
      this.navigateRadioGroup(key);
    }
  }

  /**
   * Navigate to next/previous radio in group
   */
  private navigateRadioGroup(key: string): void {
    if (!this.inputElement) return;

    const radios = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        `input[type="radio"][name="${this.props.name}"]`
      )
    );

    const currentIndex = radios.indexOf(this.inputElement);
    if (currentIndex === -1) return;

    let nextIndex: number;

    if (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT) {
      nextIndex = currentIndex === 0 ? radios.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === radios.length - 1 ? 0 : currentIndex + 1;
    }

    const nextRadio = radios[nextIndex];
    if (nextRadio && !nextRadio.disabled) {
      nextRadio.focus();
      nextRadio.checked = true;
      nextRadio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  /**
   * Get checked state
   */
  public isChecked(): boolean {
    return this.checked;
  }

  /**
   * Set checked state
   */
  public setChecked(checked: boolean): void {
    this.checked = checked;
    if (this.inputElement) {
      this.inputElement.checked = checked;
    }
  }

  /**
   * Get value
   */
  public getValue(): string {
    return this.props.value;
  }

  /**
   * Focus the radio
   */
  public focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Destroy radio and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.inputElement = null;
      this.radioWrapper = null;
    }
  }
}

/**
 * Factory function for creating radios
 */
export function createRadio(props: RadioProps): Radio {
  return new Radio(props);
}
