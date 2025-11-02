## HikmaUI Configuration Guide

**Complete reference for hikma.config.js**

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration Structure](#configuration-structure)
3. [Content Paths](#content-paths)
4. [Theme Customization](#theme-customization)
5. [Dark Mode](#dark-mode)
6. [Presets](#presets)
7. [Plugin System](#plugin-system)
8. [Advanced Usage](#advanced-usage)

---

## Quick Start

### Basic Configuration

Create `hikma.config.js` in your project root:

```javascript
/** @type {import('@hikmaui/core').HikmaConfig} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9',
        }
      }
    }
  }
};
```

### Using Presets

```javascript
import { defaultPreset } from '@hikmaui/core';

export default {
  ...defaultPreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

---

## Configuration Structure

### Complete Type Definition

```typescript
interface HikmaConfig {
  content?: string[];          // Glob patterns for content files
  darkMode?: 'class' | 'media' | false;  // Dark mode strategy
  theme?: {
    screens?: Record<string, string>;     // Responsive breakpoints
    colors?: Record<string, any>;         // Color palette
    spacing?: Record<string, string>;     // Spacing scale
    fontSize?: Record<string, any>;       // Font size scale
    fontWeight?: Record<string, string>;  // Font weights
    borderRadius?: Record<string, string>; // Border radius values
    boxShadow?: Record<string, string>;   // Shadow utilities
    opacity?: Record<string, string>;     // Opacity values
    zIndex?: Record<string, string>;      // Z-index scale
    extend?: Partial<Theme>;              // Extend default theme
  };
  plugins?: Plugin[];           // Custom plugins
}
```

---

## Content Paths

HikmaUI scans your content files to detect which utility classes you're using.

### Glob Patterns

```javascript
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Frontend source
    './pages/**/*.{js,jsx,ts,tsx}',     // Next.js pages
    './components/**/*.{js,jsx,ts,tsx}', // Components
    './app/**/*.{js,jsx,ts,tsx}',       // App directory
  ],
};
```

### Framework-Specific Examples

**React / Vite**:
```javascript
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
```

**Next.js**:
```javascript
content: [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
]
```

**Vue**:
```javascript
content: ['./index.html', './src/**/*.{vue,js,ts}']
```

**Svelte**:
```javascript
content: ['./src/**/*.{html,svelte,js,ts}']
```

---

## Theme Customization

### Colors

#### Extending Colors

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Add custom brand colors
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
        },
        // Or single color
        accent: '#8b5cf6',
      }
    }
  }
};
```

#### Replacing Colors

```javascript
export default {
  theme: {
    colors: {
      // Completely replace default colors
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        // ... custom gray scale
      }
    }
  }
};
```

### Spacing

#### Complete 0-96 Scale (Default)

```javascript
theme: {
  spacing: {
    '0': '0px',
    'px': '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    // ... through 96
    '96': '24rem',
  }
}
```

#### Custom Spacing

```javascript
theme: {
  extend: {
    spacing: {
      '128': '32rem',
      '144': '36rem',
    }
  }
}
```

### Typography

#### Font Sizes

```javascript
theme: {
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    // ... through 9xl
  }
}
```

#### Font Weights

```javascript
theme: {
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }
}
```

### Responsive Breakpoints

```javascript
theme: {
  screens: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  }
}
```

#### Custom Breakpoints

```javascript
theme: {
  screens: {
    'tablet': '640px',
    'laptop': '1024px',
    'desktop': '1280px',
  }
}
```

#### Max-Width Breakpoints

```javascript
theme: {
  screens: {
    '2xl': { max: '1535px' },  // Max-width query
  }
}
```

### Border Radius

```javascript
theme: {
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  }
}
```

### Box Shadows

```javascript
theme: {
  boxShadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  }
}
```

---

## Dark Mode

### Class Strategy (Recommended)

```javascript
export default {
  darkMode: 'class',
};
```

**Usage**:
```html
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    <!-- Content -->
  </div>
</html>
```

**Toggle with JavaScript**:
```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
```

### Media Query Strategy

```javascript
export default {
  darkMode: 'media',
};
```

Automatically uses system preferences:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

### Disable Dark Mode

```javascript
export default {
  darkMode: false,
};
```

---

## Presets

HikmaUI includes 3 official presets for different use cases.

### Minimal Preset

**Best for**: Landing pages, marketing sites, simple projects
**Bundle size**: ~2 KB CSS

```javascript
import { minimalPreset } from '@hikmaui/core';

export default {
  ...minimalPreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

**Includes**:
- Basic colors (gray, primary only)
- Spacing: 0-12
- Screens: sm, md, lg
- Font sizes: xs-4xl
- Minimal shadows and border radius

### Default Preset (Recommended)

**Best for**: Most projects, dashboards, web apps
**Bundle size**: ~5-8 KB CSS

```javascript
import { defaultPreset } from '@hikmaui/core';

export default {
  ...defaultPreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

**Includes**:
- Complete color palette (primary, secondary, success, warning, danger, info, gray)
- Spacing: 0-96
- Screens: xs-3xl
- Font sizes: xs-9xl
- Complete shadows and border radius
- Dark mode enabled

### Complete Preset

**Best for**: Design systems, complex apps, maximum flexibility
**Bundle size**: ~10 KB CSS (still under budget!)

```javascript
import { completePreset } from '@hikmaui/core';

export default {
  ...completePreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

**Includes**:
- Extended color palette (20+ color families with 950 shades)
- Spacing: 0-96 with half-steps
- Screens: xs-3xl
- Extended z-index, transition durations
- All utilities available

### Customizing Presets

```javascript
import { defaultPreset } from '@hikmaui/core';

export default {
  ...defaultPreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    ...defaultPreset.theme,
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9',
        }
      }
    }
  }
};
```

---

## Plugin System

### Plugin Structure

```javascript
const myPlugin = {
  name: 'my-plugin',
  handler: (config) => {
    // Modify config
    return {
      ...config,
      theme: {
        ...config.theme,
        extend: {
          // Add custom utilities
        }
      }
    };
  }
};

export default {
  plugins: [myPlugin],
};
```

### Example: Forms Plugin (Future)

```javascript
import forms from '@hikmaui/plugin-forms';

export default {
  plugins: [forms],
};
```

---

## Advanced Usage

### Arbitrary Values

Use `[...]` syntax for one-off custom values:

```html
<!-- Custom sizes -->
<div class="w-[342px] h-[137px]">...</div>

<!-- Custom colors -->
<div class="bg-[#bada55] text-[rgb(99,102,241)]">...</div>

<!-- Custom spacing -->
<div class="p-[2.75rem] m-[calc(100%-2rem)]">...</div>
```

### CSS Variables

Define custom CSS variables in your theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    }
  }
}
```

Then use in your CSS:

```css
:root {
  --color-primary: #0ea5e9;
  --color-secondary: #8b5cf6;
}

.dark {
  --color-primary: #38bdf8;
  --color-secondary: #a78bfa;
}
```

### Multiple Config Files

**Development**:
```javascript
// hikma.config.dev.js
import { defaultPreset } from '@hikmaui/core';

export default {
  ...defaultPreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

**Production**:
```javascript
// hikma.config.prod.js
import { minimalPreset } from '@hikmaui/core';

export default {
  ...minimalPreset,
  content: ['./dist/**/*.html'],
};
```

**Usage**:
```javascript
// vite.config.ts
import hikmaui from '@hikmaui/vite';

export default defineConfig({
  plugins: [
    hikmaui({
      config: process.env.NODE_ENV === 'production'
        ? './hikma.config.prod.js'
        : './hikma.config.dev.js'
    })
  ]
});
```

### TypeScript Support

Full type safety with TypeScript:

```typescript
import type { HikmaConfig } from '@hikmaui/core';

const config: HikmaConfig = {
  content: ['./src/**/*.{html,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9', // TypeScript will validate this
        }
      }
    }
  }
};

