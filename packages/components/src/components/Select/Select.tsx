/**
 * Select Component - React Adapter
 * Wraps the framework-agnostic Select core for React
 *
 * Usage:
 * ```tsx
 * import { Select } from '@hikmaui/components';
 *
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   onChange={(e, value) => console.log(value)}
 * />
 * ```
 */

import React, { useRef, useEffect, forwardRef, type ChangeEvent } from 'react';
import { Select as SelectCore, type SelectProps as SelectCoreProps } from './Select';

export interface SelectProps extends Omit<SelectCoreProps, 'onChange'> {
  /**
   * Change handler (React event)
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>, value: string | string[]) => void;
}

/**
 * Select Component for React
 *
 * @example
 * ```tsx
 * // Basic select
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *     { value: '3', label: 'Option 3' }
 *   ]}
 * />
 *
 * // Controlled select
 * const [value, setValue] = useState('');
 * <Select
 *   label="Choose option"
 *   options={options}
 *   value={value}
 *   onChange={(e, value) => setValue(value as string)}
 * />
 *
 * // With search
 * <Select
 *   label="Search countries"
 *   options={countries}
 *   searchable
 *   searchPlaceholder="Type to search..."
 * />
 *
 * // Multi-select
 * const [values, setValues] = useState<string[]>([]);
 * <Select
 *   label="Select multiple"
 *   options={options}
 *   multiple
 *   value={values}
 *   onChange={(e, value) => setValues(value as string[])}
 * />
 *
 * // With descriptions
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1', description: 'First option' },
 *     { value: '2', label: 'Option 2', description: 'Second option' }
 *   ]}
 * />
 *
 * // With error
 * <Select
 *   label="Required field"
 *   options={options}
 *   required
 *   errorMessage={errors.field}
 * />
 *
 * // Different sizes
 * <Select options={options} size="sm" />
 * <Select options={options} size="md" />
 * <Select options={options} size="lg" />
 * ```
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const {
      onChange,
      value,
      ...coreProps
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const selectCoreRef = useRef<SelectCore | null>(null);
    const buttonElementRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      // Create select core instance
      selectCoreRef.current = new SelectCore({
        value,
        ...coreProps,
        onChange: onChange ? (e: Event, value: string | string[]) => {
          onChange(e as any, value);
        } : undefined,
      });

      // Create and mount element
      const element = selectCoreRef.current.createElement();

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(element);

        // Get the actual button element
        buttonElementRef.current = element.querySelector('button');

        // Set ref
        if (buttonElementRef.current) {
          if (typeof ref === 'function') {
            ref(buttonElementRef.current);
          } else if (ref) {
            ref.current = buttonElementRef.current;
          }
        }
      }

      // Cleanup
      return () => {
        selectCoreRef.current?.destroy();
      };
    }, [
      onChange,
      coreProps.options,
      coreProps.label,
      coreProps.helperText,
      coreProps.errorMessage,
      coreProps.disabled,
      coreProps.required,
      coreProps.size,
      coreProps.multiple,
      coreProps.searchable,
      coreProps.searchPlaceholder,
      coreProps.placeholder,
      ref,
    ]);

    // Update value dynamically
    useEffect(() => {
      if (selectCoreRef.current && value !== undefined) {
        selectCoreRef.current.setValue(value);
      }
    }, [value]);

    return <div ref={containerRef} />;
  }
);

Select.displayName = 'Select';

/**
 * Export types for TypeScript users
 */
export type { SelectProps };
export type { SelectOption } from './Select';
export default Select;
