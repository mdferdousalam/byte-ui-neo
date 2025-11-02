/**
 * Badge Component - React Adapter
 * Wraps the framework-agnostic Badge core for React
 *
 * Usage:
 * ```tsx
 * import { Badge } from '@hikmaui/components';
 *
 * <Badge color="blue">New</Badge>
 * <Badge variant="outline" color="green">Success</Badge>
 * <Badge variant="dot" color="red">3 unread</Badge>
 * ```
 */

import React, { useRef, useEffect, forwardRef } from 'react';
import { Badge as BadgeCore, type BadgeProps as BadgeCoreProps } from './Badge';

export interface BadgeProps extends Omit<BadgeCoreProps, 'children' | 'icon'> {
  /**
   * Badge content (React children)
   */
  children?: React.ReactNode;

  /**
   * Icon (React element)
   */
  icon?: React.ReactNode;
}

/**
 * Badge Component for React
 *
 * @example
 * ```tsx
 * // Solid badge (default)
 * <Badge color="blue">New</Badge>
 *
 * // Outline badge
 * <Badge variant="outline" color="green">Success</Badge>
 *
 * // Dot badge
 * <Badge variant="dot" color="red">3 unread messages</Badge>
 *
 * // Dismissible badge
 * <Badge dismissible onDismiss={() => console.log('dismissed')}>
 *   Dismissible
 * </Badge>
 *
 * // With icon
 * <Badge icon={<CheckIcon />} color="green">
 *   Verified
 * </Badge>
 *
 * // Different sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const {
      children,
      icon,
      variant = 'solid',
      color = 'blue',
      size = 'md',
      ...coreProps
    } = props;

    const elementRef = useRef<HTMLSpanElement>(null);
    const badgeCoreRef = useRef<BadgeCore | null>(null);

    useEffect(() => {
      // Convert React children to HTML or string
      const childrenContent = typeof children === 'string'
        ? children
        : children?.toString() || '';

      // Convert React icon to HTML
      const iconElement = icon ? convertReactIconToHTML(icon) : undefined;

      // Create badge core instance
      badgeCoreRef.current = new BadgeCore({
        variant,
        color,
        size,
        ...coreProps,
        children: childrenContent,
        icon: iconElement,
      });

      // Create and mount element
      const element = badgeCoreRef.current.createElement();

      if (elementRef.current?.parentNode) {
        elementRef.current.parentNode.replaceChild(element, elementRef.current);
      }

      // Set ref
      (elementRef as any).current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }

      // Cleanup
      return () => {
        badgeCoreRef.current?.destroy();
      };
    }, [
      children,
      icon,
      variant,
      color,
      size,
      coreProps.dismissible,
      coreProps.onDismiss,
      ref,
    ]);

    // Return placeholder element (will be replaced by badgeCore.createElement())
    return <span ref={elementRef as any} />;
  }
);

Badge.displayName = 'Badge';

/**
 * Helper: Convert React icon to HTML element
 */
function convertReactIconToHTML(icon: React.ReactNode): HTMLElement | string {
  if (typeof icon === 'string') {
    return icon;
  }

  // Create temporary container for React icon
  const container = document.createElement('span');
  container.className = 'h-4 w-4';

  // Placeholder - in production, use ReactDOMServer.renderToString()
  if (React.isValidElement(icon)) {
    container.innerHTML = `<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="6"/>
    </svg>`;
  }

  return container;
}

/**
 * Export types for TypeScript users
 */
export type { BadgeProps };
export default Badge;
