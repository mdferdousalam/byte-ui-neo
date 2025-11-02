/**
 * Breadcrumb Component
 * Framework-agnostic breadcrumb navigation
 *
 * Features:
 * - Automatic truncation for long paths
 * - Custom separators
 * - Icons support
 * - Home icon for first item
 * - Disabled and current item states
 * - WCAG AA compliant with proper ARIA
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface BreadcrumbItem {
  /** Item label */
  label: string;
  /** Item href (optional) */
  href?: string;
  /** Custom icon */
  icon?: string | HTMLElement;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
}

export interface BreadcrumbProps extends BaseComponentProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator (default: '/') */
  separator?: string | HTMLElement;
  /** Max items to show before truncation */
  maxItems?: number;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
}

/**
 * Breadcrumb Component Class
 */
export class Breadcrumb extends BaseComponent<BreadcrumbProps> {
  private container: HTMLElement | null = null;

  constructor(props: BreadcrumbProps) {
    super(props, {
      base: 'hikma-breadcrumb',
    });
  }

  public createElement(): HTMLElement {
    this.container = document.createElement('nav');
    this.container.className = 'hikma-breadcrumb';
    this.container.setAttribute('aria-label', 'Breadcrumb');

    const list = document.createElement('ol');
    list.className = 'flex items-center space-x-2 text-sm';
    list.setAttribute('role', 'list');

    const items = this.getTruncatedItems();

    items.forEach((item, index) => {
      const listItem = this.createBreadcrumbItem(item, index, items.length);
      list.appendChild(listItem);

      // Add separator (except for last item)
      if (index < items.length - 1) {
        const separator = this.createSeparator();
        list.appendChild(separator);
      }
    });

    this.container.appendChild(list);

    return this.container;
  }

  private getTruncatedItems(): BreadcrumbItem[] {
    const maxItems = this.props.maxItems ?? 0;

    if (maxItems === 0 || this.props.items.length <= maxItems) {
      return this.props.items;
    }

    // Truncation logic: keep first, last, and show ellipsis in middle
    if (this.props.items.length > maxItems) {
      const firstItem = this.props.items[0];
      const lastItems = this.props.items.slice(-(maxItems - 2));

      return [
        firstItem,
        {
          label: '...',
          disabled: true,
        },
        ...lastItems,
      ];
    }

    return this.props.items;
  }

  private createBreadcrumbItem(item: BreadcrumbItem, index: number, totalItems: number): HTMLLIElement {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center';

    const isLast = index === totalItems - 1;
    const isFirst = index === 0;

    if (item.href && !item.disabled && !isLast) {
      // Link item
      const link = document.createElement('a');
      link.href = item.href;
      link.className = this.getItemClasses(false, item.disabled);
      link.setAttribute('aria-current', isLast ? 'page' : 'false');

      if (item.onClick) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          item.onClick?.(event as MouseEvent);
        });
      }

      // Icon or home icon
      if (isFirst && this.props.showHomeIcon) {
        const homeIcon = this.createHomeIcon();
        link.appendChild(homeIcon);
      } else if (item.icon) {
        const icon = this.createIcon(item.icon);
        link.appendChild(icon);
      }

      // Label
      const label = document.createElement('span');
      label.textContent = item.label;
      link.appendChild(label);

      listItem.appendChild(link);
    } else {
      // Span item (current page or disabled)
      const span = document.createElement('span');
      span.className = this.getItemClasses(isLast, item.disabled);

      if (isLast) {
        span.setAttribute('aria-current', 'page');
      }

      // Icon or home icon
      if (isFirst && this.props.showHomeIcon) {
        const homeIcon = this.createHomeIcon();
        span.appendChild(homeIcon);
      } else if (item.icon) {
        const icon = this.createIcon(item.icon);
        span.appendChild(icon);
      }

      // Label
      const label = document.createElement('span');
      label.textContent = item.label;
      span.appendChild(label);

      listItem.appendChild(span);
    }

    return listItem;
  }

  private getItemClasses(isCurrent: boolean, isDisabled?: boolean): string {
    return cn(
      'flex items-center gap-1.5',
      'transition-colors',
      isCurrent
        ? 'text-gray-900 font-medium'
        : isDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-600 hover:text-gray-900 hover:underline'
    );
  }

  private createHomeIcon(): HTMLSpanElement {
    const icon = document.createElement('span');
    icon.className = 'h-4 w-4 flex-shrink-0';
    icon.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>';
    return icon;
  }

  private createIcon(icon: string | HTMLElement): HTMLSpanElement {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'h-4 w-4 flex-shrink-0';

    if (typeof icon === 'string') {
      iconContainer.innerHTML = icon;
    } else {
      iconContainer.appendChild(icon);
    }

    return iconContainer;
  }

  private createSeparator(): HTMLLIElement {
    const separator = document.createElement('li');
    separator.className = 'flex items-center';
    separator.setAttribute('role', 'presentation');
    separator.setAttribute('aria-hidden', 'true');

    const span = document.createElement('span');
    span.className = 'text-gray-400 select-none';

    if (this.props.separator) {
      if (typeof this.props.separator === 'string') {
        span.textContent = this.props.separator;
      } else {
        span.appendChild(this.props.separator);
      }
    } else {
      // Default separator
      span.textContent = '/';
    }

    separator.appendChild(span);

    return separator;
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export function createBreadcrumb(props: BreadcrumbProps): Breadcrumb {
  return new Breadcrumb(props);
}
