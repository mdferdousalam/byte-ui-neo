/**
 * Component Variant System
 * Type-safe variant management using HikmaUI's built-in cva
 *
 * Zero external dependencies - uses @hikmaui/core's cva implementation
 */

import { cva, type VariantProps } from '@hikmaui/core';

/**
 * Button Component Variants
 * Supports all common button patterns with HikmaUI utilities
 */
export const buttonVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600',
      outline: 'border-2 border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-600',
      ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-600',
      link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-600',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    },
    size: {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      class: 'bg-white dark:bg-gray-900',
    },
    {
      variant: 'ghost',
      class: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Input Component Variants
 */
export const inputVariants = cva({
  base: 'flex w-full rounded-md border px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      default: 'border-gray-300 bg-white focus-visible:ring-blue-600',
      error: 'border-red-500 bg-red-50 focus-visible:ring-red-600',
      success: 'border-green-500 bg-green-50 focus-visible:ring-green-600',
    },
    size: {
      sm: 'h-9 text-xs',
      md: 'h-10',
      lg: 'h-11 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;

/**
 * Card Component Variants
 */
export const cardVariants = cva({
  base: 'rounded-lg border transition-all',
  variants: {
    variant: {
      elevated: 'bg-white shadow-md hover:shadow-lg',
      outline: 'border-gray-300 bg-white',
      glass: 'bg-white/80 backdrop-blur-md border-white/20',
      flat: 'bg-gray-100 border-transparent',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'cursor-pointer hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
    interactive: false,
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;

/**
 * Badge Component Variants
 */
export const badgeVariants = cva({
  base: 'inline-flex items-center rounded-full font-medium transition-colors',
  variants: {
    variant: {
      solid: '',
      outline: 'border-2',
      dot: 'pl-2',
    },
    color: {
      blue: '',
      green: '',
      red: '',
      yellow: '',
      gray: '',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    },
  },
  compoundVariants: [
    // Blue solid
    { variant: 'solid', color: 'blue', class: 'bg-blue-600 text-white' },
    // Blue outline
    { variant: 'outline', color: 'blue', class: 'border-blue-600 text-blue-600 bg-white' },
    // Green solid
    { variant: 'solid', color: 'green', class: 'bg-green-600 text-white' },
    // Green outline
    { variant: 'outline', color: 'green', class: 'border-green-600 text-green-600 bg-white' },
    // Red solid
    { variant: 'solid', color: 'red', class: 'bg-red-600 text-white' },
    // Red outline
    { variant: 'outline', color: 'red', class: 'border-red-600 text-red-600 bg-white' },
    // Yellow solid
    { variant: 'solid', color: 'yellow', class: 'bg-yellow-500 text-white' },
    // Yellow outline
    { variant: 'outline', color: 'yellow', class: 'border-yellow-500 text-yellow-700 bg-white' },
    // Gray solid
    { variant: 'solid', color: 'gray', class: 'bg-gray-600 text-white' },
    // Gray outline
    { variant: 'outline', color: 'gray', class: 'border-gray-600 text-gray-600 bg-white' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'blue',
    size: 'md',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;

/**
 * Alert Component Variants
 */
export const alertVariants = cva({
  base: 'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7',
  variants: {
    variant: {
      info: 'bg-blue-50 text-blue-900 border-blue-200 [&>svg]:text-blue-600',
      success: 'bg-green-50 text-green-900 border-green-200 [&>svg]:text-green-600',
      warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 [&>svg]:text-yellow-600',
      error: 'bg-red-50 text-red-900 border-red-200 [&>svg]:text-red-600',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;

/**
 * Avatar Component Variants
 */
export const avatarVariants = cva({
  base: 'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-600 font-medium',
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    },
    ring: {
      true: 'ring-2 ring-white',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    ring: false,
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;

/**
 * Progress Component Variants
 */
export const progressVariants = cva({
  base: 'relative w-full overflow-hidden rounded-full bg-gray-200',
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    },
    color: {
      blue: '[&>div]:bg-blue-600',
      green: '[&>div]:bg-green-600',
      red: '[&>div]:bg-red-600',
      yellow: '[&>div]:bg-yellow-500',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'blue',
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;

/**
 * Skeleton Component Variants
 */
export const skeletonVariants = cva({
  base: 'animate-pulse rounded-md bg-gray-200',
  variants: {
    variant: {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
