/**
 * Alert Component - React Adapter
 * Wraps the framework-agnostic Alert core for React
 *
 * Usage:
 * ```tsx
 * import { Alert } from '@hikmaui/components';
 *
 * <Alert
 *   type="success"
 *   title="Success"
 *   message="Your changes have been saved."
 *   dismissible
 * />
 * ```
 */

import React, { useRef, useEffect } from 'react';
import { Alert as AlertCore, type AlertProps as AlertCoreProps } from './Alert';

export interface AlertProps extends AlertCoreProps {}

/**
 * Alert Component for React
 *
 * @example
 * ```tsx
 * // Info alert
 * <Alert type="info" message="Important information" />
 *
 * // Success with title
 * <Alert
 *   type="success"
 *   title="Success!"
 *   message="Your profile has been updated."
 * />
 *
 * // Dismissible alert
 * <Alert
 *   type="warning"
 *   message="Please review your settings."
 *   dismissible
 *   onDismiss={() => console.log('Dismissed')}
 * />
 *
 * // With actions
 * <Alert
 *   type="error"
 *   title="Error occurred"
 *   message="Failed to save changes."
 *   actions={[
 *     { label: 'Retry', onClick: handleRetry, variant: 'primary' },
 *     { label: 'Cancel', onClick: handleCancel }
 *   ]}
 * />
 * ```
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const alertCoreRef = useRef<AlertCore | null>(null);

  useEffect(() => {
    // Create alert core instance
    alertCoreRef.current = new AlertCore(props);

    // Create and mount element
    const element = alertCoreRef.current.createElement();

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);
    }

    // Cleanup
    return () => {
      alertCoreRef.current?.destroy();
    };
  }, [
    props.type,
    props.title,
    props.message,
    props.dismissible,
    props.showIcon,
    props.actions,
    props.onDismiss,
  ]);

  return <div ref={containerRef} />;
};

Alert.displayName = 'Alert';

export type { AlertProps, AlertAction } from './Alert';
export default Alert;
