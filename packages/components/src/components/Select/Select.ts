/**
 * Select Component
 * Framework-agnostic select dropdown with full accessibility support
 *
 * Features:
 * - WCAG AA compliant
 * - Single and multi-select support
 * - Search/filter functionality
 * - Keyboard navigation (Arrows, Enter, Escape)
 * - Custom option rendering
 * - Error/validation states
 * - Label support
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS, trapFocus } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface SelectOption {
  /**
   * Option value
   */
  value: string;

  /**
   * Option label (displayed text)
   */
  label: string;

  /**
   * Whether option is disabled
   */
  disabled?: boolean;

  /**
   * Optional description
   */
  description?: string;
}

export interface SelectProps extends BaseComponentProps {
  /**
   * Select name attribute
   */
  name?: string;

  /**
   * Available options
   */
  options: SelectOption[];

  /**
   * Selected value(s)
   */
  value?: string | string[];

  /**
   * Default selected value(s)
   */
  defaultValue?: string | string[];

  /**
   * Allow multiple selections
   */
  multiple?: boolean;

  /**
   * Enable search/filter
   */
  searchable?: boolean;

  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;

  /**
   * Placeholder text when nothing selected
   */
  placeholder?: string;

  /**
   * Whether select is required
   */
  required?: boolean;

  /**
   * Change handler
   */
  onChange?: (event: Event, value: string | string[]) => void;

  /**
   * Label text
   */
  label?: string;

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
 * Select Component Class
 * Framework-agnostic implementation
 */
export class Select extends BaseComponent<SelectProps> {
  private container: HTMLDivElement | null = null;
  private selectButton: HTMLButtonElement | null = null;
  private dropdown: HTMLDivElement | null = null;
  private searchInput: HTMLInputElement | null = null;
  private optionsList: HTMLUListElement | null = null;
  private labelElement: HTMLLabelElement | null = null;

  private selectedValues: Set<string>;
  private isOpen: boolean = false;
  private focusedIndex: number = -1;
  private filteredOptions: SelectOption[] = [];

  constructor(props: SelectProps) {
    super(props, {
      base: 'hikma-select',
    });

    // Initialize selected values
    const initialValue = props.value ?? props.defaultValue;
    if (Array.isArray(initialValue)) {
      this.selectedValues = new Set(initialValue);
    } else if (initialValue) {
      this.selectedValues = new Set([initialValue]);
    } else {
      this.selectedValues = new Set();
    }

    this.filteredOptions = [...props.options];
  }

  /**
   * Create the select element and container
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-select-container relative w-full';

    // Label
    if (this.props.label) {
      this.labelElement = this.createLabel();
      this.container.appendChild(this.labelElement);
    }

    // Select button (trigger)
    this.selectButton = this.createSelectButton();
    this.container.appendChild(this.selectButton);

    // Dropdown
    this.dropdown = this.createDropdown();
    this.container.appendChild(this.dropdown);

    // Helper text or error message
    if (this.props.helperText || this.props.errorMessage) {
      const helper = this.createHelperText();
      this.container.appendChild(helper);
    }

    // Click outside to close
    document.addEventListener('click', this.handleClickOutside.bind(this));

    return this.container;
  }

  /**
   * Create label element
   */
  private createLabel(): HTMLLabelElement {
    const label = document.createElement('label');
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
   * Get size classes
   */
  private getSizeClasses(): string {
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-11 px-4 text-lg',
    };

    return sizes[this.props.size || 'md'];
  }

  /**
   * Create select button (trigger)
   */
  private createSelectButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = this.id;
    button.className = cn(
      'flex items-center justify-between w-full rounded-md border-2 transition-colors',
      this.getSizeClasses(),
      'border-gray-300 bg-white text-gray-900',
      'hover:border-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
      this.props.disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
      this.props.errorMessage && 'border-red-500 focus:ring-red-600'
    );

    if (this.props.disabled) {
      button.disabled = true;
    }

    // ARIA attributes
    button.setAttribute('role', 'combobox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-haspopup', 'listbox');
    if (this.props.ariaLabel) {
      button.setAttribute('aria-label', this.props.ariaLabel);
    }
    if (this.props.errorMessage) {
      button.setAttribute('aria-invalid', 'true');
    }

