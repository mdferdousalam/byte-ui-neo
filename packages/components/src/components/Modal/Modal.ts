/**
 * Modal/Dialog Component
 * Framework-agnostic modal with full accessibility support
 *
 * Features:
 * - WCAG AA compliant with proper ARIA roles
 * - Focus trap (keeps focus inside modal)
 * - ESC key to close
 * - Click outside backdrop to close (optional)
 * - Portal rendering for z-index management
 * - Scroll lock on body when open
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Backdrop blur options
 * - Smooth animations
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS, trapFocus, getFocusableElements } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface ModalProps extends BaseComponentProps {
  /**
   * Whether modal is open
   */
  open?: boolean;

  /**
   * Default open state
   */
  defaultOpen?: boolean;

  /**
   * Close handler
   */
  onClose?: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal description
   */
  description?: string;

  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;

  /**
   * Whether clicking backdrop closes modal
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing ESC closes modal
   */
  closeOnEscape?: boolean;

  /**
   * Backdrop blur intensity
   */
  backdropBlur?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Custom header content
   */
  headerContent?: HTMLElement | string;

  /**
   * Main content
   */
  content?: HTMLElement | string;

  /**
   * Custom footer content
   */
  footerContent?: HTMLElement | string;

  /**
   * Whether to lock body scroll when modal is open
   */
  lockScroll?: boolean;
}

/**
 * Modal Component Class
 * Framework-agnostic implementation
 */
export class Modal extends BaseComponent<ModalProps> {
  private portalContainer: HTMLDivElement | null = null;
  private backdrop: HTMLDivElement | null = null;
  private modalContainer: HTMLDivElement | null = null;
  private modalContent: HTMLDivElement | null = null;
  private isOpen: boolean;
  private previousActiveElement: HTMLElement | null = null;
  private originalBodyOverflow: string = '';

  constructor(props: ModalProps) {
    super(props, {
      base: 'hikma-modal',
    });

    this.isOpen = props.open ?? props.defaultOpen ?? false;
  }

  /**
   * Create the modal portal and elements
   */
  public createElement(): HTMLDivElement {
    // Create portal container (appended to body)
    this.portalContainer = document.createElement('div');
    this.portalContainer.className = 'hikma-modal-portal';
    this.portalContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      pointer-events: ${this.isOpen ? 'auto' : 'none'};
      display: ${this.isOpen ? 'block' : 'none'};
    `;

    // Backdrop
    this.backdrop = this.createBackdrop();
    this.portalContainer.appendChild(this.backdrop);

    // Modal container (centers the modal)
    this.modalContainer = this.createModalContainer();
    this.portalContainer.appendChild(this.modalContainer);

    // Modal content
    this.modalContent = this.createModalContent();
    this.modalContainer.appendChild(this.modalContent);

    // Append to body
    document.body.appendChild(this.portalContainer);

    // Setup event listeners
    this.setupEventListeners();

    // If open by default, handle initial state
    if (this.isOpen) {
      this.handleOpen();
    }

    return this.portalContainer;
  }

  /**
   * Create backdrop element
   */
  private createBackdrop(): HTMLDivElement {
    const backdrop = document.createElement('div');
    const blurClasses = {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    };

    backdrop.className = cn(
      'fixed inset-0 bg-black/50 transition-opacity duration-200',
      blurClasses[this.props.backdropBlur || 'sm'],
      this.isOpen ? 'opacity-100' : 'opacity-0'
    );

    backdrop.setAttribute('aria-hidden', 'true');

    // Click backdrop to close
    if (this.props.closeOnBackdropClick !== false) {
      backdrop.addEventListener('click', () => this.close());
    }

    return backdrop;
  }

  /**
   * Create modal container (centers the modal)
   */
  private createModalContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn(
      'fixed inset-0 overflow-y-auto',
      'flex items-center justify-center p-4'
    );

    return container;
  }

  /**
   * Get size classes
   */
  private getSizeClasses(): string {
    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full w-full h-full',
    };

    return sizes[this.props.size || 'md'];
  }

  /**
   * Create modal content
   */
  private createModalContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'relative w-full bg-white rounded-lg shadow-xl',
      'transform transition-all duration-200',
      this.getSizeClasses(),
      this.isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    );

    // ARIA attributes
    content.setAttribute('role', ARIA_ROLES.dialog);
    content.setAttribute('aria-modal', 'true');
    if (this.props.title) {
      content.setAttribute('aria-labelledby', `${this.id}-title`);
    }
    if (this.props.description) {
      content.setAttribute('aria-describedby', `${this.id}-description`);
    }

    // Header
    if (this.props.title || this.props.headerContent || this.props.showCloseButton !== false) {
      const header = this.createHeader();
      content.appendChild(header);
    }

    // Body
    const body = this.createBody();
    content.appendChild(body);

    // Footer
    if (this.props.footerContent) {
      const footer = this.createFooter();
      content.appendChild(footer);
    }

    return content;
  }

  /**
   * Create header element
   */
  private createHeader(): HTMLDivElement {
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between p-6 border-b border-gray-200';

    // Title section
    const titleSection = document.createElement('div');

    if (this.props.title) {
      const title = document.createElement('h2');
      title.id = `${this.id}-title`;
      title.className = 'text-lg font-semibold text-gray-900';
      title.textContent = this.props.title;
      titleSection.appendChild(title);
    }

    if (this.props.headerContent) {
      if (typeof this.props.headerContent === 'string') {
        const div = document.createElement('div');
        div.innerHTML = this.props.headerContent;
        titleSection.appendChild(div);
      } else {
        titleSection.appendChild(this.props.headerContent);
      }
    }

    header.appendChild(titleSection);

    // Close button
    if (this.props.showCloseButton !== false) {
      const closeButton = this.createCloseButton();
      header.appendChild(closeButton);
    }

    return header;
  }

  /**
   * Create close button
   */
  private createCloseButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = cn(
      'rounded-md p-1 text-gray-400',
      'hover:text-gray-500 hover:bg-gray-100',
      'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
      'transition-colors'
    );
    button.setAttribute('aria-label', 'Close modal');

    // X icon
    button.innerHTML = `
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;

    button.addEventListener('click', () => this.close());

    return button;
  }

