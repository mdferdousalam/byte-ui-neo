/**
 * Card Component Exports
 * Framework-agnostic card with React adapter
 */

// Core card (framework-agnostic)
export { Card as CardCore, createCard, type CardProps as CardCoreProps } from './Card';

// React adapter (default export)
export { Card, type CardProps } from './Card.tsx';
export { default } from './Card.tsx';
