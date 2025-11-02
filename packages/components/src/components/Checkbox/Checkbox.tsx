/**
 * Checkbox Component - React Adapter
 * Wraps the framework-agnostic Checkbox core for React
 *
 * Usage:
 * ```tsx
 * import { Checkbox } from '@hikmaui/components';
 *
 * <Checkbox
 *   label="Accept terms"
 *   onChange={(e, checked) => console.log(checked)}
 * />
 * ```
 */

import React, { useRef, useEffect, forwardRef, type ChangeEvent } from 'react';
import { Checkbox as CheckboxCore, type CheckboxProps as CheckboxCoreProps } from './Checkbox';

export interface CheckboxProps extends Omit<CheckboxCoreProps, 'onChange'> {
  /**
   * Change handler (React event)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

/**
 * Checkbox Component for React
 *
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox label="Accept terms" />
 *
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   label="Subscribe"
 *   checked={checked}
 *   onChange={(e, checked) => setChecked(checked)}
 * />
 *
 * // Indeterminate checkbox (for "select all")
 * <Checkbox
 *   label="Select all"
 *   indeterminate={someChecked && !allChecked}
 *   checked={allChecked}
 * />
 *
 * // With error
 * <Checkbox
 *   label="I agree"
 *   required
 *   errorMessage={errors.agree}
 * />
 *
 * // Different sizes
 * <Checkbox label="Small" size="sm" />
 * <Checkbox label="Medium" size="md" />
 * <Checkbox label="Large" size="lg" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      onChange,
      checked,
      indeterminate,
      ...coreProps
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const checkboxCoreRef = useRef<CheckboxCore | null>(null);
    const inputElementRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Create checkbox core instance
      checkboxCoreRef.current = new CheckboxCore({
        checked,
        indeterminate,
        ...coreProps,
        onChange: onChange ? (e: Event, checked: boolean) => {
          onChange(e as any, checked);
        } : undefined,
      });

      // Create and mount element
      const element = checkboxCoreRef.current.createElement();

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
        checkboxCoreRef.current?.destroy();
      };
    }, [
      onChange,
      coreProps.label,
      coreProps.labelPosition,
      coreProps.helperText,
      coreProps.errorMessage,
      coreProps.disabled,
      coreProps.required,
      coreProps.size,
      ref,
    ]);

    // Update checked state dynamically
    useEffect(() => {
      if (checkboxCoreRef.current && checked !== undefined) {
        checkboxCoreRef.current.setChecked(checked);
      }
    }, [checked]);

    // Update indeterminate state dynamically
    useEffect(() => {
      if (checkboxCoreRef.current && indeterminate !== undefined) {
        checkboxCoreRef.current.setIndeterminate(indeterminate);
      }
    }, [indeterminate]);

    return <div ref={containerRef} />;
  }
);

Checkbox.displayName = 'Checkbox';

/**
 * Export types for TypeScript users
 */
export type { CheckboxProps };
export default Checkbox;
