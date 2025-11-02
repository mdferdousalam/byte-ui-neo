/**
 * Theming system for HikmaUI components.
 * Uses CSS custom properties (variables) for easy theme customization.
 */

/**
 * Base theme configuration with CSS variables.
 * These can be overridden in user's CSS or via hikma.config.js
 */
export const themeVariables = {
  light: {
    // Background colors
    "--color-background": "0 0% 100%",           // white
    "--color-foreground": "222 47% 11%",         // dark text
    "--color-card": "0 0% 100%",                 // white
    "--color-card-foreground": "222 47% 11%",    // dark text
    "--color-popover": "0 0% 100%",              // white
    "--color-popover-foreground": "222 47% 11%", // dark text

    // Brand colors
    "--color-primary": "221 83% 53%",            // blue-500
    "--color-primary-foreground": "210 40% 98%", // white-ish
    "--color-secondary": "210 40% 96%",          // gray-100
    "--color-secondary-foreground": "222 47% 11%", // dark
    "--color-muted": "210 40% 96%",              // gray-100
    "--color-muted-foreground": "215 16% 47%",   // gray-500
    "--color-accent": "210 40% 96%",             // gray-100
    "--color-accent-foreground": "222 47% 11%",  // dark

    // Status colors
    "--color-success": "142 76% 36%",            // green-600
    "--color-success-foreground": "0 0% 100%",   // white
    "--color-warning": "38 92% 50%",             // yellow-500
    "--color-warning-foreground": "0 0% 100%",   // white
    "--color-danger": "0 84% 60%",               // red-500
    "--color-danger-foreground": "0 0% 100%",    // white
    "--color-info": "199 89% 48%",               // blue-500
    "--color-info-foreground": "0 0% 100%",      // white

    // UI element colors
    "--color-border": "214 32% 91%",             // gray-200
    "--color-input": "214 32% 91%",              // gray-200
    "--color-ring": "221 83% 53%",               // blue-500 (focus ring)

    // Radius
    "--radius-sm": "0.25rem",                    // 4px
    "--radius-md": "0.375rem",                   // 6px
    "--radius-lg": "0.5rem",                     // 8px
    "--radius-xl": "0.75rem",                    // 12px
    "--radius-2xl": "1rem",                      // 16px
    "--radius-full": "9999px",                   // fully rounded

    // Shadows
    "--shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "--shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "--shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "--shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  dark: {
    // Background colors
    "--color-background": "222 47% 11%",         // dark
    "--color-foreground": "210 40% 98%",         // light text
    "--color-card": "222 47% 11%",               // dark
    "--color-card-foreground": "210 40% 98%",    // light text
    "--color-popover": "222 47% 11%",            // dark
    "--color-popover-foreground": "210 40% 98%", // light text

    // Brand colors
    "--color-primary": "217 91% 60%",            // blue-400 (lighter in dark mode)
    "--color-primary-foreground": "222 47% 11%", // dark
    "--color-secondary": "217 33% 17%",          // gray-800
    "--color-secondary-foreground": "210 40% 98%", // light
    "--color-muted": "217 33% 17%",              // gray-800
    "--color-muted-foreground": "215 20% 65%",   // gray-400
    "--color-accent": "217 33% 17%",             // gray-800
    "--color-accent-foreground": "210 40% 98%",  // light

    // Status colors
    "--color-success": "142 71% 45%",            // green-500 (adjusted)
    "--color-success-foreground": "0 0% 100%",   // white
    "--color-warning": "38 92% 50%",             // yellow-500
    "--color-warning-foreground": "0 0% 0%",     // black
    "--color-danger": "0 72% 51%",               // red-600 (adjusted)
    "--color-danger-foreground": "0 0% 100%",    // white
    "--color-info": "199 89% 48%",               // blue-500
    "--color-info-foreground": "0 0% 100%",      // white

    // UI element colors
    "--color-border": "217 33% 17%",             // gray-800
    "--color-input": "217 33% 17%",              // gray-800
    "--color-ring": "217 91% 60%",               // blue-400 (focus ring)

    // Radius (same as light mode)
    "--radius-sm": "0.25rem",
    "--radius-md": "0.375rem",
    "--radius-lg": "0.5rem",
    "--radius-xl": "0.75rem",
    "--radius-2xl": "1rem",
    "--radius-full": "9999px",

    // Shadows (darker in dark mode)
    "--shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.2)",
    "--shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
    "--shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
    "--shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
  },
} as const;

/**
 * Generates the CSS for theme variables.
 * This should be included in the base stylesheet.
 *
 * @returns CSS string with theme variables
 */
export function generateThemeCSS(): string {
  const lightVars = Object.entries(themeVariables.light)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  const darkVars = Object.entries(themeVariables.dark)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `
:root {
${lightVars}
}

.dark {
${darkVars}
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
${darkVars}
  }
}
`.trim();
}

/**
 * Utility to use CSS variables in components.
 * Converts HSL values to usable CSS.
 *
 * @param variableName - The CSS variable name (without --)
 * @returns CSS string for use in className
 *
 * @example
 * <div className={`bg-[hsl(var(${cssVar('color-primary')}))]`}>
 */
export function cssVar(variableName: string): string {
  return `--${variableName}`;
}

/**
 * Theme color utilities that use CSS variables.
 * These generate HikmaUI utility classes.
 */
export const themeColors = {
  // Background
  background: "bg-[hsl(var(--color-background))]",
  foreground: "text-[hsl(var(--color-foreground))]",
  card: "bg-[hsl(var(--color-card))]",
  cardForeground: "text-[hsl(var(--color-card-foreground))]",
  popover: "bg-[hsl(var(--color-popover))]",
  popoverForeground: "text-[hsl(var(--color-popover-foreground))]",

  // Brand
  primary: "bg-[hsl(var(--color-primary))]",
  primaryForeground: "text-[hsl(var(--color-primary-foreground))]",
  secondary: "bg-[hsl(var(--color-secondary))]",
  secondaryForeground: "text-[hsl(var(--color-secondary-foreground))]",
  muted: "bg-[hsl(var(--color-muted))]",
  mutedForeground: "text-[hsl(var(--color-muted-foreground))]",
  accent: "bg-[hsl(var(--color-accent))]",
  accentForeground: "text-[hsl(var(--color-accent-foreground))]",

  // Status
  success: "bg-[hsl(var(--color-success))]",
  successForeground: "text-[hsl(var(--color-success-foreground))]",
  warning: "bg-[hsl(var(--color-warning))]",
  warningForeground: "text-[hsl(var(--color-warning-foreground))]",
  danger: "bg-[hsl(var(--color-danger))]",
  dangerForeground: "text-[hsl(var(--color-danger-foreground))]",
  info: "bg-[hsl(var(--color-info))]",
  infoForeground: "text-[hsl(var(--color-info-foreground))]",

  // UI
  border: "border-[hsl(var(--color-border))]",
  input: "bg-[hsl(var(--color-input))]",
  ring: "ring-[hsl(var(--color-ring))]",
} as const;

/**
 * Hook to get and set the current theme.
 *
 * @returns Current theme and setter function
 *
 * @example
 * const { theme, setTheme } = useTheme();
 * <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *   Toggle theme
 * </button>
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    // Check system preference on mount
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("hikma-theme") as "light" | "dark" | null;

    if (stored) {
      setThemeState(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      setThemeState(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  const setTheme = React.useCallback((newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    localStorage.setItem("hikma-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, []);

  return { theme, setTheme };
}

// Import React for useTheme hook
import * as React from "react";
