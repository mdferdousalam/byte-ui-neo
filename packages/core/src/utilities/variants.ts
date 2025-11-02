/**
 * Component variant system for HikmaUI.
 * Zero-dependency replacement for class-variance-authority (CVA).
 *
 * Provides type-safe variant management for components with:
 * - Multiple variant dimensions (size, color, etc.)
 * - Default variants
 * - Compound variants (combinations)
 * - Class name merging
 *
 * @packageDocumentation
 */

import type { ClassValue } from './class-names';
import { merge } from './class-merge';

/**
 * Variant configuration schema.
 * Maps variant keys to their possible values and classes.
 *
 * @example
 * {
 *   variant: {
 *     primary: 'bg-blue-500',
 *     secondary: 'bg-gray-500'
 *   },
 *   size: {
 *     sm: 'px-3 py-1',
 *     lg: 'px-6 py-3'
 *   }
 * }
 */
export type VariantSchema = Record<string, Record<string, string>>;

/**
 * Compound variant configuration.
 * Applies additional classes when multiple variants match.
 *
 * @example
 * {
 *   variant: 'primary',
 *   size: 'lg',
 *   class: 'font-bold' // Applied only when both conditions match
 * }
 */
export interface CompoundVariant<V extends VariantSchema> {
  /**
   * Variant conditions (all must match).
   */
  [K: string]: string | string[] | undefined;

  /**
   * Classes to apply when conditions match.
   */
  class: string | string[];
}

/**
 * Configuration for createVariants().
 */
export interface VariantConfig<V extends VariantSchema> {
  /**
   * Base classes applied to all variants.
   */
  base?: ClassValue;

  /**
   * Variant definitions.
   */
  variants?: V;

  /**
   * Compound variants (applied when multiple variants match).
   */
  compoundVariants?: Array<CompoundVariant<V>>;

  /**
   * Default variant values.
   */
  defaultVariants?: {
    [K in keyof V]?: keyof V[K];
  };
}

/**
 * Props type for variant function.
 * Extracts variant keys and adds className support.
 */
export type VariantProps<V extends VariantSchema> = {
  [K in keyof V]?: keyof V[K];
} & {
  className?: ClassValue;
  class?: ClassValue; // Alternative syntax
};

/**
 * Creates a type-safe variant function for components.
 *
 * @param config - Variant configuration
 * @returns Function that accepts variant props and returns merged classes
 *
 * @example
 * const button = createVariants({
 *   base: 'inline-flex rounded-md font-medium',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white',
 *     },
 *     size: {
 *       sm: 'px-3 py-1 text-sm',
 *       lg: 'px-6 py-3 text-lg',
 *     },
 *   },
 *   compoundVariants: [
 *     {
 *       variant: 'primary',
 *       size: 'lg',
 *       class: 'font-bold', // Only when primary + lg
 *     },
 *   ],
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'sm',
 *   },
 * });
 *
 * // Usage:
 * button({ variant: 'secondary', size: 'lg' })
 * // => 'inline-flex rounded-md font-medium bg-gray-500 text-white px-6 py-3 text-lg'
 *
 * button({ variant: 'primary', size: 'lg', className: 'custom-class' })
 * // => 'inline-flex rounded-md font-medium bg-blue-500 text-white px-6 py-3 text-lg font-bold custom-class'
 */
export function createVariants<V extends VariantSchema>(
  config: VariantConfig<V>
): (props?: VariantProps<V>) => string {
  const {
    base = '',
    variants = {} as V,
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  return (props?: VariantProps<V>): string => {
    // Start with base classes
    const classes: ClassValue[] = [base];

    // Apply variant classes
    for (const variantKey in variants) {
      const variantOptions = variants[variantKey];

      // Get value from props or defaults
      const propValue = props?.[variantKey];
      const defaultValue = defaultVariants[variantKey];
      const value = propValue !== undefined ? propValue : defaultValue;

      // Add variant class if value exists
      if (value !== undefined && variantOptions[value as string]) {
        classes.push(variantOptions[value as string]);
      }
    }

    // Apply compound variants
    for (const compound of compoundVariants) {
      // Check if all conditions match
      let matches = true;

      for (const key in compound) {
        if (key === 'class') continue; // Skip class property

        const conditionValue = compound[key];
        const propValue = props?.[key];
        const defaultValue = defaultVariants[key];
        const actualValue = propValue !== undefined ? propValue : defaultValue;

        // Handle array or single value conditions
        if (Array.isArray(conditionValue)) {
          if (!conditionValue.includes(actualValue as string)) {
            matches = false;
            break;
          }
        } else {
          if (conditionValue !== actualValue) {
            matches = false;
            break;
          }
        }
      }

      // Apply compound classes if all conditions matched
      if (matches) {
        const compoundClass = compound.class;
        if (Array.isArray(compoundClass)) {
          classes.push(...compoundClass);
        } else {
          classes.push(compoundClass);
        }
      }
    }

    // Add user-provided className (supports both className and class)
    const userClass = props?.className || props?.class;
    if (userClass) {
      classes.push(userClass);
    }

    // Merge all classes, resolving conflicts
    return merge(...classes);
  };
}

/**
 * Alias for createVariants() for compatibility with CVA.
 */
export const cva = createVariants;

/**
 * Helper to infer variant props from a variant function.
 *
 * @example
 * const button = createVariants({ ... });
 * type ButtonProps = VariantsOf<typeof button>;
 */
export type VariantsOf<T> = T extends (props?: infer P) => string
  ? Omit<P, 'className' | 'class'>
  : never;

/**
 * Helper to extract variant prop types for use in component props.
 *
 * @example
 * const button = createVariants({
 *   variants: {
 *     variant: { primary: '...', secondary: '...' },
 *     size: { sm: '...', lg: '...' }
 *   }
 * });
 *
 * interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 *   variant?: 'primary' | 'secondary';
 *   size?: 'sm' | 'lg';
 * }
 */
export type ExtractVariantProps<T> = T extends (props?: infer P) => string ? P : never;
