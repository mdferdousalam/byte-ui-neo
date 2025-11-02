/**
 * Input Component - React Adapter
 * Wraps the framework-agnostic Input core for React
 *
 * Usage:
 * ```tsx
 * import { Input } from '@hikmaui/components';
 *
 * <Input
 *   type="email"
 *   label="Email"
 *   placeholder="Enter your email"
 *   onChange={(e, value) => console.log(value)}
 * />
 * ```
 */

import React, { useRef, useEffect, forwardRef, type ChangeEvent, type FocusEvent } from 'react';
import { Input as InputCore, type InputProps as InputCoreProps } from './Input';

export interface InputProps extends Omit<InputCoreProps, 'onChange' | 'onFocus' | 'onBlur' | 'iconStart' | 'iconEnd'> {
  /**
   * Change handler (React event)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;

  /**
   * Focus handler (React event)
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Blur handler (React event)
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Start icon (React element)
   */
  iconStart?: React.ReactNode;

  /**
   * End icon (React element)
   */
  iconEnd?: React.ReactNode;
}

/**
 * Input Component for React
 *
 * @example
 * ```tsx
 * // Text input with label
 * <Input label="Username" placeholder="Enter username" />
 *
 * // Email input with validation
 * <Input
 *   type="email"
 *   label="Email"
 *   required
 *   errorMessage={errors.email}
 * />
 *
 * // Password input with icon
 * <Input
 *   type="password"
 *   label="Password"
 *   iconStart={<LockIcon />}
 * />
 *
 * // Input with helper text
 * <Input
 *   label="Bio"
 *   helperText="Tell us about yourself"
 *   maxLength={200}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      onChange,
      onFocus,
      onBlur,
      iconStart,
      iconEnd,
      variant = 'default',
      size = 'md',
      type = 'text',
      ...coreProps
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const inputCoreRef = useRef<InputCore | null>(null);
    const inputElementRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Convert React icons to HTML
      const iconStartElement = iconStart ? convertReactIconToHTML(iconStart) : undefined;
      const iconEndElement = iconEnd ? convertReactIconToHTML(iconEnd) : undefined;

      // Create input core instance
      inputCoreRef.current = new InputCore({
        variant,
        size,
        type,
        ...coreProps,
        iconStart: iconStartElement,
        iconEnd: iconEndElement,
        onChange: onChange ? (e: Event, value: string) => {
          onChange(e as any, value);
        } : undefined,
        onFocus: onFocus ? (e: FocusEvent) => {
          onFocus(e as any);
        } : undefined,
        onBlur: onBlur ? (e: FocusEvent) => {
          onBlur(e as any);
        } : undefined,
      });

      // Create and mount element
      const element = inputCoreRef.current.createElement();

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(element);

        // Get the actual input element
        inputElementRef.current = element.querySelector('input');

        // Set ref
        if (inputElementRef.current) {
          if (typeof ref === 'function') {
            ref(inputElementRef.current);
          } else if (ref) {
            ref.current = inputElementRef.current;
          }
        }
      }

      // Cleanup
      return () => {
        inputCoreRef.current?.destroy();
      };
    }, [
      onChange,
      onFocus,
      onBlur,
      iconStart,
      iconEnd,
      variant,
      size,
      type,
      coreProps.value,
      coreProps.placeholder,
      coreProps.disabled,
      coreProps.readonly,
      coreProps.required,
      coreProps.label,
      coreProps.helperText,
      coreProps.errorMessage,
      ref,
    ]);

    // Update error message dynamically
    useEffect(() => {
      if (inputCoreRef.current) {
        if (coreProps.errorMessage) {
          inputCoreRef.current.setError(coreProps.errorMessage);
        } else {
          inputCoreRef.current.clearError();
        }
      }
    }, [coreProps.errorMessage]);

    // Update disabled state dynamically
    useEffect(() => {
      if (inputCoreRef.current && coreProps.disabled !== undefined) {
        inputCoreRef.current.setDisabled(coreProps.disabled);
      }
    }, [coreProps.disabled]);

    return <div ref={containerRef} />;
  }
);

Input.displayName = 'Input';

/**
 * Helper: Convert React icon to HTML element
 */
function convertReactIconToHTML(icon: React.ReactNode): HTMLElement | string {
  if (typeof icon === 'string') {
    return icon;
  }

  // Create temporary container for React icon
  const container = document.createElement('span');
  container.className = 'h-5 w-5';

  // For now, use placeholder - in production, use ReactDOMServer.renderToString()
  if (React.isValidElement(icon)) {
    container.innerHTML = `<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="8"/>
    </svg>`;
  }

  return container;
}

/**
 * Export types for TypeScript users
 */
export type { InputProps };
export default Input;