    // Display selected values
    const displayText = this.getDisplayText();
    const textSpan = document.createElement('span');
    textSpan.className = cn(
      'truncate',
      !displayText && 'text-gray-400'
    );
    textSpan.textContent = displayText || this.props.placeholder || 'Select...';
    button.appendChild(textSpan);

    // Chevron icon
    const chevron = document.createElement('svg');
    chevron.className = 'h-5 w-5 text-gray-400 transition-transform';
    chevron.setAttribute('viewBox', '0 0 20 20');
    chevron.setAttribute('fill', 'currentColor');
    chevron.innerHTML = '<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />';
    button.appendChild(chevron);

    // Event listeners
    button.addEventListener('click', () => this.toggleDropdown());
    button.addEventListener('keydown', (e) => this.handleButtonKeyDown(e));

    return button;
  }

  /**
   * Create dropdown container
   */
  private createDropdown(): HTMLDivElement {
    const dropdown = document.createElement('div');
    dropdown.className = cn(
      'absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200',
      'hidden' // Initially hidden
    );

    // Search input (if searchable)
    if (this.props.searchable) {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'p-2 border-b border-gray-200';

      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.placeholder = this.props.searchPlaceholder || 'Search...';
      this.searchInput.className = cn(
        'w-full px-3 py-2 border border-gray-300 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-blue-600'
      );
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
      this.searchInput.addEventListener('keydown', (e) => this.handleSearchKeyDown(e));

      searchContainer.appendChild(this.searchInput);
      dropdown.appendChild(searchContainer);
    }

    // Options list
    this.optionsList = document.createElement('ul');
    this.optionsList.className = 'max-h-60 overflow-auto py-1';
    this.optionsList.setAttribute('role', 'listbox');
    if (this.props.multiple) {
      this.optionsList.setAttribute('aria-multiselectable', 'true');
    }

    this.renderOptions();
    dropdown.appendChild(this.optionsList);

    return dropdown;
  }

  /**
   * Render options in list
   */
  private renderOptions(): void {
    if (!this.optionsList) return;

    this.optionsList.innerHTML = '';

    if (this.filteredOptions.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'px-3 py-2 text-sm text-gray-500';
      emptyLi.textContent = 'No options found';
      this.optionsList.appendChild(emptyLi);
      return;
    }

    this.filteredOptions.forEach((option, index) => {
      const li = document.createElement('li');
      const isSelected = this.selectedValues.has(option.value);

      li.className = cn(
        'px-3 py-2 cursor-pointer select-none',
        'hover:bg-blue-50',
        isSelected && 'bg-blue-100 text-blue-900',
        option.disabled && 'opacity-50 cursor-not-allowed',
        this.focusedIndex === index && 'bg-gray-100'
      );

      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      li.dataset.value = option.value;
      li.dataset.index = String(index);

      // Option content
      const content = document.createElement('div');

      const labelSpan = document.createElement('span');
      labelSpan.className = 'block text-sm font-medium';
      labelSpan.textContent = option.label;
      content.appendChild(labelSpan);

      if (option.description) {
        const descSpan = document.createElement('span');
        descSpan.className = 'block text-xs text-gray-500 mt-1';
        descSpan.textContent = option.description;
        content.appendChild(descSpan);
      }

      li.appendChild(content);

      // Click handler
      if (!option.disabled) {
        li.addEventListener('click', () => this.selectOption(option));
      }

      this.optionsList!.appendChild(li);
    });
  }

  /**
   * Get display text for selected values
   */
  private getDisplayText(): string {
    if (this.selectedValues.size === 0) return '';

    const selectedOptions = this.props.options.filter(opt =>
      this.selectedValues.has(opt.value)
    );

    if (this.props.multiple) {
      return selectedOptions.map(opt => opt.label).join(', ');
    }

    return selectedOptions[0]?.label || '';
  }

