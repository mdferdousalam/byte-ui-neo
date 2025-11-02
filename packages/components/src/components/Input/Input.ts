/**
 * Input Component
 * Framework-agnostic input with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - All HTML5 input types
 * - Icon support (start/end)
 * - Validation states (error, success)
 * - Helper text and error messages
 * - Focus management
 * - Disabled and readonly states
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { inputVariants, type InputVariants } from '../../core/component-variants';
import { generateAriaId } from '../../core/accessibility';

export interface InputProps extends BaseComponentProps, InputVariants {
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'time' | 'datetime-local';

  /**
   * Input name attribute
   */
  name?: string;

  /**
   * Input value
   */
  value?: string | number;

  /**
   * Default value
   */
  defaultValue?: string | number;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether input is required
   */
  required?: boolean;

  /**
   * Whether input is readonly
   */
  readonly?: boolean;

  /**
   * Min value (for number/date inputs)
   */
  min?: string | number;

  /**
   * Max value (for number/date inputs)
   */
  max?: string | number;

  /**
   * Step value (for number inputs)
   */
  step?: string | number;

  /**
   * Max length
   */
  maxLength?: number;

  /**
   * Pattern for validation
   */
  pattern?: string;

  /**
   * Autocomplete attribute
   */
  autocomplete?: string;

  /**
   * Input change handler
   */
  onChange?: (event: Event, value: string) => void;

  /**
   * Input focus handler
   */
  onFocus?: (event: FocusEvent) => void;

  /**
   * Input blur handler
   */
  onBlur?: (event: FocusEvent) => void;

  /**
   * Icon element (start position)
   */
  iconStart?: HTMLElement | string;

  /**
   * Icon element (end position)
   */
  iconEnd?: HTMLElement | string;

  /**
   * Helper text below input
   */
  helperText?: string;

  /**
   * Error message (overrides helperText when present)
   */
  errorMessage?: string;

  /**
   * Label text
   */
  label?: string;
}

/**
 * Input Component Class
 * Framework-agnostic implementation
 */
export class Input extends BaseComponent<InputProps> {
  private container: HTMLDivElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private labelElement: HTMLLabelElement | null = null;
  private helperElement: HTMLParagraphElement | null = null;
  private helperTextId: string;
  private labelId: string;

  constructor(props: InputProps) {
    const variantClasses = inputVariants({
      variant: props.errorMessage ? 'error' : props.variant,
      size: props.size,
    });

    super(props, {
      base: variantClasses,
      disabled: 'opacity-50 cursor-not-allowed',
    });

    this.helperTextId = generateAriaId('input-helper');
    this.labelId = generateAriaId('input-label');
  }

  /**
   * Create the input element and container
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-input-container w-full';

    // Label
    if (this.props.label) {
      this.labelElement = this.createLabel();
      this.container.appendChild(this.labelElement);
    }

    // Input wrapper (for icons)
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'hikma-input-wrapper relative flex items-center';

    // Start icon
    if (this.props.iconStart) {
      const iconStart = this.createIcon(this.props.iconStart, 'start');
      inputWrapper.appendChild(iconStart);
    }

    // Input element
    this.inputElement = this.createInput();
    inputWrapper.appendChild(this.inputElement);

    // End icon
    if (this.props.iconEnd) {
      const iconEnd = this.createIcon(this.props.iconEnd, 'end');
      inputWrapper.appendChild(iconEnd);
    }

    this.container.appendChild(inputWrapper);

    // Helper text or error message
    if (this.props.helperText || this.props.errorMessage) {
      this.helperElement = this.createHelperText();
      this.container.appendChild(this.helperElement);
    }

    return this.container;
  }

  /**
   * Create label element
   */
  private createLabel(): HTMLLabelElement {
    const label = document.createElement('label');
    label.id = this.labelId;
    label.htmlFor = this.id;
    label.className = 'block text-sm font-medium text-gray-700 mb-1';
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
   * Create input element
   */
  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = this.props.type || 'text';
    input.id = this.id;
    input.name = this.props.name || this.id;
    input.className = this.getInputClasses();

    // Value
    if (this.props.value !== undefined) {
      input.value = String(this.props.value);
    } else if (this.props.defaultValue !== undefined) {
      input.defaultValue = String(this.props.defaultValue);
    }

    // Attributes
    if (this.props.placeholder) input.placeholder = this.props.placeholder;
    if (this.props.required) input.required = true;
    if (this.props.disabled) input.disabled = true;
    if (this.props.readonly) input.readOnly = true;
    if (this.props.min !== undefined) input.min = String(this.props.min);
    if (this.props.max !== undefined) input.max = String(this.props.max);
    if (this.props.step !== undefined) input.step = String(this.props.step);
    if (this.props.maxLength) input.maxLength = this.props.maxLength;
    if (this.props.pattern) input.pattern = this.props.pattern;
    if (this.props.autocomplete) input.autocomplete = this.props.autocomplete;

    // ARIA attributes
    if (this.props.ariaLabel) {
      input.setAttribute('aria-label', this.props.ariaLabel);
    } else if (this.props.label) {
      input.setAttribute('aria-labelledby', this.labelId);
    }

    if (this.props.helperText || this.props.errorMessage) {
      input.setAttribute('aria-describedby', this.helperTextId);
    }

    if (this.props.errorMessage) {
      input.setAttribute('aria-invalid', 'true');
    }

    if (this.props.required) {
      input.setAttribute('aria-required', 'true');
    }

    // Data attributes
    if (this.props.dataTestId) {
      input.setAttribute('data-testid', this.props.dataTestId);
    }

    // Event listeners
    this.attachInputEventListeners(input);

    return input;
  }

