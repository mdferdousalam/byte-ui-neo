/**
 * Tabs Component
 * Framework-agnostic tabs with animated indicator
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Animated sliding indicator (CSS transforms)
 * - Keyboard navigation (arrows, home/end)
 * - Lazy loading of tab panels
 * - Disabled tabs support
 * - WCAG AA compliant with proper ARIA roles
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab panel content */
  content: string | HTMLElement;
  /** Whether tab is disabled */
  disabled?: boolean;
}

export interface TabsProps extends BaseComponentProps {
  /** Tab items */
  items: TabItem[];
  /** Default active tab index */
  defaultActiveIndex?: number;
  /** Controlled active index */
  activeIndex?: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when tab changes */
  onChange?: (index: number, tab: TabItem) => void;
}

/**
 * Tabs Component Class
 */
export class Tabs extends BaseComponent<TabsProps> {
  private container: HTMLDivElement | null = null;
  private tabList: HTMLDivElement | null = null;
  private tabPanels: HTMLDivElement | null = null;
  private indicator: HTMLDivElement | null = null;
  private tabs: HTMLButtonElement[] = [];
  private activeIndex: number = 0;

  constructor(props: TabsProps) {
    super(props, {
      base: 'hikma-tabs',
    });
    this.activeIndex = props.activeIndex ?? props.defaultActiveIndex ?? 0;
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = this.getContainerClasses();

    // Tab list
    this.tabList = this.createTabList();
    this.container.appendChild(this.tabList);

    // Tab panels
    this.tabPanels = this.createTabPanels();
    this.container.appendChild(this.tabPanels);

    // Initial indicator position
    setTimeout(() => this.updateIndicator(), 0);

    return this.container;
  }

  private getContainerClasses(): string {
    return cn(
      'hikma-tabs',
      this.props.orientation === 'vertical' ? 'flex gap-4' : ''
    );
  }

  private createTabList(): HTMLDivElement {
    const tabList = document.createElement('div');
    tabList.className = this.getTabListClasses();
    tabList.setAttribute('role', ARIA_ROLES.tablist);
    tabList.setAttribute('aria-orientation', this.props.orientation || 'horizontal');

    // Create indicator
    this.indicator = this.createIndicator();
    tabList.appendChild(this.indicator);

    // Create tabs
    this.props.items.forEach((item, index) => {
      const tab = this.createTab(item, index);
      this.tabs.push(tab);
      tabList.appendChild(tab);
    });

    return tabList;
  }

  private getTabListClasses(): string {
    return cn(
      'relative flex',
      this.props.orientation === 'vertical'
        ? 'flex-col border-r border-gray-200'
        : 'border-b border-gray-200'
    );
  }

  private createIndicator(): HTMLDivElement {
    const indicator = document.createElement('div');
    indicator.className = cn(
      'absolute bg-blue-600 transition-all duration-200 ease-out',
      this.props.orientation === 'vertical'
        ? 'right-0 w-0.5'
        : 'bottom-0 h-0.5'
    );
    return indicator;
  }

  private createTab(item: TabItem, index: number): HTMLButtonElement {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = this.getTabClasses(index === this.activeIndex, item.disabled);
    tab.setAttribute('role', ARIA_ROLES.tab);
    tab.setAttribute('id', `tab-${item.id}`);
    tab.setAttribute('aria-controls', `panel-${item.id}`);
    tab.setAttribute('aria-selected', String(index === this.activeIndex));
    tab.setAttribute('tabindex', index === this.activeIndex ? '0' : '-1');
    tab.textContent = item.label;

    if (item.disabled) {
      tab.setAttribute('aria-disabled', 'true');
      tab.disabled = true;
    }

    // Click handler
    if (!item.disabled) {
      tab.addEventListener('click', () => this.setActiveTab(index));
    }

    // Keyboard navigation
    tab.addEventListener('keydown', (event) => this.handleKeyDown(event, index));

    return tab;
  }

  private getTabClasses(isActive: boolean, isDisabled?: boolean): string {
    return cn(
      'px-4 py-2 text-sm font-medium transition-colors',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      isActive
        ? 'text-blue-600'
        : 'text-gray-600 hover:text-gray-900',
      isDisabled && 'opacity-50 cursor-not-allowed',
      this.props.orientation === 'vertical' ? 'text-left' : ''
    );
  }

