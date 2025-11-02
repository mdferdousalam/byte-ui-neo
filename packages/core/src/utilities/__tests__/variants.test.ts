import { describe, it, expect } from 'vitest';
import { createVariants, cva, type VariantProps } from '../variants';

describe('createVariants() - Component Variant System', () => {
  describe('Basic functionality', () => {
    it('should return base classes only', () => {
      const fn = createVariants({
        base: 'btn font-medium',
      });

      expect(fn()).toBe('btn font-medium');
    });

    it('should work with no config', () => {
      const fn = createVariants({});
      expect(fn()).toBe('');
    });

    it('should handle empty strings', () => {
      const fn = createVariants({ base: '' });
      expect(fn()).toBe('');
    });
  });

  describe('Simple variants', () => {
    it('should apply single variant', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      });

      expect(fn({ variant: 'primary' })).toBe('btn bg-blue-500');
      expect(fn({ variant: 'secondary' })).toBe('btn bg-gray-500');
    });

    it('should apply multiple variant dimensions', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'px-3 py-1',
            lg: 'px-6 py-3',
          },
        },
      });

      expect(fn({ variant: 'primary', size: 'lg' })).toBe('btn bg-blue-500 px-6 py-3');
      expect(fn({ variant: 'secondary', size: 'sm' })).toBe('btn bg-gray-500 px-3 py-1');
    });
  });

  describe('Default variants', () => {
    it('should use default variant when no prop provided', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          variant: 'primary',
        },
      });

      expect(fn()).toBe('btn bg-blue-500');
      expect(fn({})).toBe('btn bg-blue-500');
    });

    it('should override default with explicit prop', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          variant: 'primary',
        },
      });

      expect(fn({ variant: 'secondary' })).toBe('btn bg-gray-500');
    });

    it('should use defaults for multiple variants', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'px-3 py-1',
            lg: 'px-6 py-3',
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'sm',
        },
      });

      expect(fn()).toBe('btn bg-blue-500 px-3 py-1');
      expect(fn({ size: 'lg' })).toBe('btn bg-blue-500 px-6 py-3');
      expect(fn({ variant: 'secondary' })).toBe('btn bg-gray-500 px-3 py-1');
    });
  });

  describe('Compound variants', () => {
    it('should apply compound variant when conditions match', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'px-3 py-1',
            lg: 'px-6 py-3',
          },
        },
        compoundVariants: [
          {
            variant: 'primary',
            size: 'lg',
            class: 'font-bold shadow-lg',
          },
        ],
      });

      expect(fn({ variant: 'primary', size: 'lg' })).toBe(
        'btn bg-blue-500 px-6 py-3 font-bold shadow-lg'
      );
      expect(fn({ variant: 'primary', size: 'sm' })).toBe('btn bg-blue-500 px-3 py-1');
      expect(fn({ variant: 'secondary', size: 'lg' })).toBe('btn bg-gray-500 px-6 py-3');
    });

    it('should apply multiple compound variants', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            destructive: 'bg-red-500',
          },
          size: {
            sm: 'px-3 py-1',
            lg: 'px-6 py-3',
          },
        },
        compoundVariants: [
          {
            variant: 'primary',
            size: 'lg',
            class: 'font-bold',
          },
          {
            variant: 'destructive',
            size: 'lg',
            class: 'font-extrabold',
          },
        ],
      });

      expect(fn({ variant: 'primary', size: 'lg' })).toContain('font-bold');
      expect(fn({ variant: 'destructive', size: 'lg' })).toContain('font-extrabold');
    });

    it('should handle array of classes in compound variants', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
          },
        },
        compoundVariants: [
          {
            variant: 'primary',
            class: ['font-bold', 'shadow-lg', 'border-2'],
          },
        ],
      });

      const result = fn({ variant: 'primary' });
      expect(result).toContain('font-bold');
      expect(result).toContain('shadow-lg');
      expect(result).toContain('border-2');
    });

    it('should handle compound variants with array conditions', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
            destructive: 'bg-red-500',
          },
          size: {
            sm: 'px-3',
            lg: 'px-6',
          },
        },
        compoundVariants: [
          {
            variant: ['primary', 'secondary'], // Matches either
            size: 'lg',
            class: 'uppercase',
          },
        ],
      });

      expect(fn({ variant: 'primary', size: 'lg' })).toContain('uppercase');
      expect(fn({ variant: 'secondary', size: 'lg' })).toContain('uppercase');
      expect(fn({ variant: 'destructive', size: 'lg' })).not.toContain('uppercase');
    });
  });

  describe('className prop', () => {
    const fn = createVariants({
      base: 'btn',
      variants: {
        variant: {
          primary: 'bg-blue-500',
        },
      },
    });

    it('should append className prop', () => {
      expect(fn({ variant: 'primary', className: 'custom-class' })).toContain('custom-class');
    });

    it('should work with class alias', () => {
      expect(fn({ variant: 'primary', class: 'custom-class' })).toContain('custom-class');
    });

    it('should resolve conflicts with className', () => {
      const result = fn({ variant: 'primary', className: 'bg-red-500' });
      expect(result).toContain('bg-red-500');
      expect(result).not.toContain('bg-blue-500');
    });

    it('should handle conditional className', () => {
      expect(fn({ variant: 'primary', className: { active: true, disabled: false } })).toContain(
        'active'
      );
    });
  });

  describe('Complex real-world examples', () => {
    it('should handle button component', () => {
      const button = createVariants({
        base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50',
        variants: {
          variant: {
            default: 'bg-primary-500 text-white hover:bg-primary-600',
            destructive: 'bg-danger-500 text-white hover:bg-danger-600',
            outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
            ghost: 'hover:bg-gray-100',
            link: 'underline-offset-4 hover:underline text-primary-500',
          },
          size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      });

      expect(button()).toContain('bg-primary-500');
      expect(button()).toContain('h-10');

      expect(button({ variant: 'destructive', size: 'lg' })).toContain('bg-danger-500');
      expect(button({ variant: 'destructive', size: 'lg' })).toContain('h-11');

      expect(button({ variant: 'outline', size: 'sm' })).toContain('border');
      expect(button({ variant: 'outline', size: 'sm' })).toContain('h-9');
    });

    it('should handle card component', () => {
      const card = createVariants({
        base: 'rounded-lg p-4',
        variants: {
          variant: {
            default: 'bg-white border border-gray-200',
            elevated: 'bg-white shadow-lg',
            glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
            interactive: 'bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer',
          },
          padding: {
            none: 'p-0',
            sm: 'p-3',
            default: 'p-4',
            lg: 'p-6',
          },
        },
        defaultVariants: {
          variant: 'default',
          padding: 'default',
        },
      });

      expect(card({ variant: 'elevated' })).toContain('shadow-lg');
      expect(card({ variant: 'glass', padding: 'lg' })).toContain('backdrop-blur');
      expect(card({ variant: 'glass', padding: 'lg' })).toContain('p-6');
    });
  });

  describe('TypeScript type inference', () => {
    it('should infer variant props', () => {
      const button = createVariants({
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'px-3',
            lg: 'px-6',
          },
        },
      });

      type ButtonProps = VariantProps<typeof button extends (props?: infer P) => string ? P : never>;

      // TypeScript should accept these
      const props1: ButtonProps = { variant: 'primary', size: 'sm' };
      const props2: ButtonProps = { variant: 'secondary' };
      const props3: ButtonProps = { className: 'custom' };

      expect(button(props1)).toBeTruthy();
      expect(button(props2)).toBeTruthy();
      expect(button(props3)).toBeTruthy();
    });
  });

  describe('cva alias', () => {
    it('should work with cva alias', () => {
      const fn = cva({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
          },
        },
      });

      expect(fn({ variant: 'primary' })).toBe('btn bg-blue-500');
    });

    it('should be functionally identical to createVariants', () => {
      const config = {
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      };

      const fn1 = createVariants(config);
      const fn2 = cva(config);

      expect(fn1({ variant: 'primary' })).toBe(fn2({ variant: 'primary' }));
      expect(fn1({ variant: 'secondary' })).toBe(fn2({ variant: 'secondary' }));
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined variant values', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
          },
        },
      });

      expect(fn({ variant: undefined })).toBe('btn');
    });

    it('should handle invalid variant values gracefully', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {
          variant: {
            primary: 'bg-blue-500',
          },
        },
      });

      // @ts-expect-error - Testing invalid value
      expect(fn({ variant: 'invalid' })).toBe('btn');
    });

    it('should handle empty variant objects', () => {
      const fn = createVariants({
        base: 'btn',
        variants: {},
      });

      expect(fn()).toBe('btn');
    });
  });
});
