/**
 * Card Component - React Adapter
 * Wraps the framework-agnostic Card core for React
 *
 * Usage:
 * ```tsx
 * import { Card } from '@hikmaui/components';
 *
 * <Card variant="elevated">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here...</p>
 * </Card>
 * ```
 */

import React, { useRef, useEffect, forwardRef, type MouseEvent as ReactMouseEvent } from 'react';
import { Card as CardCore, type CardProps as CardCoreProps } from './Card';

export interface CardProps extends Omit<CardCoreProps, 'children' | 'onClick'> {
  /**
   * Card content (React children)
   */
  children?: React.ReactNode;

  /**
   * Click handler (React event)
   */
  onClick?: (event: ReactMouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}

/**
 * Card Component for React
 *
 * @example
 * ```tsx
 * // Elevated card (default)
 * <Card>
 *   <h3 className="text-lg font-semibold">Title</h3>
 *   <p className="text-gray-600">Content</p>
 * </Card>
 *
 * // Outline card with custom padding
 * <Card variant="outline" padding="lg">
 *   Large padded card
 * </Card>
 *
 * // Interactive card (clickable)
 * <Card interactive onClick={() => console.log('clicked')}>
 *   Click me!
 * </Card>
 *
 * // Link card
 * <Card href="https://hikmaui.com" target="_blank">
 *   Visit HikmaUI
 * </Card>
 *
 * // Glass effect card
 * <Card variant="glass" padding="md">
 *   Glassmorphism effect
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(
  (props, ref) => {
    const {
      children,
      onClick,
      variant = 'elevated',
      padding = 'md',
      interactive,
      ...coreProps
    } = props;

    const elementRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
    const cardCoreRef = useRef<CardCore | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Create card core instance
      cardCoreRef.current = new CardCore({
        variant,
        padding,
        interactive,
        ...coreProps,
        onClick: onClick ? (e: MouseEvent) => {
          onClick(e as any);
        } : undefined,
      });

      // Create and mount element
      const element = cardCoreRef.current.createElement();

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

      // Mount React children into card
      if (contentRef.current && element) {
        element.innerHTML = '';
        element.appendChild(contentRef.current);
      }

      // Cleanup
      return () => {
        cardCoreRef.current?.destroy();
      };
    }, [
      onClick,
      variant,
      padding,
      interactive,
      coreProps.disabled,
      coreProps.href,
      coreProps.target,
      coreProps.className,
      ref,
    ]);

    // Update disabled state dynamically
    useEffect(() => {
      if (cardCoreRef.current && coreProps.disabled !== undefined) {
        cardCoreRef.current.setDisabled(coreProps.disabled);
      }
    }, [coreProps.disabled]);

    // Two-phase render: React children container + card element
    return (
      <>
        {/* Hidden container for React children */}
        <div ref={contentRef} style={{ display: 'contents' }}>
          {children}
        </div>
        {/* Placeholder for card element (will be replaced by cardCore.createElement()) */}
        <div ref={elementRef as any} />
      </>
    );
  }
);

Card.displayName = 'Card';

/**
 * Export types for TypeScript users
 */
export type { CardProps };
export default Card;
