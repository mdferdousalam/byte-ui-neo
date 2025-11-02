# HikmaUI Demo Project

This demo project showcases HikmaUI's capabilities including:

## Features Demonstrated

### ✨ JIT Compilation
- Real-time CSS generation based on used classes
- Hot module replacement in development
- Optimized production builds

### 🎨 Utility Classes
- **Display**: `flex`, `grid`, `block`, `hidden`
- **Position**: `relative`, `absolute`, `sticky`, `inset-*`, `z-*`
- **Transform**: `scale-*`, `rotate-*`, `translate-*`, `skew-*`
- **Filter**: `blur-*`, `brightness-*`, `backdrop-blur-*`
- **Border**: `border-*`, `rounded-*`, `ring-*`, `divide-*`
- **Transition**: `transition-*`, `duration-*`, `animate-*`

### 🔧 Arbitrary Values
- Custom sizes: `w-[137px]`, `h-[342px]`
- Custom colors: `bg-[#bada55]`, `text-[rgb(99,102,241)]`
- Custom values for any utility

### 📱 Responsive Design
- Mobile-first breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Responsive variants: `md:flex`, `lg:grid`

### 🎭 State Variants
- Hover: `hover:bg-blue-500`
- Focus: `focus:ring-4`
- Active: `active:scale-95`

### 🌓 Dark Mode
- Class-based dark mode: `dark:bg-gray-900`
- Seamless theme switching

## Running the Demo

```bash
# Install dependencies (from workspace root)
pnpm install

# Run development server
cd examples/demo
pnpm dev
```

The demo will open at `http://localhost:3000`

## Project Structure

```
demo/
├── src/
│   ├── App.tsx          # Main demo component
│   ├── main.tsx         # React entry point
│   └── styles/
│       └── main.css     # HikmaUI imports
├── hikma.config.js      # HikmaUI configuration
├── vite.config.ts       # Vite + HikmaUI plugin
└── package.json
```

## Key Implementation Details

### 1. Vite Plugin Integration

```typescript
// vite.config.ts
import hikmaui from '@hikmaui/vite';

export default defineConfig({
  plugins: [
    react(),
    hikmaui({
      config: './hikma.config.js',
      mode: 'development',
      watch: true
    })
  ]
});
```

### 2. CSS Entry Point

```css
/* main.css */
@hikmaui base;
@hikmaui components;
@hikmaui utilities;
```

### 3. Configuration

```javascript
// hikma.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { /* custom colors */ }
      }
    }
  }
};
```

## What to Test

1. **JIT Compilation**: Add new utility classes in App.tsx and watch them compile
2. **Hot Reload**: Make changes and see instant updates
3. **Responsive Design**: Resize browser to test breakpoints
4. **Dark Mode**: Toggle dark mode button
5. **Hover Effects**: Interact with cards and buttons
6. **Arbitrary Values**: Try adding custom `w-[123px]` or `bg-[#abc123]`
7. **Variants**: Test combinations like `md:hover:bg-blue-500`

## Performance

- Development: JIT compiles only used classes
- Production: Optimized CSS bundle with unused code removed
- File watching: Detects changes and recompiles instantly
