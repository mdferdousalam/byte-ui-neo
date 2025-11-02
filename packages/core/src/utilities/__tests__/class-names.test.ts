import { describe, it, expect } from 'vitest';
import { cx, classNames, clsx } from '../class-names';

describe('cx() - Conditional Class Names', () => {
  describe('String inputs', () => {
    it('should combine multiple strings', () => {
      expect(cx('btn', 'btn-primary')).toBe('btn btn-primary');
    });

    it('should handle single string', () => {
      expect(cx('btn')).toBe('btn');
    });

    it('should handle empty strings', () => {
      expect(cx('', 'btn')).toBe('btn');
      expect(cx('btn', '')).toBe('btn');
    });

    it('should handle multiple spaces in strings', () => {
      expect(cx('btn  btn-primary', 'text-sm')).toBe('btn  btn-primary text-sm');
    });
  });

  describe('Boolean inputs', () => {
    it('should filter out false', () => {
      expect(cx('btn', false, 'active')).toBe('btn active');
    });

    it('should filter out null', () => {
      expect(cx('btn', null, 'active')).toBe('btn active');
    });

    it('should filter out undefined', () => {
      expect(cx('btn', undefined, 'active')).toBe('btn active');
    });

    it('should handle all falsy values', () => {
      expect(cx(false, null, undefined, '', 0, 'btn')).toBe('btn');
    });
  });

  describe('Number inputs', () => {
    it('should convert numbers to strings', () => {
      expect(cx('btn', 123)).toBe('btn 123');
    });

    it('should handle zero as string (falsy but valid)', () => {
      expect(cx('btn', 0)).toBe('btn');
    });

    it('should handle multiple numbers', () => {
      expect(cx(1, 2, 3)).toBe('1 2 3');
    });
  });

  describe('Object inputs', () => {
    it('should include keys with truthy values', () => {
      expect(cx({ btn: true, active: true })).toBe('btn active');
    });

    it('should exclude keys with falsy values', () => {
      expect(cx({ btn: true, disabled: false, hidden: null })).toBe('btn');
    });

    it('should handle mixed truthy/falsy', () => {
      expect(
        cx({
          btn: true,
          'btn-primary': true,
          disabled: false,
          active: true,
          hidden: undefined,
        })
      ).toBe('btn btn-primary active');
    });

    it('should work with string values and object', () => {
      expect(cx('base', { active: true, disabled: false })).toBe('base active');
    });
  });

  describe('Array inputs', () => {
    it('should handle flat arrays', () => {
      expect(cx(['btn', 'btn-primary', 'text-sm'])).toBe('btn btn-primary text-sm');
    });

    it('should handle nested arrays', () => {
      expect(cx(['btn', ['btn-primary', 'text-sm']])).toBe('btn btn-primary text-sm');
    });

    it('should handle arrays with falsy values', () => {
      expect(cx(['btn', null, undefined, false, 'active'])).toBe('btn active');
    });

    it('should handle deeply nested arrays', () => {
      expect(cx(['btn', ['primary', ['lg', 'rounded']]])).toBe('btn primary lg rounded');
    });

    it('should handle arrays with objects', () => {
      expect(cx(['btn', { active: true, disabled: false }])).toBe('btn active');
    });
  });

  describe('Mixed inputs', () => {
    it('should handle strings, booleans, and objects', () => {
      expect(
        cx('btn', true && 'active', false && 'disabled', { primary: true })
      ).toBe('btn active primary');
    });

    it('should handle complex real-world scenario', () => {
      const isActive = true;
      const isDisabled = false;
      const size = 'lg';

      expect(
        cx(
          'btn',
          'font-medium',
          {
            'btn-active': isActive,
            'btn-disabled': isDisabled,
          },
          [`btn-${size}`, 'rounded-md']
        )
      ).toBe('btn font-medium btn-active btn-lg rounded-md');
    });

    it('should handle conditional expressions', () => {
      const variant = 'primary';
      const disabled = false;

      expect(
        cx(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          disabled && 'disabled'
        )
      ).toBe('btn btn-primary');
    });

    it('should handle empty inputs', () => {
      expect(cx()).toBe('');
      expect(cx(null, undefined, false)).toBe('');
    });
  });

  describe('Ternary expressions', () => {
    it('should work with ternary operator', () => {
      const isActive = true;
      expect(cx('btn', isActive ? 'active' : 'inactive')).toBe('btn active');
    });

    it('should work with nested ternaries', () => {
      const state = 'success';
      expect(
        cx(
          'btn',
          state === 'success'
            ? 'btn-success'
            : state === 'error'
              ? 'btn-error'
              : 'btn-default'
        )
      ).toBe('btn btn-success');
    });
  });

  describe('Edge cases', () => {
    it('should handle very long class strings', () => {
      const longClass = 'a '.repeat(100).trim();
      expect(cx(longClass)).toBe(longClass);
    });

    it('should handle unicode characters', () => {
      expect(cx('btn-🚀', 'text-emoji')).toBe('btn-🚀 text-emoji');
    });

    it('should handle special characters in class names', () => {
      expect(cx('sm:btn', 'hover:bg-blue-500', 'dark:text-white')).toBe(
        'sm:btn hover:bg-blue-500 dark:text-white'
      );
    });

    it('should handle HikmaUI arbitrary values', () => {
      expect(cx('w-[342px]', 'h-[100vh]', 'bg-[#1da1f2]')).toBe(
        'w-[342px] h-[100vh] bg-[#1da1f2]'
      );
    });
  });

  describe('Aliases', () => {
    it('should work with classNames alias', () => {
      expect(classNames('btn', { active: true })).toBe('btn active');
    });

    it('should work with clsx alias', () => {
      expect(clsx('btn', { active: true })).toBe('btn active');
    });

    it('should be functionally identical', () => {
      const input = ['btn', { active: true, disabled: false }, 'primary'];
      expect(cx(...input)).toBe(classNames(...input));
      expect(cx(...input)).toBe(clsx(...input));
    });
  });
});
