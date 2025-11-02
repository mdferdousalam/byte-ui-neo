/**
 * Checkbox Component Exports
 * Framework-agnostic checkbox with React adapter
 */

// Core checkbox (framework-agnostic)
export { Checkbox as CheckboxCore, createCheckbox, type CheckboxProps as CheckboxCoreProps } from './Checkbox';

// React adapter (default export)
export { Checkbox, type CheckboxProps } from './Checkbox.tsx';
export { default } from './Checkbox.tsx';
