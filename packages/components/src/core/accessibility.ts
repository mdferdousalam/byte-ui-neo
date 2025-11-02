/**
 * Accessibility Utilities
 * WCAG AA compliance helpers for HikmaUI components
 *
 * References:
 * - WCAG 2.1 Level AA: https://www.w3.org/WAI/WCAG21/quickref/
 * - ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
 */

/**
 * ARIA roles for common component types
 */
export const ARIA_ROLES = {
  button: 'button',
  link: 'link',
  checkbox: 'checkbox',
  radio: 'radio',
  switch: 'switch',
  slider: 'slider',
  combobox: 'combobox',
  listbox: 'listbox',
  menu: 'menu',
  menuitem: 'menuitem',
  menuitemcheckbox: 'menuitemcheckbox',
  menuitemradio: 'menuitemradio',
  option: 'option',
  tab: 'tab',
  tabpanel: 'tabpanel',
  tablist: 'tablist',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  alert: 'alert',
  status: 'status',
  progressbar: 'progressbar',
  tooltip: 'tooltip',
} as const;

export type AriaRole = typeof ARIA_ROLES[keyof typeof ARIA_ROLES];

/**
 * Keyboard key codes for accessibility
 */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute('disabled')) return false;
  if (element.hasAttribute('tabindex') && element.getAttribute('tabindex') === '-1') return false;

  const tagName = element.tagName.toLowerCase();
  const focusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  return focusableTags.includes(tagName) || element.hasAttribute('tabindex');
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Trap focus within a container (for modals, dialogs, etc.)
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== KEYS.TAB) return;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Shift + Tab: Move to previous element
  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  }
  // Tab: Move to next element
  else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * Restore focus to previously focused element
 */
export class FocusManager {
  private previouslyFocusedElement: HTMLElement | null = null;

  /**
   * Save current focus
   */
  public save(): void {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
  }

  /**
   * Restore previously saved focus
   */
  public restore(): void {
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  /**
   * Clear saved focus
   */
  public clear(): void {
    this.previouslyFocusedElement = null;
  }
}

/**
 * Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export function generateAriaId(prefix: string = 'hikma'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only'; // Visually hidden but accessible
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  if (element.getAttribute('aria-hidden') === 'true') return false;
  if (element.style.display === 'none') return false;
  if (element.style.visibility === 'hidden') return false;
  return true;
}

/**
 * Get accessible name for element (ARIA label, aria-labelledby, or text content)
 */
export function getAccessibleName(element: HTMLElement): string {
  // 1. Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // 2. Check aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent || '';
  }

  // 3. Check for label element (for inputs)
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent || '';
  }

  // 4. Fallback to text content
  return element.textContent || '';
}

/**
 * Verify color contrast ratio (WCAG AA requires 4.5:1 for normal text, 3:1 for large text)
 */
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (hexColor: string): number => {
    const rgb = hexColor.match(/\w\w/g)?.map((hex) => Number.parseInt(hex, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map((val) => (val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color contrast meets WCAG AA standards
 */
export function meetsContrastRequirement(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}
