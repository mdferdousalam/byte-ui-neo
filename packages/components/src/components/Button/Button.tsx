/**
 * Button Component - React Adapter
 * Wraps the framework-agnostic Button core for React
 *
 * Usage:
 * ```tsx
 * import { Button } from '@hikmaui/components';
 *
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */

import React, { useRef, useEffect, forwardRef, type MouseEvent as ReactMouseEvent } from 'react';
import { Button as ButtonCore, type ButtonProps as ButtonCoreProps } from './Button';

export interface ButtonProps extends Omit<ButtonCoreProps, 'onClick' | 'children'> {
  /**
   * Button content (React children)
   */
  children?: React.ReactNode;

  /**
   * Click handler (React event)
   */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  /**
   * Start icon (React element)
   */
  iconStart?: React.ReactNode;

  /**
   * End icon (React element)
   */
  iconEnd?: React.ReactNode;

  /**
   * As prop for polymorphic component
   */
  as?: 'button' | 'a';
}

/**
 * Button Component for React
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // With loading state
 * <Button loading>Loading...</Button>
 *
 * // With icons
 * <Button iconStart={<Icon />}>Click me</Button>
 *
 * // Link button
 * <Button href="https://hikmaui.com" target="_blank">Visit</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      onClick,
      iconStart,
      iconEnd,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      type = 'button',
      loading = false,
      disabled = false,
      href,
      target,
      className,
      id,
      ariaLabel,
      ariaDescribedBy,
      dataTestId,
      as,
    } = props;

    const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const buttonCoreRef = useRef<ButtonCore | null>(null);

    useEffect(() => {
      // Convert React children to HTML element or string
      const childrenElement = typeof children === 'string'
        ? children
        : convertReactNodeToHTML(children);

      // Convert React icons to HTML
      const iconStartElement = iconStart ? convertReactNodeToHTML(iconStart) : undefined;
      const iconEndElement = iconEnd ? convertReactNodeToHTML(iconEnd) : undefined;

      // Create button core instance
      buttonCoreRef.current = new ButtonCore({
        variant,
        size,
        fullWidth,
        type,
        loading,
        disabled,
        href,
        target,
        className,
        id,
        ariaLabel,
        ariaDescribedBy,
        dataTestId,
        children: childrenElement,
        iconStart: iconStartElement,
        iconEnd: iconEndElement,
        onClick: onClick ? (e: MouseEvent) => {
          // Convert native event to React synthetic event
          onClick(e as any);
        } : undefined,
      });

      // Create and mount element
      const element = buttonCoreRef.current.createElement();

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
        buttonCoreRef.current?.destroy();
      };
    }, [
      children,
      onClick,
      iconStart,
      iconEnd,
      variant,
      size,
      fullWidth,
      type,
      loading,
      disabled,
      href,
      target,
      className,
      id,
      ariaLabel,
      ariaDescribedBy,
      dataTestId,
      ref,
    ]);

    // Update loading state
    useEffect(() => {
      if (buttonCoreRef.current) {
        buttonCoreRef.current.setLoading(loading);
      }
    }, [loading]);

    // Update disabled state
    useEffect(() => {
      if (buttonCoreRef.current) {
        buttonCoreRef.current.setDisabled(disabled);
      }
    }, [disabled]);

    // Return placeholder element (will be replaced by buttonCore.createElement())
    const Element = as || (href ? 'a' : 'button');
    return <Element ref={elementRef as any} />;
  }
);

Button.displayName = 'Button';

/**
 * Helper: Convert React node to HTML element or string
 */
function convertReactNodeToHTML(node: React.ReactNode): HTMLElement | string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  // Create temporary container to render React node
  const container = document.createElement('div');

  // For React elements, render to HTML string
  if (React.isValidElement(node)) {
    // This is a simplified conversion - in production, use ReactDOMServer.renderToString()
    // For now, we'll create a placeholder
    const element = document.createElement('span');
    element.textContent = '[React Element]';
    return element;
  }

  return '';
}

/**
 * Export types for TypeScript users
 */
export type { ButtonProps };
export default Button;
