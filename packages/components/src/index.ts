/**
 * @hikmaui/components v0.7.0
 * React components for HikmaUI - zero external dependencies except React
 *
 * Version: 0.7.0 (Week 5 Complete)
 * Progress: 14/20 components complete (70%)
 * License: MIT
 *
 * @packageDocumentation
 */

// Core utilities (re-exported from @hikmaui/core)
export { cx, cn, merge, cva, type ClassValue, type VariantProps } from '@hikmaui/core';

// Component utilities
export { composeRefs, generateId, debounce, throttle } from './lib/utils';

// Core infrastructure
export { BaseComponent, type BaseComponentProps } from './core/base-component';
export * from './core/accessibility';
export * from './core/component-variants';

// Components (Essential - Week 3-4) - ✅ 8/8 COMPLETE (100%)
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { Card, type CardProps } from './components/Card';
export { Badge, type BadgeProps } from './components/Badge';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Radio, type RadioProps } from './components/Radio';
export { Switch, type SwitchProps } from './components/Switch';
export { Select, type SelectProps, type SelectOption } from './components/Select';

// Advanced Components (Week 5) - ✅ 6/6 COMPLETE (100%)
export { Modal, type ModalProps } from './components/Modal';
export { Alert, type AlertProps, type AlertAction } from './components/Alert';
export { Toast, toast, createToast, type ToastProps, type ToastOptions } from './components/Toast';
export { Avatar, type AvatarProps, type AvatarSize, type AvatarStatus, type AvatarShape } from './components/Avatar';
export { Tooltip, type TooltipProps, type TooltipPosition } from './components/Tooltip';
export {
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownMenuItem,
  type DropdownMenuSeparator,
  type DropdownMenuLabel,
  type DropdownMenuItemType,
} from './components/DropdownMenu';

// TODO: Week 6 (6 components)
// export { Tabs, type TabsProps } from './components/Tabs';
// export { Accordion, type AccordionProps } from './components/Accordion';
// export { Breadcrumb, type BreadcrumbProps } from './components/Breadcrumb';
// export { Pagination, type PaginationProps } from './components/Pagination';
// export { Progress, type ProgressProps } from './components/Progress';
// export { Skeleton, type SkeletonProps } from './components/Skeleton';