  /**
   * Get input class names with icon padding
   */
  private getInputClasses(): string {
    const classes = [this.getClassNames()];

    if (this.props.iconStart) {
      classes.push('pl-10');
    }

    if (this.props.iconEnd) {
      classes.push('pr-10');
    }

    return classes.join(' ');
  }

  /**
   * Create icon element
   */
  private createIcon(icon: HTMLElement | string, position: 'start' | 'end'): HTMLElement {
    const wrapper = document.createElement('span');
    wrapper.className = `absolute ${position === 'start' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`;
    wrapper.setAttribute('aria-hidden', 'true');

    if (typeof icon === 'string') {
      wrapper.innerHTML = icon;
    } else {
      wrapper.appendChild(icon);
    }

    return wrapper;
  }

  /**
   * Create helper text element
   */
  private createHelperText(): HTMLParagraphElement {
    const helper = document.createElement('p');
    helper.id = this.helperTextId;
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
   * Attach event listeners to input
   */
  private attachInputEventListeners(input: HTMLInputElement): void {
    if (this.props.onChange) {
      input.addEventListener('input', (event) => {
        this.props.onChange?.(event, input.value);
      });
    }

    if (this.props.onFocus) {
      input.addEventListener('focus', (event) => {
        this.props.onFocus?.(event);
      });
    }

    if (this.props.onBlur) {
      input.addEventListener('blur', (event) => {
        this.props.onBlur?.(event);
      });
    }
  }

  /**
   * Get current input value
   */
  public getValue(): string {
    return this.inputElement?.value || '';
  }

  /**
   * Set input value
   */
  public setValue(value: string | number): void {
    if (this.inputElement) {
      this.inputElement.value = String(value);
    }
  }

  /**
   * Set error message
   */
  public setError(message: string): void {
    this.props.errorMessage = message;
    this.props.variant = 'error';

    if (this.inputElement) {
      this.inputElement.setAttribute('aria-invalid', 'true');
      this.inputElement.className = this.getInputClasses();
    }

    if (this.helperElement) {
      this.helperElement.textContent = message;
      this.helperElement.className = 'mt-1 text-sm text-red-600';
      this.helperElement.setAttribute('role', 'alert');
    } else {
      this.helperElement = this.createHelperText();
      this.container?.appendChild(this.helperElement);
    }
  }

  /**
   * Clear error
   */
  public clearError(): void {
    this.props.errorMessage = undefined;
    this.props.variant = 'default';

    if (this.inputElement) {
      this.inputElement.removeAttribute('aria-invalid');
      this.inputElement.className = this.getInputClasses();
    }

    if (this.helperElement) {
      if (this.props.helperText) {
        this.helperElement.textContent = this.props.helperText;
        this.helperElement.className = 'mt-1 text-sm text-gray-500';
        this.helperElement.removeAttribute('role');
      } else {
        this.helperElement.remove();
        this.helperElement = null;
      }
    }
  }

  /**
   * Focus the input
   */
  public focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Blur the input
   */
  public blur(): void {
    this.inputElement?.blur();
  }

  /**
   * Select input text
   */
  public select(): void {
    this.inputElement?.select();
  }

  /**
   * Set disabled state
   */
  public setDisabled(disabled: boolean): void {
    this.props.disabled = disabled;
    if (this.inputElement) {
      this.inputElement.disabled = disabled;
    }
  }

  /**
   * Destroy input and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.inputElement = null;
      this.labelElement = null;
      this.helperElement = null;
    }
  }
}

/**
 * Factory function for creating inputs
 */
export function createInput(props: InputProps): Input {
  return new Input(props);
}