  /**
   * Toggle dropdown open/close
   */
  private toggleDropdown(): void {
    if (this.props.disabled) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  /**
   * Open dropdown
   */
  private openDropdown(): void {
    if (!this.dropdown || !this.selectButton) return;

    this.isOpen = true;
    this.dropdown.classList.remove('hidden');
    this.selectButton.setAttribute('aria-expanded', 'true');

    // Rotate chevron
    const chevron = this.selectButton.querySelector('svg');
    if (chevron) {
      chevron.classList.add('rotate-180');
    }

    // Focus search input if searchable
    if (this.searchInput) {
      setTimeout(() => this.searchInput?.focus(), 0);
    }

    // Reset focused index
    this.focusedIndex = -1;
  }

  /**
   * Close dropdown
   */
  private closeDropdown(): void {
    if (!this.dropdown || !this.selectButton) return;

    this.isOpen = false;
    this.dropdown.classList.add('hidden');
    this.selectButton.setAttribute('aria-expanded', 'false');

    // Rotate chevron back
    const chevron = this.selectButton.querySelector('svg');
    if (chevron) {
      chevron.classList.remove('rotate-180');
    }

    // Clear search
    if (this.searchInput) {
      this.searchInput.value = '';
      this.filteredOptions = [...this.props.options];
      this.renderOptions();
    }

    // Return focus to button
    this.selectButton.focus();
  }

  /**
   * Select an option
   */
  private selectOption(option: SelectOption): void {
    if (this.props.multiple) {
      if (this.selectedValues.has(option.value)) {
        this.selectedValues.delete(option.value);
      } else {
        this.selectedValues.add(option.value);
      }
    } else {
      this.selectedValues.clear();
      this.selectedValues.add(option.value);
      this.closeDropdown();
    }

    this.updateButtonText();
    this.renderOptions();

    // Trigger onChange
    const value = this.props.multiple
      ? Array.from(this.selectedValues)
      : Array.from(this.selectedValues)[0] || '';

    this.props.onChange?.(new Event('change'), value);
  }

  /**
   * Update button text after selection
   */
  private updateButtonText(): void {
    if (!this.selectButton) return;

    const textSpan = this.selectButton.querySelector('span');
    if (textSpan) {
      const displayText = this.getDisplayText();
      textSpan.textContent = displayText || this.props.placeholder || 'Select...';
      textSpan.className = cn(
        'truncate',
        !displayText && 'text-gray-400'
      );
    }
  }

  /**
   * Handle search input
   */
  private handleSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredOptions = this.props.options.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query)
    );

    this.focusedIndex = -1;
    this.renderOptions();
  }

  /**
   * Handle button keydown
   */
  private handleButtonKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.ARROW_DOWN) {
      event.preventDefault();
      this.openDropdown();
    }

    if (key === KEYS.ESCAPE && this.isOpen) {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  /**
   * Handle search input keydown
   */
  private handleSearchKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    if (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_UP) {
      event.preventDefault();
      this.navigateOptions(key === KEYS.ARROW_DOWN ? 1 : -1);
    }

    if (key === KEYS.ENTER && this.focusedIndex >= 0) {
      event.preventDefault();
      const option = this.filteredOptions[this.focusedIndex];
      if (option && !option.disabled) {
        this.selectOption(option);
      }
    }

    if (key === KEYS.ESCAPE) {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  /**
   * Navigate options with arrow keys
   */
  private navigateOptions(direction: number): void {
    const maxIndex = this.filteredOptions.length - 1;

    this.focusedIndex = Math.max(0, Math.min(maxIndex, this.focusedIndex + direction));
    this.renderOptions();

    // Scroll focused option into view
    const focusedLi = this.optionsList?.querySelector(`[data-index="${this.focusedIndex}"]`);
    if (focusedLi) {
      focusedLi.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Handle click outside to close
   */
  private handleClickOutside(event: MouseEvent): void {
    if (!this.container || !this.isOpen) return;

    if (!this.container.contains(event.target as Node)) {
      this.closeDropdown();
    }
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
   * Get selected values
   */
  public getValue(): string | string[] {
    return this.props.multiple
      ? Array.from(this.selectedValues)
      : Array.from(this.selectedValues)[0] || '';
  }

  /**
   * Set selected values
   */
  public setValue(value: string | string[]): void {
    this.selectedValues.clear();

    if (Array.isArray(value)) {
      value.forEach(v => this.selectedValues.add(v));
    } else if (value) {
      this.selectedValues.add(value);
    }

    this.updateButtonText();
    this.renderOptions();
  }

  /**
   * Focus the select
   */
  public focus(): void {
    this.selectButton?.focus();
  }

  /**
   * Destroy select and cleanup
   */
  public destroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));

    if (this.container) {
      this.container.remove();
      this.container = null;
      this.selectButton = null;
      this.dropdown = null;
      this.searchInput = null;
      this.optionsList = null;
      this.labelElement = null;
    }
  }
}

/**
 * Factory function for creating selects
 */
export function createSelect(props: SelectProps): Select {
  return new Select(props);
}
