/**
 * Alert Component
 * Framework-agnostic inline alert/notification
 *
 * Features:
 * - 4 semantic types: info, success, warning, error
 * - Dismissible with close button
 * - Action buttons support
 * - Icons for each type
 * - WCAG AA compliant
 * - Smooth dismiss animation
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface AlertAction {
  /**
   * Action label
   */
  label: string;

  /**
   * Action handler
   */
  onClick: () => void;

  /**
   * Action variant
   */
  variant?: 'primary' | 'secondary';
}

export interface AlertProps extends BaseComponentProps {
  /**
   * Alert type
   */
  type?: 'info' | 'success' | 'warning' | 'error';

  /**
   * Alert title
   */
  title?: string;

  /**
   * Alert message
   */
  message: string;

  /**
   * Whether alert is dismissible
   */
  dismissible?: boolean;

  /**
   * Dismiss handler
   */
  onDismiss?: () => void;

  /**
   * Action buttons
   */
  actions?: AlertAction[];

  /**
   * Show icon
   */
  showIcon?: boolean;
}

/**
 * Alert Component Class
 * Framework-agnostic implementation
 */
export class Alert extends BaseComponent<AlertProps> {
  private container: HTMLDivElement | null = null;
  private isDismissed: boolean = false;

  constructor(props: AlertProps) {
    super(props, {
      base: 'hikma-alert',
    });
  }

  /**
   * Create the alert element
   */
  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = this.getContainerClasses();

    // ARIA attributes
    this.container.setAttribute('role', ARIA_ROLES.alert);

    // Icon (if enabled)
    if (this.props.showIcon !== false) {
      const icon = this.createIcon();
      this.container.appendChild(icon);
    }

    // Content section
    const content = this.createContent();
    this.container.appendChild(content);

    // Dismiss button (if enabled)
    if (this.props.dismissible) {
      const dismissButton = this.createDismissButton();
      this.container.appendChild(dismissButton);
    }

    return this.container;
  }

  /**
   * Get container classes based on type
   */
  private getContainerClasses(): string {
    const typeClasses = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };

    return cn(
      'flex items-start gap-3 p-4 rounded-lg border-2',
      'transition-all duration-200',
      typeClasses[this.props.type || 'info'],
      this.props.className
    );
  }

  /**
   * Create icon based on alert type
   */
  private createIcon(): HTMLDivElement {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'flex-shrink-0';

    const svg = document.createElement('svg');
    svg.className = 'h-5 w-5';
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'currentColor');

    const icons = {
      info: `
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      `,
      success: `
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      `,
      warning: `
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      `,
      error: `
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      `,
    };

    svg.innerHTML = icons[this.props.type || 'info'];
    iconContainer.appendChild(svg);

    return iconContainer;
  }

  /**
   * Create content section
   */
  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = 'flex-1 min-w-0';

    // Title
    if (this.props.title) {
      const title = document.createElement('h3');
      title.className = 'text-sm font-semibold mb-1';
      title.textContent = this.props.title;
      content.appendChild(title);
    }

    // Message
    const message = document.createElement('p');
    message.className = 'text-sm';
    message.textContent = this.props.message;
    content.appendChild(message);

    // Actions
    if (this.props.actions && this.props.actions.length > 0) {
      const actionsContainer = this.createActions();
      content.appendChild(actionsContainer);
    }

    return content;
  }

  /**
   * Create action buttons
   */
  private createActions(): HTMLDivElement {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'flex gap-2 mt-3';

    this.props.actions?.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = cn(
        'text-sm font-medium rounded-md px-3 py-1.5',
        'transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        action.variant === 'primary'
          ? this.getPrimaryActionClasses()
          : this.getSecondaryActionClasses()
      );
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);

      actionsContainer.appendChild(button);
    });

    return actionsContainer;
  }

  /**
   * Get primary action button classes
   */
  private getPrimaryActionClasses(): string {
    const typeClasses = {
      info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-600',
      error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    };

    return typeClasses[this.props.type || 'info'];
  }

  /**
   * Get secondary action button classes
   */
  private getSecondaryActionClasses(): string {
    const typeClasses = {
      info: 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-600',
      success: 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-600',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-600',
      error: 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-600',
    };

    return typeClasses[this.props.type || 'info'];
  }

  /**
   * Create dismiss button
   */
  private createDismissButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = cn(
      'flex-shrink-0 rounded-md p-1',
      'hover:bg-black/5',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'transition-colors',
      this.getFocusRingClass()
    );
    button.setAttribute('aria-label', 'Dismiss alert');

    // X icon
    button.innerHTML = `
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    `;

    button.addEventListener('click', () => this.dismiss());

    return button;
  }

  /**
   * Get focus ring class based on type
   */
  private getFocusRingClass(): string {
    const typeClasses = {
      info: 'focus:ring-blue-600',
      success: 'focus:ring-green-600',
      warning: 'focus:ring-yellow-600',
      error: 'focus:ring-red-600',
    };

    return typeClasses[this.props.type || 'info'];
  }

  /**
   * Dismiss alert
   */
  public dismiss(): void {
    if (this.isDismissed || !this.container) return;

    this.isDismissed = true;

    // Animate out
    this.container.classList.add('opacity-0', 'scale-95');

    // Remove after animation
    setTimeout(() => {
      if (this.container) {
        this.container.remove();
        this.props.onDismiss?.();
      }
    }, 200);
  }

  /**
   * Check if alert is dismissed
   */
  public isDismissedAlert(): boolean {
    return this.isDismissed;
  }

  /**
   * Destroy alert and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

/**
 * Factory function for creating alerts
 */
export function createAlert(props: AlertProps): Alert {
  return new Alert(props);
}