  /**
   * Create body element
   */
  private createBody(): HTMLDivElement {
    const body = document.createElement('div');
    body.className = 'p-6 overflow-y-auto max-h-[60vh]';

    if (this.props.description) {
      const description = document.createElement('p');
      description.id = `${this.id}-description`;
      description.className = 'text-sm text-gray-600';
      description.textContent = this.props.description;
      body.appendChild(description);
    }

    if (this.props.content) {
      if (typeof this.props.content === 'string') {
        const div = document.createElement('div');
        div.innerHTML = this.props.content;
        body.appendChild(div);
      } else {
        body.appendChild(this.props.content);
      }
    }

    return body;
  }

  /**
   * Create footer element
   */
  private createFooter(): HTMLDivElement {
    const footer = document.createElement('div');
    footer.className = 'flex items-center justify-end gap-3 p-6 border-t border-gray-200';

    if (typeof this.props.footerContent === 'string') {
      const div = document.createElement('div');
      div.innerHTML = this.props.footerContent;
      footer.appendChild(div);
    } else if (this.props.footerContent) {
      footer.appendChild(this.props.footerContent);
    }

    return footer;
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // ESC key to close
    if (this.props.closeOnEscape !== false) {
      document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    }

    // Focus trap
    if (this.modalContent) {
      this.modalContent.addEventListener('keydown', (e) => {
        if (this.isOpen) {
          trapFocus(this.modalContent!, e);
        }
      });
    }
  }

  /**
   * Handle ESC key press
   */
  private handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === KEYS.ESCAPE && this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Open modal
   */
  public open(): void {
    if (this.isOpen) return;

    this.isOpen = true;
    this.handleOpen();
  }

  /**
   * Handle modal open
   */
  private handleOpen(): void {
    // Save current active element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Show portal
    if (this.portalContainer) {
      this.portalContainer.style.display = 'block';
      this.portalContainer.style.pointerEvents = 'auto';
    }

    // Animate backdrop
    if (this.backdrop) {
      setTimeout(() => {
        this.backdrop!.classList.remove('opacity-0');
        this.backdrop!.classList.add('opacity-100');
      }, 10);
    }

    // Animate modal
    if (this.modalContent) {
      setTimeout(() => {
        this.modalContent!.classList.remove('scale-95', 'opacity-0');
        this.modalContent!.classList.add('scale-100', 'opacity-100');
      }, 10);
    }

    // Lock body scroll
    if (this.props.lockScroll !== false) {
      this.originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    // Focus first focusable element
    setTimeout(() => {
      if (this.modalContent) {
        const focusable = getFocusableElements(this.modalContent);
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);
  }

  /**
   * Close modal
   */
  public close(): void {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Animate out
    if (this.backdrop) {
      this.backdrop.classList.remove('opacity-100');
      this.backdrop.classList.add('opacity-0');
    }

    if (this.modalContent) {
      this.modalContent.classList.remove('scale-100', 'opacity-100');
      this.modalContent.classList.add('scale-95', 'opacity-0');
    }

    // Hide after animation
    setTimeout(() => {
      if (this.portalContainer) {
        this.portalContainer.style.display = 'none';
        this.portalContainer.style.pointerEvents = 'none';
      }

      // Restore body scroll
      if (this.props.lockScroll !== false) {
        document.body.style.overflow = this.originalBodyOverflow;
      }

      // Restore focus
      if (this.previousActiveElement) {
        this.previousActiveElement.focus();
      }

      // Trigger onClose callback
      this.props.onClose?.();
    }, 200);
  }

  /**
   * Toggle modal
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Check if modal is open
   */
  public isModalOpen(): boolean {
    return this.isOpen;
  }

  /**
   * Destroy modal and cleanup
   */
  public destroy(): void {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));

    // Restore body scroll if modal was open
    if (this.isOpen && this.props.lockScroll !== false) {
      document.body.style.overflow = this.originalBodyOverflow;
    }

    // Remove portal from DOM
    if (this.portalContainer) {
      this.portalContainer.remove();
      this.portalContainer = null;
      this.backdrop = null;
      this.modalContainer = null;
      this.modalContent = null;
    }
  }
}

/**
 * Factory function for creating modals
 */
export function createModal(props: ModalProps): Modal {
  return new Modal(props);
}
