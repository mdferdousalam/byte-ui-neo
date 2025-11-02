/**
 * Radio Component Exports
 * Framework-agnostic radio with React adapter
 */

// Core radio (framework-agnostic)
export { Radio as RadioCore, createRadio, type RadioProps as RadioCoreProps } from './Radio';

// React adapter (default export)
export { Radio, type RadioProps } from './Radio.tsx';
export { default } from './Radio.tsx';
