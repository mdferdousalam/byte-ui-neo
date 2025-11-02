/**
 * Pagination Component
 * Framework-agnostic pagination with smart ellipsis
 *
 * Features:
 * - Smart ellipsis calculation (shows ... when needed)
 * - Previous/Next navigation
 * - First/Last page buttons
 * - Page size selector
 * - Compact and full modes
 * - Keyboard navigation
 * - WCAG AA compliant
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { ARIA_ROLES, KEYS } from '../../core/accessibility';
import { cn } from '@hikmaui/core';

export interface PaginationProps extends BaseComponentProps {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items (optional, for display) */
  totalItems?: number;
  /** Items per page (optional, for page size selector) */
  pageSize?: number;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Number of pages to show on each side of current (default: 1) */
  siblingCount?: number;
  /** Show previous/next buttons */
  showPrevNext?: boolean;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
}

/**
 * Pagination Component Class
 */
export class Pagination extends BaseComponent<PaginationProps> {
  private container: HTMLDivElement | null = null;

  constructor(props: PaginationProps) {
    super(props, {
      base: 'hikma-pagination',
    });
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = 'hikma-pagination flex items-center justify-between gap-4';
    this.container.setAttribute('role', ARIA_ROLES.navigation);
    this.container.setAttribute('aria-label', 'Pagination');

    // Info section (left)
    if (this.props.totalItems !== undefined) {
      const info = this.createInfo();
      this.container.appendChild(info);
    }

    // Controls (center/right)
    const controls = this.createControls();
    this.container.appendChild(controls);

    return this.container;
  }

  private createInfo(): HTMLDivElement {
    const info = document.createElement('div');
    info.className = 'text-sm text-gray-700';

    const start = (this.props.currentPage - 1) * (this.props.pageSize || 10) + 1;
    const end = Math.min(this.props.currentPage * (this.props.pageSize || 10), this.props.totalItems || 0);

    info.textContent = `Showing ${start} to ${end} of ${this.props.totalItems} results`;

    return info;
  }

  private createControls(): HTMLDivElement {
    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-2';

    // Page size selector
    if (this.props.showPageSize && this.props.pageSizeOptions) {
      const pageSizeSelector = this.createPageSizeSelector();
      controls.appendChild(pageSizeSelector);
    }

    // First button
    if (this.props.showFirstLast) {
      const firstButton = this.createFirstButton();
      controls.appendChild(firstButton);
    }

    // Previous button
    if (this.props.showPrevNext !== false) {
      const prevButton = this.createPrevButton();
      controls.appendChild(prevButton);
    }

    // Page numbers
    const pageNumbers = this.createPageNumbers();
    controls.appendChild(pageNumbers);

    // Next button
    if (this.props.showPrevNext !== false) {
      const nextButton = this.createNextButton();
      controls.appendChild(nextButton);
    }

    // Last button
    if (this.props.showFirstLast) {
      const lastButton = this.createLastButton();
      controls.appendChild(lastButton);
    }

    return controls;
  }

  private createPageSizeSelector(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-2 text-sm mr-4';

    const label = document.createElement('span');
    label.className = 'text-gray-700';
    label.textContent = 'Show';
    wrapper.appendChild(label);

    const select = document.createElement('select');
    select.className = cn(
      'px-2 py-1 border border-gray-300 rounded-md',
      'text-sm text-gray-700',
      'focus:outline-none focus:ring-2 focus:ring-blue-500'
    );

    this.props.pageSizeOptions?.forEach((size) => {
      const option = document.createElement('option');
      option.value = String(size);
      option.textContent = String(size);
      option.selected = size === this.props.pageSize;
      select.appendChild(option);
    });

    select.addEventListener('change', (event) => {
      const newPageSize = Number.parseInt((event.target as HTMLSelectElement).value, 10);
      this.props.onPageSizeChange?.(newPageSize);
    });

    wrapper.appendChild(select);

    return wrapper;
  }

  private createFirstButton(): HTMLButtonElement {
    return this.createButton('«', 1, this.props.currentPage === 1, 'Go to first page');
  }

  private createPrevButton(): HTMLButtonElement {
    const prevPage = Math.max(1, this.props.currentPage - 1);
    return this.createButton('‹', prevPage, this.props.currentPage === 1, 'Go to previous page');
  }

  private createNextButton(): HTMLButtonElement {
    const nextPage = Math.min(this.props.totalPages, this.props.currentPage + 1);
    return this.createButton('›', nextPage, this.props.currentPage === this.props.totalPages, 'Go to next page');
  }

  private createLastButton(): HTMLButtonElement {
    return this.createButton('»', this.props.totalPages, this.props.currentPage === this.props.totalPages, 'Go to last page');
  }

  private createButton(label: string, page: number, disabled: boolean, ariaLabel: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = this.getButtonClasses(false, disabled);
    button.textContent = label;
    button.disabled = disabled;
    button.setAttribute('aria-label', ariaLabel);

    if (!disabled) {
      button.addEventListener('click', () => this.handlePageChange(page));
    }

    return button;
  }

  private createPageNumbers(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-1';

    const pages = this.calculatePageRange();

    pages.forEach((page) => {
      if (page === 'ellipsis') {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'px-2 text-gray-500';
        ellipsis.textContent = '...';
        wrapper.appendChild(ellipsis);
      } else {
        const pageButton = this.createPageButton(page);
        wrapper.appendChild(pageButton);
      }
    });

    return wrapper;
  }

  private createPageButton(page: number): HTMLButtonElement {
    const isCurrent = page === this.props.currentPage;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = this.getButtonClasses(isCurrent);
    button.textContent = String(page);
    button.setAttribute('aria-label', `Go to page ${page}`);
    button.setAttribute('aria-current', isCurrent ? 'page' : 'false');

    if (!isCurrent) {
      button.addEventListener('click', () => this.handlePageChange(page));
    }

    return button;
  }

  private getButtonClasses(isCurrent: boolean, isDisabled?: boolean): string {
    return cn(
      'min-w-[36px] h-9 px-3 rounded-md text-sm font-medium',
      'transition-colors',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      isCurrent
        ? 'bg-blue-600 text-white'
        : isDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
    );
  }

  private calculatePageRange(): (number | 'ellipsis')[] {
    const { currentPage, totalPages, siblingCount = 1 } = this.props;

    // Total page numbers to show (including current, siblings, first, last)
    const totalPageNumbers = siblingCount * 2 + 5; // current + 2*siblings + first + last + 2 ellipsis

    // If total pages less than total numbers to show, show all
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const range: (number | 'ellipsis')[] = [];

    // Always show first page
    range.push(1);

    if (showLeftEllipsis) {
      range.push('ellipsis');
    }

    // Show pages around current
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }

    if (showRightEllipsis) {
      range.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }

  private handlePageChange(page: number): void {
    if (page < 1 || page > this.props.totalPages || page === this.props.currentPage) {
      return;
    }

    this.props.onPageChange?.(page);
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export function createPagination(props: PaginationProps): Pagination {
  return new Pagination(props);
}
