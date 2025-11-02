/**
 * Dropdown Menu Component
 * Framework-agnostic dropdown menu with keyboard navigation
 *
 * Features:
 * - Nested submenus (up to 3 levels deep)
 * - Full keyboard navigation (arrows, home/end, ESC, Enter/Space)
 * - Icons and keyboard shortcuts display
 * - Checkable menu items
 * - Separators and section labels
 * - Portal rendering
 * - Click outside to close
 * - WCAG AA compliant with proper ARIA roles
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface DropdownMenuItem {
  /** Unique identifier */
  id: string;
  /** Menu item label */
  label: string;
  /** Icon (HTML string or element) */
  icon?: string | HTMLElement;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is checked (for checkable items) */
  checked?: boolean;
  /** Whether item is checkable */
  checkable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Nested submenu items */
  submenu?: DropdownMenuItem[];
}

export interface DropdownMenuSeparator {
  type: 'separator';
}

export interface DropdownMenuLabel {
  type: 'label';
  label: string;
}

export type DropdownMenuItemType = DropdownMenuItem | DropdownMenuSeparator | DropdownMenuLabel;

export interface DropdownMenuProps extends BaseComponentProps {
  /** Menu items */
  items: DropdownMenuItemType[];
  /** Trigger element */
  trigger: HTMLElement;
  /** Menu position relative to trigger */
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Callback when menu closes */
  onClose?: () => void;
}

/**
 * Dropdown Menu Component Class
 */
export class DropdownMenu extends BaseComponent<DropdownMenuProps> {
  private menu: HTMLDivElement | null = null;
  private isOpen: boolean = false;
  private focusedIndex: number = -1;
  private menuItems: HTMLElement[] = [];
  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;
  private currentSubmenu: DropdownMenu | null = null;

  constructor(props: DropdownMenuProps) {
    super(props, {
      base: 'hikma-dropdown',
    });
  }

  public createElement(): HTMLDivElement {
    this.menu = document.createElement('div');
    this.menu.className = this.getMenuClasses();
    this.menu.setAttribute('role', ARIA_ROLES.menu);
    this.menu.style.cssText = 'position: fixed; z-index: 9999; opacity: 0; pointer-events: none; transform: translateY(-8px);';

    // Render menu items
    this.renderItems(this.props.items, this.menu);

    // Attach trigger listeners
    this.attachTriggerListeners();

    // Append to body (portal)
    document.body.appendChild(this.menu);

    return this.menu;
  }

  private getMenuClasses(): string {
    return cn(
      'min-w-[200px] max-w-[280px]',
      'bg-white border border-gray-200 rounded-lg shadow-lg',
      'py-1',
      'transition-all duration-200'
    );
  }

  private renderItems(items: DropdownMenuItemType[], container: HTMLElement): void {
    items.forEach((item) => {
      if ('type' in item) {
        if (item.type === 'separator') {
          container.appendChild(this.createSeparator());
        } else if (item.type === 'label') {
          container.appendChild(this.createLabel(item.label));
        }
      } else {
        const menuItem = this.createMenuItem(item);
        container.appendChild(menuItem);
        if (!item.disabled) {
          this.menuItems.push(menuItem);
        }
      }
    });
  }

