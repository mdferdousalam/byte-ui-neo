/**
 * Accordion Component
 * Framework-agnostic accordion with smooth animations
 *
 * Features:
 * - Single or multiple panel expansion
 * - Smooth height animations (CSS transitions)
 * - Keyboard navigation (arrows, home/end, space/enter)
 * - Collapsible mode (allow all panels closed)
 * - Disabled panels support
 * - WCAG AA compliant with proper ARIA roles
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Panel header/title */
  title: string;
  /** Panel content */
  content: string | HTMLElement;
  /** Whether panel is initially expanded */
  defaultExpanded?: boolean;
  /** Whether panel is disabled */
  disabled?: boolean;
}

export interface AccordionProps extends BaseComponentProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple panels to be expanded simultaneously */
  allowMultiple?: boolean;
  /** Allow all panels to be collapsed */
  collapsible?: boolean;
  /** Callback when panel expansion changes */
  onChange?: (expandedIds: string[]) => void;
}

/**
 * Accordion Component Class
 */
export class Accordion extends BaseComponent<AccordionProps> {
  private container: HTMLDivElement | null = null;
  private panels: Map<string, HTMLDivElement> = new Map();
  private headers: Map<string, HTMLButtonElement> = new Map();
  private contents: Map<string, HTMLDivElement> = new Map();
  private expandedIds: Set<string> = new Set();

  constructor(props: AccordionProps) {
    super(props, {
      base: 'hikma-accordion',
    });

    // Initialize expanded state from defaultExpanded
    props.items.forEach(item => {
      if (item.defaultExpanded && !item.disabled) {
        this.expandedIds.add(item.id);
      }
    });

    // If not allowing multiple and multiple are expanded, keep only first
    if (!props.allowMultiple && this.expandedIds.size > 1) {
      const first = Array.from(this.expandedIds)[0];
      this.expandedIds.clear();
      this.expandedIds.add(first);
    }
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-accordion border border-gray-200 rounded-lg divide-y divide-gray-200';
    this.container.setAttribute('role', ARIA_ROLES.region);

    // Create accordion items
    this.props.items.forEach((item, index) => {
      const panel = this.createPanel(item, index);
      this.panels.set(item.id, panel);
      this.container.appendChild(panel);
    });

    return this.container;
  }

  private createPanel(item: AccordionItem, index: number): HTMLDivElement {
    const panel = document.createElement('div');
    panel.className = 'hikma-accordion-item';

    // Header
    const header = this.createHeader(item, index);
    this.headers.set(item.id, header);
    panel.appendChild(header);

    // Content wrapper
    const contentWrapper = this.createContentWrapper(item);
    this.contents.set(item.id, contentWrapper);
    panel.appendChild(contentWrapper);

    return panel;
  }

  private createHeader(item: AccordionItem, index: number): HTMLButtonElement {
    const header = document.createElement('button');
    header.type = 'button';
    header.className = this.getHeaderClasses(item.disabled);
    header.setAttribute('id', `accordion-header-${item.id}`);
    header.setAttribute('aria-controls', `accordion-content-${item.id}`);
    header.setAttribute('aria-expanded', String(this.expandedIds.has(item.id)));

    if (item.disabled) {
      header.setAttribute('aria-disabled', 'true');
      header.disabled = true;
    }

    // Title
    const title = document.createElement('span');
    title.className = 'flex-1 text-left font-medium';
    title.textContent = item.title;
    header.appendChild(title);

    // Icon
    const icon = this.createIcon(this.expandedIds.has(item.id));
    header.appendChild(icon);

    // Click handler
    if (!item.disabled) {
      header.addEventListener('click', () => this.toggle(item.id));
    }

    // Keyboard navigation
    header.addEventListener('keydown', (event) => this.handleKeyDown(event, index));

    return header;
  }

  private getHeaderClasses(isDisabled?: boolean): string {
    return cn(
      'flex items-center justify-between w-full px-4 py-3',
      'text-sm text-gray-900',
      'transition-colors',
      !isDisabled && 'hover:bg-gray-50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
      isDisabled && 'opacity-50 cursor-not-allowed'
    );
  }

  private createIcon(isExpanded: boolean): HTMLSpanElement {
    const icon = document.createElement('span');
    icon.className = cn(
      'h-5 w-5 flex-shrink-0 transition-transform duration-200',
      isExpanded ? 'rotate-180' : ''
    );
    icon.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    return icon;
  }

  private createContentWrapper(item: AccordionItem): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'overflow-hidden transition-all duration-200 ease-out';
    wrapper.setAttribute('id', `accordion-content-${item.id}`);
    wrapper.setAttribute('role', ARIA_ROLES.region);
    wrapper.setAttribute('aria-labelledby', `accordion-header-${item.id}`);

