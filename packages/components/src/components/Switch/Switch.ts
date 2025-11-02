/**
 * Switch Component
 * Framework-agnostic toggle switch with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - On/off states with smooth animations
 * - Error/validation states
 * - Keyboard navigation (Space, Enter)
 * - Label support with positioning
 * - Optional on/off text labels
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface SwitchProps extends BaseComponentProps {
  /**
   * Switch name attribute
   */
  name?: string;

  /**
   * Whether switch is checked (on)
   */
  checked?: boolean;

  /**
   * Default checked state
   */
  defaultChecked?: boolean;

  /**
   * Whether switch is required
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

  /**
   * Show on/off labels inside switch
   */
  showLabels?: boolean;

  /**
   * Custom on label text
   */
  onLabel?: string;

  /**
   * Custom off label text
   */
  offLabel?: string;
}

/**
 * Switch Component Class
 * Framework-agnostic implementation
 */
export class Switch extends BaseComponent<SwitchProps> {
  private container: HTMLDivElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private switchWrapper: HTMLLabelElement | null = null;
  private checked: boolean;

  constructor(props: SwitchProps) {
    super(props, {
      base: 'hikma-switch',
    });

    this.checked = props.checked ?? props.defaultChecked ?? false;
  }

  /**
   * Create the switch element and container
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-switch-container';

    // Switch wrapper (label + input)
    this.switchWrapper = document.createElement('label');
    this.switchWrapper.className = this.getWrapperClasses();

    // Input element
    this.inputElement = this.createInput();

    // Custom switch visual
    const switchVisual = this.createSwitchVisual();

    // Label position
    if (this.props.labelPosition === 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.switchWrapper.appendChild(labelText);
    }

    this.switchWrapper.appendChild(this.inputElement);
    this.switchWrapper.appendChild(switchVisual);

    if (this.props.labelPosition !== 'start' && this.props.label) {
      const labelText = this.createLabelText();
      this.switchWrapper.appendChild(labelText);
    }

    this.container.appendChild(this.switchWrapper);

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
   * Get switch size classes
   */
  private getSizeClasses(): { track: string; thumb: string; label: string } {
    const sizes = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        label: 'text-[0.5rem]',
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        label: 'text-xs',
      },
      lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        label: 'text-sm',
      },
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

    if (this.props.required) input.required = true;
    if (this.props.disabled) input.disabled = true;

    // ARIA attributes
    input.setAttribute('role', 'switch');
    input.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    if (this.props.ariaLabel) {
      input.setAttribute('aria-label', this.props.ariaLabel);
    }
    if (this.props.errorMessage) {
      input.setAttribute('aria-invalid', 'true');
    }

    // Event listeners
    input.addEventListener('change', (event) => {
      this.checked = input.checked;
      input.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.props.onChange?.(event, this.checked);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (event) => {
      if (event.key === KEYS.SPACE || event.key === KEYS.ENTER) {
        event.preventDefault();
        input.click();
      }
    });

    return input;
  }

  /**
   * Create switch visual element
   */
  private createSwitchVisual(): HTMLSpanElement {
    const sizes = this.getSizeClasses();

    const visual = document.createElement('span');
    visual.className = cn(
      'relative inline-flex items-center rounded-full transition-colors duration-200',
      sizes.track,
      // Default state (off)
      'bg-gray-300',
      // Checked state (on)
      'peer-checked:bg-blue-600',
      // Focus state
      'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2',
      // Disabled state
      this.props.disabled && 'bg-gray-200',
      // Error state
      this.props.errorMessage && 'bg-red-300 peer-checked:bg-red-600'
    );

    // Show on/off labels if enabled
    if (this.props.showLabels) {
      const onLabel = document.createElement('span');
      onLabel.className = cn(
        'absolute left-1.5 text-white font-medium hidden peer-checked:block',
        sizes.label
      );
      onLabel.textContent = this.props.onLabel || 'ON';
      visual.appendChild(onLabel);

      const offLabel = document.createElement('span');
      offLabel.className = cn(
        'absolute right-1.5 text-gray-600 font-medium peer-checked:hidden',
        sizes.label
      );
      offLabel.textContent = this.props.offLabel || 'OFF';
      visual.appendChild(offLabel);
    }

    // Thumb (sliding circle)
    const thumb = document.createElement('span');
    thumb.className = cn(
      'block rounded-full bg-white shadow-md transition-transform duration-200',
      sizes.thumb,
      // Position based on size
      this.props.size === 'sm' && 'translate-x-0.5 peer-checked:translate-x-4',
      this.props.size === 'md' && 'translate-x-0.5 peer-checked:translate-x-5',
      this.props.size === 'lg' && 'translate-x-0.5 peer-checked:translate-x-7',
      !this.props.size && 'translate-x-0.5 peer-checked:translate-x-5' // default md
    );

    visual.appendChild(thumb);

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
      this.inputElement.setAttribute('aria-checked', checked ? 'true' : 'false');
    }
  }

  /**
   * Toggle switch
   */
  public toggle(): void {
    this.setChecked(!this.checked);
    this.props.onChange?.(new Event('change'), this.checked);
  }

  /**
   * Focus the switch
   */
  public focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Destroy switch and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
      this.inputElement = null;
      this.switchWrapper = null;
    }
  }
}

/**
 * Factory function for creating switches
 */
export function createSwitch(props: SwitchProps): Switch {
  return new Switch(props);
}