  private createMenuItem(item: DropdownMenuItem): HTMLDivElement {
    const menuItem = document.createElement('div');
    menuItem.className = this.getMenuItemClasses(item);
    menuItem.setAttribute('role', ARIA_ROLES.menuitem);
    menuItem.setAttribute('tabindex', item.disabled ? '-1' : '0');

    if (item.disabled) {
      menuItem.setAttribute('aria-disabled', 'true');
    }

    if (item.checkable) {
      menuItem.setAttribute('aria-checked', String(item.checked || false));
    }

    // Checkable indicator
    if (item.checkable) {
      const checkIcon = this.createCheckIcon(item.checked || false);
      menuItem.appendChild(checkIcon);
    }

    // Icon
    if (item.icon) {
      const icon = this.createIcon(item.icon);
      menuItem.appendChild(icon);
    }

    // Label
    const label = document.createElement('span');
    label.className = 'flex-1';
    label.textContent = item.label;
    menuItem.appendChild(label);

    // Shortcut
    if (item.shortcut) {
      const shortcut = document.createElement('span');
      shortcut.className = 'text-xs text-gray-400 ml-4';
      shortcut.textContent = item.shortcut;
      menuItem.appendChild(shortcut);
    }

    // Submenu indicator
    if (item.submenu && item.submenu.length > 0) {
      const arrow = this.createSubmenuArrow();
      menuItem.appendChild(arrow);
    }

    // Click handler
    if (!item.disabled) {
      menuItem.addEventListener('click', (event) => {
        event.stopPropagation();

        if (item.checkable) {
          item.checked = !item.checked;
          menuItem.setAttribute('aria-checked', String(item.checked));
          const checkIcon = menuItem.querySelector('.check-icon') as HTMLElement;
          if (checkIcon) {
            checkIcon.style.opacity = item.checked ? '1' : '0';
          }
        }

        item.onClick?.();

        // Close menu if not a submenu parent
        if (!item.submenu || item.submenu.length === 0) {
          this.close();
        }
      });

      // Submenu handling
      if (item.submenu && item.submenu.length > 0) {
        menuItem.addEventListener('mouseenter', () => {
          this.openSubmenu(item.submenu!, menuItem);
        });
        menuItem.addEventListener('mouseleave', () => {
          // Delay closing to allow moving to submenu
          setTimeout(() => {
            if (this.currentSubmenu && !this.currentSubmenu.menu?.matches(':hover')) {
              this.closeSubmenu();
            }
          }, 100);
        });
      }
    }

    return menuItem;
  }

  private getMenuItemClasses(item: DropdownMenuItem): string {
    return cn(
      'flex items-center gap-2 px-3 py-2',
      'text-sm text-gray-700',
      'cursor-pointer transition-colors',
      !item.disabled && 'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
      item.disabled && 'opacity-50 cursor-not-allowed'
    );
  }

  private createCheckIcon(checked: boolean): HTMLSpanElement {
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icon h-4 w-4 flex-shrink-0';
    checkIcon.style.opacity = checked ? '1' : '0';
    checkIcon.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
    return checkIcon;
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

  private createSubmenuArrow(): HTMLSpanElement {
    const arrow = document.createElement('span');
    arrow.className = 'h-4 w-4 flex-shrink-0 ml-auto';
    arrow.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>';
    return arrow;
  }

  private createSeparator(): HTMLDivElement {
    const separator = document.createElement('div');
    separator.className = 'h-px bg-gray-200 my-1';
    separator.setAttribute('role', 'separator');
    return separator;
  }

  private createLabel(text: string): HTMLDivElement {
    const label = document.createElement('div');
    label.className = 'px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide';
    label.textContent = text;
    return label;
  }

  private attachTriggerListeners(): void {
    if (!this.props.trigger) return;

    this.props.trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggle();
    });
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    if (this.isOpen || !this.menu) return;

    this.isOpen = true;
    this.updatePosition();
    this.menu.style.opacity = '1';
    this.menu.style.pointerEvents = 'auto';
    this.menu.style.transform = 'translateY(0)';

    // Focus first item
    this.focusedIndex = 0;
    if (this.menuItems.length > 0) {
      this.menuItems[0].focus();
    }

