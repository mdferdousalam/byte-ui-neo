/**
 * Avatar Component
 * Framework-agnostic avatar with image, initials, and icon fallbacks
 *
 * Features:
 * - 6 sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (56px), 2xl (64px)
 * - Image with automatic fallback to initials
 * - Fallback to icon if no name provided
 * - Status indicators: online, offline, busy, away
 * - Group stacking with overlap
 * - Circular and square variants
 * - Image loading error handling
 */

import { BaseComponent, type BaseComponentProps } from '../../core/base-component';
import { cn } from '@hikmaui/core';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends BaseComponentProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image (required for accessibility) */
  alt?: string;
  /** User name (used for initials fallback) */
  name?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  shape?: AvatarShape;
  /** Status indicator */
  status?: AvatarStatus;
  /** Custom status color (overrides status presets) */
  statusColor?: string;
  /** Callback when image fails to load */
  onImageError?: () => void;
}

/**
 * Avatar Component Class
 */
export class Avatar extends BaseComponent<AvatarProps> {
  private container: HTMLDivElement | null = null;
  private imgElement: HTMLImageElement | null = null;
  private fallbackElement: HTMLDivElement | null = null;
  private imageLoaded: boolean = false;
  private imageError: boolean = false;

  constructor(props: AvatarProps) {
    super(props, {
      base: 'hikma-avatar',
    });
  }

  public createElement(): HTMLDivElement {
    this.container = document.createElement('div');
    this.container.className = this.getContainerClasses();
    this.container.setAttribute('role', 'img');
    this.container.setAttribute('aria-label', this.props.alt || this.props.name || 'Avatar');

    // Try image first if src provided
    if (this.props.src && !this.imageError) {
      this.renderImage();
    } else if (this.props.name) {
      // Fallback to initials
      this.renderInitials();
    } else {
      // Fallback to icon
      this.renderIcon();
    }

    // Status indicator
    if (this.props.status || this.props.statusColor) {
      const statusIndicator = this.createStatusIndicator();
      this.container.appendChild(statusIndicator);
    }

    return this.container;
  }

  private getContainerClasses(): string {
    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-14 w-14 text-xl',
      '2xl': 'h-16 w-16 text-2xl',
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    };

    return cn(
      'relative inline-flex items-center justify-center',
      'bg-gray-200 text-gray-700',
      'font-semibold uppercase',
      'overflow-hidden',
      'transition-all duration-200',
      sizeClasses[this.props.size || 'md'],
      shapeClasses[this.props.shape || 'circle']
    );
  }

  private renderImage(): void {
    if (!this.props.src || !this.container) return;

    this.imgElement = document.createElement('img');
    this.imgElement.src = this.props.src;
    this.imgElement.alt = this.props.alt || this.props.name || '';
    this.imgElement.className = 'h-full w-full object-cover';

    this.imgElement.onload = () => {
      this.imageLoaded = true;
    };

    this.imgElement.onerror = () => {
      this.imageError = true;
      this.handleImageError();
    };

    this.container.appendChild(this.imgElement);
  }

  private handleImageError(): void {
    // Remove failed image
    if (this.imgElement && this.container) {
      this.imgElement.remove();
      this.imgElement = null;
    }

    // Fallback to initials or icon
    if (this.props.name) {
      this.renderInitials();
    } else {
      this.renderIcon();
    }

    this.props.onImageError?.();
  }

  private renderInitials(): void {
    if (!this.container) return;

    this.fallbackElement = document.createElement('div');
    this.fallbackElement.className = 'flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white';
    this.fallbackElement.textContent = this.getInitials(this.props.name || '');

    this.container.appendChild(this.fallbackElement);
  }

  private renderIcon(): void {
    if (!this.container) return;

    this.fallbackElement = document.createElement('div');
    this.fallbackElement.className = 'flex items-center justify-center h-full w-full';

    const svg = document.createElement('svg');
    svg.className = 'h-2/3 w-2/3 text-gray-400';
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'currentColor');
    svg.innerHTML = '<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />';

    this.fallbackElement.appendChild(svg);
    this.container.appendChild(this.fallbackElement);
  }

  private getInitials(name: string): string {
    if (!name || name.trim().length === 0) return '';

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      // Single word: take first 2 characters
      return words[0].substring(0, 2).toUpperCase();
    }

    // Multiple words: take first character of first two words
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  private createStatusIndicator(): HTMLSpanElement {
    const statusIndicator = document.createElement('span');
    statusIndicator.className = this.getStatusIndicatorClasses();

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
      away: 'bg-yellow-500',
    };

    const bgColor = this.props.statusColor || (this.props.status ? statusColors[this.props.status] : 'bg-gray-400');
    statusIndicator.className = cn(statusIndicator.className, bgColor);

    return statusIndicator;
  }

  private getStatusIndicatorClasses(): string {
    const sizeDimensions = {
      xs: 'h-1.5 w-1.5 border',
      sm: 'h-2 w-2 border',
      md: 'h-2.5 w-2.5 border-2',
      lg: 'h-3 w-3 border-2',
      xl: 'h-3.5 w-3.5 border-2',
      '2xl': 'h-4 w-4 border-2',
    };

    return cn(
      'absolute bottom-0 right-0',
      'rounded-full border-white',
      'transition-colors duration-200',
      sizeDimensions[this.props.size || 'md']
    );
  }

  public updateSrc(newSrc: string): void {
    this.imageError = false;
    this.imageLoaded = false;

    if (this.imgElement) {
      this.imgElement.src = newSrc;
    } else if (this.container) {
      // Remove fallback and render image
      if (this.fallbackElement) {
        this.fallbackElement.remove();
        this.fallbackElement = null;
      }
      this.renderImage();
    }
  }

  public destroy(): void {
    if (this.imgElement) {
      this.imgElement.onload = null;
      this.imgElement.onerror = null;
      this.imgElement = null;
    }
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.fallbackElement = null;
  }
}

export function createAvatar(props: AvatarProps): Avatar {
  return new Avatar(props);
}