    const isExpanded = this.expandedIds.has(item.id);
    wrapper.style.height = isExpanded ? 'auto' : '0';

    // Inner content
    const content = document.createElement('div');
    content.className = 'px-4 py-3 text-sm text-gray-700';

    if (typeof item.content === 'string') {
      content.innerHTML = item.content;
    } else {
      content.appendChild(item.content);
    }

    wrapper.appendChild(content);

    return wrapper;
  }

  private toggle(id: string): void {
    const item = this.props.items.find(i => i.id === id);
    if (!item || item.disabled) return;

    const isCurrentlyExpanded = this.expandedIds.has(id);

    if (isCurrentlyExpanded) {
      // Collapsing
      if (this.props.collapsible || this.expandedIds.size > 1) {
        this.collapse(id);
      }
    } else {
      // Expanding
      if (!this.props.allowMultiple) {
        // Close all other panels first
        Array.from(this.expandedIds).forEach(expandedId => {
          if (expandedId !== id) {
            this.collapse(expandedId);
          }
        });
      }
      this.expand(id);
    }

    // Callback
    this.props.onChange?.(Array.from(this.expandedIds));
  }

  private expand(id: string): void {
    const content = this.contents.get(id);
    const header = this.headers.get(id);
    const icon = header?.querySelector('span:last-child') as HTMLSpanElement;

    if (!content || !header) return;

    this.expandedIds.add(id);

    // Update ARIA
    header.setAttribute('aria-expanded', 'true');

    // Rotate icon
    if (icon) {
      icon.classList.add('rotate-180');
    }

    // Animate height
    this.animateHeight(content, true);
  }

  private collapse(id: string): void {
    const content = this.contents.get(id);
    const header = this.headers.get(id);
    const icon = header?.querySelector('span:last-child') as HTMLSpanElement;

    if (!content || !header) return;

    this.expandedIds.delete(id);

    // Update ARIA
    header.setAttribute('aria-expanded', 'false');

    // Rotate icon back
    if (icon) {
      icon.classList.remove('rotate-180');
    }

    // Animate height
    this.animateHeight(content, false);
  }

  private animateHeight(element: HTMLElement, expand: boolean): void {
    if (expand) {
      // Expanding: 0 → scrollHeight → auto
      element.style.height = '0';
      element.style.overflow = 'hidden';

      // Force reflow
      element.offsetHeight;

      const targetHeight = element.scrollHeight;
      element.style.height = `${targetHeight}px`;

      // After transition, set to auto for dynamic content
      const transitionEnd = () => {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        element.removeEventListener('transitionend', transitionEnd);
      };
      element.addEventListener('transitionend', transitionEnd);
    } else {
      // Collapsing: current → scrollHeight → 0
      const currentHeight = element.scrollHeight;
      element.style.height = `${currentHeight}px`;
      element.style.overflow = 'hidden';

      // Force reflow
      element.offsetHeight;

      element.style.height = '0';
    }
  }

  private handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let handled = false;
    let newIndex = currentIndex;

    switch (event.key) {
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        newIndex = this.getNextEnabledIndex(currentIndex, 1);
        handled = true;
        break;
      case KEYS.ARROW_UP:
        event.preventDefault();
        newIndex = this.getNextEnabledIndex(currentIndex, -1);
        handled = true;
        break;
      case KEYS.HOME:
        event.preventDefault();
        newIndex = this.getFirstEnabledIndex();
        handled = true;
        break;
      case KEYS.END:
        event.preventDefault();
        newIndex = this.getLastEnabledIndex();
        handled = true;
        break;
    }

    if (handled && newIndex !== currentIndex) {
      const item = this.props.items[newIndex];
      if (item) {
        const header = this.headers.get(item.id);
        header?.focus();
      }
    }
  }

  private getNextEnabledIndex(currentIndex: number, direction: number): number {
    const totalItems = this.props.items.length;
    let nextIndex = currentIndex;

    for (let i = 0; i < totalItems; i++) {
      nextIndex = (nextIndex + direction + totalItems) % totalItems;
      if (!this.props.items[nextIndex]?.disabled) {
        return nextIndex;
      }
    }

    return currentIndex;
  }

  private getFirstEnabledIndex(): number {
    return this.props.items.findIndex(item => !item.disabled);
  }

  private getLastEnabledIndex(): number {
    for (let i = this.props.items.length - 1; i >= 0; i--) {
      if (!this.props.items[i]?.disabled) return i;
    }
    return 0;
  }

  public expandItem(id: string): void {
    this.expand(id);
  }

  public collapseItem(id: string): void {
    this.collapse(id);
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.panels.clear();
    this.headers.clear();
    this.contents.clear();
    this.expandedIds.clear();
  }
}

export function createAccordion(props: AccordionProps): Accordion {
  return new Accordion(props);
}
