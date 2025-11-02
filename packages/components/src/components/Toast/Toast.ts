/**
 * Toast Component
 * Framework-agnostic toast notification system
 *
 * Features:
 * - Global toast manager with singleton pattern
 * - Queue management (max 5 visible)
 * - 6 positions: top/bottom × left/center/right
 * - Auto-dismiss with custom duration
 * - Promise-based API
 * - 4 types: info, success, warning, error
 * - Action buttons support
 * - Pause on hover
 * - Smooth slide-in/out animations
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps extends BaseComponentProps {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number; // milliseconds, 0 for no auto-dismiss
  position?: ToastPosition;
  dismissible?: boolean;
  actions?: ToastAction[];
  onDismiss?: () => void;
}

export interface ToastOptions extends Omit<ToastProps, 'message'> {
  id?: string;
}

/**
 * Toast Component Class
 */
export class Toast extends BaseComponent<ToastProps> {
  private container: HTMLDivElement | null = null;
  private isDismissed: boolean = false;
  private dismissTimer: number | null = null;
  private isPaused: boolean = false;

  constructor(props: ToastProps) {
    super(props, {
      base: 'hikma-toast',
    });
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = this.getContainerClasses();
    this.container.setAttribute('role', ARIA_ROLES.alert);

    // Icon
    const icon = this.createIcon();
    this.container.appendChild(icon);

    // Content
    const content = this.createContent();
    this.container.appendChild(content);

    // Dismiss button
    if (this.props.dismissible !== false) {
      const dismissBtn = this.createDismissButton();
      this.container.appendChild(dismissBtn);
    }

    // Auto-dismiss timer
    if (this.props.duration && this.props.duration > 0) {
      this.startDismissTimer();
    }

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pauseDismissTimer());
    this.container.addEventListener('mouseleave', () => this.resumeDismissTimer());

