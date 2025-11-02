/**
 * Minimal Preset
 * Bare minimum configuration for HikmaUI
 * Perfect for: Landing pages, marketing sites, simple projects
 * Bundle impact: ~2 KB CSS (minimal utilities)
 */

import type { HikmaConfig } from '../types/config';

export const minimalPreset: HikmaConfig = {
  content: [],

  darkMode: false,

  theme: {
    // Minimal color palette
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',

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

      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        600: '#0284c7',
        900: '#0c4a6e',
      },
    },

    // Minimal spacing (0-12 only)
    spacing: {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
    },

    // Minimal screens
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },

    // Minimal font sizes
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },

    // Minimal font weights
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    // Minimal border radius
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },

    // Minimal shadows
    boxShadow: {
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },

  plugins: [],
};
