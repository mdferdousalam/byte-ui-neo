/** @type {import('./types/config').HikmaConfig} */
export default {
  // Content paths for JIT compiler to scan
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './pages/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './components/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './app/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
  ],

  // Dark mode strategy
  darkMode: 'class', // 'class' | 'media' | false

  // Theme configuration
  theme: {
    // Breakpoints (mobile-first)
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },

    // Color system (KlikkFlow)
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Brand colors
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        400: '#60a5fa',
        500: '#0ea5e9',
        600: '#0284c7',
        900: '#0c4a6e',
      },

      secondary: {
        400: '#c084fc',
        500: '#8b5cf6',
        600: '#9333ea',
      },

      // Semantic colors
      success: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
      },

      danger: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
      },

      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
      },

      info: {
        500: '#06b6d4',
        600: '#0891b2',
      },

      // Neutral scale
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },

      // Standard colors
      white: '#ffffff',
      black: '#000000',
    },

    // Spacing scale (0.25rem = 4px base unit)
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',   // 2px
      1: '0.25rem',      // 4px
      1.5: '0.375rem',   // 6px
      2: '0.5rem',       // 8px
      2.5: '0.625rem',   // 10px
      3: '0.75rem',      // 12px
      3.5: '0.875rem',   // 14px
      4: '1rem',         // 16px
      5: '1.25rem',      // 20px
      6: '1.5rem',       // 24px
      7: '1.75rem',      // 28px
      8: '2rem',         // 32px
      9: '2.25rem',      // 36px
      10: '2.5rem',      // 40px
      11: '2.75rem',     // 44px
      12: '3rem',        // 48px
      14: '3.5rem',      // 56px
      16: '4rem',        // 64px
      20: '5rem',        // 80px
      24: '6rem',        // 96px
      28: '7rem',        // 112px
      32: '8rem',        // 128px
      36: '9rem',        // 144px
      40: '10rem',       // 160px
      44: '11rem',       // 176px
      48: '12rem',       // 192px
      52: '13rem',       // 208px
      56: '14rem',       // 224px
      60: '15rem',       // 240px
      64: '16rem',       // 256px
      72: '18rem',       // 288px
      80: '20rem',       // 320px
      96: '24rem',       // 384px
    },

    // Font families
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
    },

    // Font sizes (with line-height)
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },

    // Font weights
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    // Border radius
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },

    // Box shadows
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },

    // Z-index scale
    zIndex: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      auto: 'auto',
    },

    // Opacity scale
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },

    // Transitions
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },

    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },

    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Animation
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },

    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      ping: {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '75%, 100%': { transform: 'scale(2)', opacity: '0' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '.5' },
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
        '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
      },
    },

    // Extend theme (add to defaults rather than replace)
    extend: {
      // Add custom values here
      // Example:
      // colors: {
      //   'brand-blue': '#0ea5e9',
      // },
    },
  },

  // Variant configuration
  variants: {
    extend: {
      // Enable variants for specific utilities
      // Example: backgroundColor: ['active', 'group-hover']
    },
  },

  // Plugins
  plugins: [
    // Add HikmaUI plugins here
    // Example: require('@hikmaui/plugin-forms')
  ],

  // Presets (inherit from base configurations)
  presets: [
    // Example: require('@hikmaui/preset-minimal')
  ],

  // Core plugins (can be disabled if not needed)
  corePlugins: {
    // Set to false to disable specific core plugins
    // Example: preflight: false
  },

  // JIT mode options
  mode: 'jit', // 'jit' | 'aot' (ahead-of-time)

  // Important selector prefix (for CSS specificity)
  important: false, // true | false | '#app'

  // Prefix for all utility classes
  prefix: '', // Example: 'hikma-' → 'hikma-flex', 'hikma-p-4'

  // Separator for variants
  separator: ':', // Example: ':' → 'hover:bg-blue-500', '-' → 'hover-bg-blue-500'

  // Safelist (always include these classes, even if not detected)
  safelist: [
    // Example: 'bg-red-500', 'text-3xl', /^bg-/
  ],

  // Blocklist (never include these classes)
  blocklist: [
    // Example: 'container', 'collapse'
  ],
}
