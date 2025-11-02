/**
 * Select Component Exports
 * Framework-agnostic select with React adapter
 */

// Core select (framework-agnostic)
export {
  Select as SelectCore,
  createSelect,
  type SelectProps as SelectCoreProps,
  type SelectOption,
} from './Select';

// React adapter (default export)
export { Select, type SelectProps } from './Select.tsx';
export { default } from './Select.tsx';
