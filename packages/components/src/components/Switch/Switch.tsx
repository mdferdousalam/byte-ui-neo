/**
 * Switch Component - React Adapter
 * Wraps the framework-agnostic Switch core for React
 *
 * Usage:
 * ```tsx
 * import { Switch } from '@hikmaui/components';
 *
 * <Switch
 *   label="Enable notifications"
 *   onChange={(e, checked) => console.log(checked)}
 * />
 * ```
 */

import React, { useRef, useEffect, forwardRef, type ChangeEvent } from 'react';
import { Switch as SwitchCore, type SwitchProps as SwitchCoreProps } from './Switch';

export interface SwitchProps extends Omit<SwitchCoreProps, 'onChange'> {
  /**
   * Change handler (React event)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

/**
 * Switch Component for React
 *
 * @example
 * ```tsx
 * // Basic switch
 * <Switch label="Enable notifications" />
 *
 * // Controlled switch
 * const [enabled, setEnabled] = useState(false);
 * <Switch
 *   label="Dark mode"
 *   checked={enabled}
 *   onChange={(e, checked) => setEnabled(checked)}
 * />
 *
 * // With on/off labels
 * <Switch
 *   label="Feature flag"
 *   showLabels
 *   onLabel="ON"
 *   offLabel="OFF"
 * />
 *
 * // With error
 * <Switch
 *   label="Accept terms"
 *   required
 *   errorMessage={errors.terms}
 * />
 *
 * // Different sizes
 * <Switch label="Small" size="sm" />
 * <Switch label="Medium" size="md" />
 * <Switch label="Large" size="lg" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const {
      onChange,
      checked,
      ...coreProps
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const switchCoreRef = useRef<SwitchCore | null>(null);
    const inputElementRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Create switch core instance
      switchCoreRef.current = new SwitchCore({
        checked,
        ...coreProps,
        onChange: onChange ? (e: Event, checked: boolean) => {
          onChange(e as any, checked);
        } : undefined,
      });

      // Create and mount element
      const element = switchCoreRef.current.createElement();

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
        switchCoreRef.current?.destroy();
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
      coreProps.showLabels,
      coreProps.onLabel,
      coreProps.offLabel,
      ref,
    ]);

    // Update checked state dynamically
    useEffect(() => {
      if (switchCoreRef.current && checked !== undefined) {
        switchCoreRef.current.setChecked(checked);
      }
    }, [checked]);

    return <div ref={containerRef} />;
  }
);

Switch.displayName = 'Switch';

/**
 * Export types for TypeScript users
 */
export type { SwitchProps };
export default Switch;
