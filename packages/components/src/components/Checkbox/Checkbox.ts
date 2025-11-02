/**
 * Checkbox Component
 * Framework-agnostic checkbox with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - Indeterminate state support
 * - Group management
 * - Error/validation states
 * - Keyboard navigation (Space to toggle)
 * - Label support with positioning
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface CheckboxProps extends BaseComponentProps {
  /**
   * Checkbox name attribute
   */
  name?: string;

  /**
   * Checkbox value
   */
  value?: string;

  /**
   * Whether checkbox is checked
   */
  checked?: boolean;

  /**
   * Default checked state
   */
  defaultChecked?: boolean;

  /**
   * Indeterminate state (for "select all" checkboxes)
   */
  indeterminate?: boolean;

  /**
   * Whether checkbox is required
   */
  required?: boolean;

  /**
   * Change handler
   */
  onChange?: (event: Event, checked: boolean) => void;

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
 * Checkbox Component Class
 * Framework-agnostic implementation
 */
export class Checkbox extends BaseComponent<CheckboxProps> {
  private container: HTMLDivElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private checkboxWrapper: HTMLLabelElement | null = null;
  private checked: boolean;
  private indeterminate: boolean;

  constructor(props: CheckboxProps) {
    super(props, {
      base: 'hikma-checkbox',
    });

    this.checked = props.checked ?? props.defaultChecked ?? false;
    this.indeterminate = props.indeterminate ?? false;
  }

  /**
   * Create the checkbox element and container
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-checkbox-container';

    // Checkbox wrapper (label + input)
    this.checkboxWrapper = document.createElement('label');
    this.checkboxWrapper.className = this.getWrapperClasses();

    // Input element
    this.inputElement = this.createInput();

    // Custom checkbox visual
    const checkboxVisual = this.createCheckboxVisual();

    // Label position
    if (this.props.labelPosition === 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.checkboxWrapper.appendChild(labelText);
    }

    this.checkboxWrapper.appendChild(this.inputElement);
    this.checkboxWrapper.appendChild(checkboxVisual);

    if (this.props.labelPosition !== 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.checkboxWrapper.appendChild(labelText);
    }

    this.container.appendChild(this.checkboxWrapper);

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
   * Get checkbox size classes
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
    input.type = 'checkbox';
    input.id = this.id;
    input.name = this.props.name || this.id;
    input.className = 'sr-only peer'; // Screen reader only, peer for sibling styling
    input.checked = this.checked;
    input.indeterminate = this.indeterminate;

    if (this.props.value) input.value = this.props.value;
    if (this.props.required) input.required = true;
    if (this.props.disabled) input.disabled = true;

    // ARIA attributes
    input.setAttribute('role', ARIA_ROLES.checkbox);
    if (this.props.ariaLabel) {
      input.setAttribute('aria-label', this.props.ariaLabel);
    }
    if (this.props.errorMessage) {
      input.setAttribute('aria-invalid', 'true');
    }

    // Event listeners
    input.addEventListener('change', (event) => {
      this.checked = input.checked;
      this.indeterminate = false;
      this.updateVisual();
      this.props.onChange?.(event, this.checked);
    });

    return input;
  }

  /**
   * Create checkbox visual element
   */
  private createCheckboxVisual(): HTMLSpanElement {
    const visual = document.createElement('span');
    visual.className = cn(
      'flex items-center justify-center rounded border-2 transition-all',
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

    // Checkmark icon (hidden by default, shown when checked)
    const checkmark = document.createElement('svg');
    checkmark.className = 'h-full w-full text-white hidden peer-checked:block';
    checkmark.setAttribute('viewBox', '0 0 16 16');
    checkmark.setAttribute('fill', 'none');
    checkmark.innerHTML = `
      <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" fill="currentColor"/>
    `;

    // Indeterminate icon (dash)
    const indeterminateIcon = document.createElement('svg');
    indeterminateIcon.className = 'h-full w-full text-white hidden';
    indeterminateIcon.setAttribute('viewBox', '0 0 16 16');
    indeterminateIcon.setAttribute('fill', 'none');
    indeterminateIcon.innerHTML = `
      <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `;

    visual.appendChild(checkmark);
    visual.appendChild(indeterminateIcon);

    // Store reference for updates
    visual.dataset.checkmark = '0';
    visual.dataset.indeterminate = '1';

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
   * Update visual based on state
   */
  private updateVisual(): void {
    const visual = this.checkboxWrapper?.querySelector('span');
    if (!visual) return;

    const checkmark = visual.children[0] as HTMLElement;
    const indeterminateIcon = visual.children[1] as HTMLElement;

    if (this.indeterminate) {
      checkmark.classList.add('hidden');
      indeterminateIcon.classList.remove('hidden');
      visual.classList.add('border-blue-600', 'bg-blue-600');
    } else if (this.checked) {
      checkmark.classList.remove('hidden');
      indeterminateIcon.classList.add('hidden');
    } else {
      checkmark.classList.add('hidden');
      indeterminateIcon.classList.add('hidden');
      visual.classList.remove('border-blue-600', 'bg-blue-600');
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
    this.updateVisual();
  }

  /**
   * Get indeterminate state
   */
  public isIndeterminate(): boolean {
    return this.indeterminate;
  }

  /**
   * Set indeterminate state
   */
  public setIndeterminate(indeterminate: boolean): void {
    this.indeterminate = indeterminate;
    if (this.inputElement) {
      this.inputElement.indeterminate = indeterminate;
    }
    this.updateVisual();
  }

  /**
   * Toggle checkbox
   */
  public toggle(): void {
    this.setChecked(!this.checked);
    this.props.onChange?.(new Event('change'), this.checked);
  }

  /**
   * Focus the checkbox
   */
  public focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Destroy checkbox and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.inputElement = null;
      this.checkboxWrapper = null;
    }
  }
}

/**
 * Factory function for creating checkboxes
 */
export function createCheckbox(props: CheckboxProps): Checkbox {
  return new Checkbox(props);
}