export default config;
```

### Merging Configurations

```javascript
import { defaultPreset } from '@hikmaui/core';
import merge from 'lodash.merge';

const baseConfig = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
};

const themeConfig = {
  theme: {
    extend: {
      colors: {
        brand: { 500: '#0ea5e9' }
      }
    }
  }
};

export default merge({}, defaultPreset, baseConfig, themeConfig);
```

---

## Examples

### E-Commerce Site

```javascript
import { defaultPreset } from '@hikmaui/core';

export default {
  ...defaultPreset,
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    ...defaultPreset.theme,
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        }
      },
      spacing: {
        '128': '32rem',
      }
    }
  }
};
```

### SaaS Dashboard

```javascript
import { completePreset } from '@hikmaui/core';

export default {
  ...completePreset,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    ...completePreset.theme,
    extend: {
      colors: {
        sidebar: {
          light: '#f9fafb',
          dark: '#1f2937',
        }
      }
    }
  }
};
```

### Marketing Landing Page

```javascript
import { minimalPreset } from '@hikmaui/core';

export default {
  ...minimalPreset,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...minimalPreset.theme,
    extend: {
      colors: {
        hero: {
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }
      }
    }
  }
};
```

---

## Configuration Best Practices

### ★ Insight ─────────────────────────────────────

**Configuration tips for optimal performance:**

1. **Use Presets**: Start with a preset and extend it rather than building from scratch

2. **Content Paths**: Be specific with content patterns to speed up JIT compilation
   ```javascript
   // Good
   content: ['./src/**/*.{jsx,tsx}']

   // Avoid
   content: ['./**/*']  // Too broad
   ```

3. **Theme Extension**: Use `extend` to add to defaults, not replace
   ```javascript
   theme: {
     extend: {  // Adds to defaults
       colors: { brand: '#0ea5e9' }
     }
   }
   ```

4. **Dark Mode**: Choose `class` strategy for manual control, `media` for automatic

5. **Arbitrary Values**: Use for one-offs, add to theme for repeated values

─────────────────────────────────────────────────

---

## Troubleshooting

### Utilities Not Generated

**Check**: Content paths are correct
```javascript
content: ['./src/**/*.{html,js,jsx,ts,tsx}']  // Correct
```

### Dark Mode Not Working

**Check**: darkMode is set and class is applied
```javascript
darkMode: 'class'  // Config
```
```html
<html class="dark">  <!-- HTML -->
```

### Custom Colors Not Showing

**Check**: Using `extend` to preserve defaults
```javascript
theme: {
  extend: {  // Use extend!
    colors: { brand: '#0ea5e9' }
  }
}
```

---

## Next Steps

- [Performance Guide](./PERFORMANCE.md) - Optimization techniques
- [Utility Reference](./UTILITY_COVERAGE.md) - All available utilities
- [Component Examples](./examples/demo/README.md) - Real-world examples

---

**Last Updated**: November 2, 2025
**HikmaUI Version**: 0.1.0
**Status**: Complete Reference Guide
