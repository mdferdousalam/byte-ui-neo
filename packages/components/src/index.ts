/**
 * @hikmaui/components v0.4.0
 * React components for HikmaUI - zero external dependencies except React
 *
 * Version: 0.4.0 (In Development - Week 3-4)
 * Progress: 4/20 components complete (20%)
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

// Components (Essential - Week 3-4) - ✅ 5/8 COMPLETE (62.5%)
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { Card, type CardProps } from './components/Card';
export { Badge, type BadgeProps } from './components/Badge';
export { Checkbox, type CheckboxProps } from './components/Checkbox';

// TODO: Complete Week 3-4 (Next 3 components - ~6 hours)
// export { Radio, type RadioProps } from './components/Radio';
// export { Switch, type SwitchProps } from './components/Switch';
// export { Select, type SelectProps } from './components/Select';

// TODO: Advanced Components (Week 5-8) - ⏳ 0/12 PENDING
// export { Modal, type ModalProps } from './components/Modal';
// export { Alert, type AlertProps } from './components/Alert';
// export { Toast, type ToastProps } from './components/Toast';
// export { Avatar, type AvatarProps } from './components/Avatar';
// export { Tooltip, type TooltipProps } from './components/Tooltip';
// export { Dropdown, type DropdownProps } from './components/Dropdown';
// export { Tabs, type TabsProps } from './components/Tabs';
// export { Accordion, type AccordionProps } from './components/Accordion';
// export { Breadcrumb, type BreadcrumbProps } from './components/Breadcrumb';
// export { Pagination, type PaginationProps } from './components/Pagination';
// export { Progress, type ProgressProps } from './components/Progress';
// export { Skeleton, type SkeletonProps } from './components/Skeleton';