    return this.container;
  }

  private getContainerClasses(): string {
    const typeClasses = {
      info: 'bg-blue-600 border-blue-700 text-white',
      success: 'bg-green-600 border-green-700 text-white',
      warning: 'bg-yellow-600 border-yellow-700 text-white',
      error: 'bg-red-600 border-red-700 text-white',
    };

    return cn(
      'flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg',
      'min-w-[320px] max-w-[480px]',
      'transition-all duration-200',
      'animate-slideIn',
      typeClasses[this.props.type || 'info']
    );
  }

  private createIcon(): HTMLDivElement {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'flex-shrink-0';

    const svg = document.createElement('svg');
    svg.className = 'h-5 w-5';
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'currentColor');

    const icons = {
      info: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />',
      success: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />',
      warning: '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />',
      error: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />',
    };

    svg.innerHTML = icons[this.props.type || 'info'];
    iconContainer.appendChild(svg);
    return iconContainer;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = 'flex-1 min-w-0';

    if (this.props.title) {
      const title = document.createElement('h3');
      title.className = 'text-sm font-semibold mb-1';
      title.textContent = this.props.title;
      content.appendChild(title);
    }

    const message = document.createElement('p');
    message.className = 'text-sm opacity-90';
    message.textContent = this.props.message;
    content.appendChild(message);

    if (this.props.actions && this.props.actions.length > 0) {
      const actions = this.createActions();
      content.appendChild(actions);
    }

    return content;
  }

  private createActions(): HTMLDivElement {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'flex gap-2 mt-3';

    this.props.actions?.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'text-sm font-medium px-3 py-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors';
      button.textContent = action.label;
      button.addEventListener('click', () => {
        action.onClick();
        this.dismiss();
      });
      actionsContainer.appendChild(button);
    });

    return actionsContainer;
  }

  private createDismissButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flex-shrink-0 rounded-md p-1 hover:bg-white/20 transition-colors';
    button.setAttribute('aria-label', 'Dismiss notification');
    button.innerHTML = '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    button.addEventListener('click', () => this.dismiss());
    return button;
  }

  private startDismissTimer(): void {
    if (this.dismissTimer) return;
    this.dismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, this.props.duration);
  }

  private pauseDismissTimer(): void {
    if (this.dismissTimer && !this.isPaused) {
      window.clearTimeout(this.dismissTimer);
      this.isPaused = true;
    }
  }

  private resumeDismissTimer(): void {
    if (this.isPaused && this.props.duration) {
      this.isPaused = false;
      this.dismissTimer = window.setTimeout(() => {
        this.dismiss();
      }, this.props.duration);
    }
  }

  public dismiss(): void {
    if (this.isDismissed || !this.container) return;
    this.isDismissed = true;

    if (this.dismissTimer) {
      window.clearTimeout(this.dismissTimer);
    }

    this.container.classList.add('animate-slideOut');

    setTimeout(() => {
      if (this.container) {
        this.container.remove();
        this.props.onDismiss?.();
      }
    }, 200);
  }

  public destroy(): void {
    if (this.dismissTimer) {
      window.clearTimeout(this.dismissTimer);
    }
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

/**
 * Toast Manager - Singleton for managing toasts
 */
class ToastManager {
  private static instance: ToastManager;
  private toasts: Map<string, Toast> = new Map();
  private containers: Map<ToastPosition, HTMLDivElement> = new Map();
  private maxToasts: number = 5;
  private toastCounter: number = 0;

  private constructor() {
    this.initializeContainers();
  }

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  private initializeContainers(): void {
    const positions: ToastPosition[] = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ];

    positions.forEach(position => {
      const container = document.createElement('div');
      container.className = cn(
        'fixed z-[10000] flex flex-col gap-2 pointer-events-none',
        this.getPositionClasses(position)
      );
      container.style.cssText = 'pointer-events: none;';
      document.body.appendChild(container);
      this.containers.set(position, container);
    });
  }

  private getPositionClasses(position: ToastPosition): string {
    const positions = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
    };
    return positions[position];
  }

  public show(message: string, options: ToastOptions = {}): string {
    const id = options.id || `toast-${++this.toastCounter}`;
    const position = options.position || 'top-right';

    // Remove oldest if at max
    if (this.toasts.size >= this.maxToasts) {
      const oldestId = Array.from(this.toasts.keys())[0];
      this.dismiss(oldestId);
    }

    const toast = new Toast({
      message,
      type: options.type || 'info',
      title: options.title,
      duration: options.duration ?? 5000,
      position,
      dismissible: options.dismissible !== false,
      actions: options.actions,
      onDismiss: () => {
        this.toasts.delete(id);
        options.onDismiss?.();
      },
    });

    const element = toast.createElement();
    element.style.pointerEvents = 'auto';

    const container = this.containers.get(position);
    if (container) {
      container.appendChild(element);
    }

    this.toasts.set(id, toast);
    return id;
  }

  public dismiss(id: string): void {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.dismiss();
    }
  }

  public dismissAll(): void {
    this.toasts.forEach(toast => toast.dismiss());
  }
}

// Export singleton instance methods
export const toast = {
  show: (message: string, options?: ToastOptions) => ToastManager.getInstance().show(message, options),
  info: (message: string, options?: Omit<ToastOptions, 'type'>) => ToastManager.getInstance().show(message, { ...options, type: 'info' }),
  success: (message: string, options?: Omit<ToastOptions, 'type'>) => ToastManager.getInstance().show(message, { ...options, type: 'success' }),
  warning: (message: string, options?: Omit<ToastOptions, 'type'>) => ToastManager.getInstance().show(message, { ...options, type: 'warning' }),
  error: (message: string, options?: Omit<ToastOptions, 'type'>) => ToastManager.getInstance().show(message, { ...options, type: 'error' }),
  dismiss: (id: string) => ToastManager.getInstance().dismiss(id),
  dismissAll: () => ToastManager.getInstance().dismissAll(),
  promise: async <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string | ((data: T) => string); error: string | ((error: any) => string) },
    options?: ToastOptions
  ): Promise<T> => {
    const id = ToastManager.getInstance().show(messages.loading, { ...options, type: 'info', duration: 0 });
    try {
      const data = await promise;
      ToastManager.getInstance().dismiss(id);
      const successMsg = typeof messages.success === 'function' ? messages.success(data) : messages.success;
      ToastManager.getInstance().show(successMsg, { ...options, type: 'success' });
      return data;
    } catch (error) {
      ToastManager.getInstance().dismiss(id);
      const errorMsg = typeof messages.error === 'function' ? messages.error(error) : messages.error;
      ToastManager.getInstance().show(errorMsg, { ...options, type: 'error' });
      throw error;
    }
  },
};

export function createToast(props: ToastProps): Toast {
  return new Toast(props);
}
