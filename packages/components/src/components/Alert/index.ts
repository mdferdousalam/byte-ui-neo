/**
 * Alert Component Exports
 * Framework-agnostic alert with React adapter
 */

// Core alert (framework-agnostic)
export { Alert as AlertCore, createAlert, type AlertProps as AlertCoreProps, type AlertAction } from './Alert';

// React adapter (default export)
export { Alert, type AlertProps } from './Alert.tsx';
export { default } from './Alert.tsx';
