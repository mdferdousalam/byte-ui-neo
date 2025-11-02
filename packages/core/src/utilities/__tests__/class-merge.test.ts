import { describe, it, expect, beforeEach } from 'vitest';
import { ClassMerger, merge, twMerge, cn } from '../class-merge';

describe('ClassMerger - Smart Class Merging', () => {
  let merger: ClassMerger;

  beforeEach(() => {
    merger = new ClassMerger();
  });

  describe('Basic merging', () => {
    it('should combine non-conflicting classes', () => {
      expect(merge('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('should handle single class', () => {
      expect(merge('btn')).toBe('btn');
    });

    it('should handle empty input', () => {
      expect(merge()).toBe('');
      expect(merge('')).toBe('');
    });
  });

  describe('Padding conflicts', () => {
    it('should resolve px conflicts (later wins)', () => {
      expect(merge('px-4', 'px-6')).toBe('px-6');
    });

    it('should resolve py conflicts', () => {
      expect(merge('py-2', 'py-4')).toBe('py-4');
    });

    it('should resolve pt conflicts', () => {
      expect(merge('pt-1', 'pt-8')).toBe('pt-8');
    });

    it('should keep non-conflicting padding', () => {
      expect(merge('px-4 py-2', 'pl-6')).toBe('px-4 py-2 pl-6');
    });

    it('should resolve p (all sides) conflicts', () => {
      expect(merge('p-4', 'p-8')).toBe('p-8');
    });
  });

  describe('Margin conflicts', () => {
    it('should resolve mx conflicts', () => {
      expect(merge('mx-4', 'mx-auto')).toBe('mx-auto');
    });

    it('should resolve my conflicts', () => {
      expect(merge('my-2', 'my-8')).toBe('my-8');
    });

    it('should resolve m (all sides) conflicts', () => {
      expect(merge('m-4', 'm-0')).toBe('m-0');
    });
  });

  describe('Width/Height conflicts', () => {
    it('should resolve width conflicts', () => {
      expect(merge('w-32', 'w-full')).toBe('w-full');
    });

    it('should resolve height conflicts', () => {
      expect(merge('h-16', 'h-screen')).toBe('h-screen');
    });

    it('should resolve min-width conflicts', () => {
      expect(merge('min-w-0', 'min-w-full')).toBe('min-w-full');
    });

    it('should resolve max-width conflicts', () => {
      expect(merge('max-w-sm', 'max-w-lg')).toBe('max-w-lg');
    });

    it('should keep width and height separate', () => {
      expect(merge('w-32', 'h-16')).toBe('w-32 h-16');
    });
  });

  describe('Typography conflicts', () => {
    it('should resolve font-size conflicts', () => {
      expect(merge('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('should resolve font-weight conflicts', () => {
      expect(merge('font-normal', 'font-bold')).toBe('font-bold');
    });

    it('should resolve text-color conflicts', () => {
      expect(merge('text-gray-500', 'text-blue-600')).toBe('text-blue-600');
    });

    it('should keep size and color separate', () => {
      expect(merge('text-sm text-gray-500', 'text-blue-600')).toBe('text-sm text-blue-600');
    });

    it('should resolve text-align conflicts', () => {
      expect(merge('text-left', 'text-center')).toBe('text-center');
    });

    it('should resolve text-decoration conflicts', () => {
      expect(merge('underline', 'no-underline')).toBe('no-underline');
    });
  });

  describe('Background conflicts', () => {
    it('should resolve bg-color conflicts', () => {
      expect(merge('bg-gray-100', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('should resolve bg-size conflicts', () => {
      expect(merge('bg-cover', 'bg-contain')).toBe('bg-contain');
    });

    it('should resolve bg-position conflicts', () => {
      expect(merge('bg-center', 'bg-top')).toBe('bg-top');
    });

    it('should resolve bg-repeat conflicts', () => {
      expect(merge('bg-repeat', 'bg-no-repeat')).toBe('bg-no-repeat');
    });
  });

  describe('Border conflicts', () => {
    it('should resolve border-width conflicts', () => {
      expect(merge('border', 'border-2')).toBe('border-2');
    });

    it('should resolve border-color conflicts', () => {
      expect(merge('border-gray-300', 'border-blue-500')).toBe('border-blue-500');
    });

    it('should resolve border-radius conflicts', () => {
      expect(merge('rounded', 'rounded-lg')).toBe('rounded-lg');
    });

    it('should resolve border-style conflicts', () => {
      expect(merge('border-solid', 'border-dashed')).toBe('border-dashed');
    });
  });

  describe('Flexbox conflicts', () => {
    it('should resolve justify-content conflicts', () => {
      expect(merge('justify-start', 'justify-center')).toBe('justify-center');
    });

    it('should resolve align-items conflicts', () => {
      expect(merge('items-start', 'items-center')).toBe('items-center');
    });

    it('should resolve flex-direction conflicts', () => {
      expect(merge('flex-row', 'flex-col')).toBe('flex-col');
    });

    it('should resolve flex conflicts', () => {
      expect(merge('flex-1', 'flex-auto')).toBe('flex-auto');
    });
  });

  describe('Grid conflicts', () => {
    it('should resolve grid-cols conflicts', () => {
      expect(merge('grid-cols-3', 'grid-cols-4')).toBe('grid-cols-4');
    });

    it('should resolve col-span conflicts', () => {
      expect(merge('col-span-2', 'col-span-4')).toBe('col-span-4');
    });

    it('should resolve gap conflicts', () => {
      expect(merge('gap-4', 'gap-8')).toBe('gap-8');
    });
  });

  describe('Position conflicts', () => {
    it('should resolve position conflicts', () => {
      expect(merge('relative', 'absolute')).toBe('absolute');
    });

    it('should resolve top conflicts', () => {
      expect(merge('top-0', 'top-4')).toBe('top-4');
    });

    it('should resolve inset conflicts', () => {
      expect(merge('inset-0', 'inset-4')).toBe('inset-4');
    });
  });

  describe('Effects conflicts', () => {
    it('should resolve shadow conflicts', () => {
      expect(merge('shadow', 'shadow-lg')).toBe('shadow-lg');
    });

    it('should resolve opacity conflicts', () => {
      expect(merge('opacity-50', 'opacity-100')).toBe('opacity-100');
    });
  });

  describe('Variant prefixes', () => {
    it('should handle hover: prefix', () => {
      expect(merge('hover:bg-gray-100', 'hover:bg-blue-500')).toBe('hover:bg-blue-500');
    });

    it('should handle focus: prefix', () => {
      expect(merge('focus:ring-2', 'focus:ring-4')).toBe('focus:ring-4');
    });

    it('should handle responsive prefixes', () => {
      expect(merge('sm:text-sm', 'sm:text-lg')).toBe('sm:text-lg');
    });

    it('should handle multiple variant prefixes', () => {
      expect(merge('sm:hover:bg-gray-100', 'sm:hover:bg-blue-500')).toBe('sm:hover:bg-blue-500');
    });

    it('should keep different variants separate', () => {
      expect(merge('hover:bg-blue-500', 'focus:bg-blue-600')).toBe('hover:bg-blue-500 focus:bg-blue-600');
    });
  });

  describe('Arbitrary values', () => {
    it('should handle arbitrary width values', () => {
      expect(merge('w-[342px]', 'w-[500px]')).toBe('w-[500px]');
    });

    it('should handle arbitrary color values', () => {
      expect(merge('bg-[#1da1f2]', 'bg-[#ff0000]')).toBe('bg-[#ff0000]');
    });
  });

  describe('Complex real-world scenarios', () => {
    it('should handle button component scenario', () => {
      const base = 'px-4 py-2 rounded bg-blue-500 text-white';
      const user = 'px-6 py-3 bg-red-500';
      expect(merge(base, user)).toBe('rounded text-white px-6 py-3 bg-red-500');
    });

    it('should handle card component scenario', () => {
      const base = 'p-4 rounded-lg shadow-md bg-white';
      const variant = 'p-6 shadow-xl';
      expect(merge(base, variant)).toBe('rounded-lg bg-white p-6 shadow-xl');
    });

    it('should handle multiple conflicts', () => {
      expect(merge(
        'px-4 py-2 text-sm bg-gray-100',
        'px-8 text-lg bg-blue-500'
      )).toBe('py-2 px-8 text-lg bg-blue-500');
    });
  });

  describe('Conditional classes with cx()', () => {
    it('should work with cx() objects', () => {
      expect(merge('px-4', { 'px-6': true, 'py-4': true })).toBe('px-6 py-4');
    });

    it('should work with cx() arrays', () => {
      expect(merge(['px-4', 'py-2'], ['px-8'])).toBe('py-2 px-8');
    });
  });

  describe('Non-utility classes', () => {
    it('should preserve custom classes', () => {
      expect(merge('my-custom-class', 'another-class')).toBe('my-custom-class another-class');
    });

    it('should preserve custom classes with utilities', () => {
      expect(merge('btn', 'px-4', 'my-class', 'py-2')).toBe('btn px-4 my-class py-2');
    });

    it('should not merge custom classes', () => {
      expect(merge('btn-primary', 'btn-secondary')).toBe('btn-primary btn-secondary');
    });
  });

  describe('Performance & caching', () => {
    it('should cache utility type lookups', () => {
      const merger = new ClassMerger();

      // First call
      const result1 = merger.merge('px-4 py-2', 'px-6');

      // Second call with same classes (should use cache)
      const result2 = merger.merge('px-4 py-2', 'px-6');

      expect(result1).toBe(result2);
      expect(result1).toBe('py-2 px-6');
    });

    it('should clear cache', () => {
      const merger = new ClassMerger();
      merger.merge('px-4', 'px-6');
      merger.clearCache();

      // Should still work after clearing cache
      expect(merger.merge('px-4', 'px-6')).toBe('px-6');
    });
  });

  describe('Aliases', () => {
    it('should work with twMerge alias', () => {
      expect(twMerge('px-4', 'px-6')).toBe('px-6');
    });

    it('should work with cn helper', () => {
      expect(cn('px-4', { 'px-6': true })).toBe('px-6');
    });

    it('should be functionally identical', () => {
      const input = ['px-4 py-2', 'px-8'];
      expect(merge(...input)).toBe(twMerge(...input));
      expect(merge(...input)).toBe(cn(...input));
    });
  });

  describe('Edge cases', () => {
    it('should handle very long class strings', () => {
      const classes = Array.from({ length: 100 }, (_, i) => `px-${i}`).join(' ');
      expect(merge(classes)).toBe('px-99');
    });

    it('should handle empty strings in array', () => {
      expect(merge(['px-4', '', 'py-2'])).toBe('px-4 py-2');
    });

    it('should handle duplicate classes', () => {
      expect(merge('btn btn btn')).toBe('btn');
    });
  });
});