  private createTabPanels(): HTMLDivElement {
    const panels = document.createElement('div');
    panels.className = 'mt-4';

    this.props.items.forEach((item, index) => {
      const panel = this.createTabPanel(item, index);
      panels.appendChild(panel);
    });

    return panels;
  }

  private createTabPanel(item: TabItem, index: number): HTMLDivElement {
    const panel = document.createElement('div');
    panel.className = index === this.activeIndex ? 'block' : 'hidden';
    panel.setAttribute('role', ARIA_ROLES.tabpanel);
    panel.setAttribute('id', `panel-${item.id}`);
    panel.setAttribute('aria-labelledby', `tab-${item.id}`);
    panel.setAttribute('tabindex', '0');

    if (typeof item.content === 'string') {
      panel.innerHTML = item.content;
    } else {
      panel.appendChild(item.content);
    }

    return panel;
  }

  private updateIndicator(): void {
    if (!this.indicator || !this.tabList || this.tabs.length === 0) return;

    const activeTab = this.tabs[this.activeIndex];
    if (!activeTab) return;

    const tabListRect = this.tabList.getBoundingClientRect();
    const activeTabRect = activeTab.getBoundingClientRect();

    if (this.props.orientation === 'vertical') {
      // Vertical: move indicator up/down
      const top = activeTabRect.top - tabListRect.top;
      const height = activeTabRect.height;
      this.indicator.style.top = `${top}px`;
      this.indicator.style.height = `${height}px`;
    } else {
      // Horizontal: move indicator left/right
      const left = activeTabRect.left - tabListRect.left;
      const width = activeTabRect.width;
      this.indicator.style.left = `${left}px`;
      this.indicator.style.width = `${width}px`;
    }
  }

  private setActiveTab(index: number): void {
    if (index === this.activeIndex || this.props.items[index]?.disabled) return;

    // Update previous tab
    if (this.tabs[this.activeIndex]) {
      this.tabs[this.activeIndex].setAttribute('aria-selected', 'false');
      this.tabs[this.activeIndex].setAttribute('tabindex', '-1');
      this.tabs[this.activeIndex].className = this.getTabClasses(false, this.props.items[this.activeIndex]?.disabled);
    }

    // Hide previous panel
    const previousPanel = this.tabPanels?.children[this.activeIndex] as HTMLDivElement;
    if (previousPanel) {
      previousPanel.classList.add('hidden');
      previousPanel.classList.remove('block');
    }

    // Update active index
    this.activeIndex = index;

    // Update new active tab
    if (this.tabs[index]) {
      this.tabs[index].setAttribute('aria-selected', 'true');
      this.tabs[index].setAttribute('tabindex', '0');
      this.tabs[index].className = this.getTabClasses(true, this.props.items[index]?.disabled);
      this.tabs[index].focus();
    }

    // Show new panel
    const newPanel = this.tabPanels?.children[index] as HTMLDivElement;
    if (newPanel) {
      newPanel.classList.remove('hidden');
      newPanel.classList.add('block');
    }

    // Update indicator
    this.updateIndicator();

    // Callback
    this.props.onChange?.(index, this.props.items[index]);
  }

  private handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const isVertical = this.props.orientation === 'vertical';
    let newIndex = currentIndex;

    switch (event.key) {
      case isVertical ? KEYS.ARROW_DOWN : KEYS.ARROW_RIGHT:
        event.preventDefault();
        newIndex = this.getNextEnabledIndex(currentIndex, 1);
        break;
      case isVertical ? KEYS.ARROW_UP : KEYS.ARROW_LEFT:
        event.preventDefault();
        newIndex = this.getNextEnabledIndex(currentIndex, -1);
        break;
      case KEYS.HOME:
        event.preventDefault();
        newIndex = this.getFirstEnabledIndex();
        break;
      case KEYS.END:
        event.preventDefault();
        newIndex = this.getLastEnabledIndex();
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      this.setActiveTab(newIndex);
    }
  }

  private getNextEnabledIndex(currentIndex: number, direction: number): number {
    const totalTabs = this.props.items.length;
    let nextIndex = currentIndex;

    for (let i = 0; i < totalTabs; i++) {
      nextIndex = (nextIndex + direction + totalTabs) % totalTabs;
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

  public setActive(index: number): void {
    this.setActiveTab(index);
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.tabList = null;
    this.tabPanels = null;
    this.indicator = null;
    this.tabs = [];
  }
}

export function createTabs(props: TabsProps): Tabs {
  return new Tabs(props);
}