    // Attach keyboard and click-outside listeners
    this.attachMenuListeners();
  }

  public close(): void {
    if (!this.isOpen || !this.menu) return;

    this.isOpen = false;
    this.menu.style.opacity = '0';
    this.menu.style.pointerEvents = 'none';
    this.menu.style.transform = 'translateY(-8px)';
    this.focusedIndex = -1;

    // Close any open submenu
    this.closeSubmenu();

    // Remove listeners
    this.removeMenuListeners();

    this.props.onClose?.();
  }

  private updatePosition(): void {
    if (!this.menu || !this.props.trigger) return;

    const triggerRect = this.props.trigger.getBoundingClientRect();
    const position = this.props.position || 'bottom-start';

    let top = 0;
    let left = 0;

    switch (position) {
      case 'bottom-start':
        top = triggerRect.bottom + 4;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + 4;
        left = triggerRect.right - this.menu.offsetWidth;
        break;
      case 'top-start':
        top = triggerRect.top - this.menu.offsetHeight - 4;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - this.menu.offsetHeight - 4;
        left = triggerRect.right - this.menu.offsetWidth;
        break;
    }

    this.menu.style.top = `${top}px`;
    this.menu.style.left = `${left}px`;
  }

  private openSubmenu(items: DropdownMenuItem[], parentItem: HTMLElement): void {
    // Close existing submenu
    this.closeSubmenu();

    // Create submenu
    const submenuTrigger = parentItem;
    this.currentSubmenu = new DropdownMenu({
      items,
      trigger: submenuTrigger,
      position: 'bottom-start',
      onClose: () => {
        this.currentSubmenu = null;
      },
    });

    this.currentSubmenu.createElement();
    this.currentSubmenu.open();

    // Position submenu to the right of parent item
    if (this.currentSubmenu.menu && parentItem) {
      const parentRect = parentItem.getBoundingClientRect();
      this.currentSubmenu.menu.style.top = `${parentRect.top}px`;
      this.currentSubmenu.menu.style.left = `${parentRect.right + 4}px`;
    }
  }

  private closeSubmenu(): void {
    if (this.currentSubmenu) {
      this.currentSubmenu.close();
      this.currentSubmenu.destroy();
      this.currentSubmenu = null;
    }
  }

  private attachMenuListeners(): void {
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown);

    // Click outside
    this.clickOutsideHandler = (event: MouseEvent) => {
      if (this.menu && !this.menu.contains(event.target as Node) && !this.props.trigger.contains(event.target as Node)) {
        this.close();
      }
    };
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideHandler!);
    }, 0);
  }

  private removeMenuListeners(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.isOpen) return;

    switch (event.key) {
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        this.focusNext();
        break;
      case KEYS.ARROW_UP:
        event.preventDefault();
        this.focusPrevious();
        break;
      case KEYS.HOME:
        event.preventDefault();
        this.focusFirst();
        break;
      case KEYS.END:
        event.preventDefault();
        this.focusLast();
        break;
      case KEYS.ESCAPE:
        event.preventDefault();
        this.close();
        this.props.trigger.focus();
        break;
      case KEYS.ENTER:
      case KEYS.SPACE:
        event.preventDefault();
        if (this.focusedIndex >= 0 && this.menuItems[this.focusedIndex]) {
          this.menuItems[this.focusedIndex].click();
        }
        break;
    }
  };

  private focusNext(): void {
    if (this.menuItems.length === 0) return;
    this.focusedIndex = (this.focusedIndex + 1) % this.menuItems.length;
    this.menuItems[this.focusedIndex].focus();
  }

  private focusPrevious(): void {
    if (this.menuItems.length === 0) return;
    this.focusedIndex = this.focusedIndex <= 0 ? this.menuItems.length - 1 : this.focusedIndex - 1;
    this.menuItems[this.focusedIndex].focus();
  }

  private focusFirst(): void {
    if (this.menuItems.length === 0) return;
    this.focusedIndex = 0;
    this.menuItems[0].focus();
  }

  private focusLast(): void {
    if (this.menuItems.length === 0) return;
    this.focusedIndex = this.menuItems.length - 1;
    this.menuItems[this.focusedIndex].focus();
  }

  public destroy(): void {
    this.removeMenuListeners();
    this.closeSubmenu();

    if (this.menu) {
      this.menu.remove();
      this.menu = null;
    }

    this.menuItems = [];
  }
}

export function createDropdownMenu(props: DropdownMenuProps): DropdownMenu {
  return new DropdownMenu(props);
}
