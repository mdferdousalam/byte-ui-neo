/**
 * Radio Component - React Adapter
 * Wraps the framework-agnostic Radio core for React
 *
 * Usage:
 * ```tsx
 * import { Radio } from '@hikmaui/components';
 *
 * <Radio
 *   name="option"
 *   value="1"
 *   label="Option 1"
 *   onChange={(e, value) => console.log(value)}
 * />
 * ```
 */

import React, { useRef, useEffect, forwardRef, type ChangeEvent } from 'react';
import { Radio as RadioCore, type RadioProps as RadioCoreProps } from './Radio';

export interface RadioProps extends Omit<RadioCoreProps, 'onChange'> {
  /**
   * Change handler (React event)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

/**
 * Radio Component for React
 *
 * @example
 * ```tsx
 * // Basic radio
 * <Radio name="option" value="1" label="Option 1" />
 *
 * // Controlled radio
 * const [selected, setSelected] = useState('1');
 * <Radio
 *   name="option"
 *   value="1"
 *   label="Option 1"
 *   checked={selected === '1'}
 *   onChange={(e, value) => setSelected(value)}
 * />
 *
 * // Radio group
 * const options = ['Option 1', 'Option 2', 'Option 3'];
 * {options.map((opt, i) => (
 *   <Radio
 *     key={i}
 *     name="options"
 *     value={String(i + 1)}
 *     label={opt}
 *     checked={selected === String(i + 1)}
 *     onChange={(e, value) => setSelected(value)}
 *   />
 * ))}
 *
 * // With error
 * <Radio
 *   name="option"
 *   value="1"
 *   label="I agree"
 *   required
 *   errorMessage={errors.option}
 * />
 *
 * // Different sizes
 * <Radio name="option" value="1" label="Small" size="sm" />
 * <Radio name="option" value="2" label="Medium" size="md" />
 * <Radio name="option" value="3" label="Large" size="lg" />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      onChange,
      checked,
      ...coreProps
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const radioCoreRef = useRef<RadioCore | null>(null);
    const inputElementRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Create radio core instance
      radioCoreRef.current = new RadioCore({
        checked,
        ...coreProps,
        onChange: onChange ? (e: Event, value: string) => {
          onChange(e as any, value);
        } : undefined,
      });

      // Create and mount element
      const element = radioCoreRef.current.createElement();

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
        radioCoreRef.current?.destroy();
      };
    }, [
      onChange,
      coreProps.name,
      coreProps.value,
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
      if (radioCoreRef.current && checked !== undefined) {
        radioCoreRef.current.setChecked(checked);
      }
    }, [checked]);

    return <div ref={containerRef} />;
  }
);

Radio.displayName = 'Radio';

/**
 * Export types for TypeScript users
 */
export type { RadioProps };
export default Radio;
