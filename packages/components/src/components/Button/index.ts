/**
 * Button Component Exports
 * Framework-agnostic button with React adapter
 */

// Core button (framework-agnostic)
export { Button as ButtonCore, createButton, type ButtonProps as ButtonCoreProps } from './Button';

// React adapter (default export)
export { Button, type ButtonProps } from './Button.tsx';
export { default } from './Button.tsx';
