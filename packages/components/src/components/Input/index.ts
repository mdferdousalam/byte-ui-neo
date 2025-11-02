/**
 * Input Component Exports
 * Framework-agnostic input with React adapter
 */

// Core input (framework-agnostic)
export { Input as InputCore, createInput, type InputProps as InputCoreProps } from './Input';

// React adapter (default export)
export { Input, type InputProps } from './Input.tsx';
export { default } from './Input.tsx';
