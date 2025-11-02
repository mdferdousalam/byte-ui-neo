/**
 * Badge Component Exports
 * Framework-agnostic badge with React adapter
 */

// Core badge (framework-agnostic)
export { Badge as BadgeCore, createBadge, type BadgeProps as BadgeCoreProps } from './Badge';

// React adapter (default export)
export { Badge, type BadgeProps } from './Badge.tsx';
export { default } from './Badge.tsx';
