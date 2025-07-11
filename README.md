# 🌟 Hikma UI Framework

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status">
  <img src="https://img.shields.io/badge/responsive-yes-orange.svg" alt="Responsive">
</div>

## 📖 Overview

**Hikma UI** is a modern, lightweight, and highly customizable CSS framework built with **Sass (SCSS)** and **vanilla JavaScript**. It provides a comprehensive set of UI components, utility classes, and responsive design patterns to help you build beautiful, accessible, and performant web applications.

### ✨ Key Features

- 🎨 **30+ UI Components** - Buttons, Forms, Modals, Navigation, Cards, and advanced components
- 🌈 **Design System** - Comprehensive design tokens and semantic color system
- 📱 **Mobile-First Responsive** - Container queries and modern responsive design
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility with screen reader support
- 🔧 **Component Variants** - Multiple variants for each component (solid, outline, ghost, soft, glass)
- 🚀 **Production Ready** - Minified CSS (79.4 KB) and JS (7.13 KB) with tree-shaking
- 🎯 **Modern CSS Features** - Container queries, cascade layers, view transitions
- 🔌 **Advanced JavaScript** - Modern web APIs, performance monitoring, accessibility enhancements
- 🌙 **Advanced Dark Mode** - System preference detection and smooth transitions
- ⚡ **Performance Optimized** - Core Web Vitals monitoring and optimizations
- 🎨 **Utility-First** - Comprehensive atomic utilities inspired by Tailwind CSS
- 🌍 **Internationalization** - RTL support and logical properties

## 🚀 Quick Start

### 📦 Installation

#### Option 1: NPM (Recommended)
```bash
npm install hikma-ui
```

#### Option 2: Yarn
```bash
yarn add hikma-ui
```

#### Option 3: CDN
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/hikma-ui@1.0.0/dist/hikma-ui.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/hikma-ui@1.0.0/dist/hikma-ui-js.min.js"></script>
```

#### Option 4: Download
Download the latest release from [GitHub Releases](https://github.com/mdferdousalam/hikma-ui/releases)

### 🛠️ Usage

#### Basic HTML Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Hikma UI App</title>
    <link rel="stylesheet" href="path/to/hikma-ui.min.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to Hikma UI!</h1>
        <button class="btn btn--primary">Get Started</button>
    </div>
    
    <script src="path/to/hikma-ui-js.min.js"></script>
</body>
</html>
```

#### Using with Build Tools
```scss
// Import the entire framework
@import '~hikma-ui/src/main.scss';

// Or import specific components
@import '~hikma-ui/src/components/button';
@import '~hikma-ui/src/components/card';
```

## 🎨 Components Overview

### 🔘 Advanced Button System
```html
<!-- Variant Types -->
<button class="btn btn--solid btn--primary">Solid</button>
<button class="btn btn--outline btn--primary">Outline</button>
<button class="btn btn--ghost btn--primary">Ghost</button>
<button class="btn btn--soft btn--primary">Soft</button>
<button class="btn btn--glass btn--primary">Glass</button>

<!-- Sizes -->
<button class="btn btn--xs">Extra Small</button>
<button class="btn btn--sm">Small</button>
<button class="btn btn--md">Medium</button>
<button class="btn btn--lg">Large</button>
<button class="btn btn--xl">Extra Large</button>

<!-- States -->
<button class="btn btn--primary loading">Loading...</button>
<button class="btn btn--primary" disabled>Disabled</button>

<!-- Special Types -->
<button class="btn btn--fab btn--primary">🚀</button>
<button class="btn btn--icon-only btn--primary">+</button>
```

### 🃏 Enhanced Cards
```html
<!-- Card Variants -->
<div class="card card--elevated">
    <div class="card-body">
        <h5 class="card-title">Elevated Card</h5>
        <p class="card-text">Beautiful shadow and hover effects</p>
    </div>
</div>

<div class="card card--glass">
    <div class="card-body">
        <h5 class="card-title">Glass Card</h5>
        <p class="card-text">Glassmorphism design with backdrop blur</p>
    </div>
</div>

<div class="card card--interactive">
    <div class="card-body">
        <h5 class="card-title">Interactive Card</h5>
        <p class="card-text">Hover for smooth animations</p>
    </div>
</div>
```

### 📝 Forms
```html
<form>
    <div class="mb-md">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" required>
        <div class="form-text">We'll never share your email.</div>
    </div>
    
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
        </label>
    </div>
    
    <button type="submit" class="btn btn--primary">Submit</button>
</form>
```

### 🚨 Alerts
```html
<div class="alert alert-primary" role="alert">
    A simple primary alert—check it out!
</div>
<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Well done!</strong> You successfully read this important alert message.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### 🏷️ Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge rounded-pill badge-danger">Danger</span>
```

## 🎯 Advanced Utility System

### 📐 Comprehensive Spacing
```html
<!-- Modern spacing scale -->
<div class="p-1">4px padding</div>
<div class="p-4">16px padding</div>
<div class="p-8">32px padding</div>
<div class="mx-auto">Auto center</div>

<!-- Responsive spacing -->
<div class="p-2 p-md-4 p-lg-6">Responsive padding</div>
```

### 🎨 Flexbox & Grid
```html
<!-- Advanced flexbox -->
<div class="d-flex justify-content-center align-items-center gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- CSS Grid utilities -->
<div class="d-grid grid-cols-3 gap-4">
    <div>Grid item 1</div>
    <div>Grid item 2</div>
    <div>Grid item 3</div>
</div>
```

### 📝 Typography & Colors
```html
<!-- Typography scale -->
<h1 class="text-4xl font-bold">Large heading</h1>
<p class="text-lg text-neutral-600">Subtitle</p>

<!-- Color utilities -->
<div class="bg-primary text-white">Primary background</div>
<div class="bg-gradient-to-r from-primary to-accent">Gradient</div>
```

### 🔄 Animations & Interactions
```html
<!-- Hover effects -->
<div class="hover:scale-105 transition-transform">Scale on hover</div>
<div class="hover:rotate-3 transition-transform">Rotate on hover</div>

<!-- Scroll animations -->
<div class="animate-on-scroll" data-scroll-animation="fade-in">
    Fade in on scroll
</div>
```

## 🎪 Interactive Components

### 🪟 Modals
```html
<!-- Button trigger modal -->
<button type="button" class="btn btn--primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                Modal body text goes here.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn--primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

### 🎠 Carousel
```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="slide1.jpg" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
            <img src="slide2.jpg" class="d-block w-100" alt="Slide 2">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>
```

## 🚀 Modern CSS Features

### Container Queries
```css
/* Responsive based on container size */
.responsive-card {
  @container card (min-width: 400px) {
    display: grid;
    grid-template-columns: auto 1fr;
  }
}
```

### View Transitions
```javascript
// Smooth page transitions
document.startViewTransition(() => {
  // Update DOM
});
```

### CSS Cascade Layers
```css
/* Organized CSS with layers */
@layer reset, base, components, utilities, overrides;
```

## 🎨 Advanced Customization

### Design Token System
```css
:root {
    /* Brand colors */
    --color-brand-primary: #2563eb;
    --color-brand-secondary: #64748b;
    --color-brand-accent: #f59e0b;
    
    /* Semantic colors */
    --color-semantic-success: #10b981;
    --color-semantic-warning: #f59e0b;
    --color-semantic-error: #ef4444;
    
    /* Spacing scale */
    --spacing-unit: 0.25rem;
    --spacing-1: 0.25rem;
    --spacing-4: 1rem;
    --spacing-8: 2rem;
    
    /* Typography */
    --font-family-sans: 'Inter', sans-serif;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    
    /* Shadows */
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Advanced Dark Mode
```html
<!-- Theme toggle with system preference -->
<button data-theme-toggle>🌙</button>
```

```javascript
// Automatic theme detection
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
// Smart theme switching with smooth transitions
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
```html
<!-- Skip navigation -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- Accessible forms -->
<div class="form-field">
    <label for="email" class="form-label required">Email Address</label>
    <input type="email" id="email" class="form-input" 
           aria-describedby="email-help" required>
    <div id="email-help" class="form-help">
        We'll never share your email with anyone else.
    </div>
</div>

<!-- Focus management -->
<div class="modal" aria-hidden="true" role="dialog" aria-labelledby="modal-title">
    <div class="modal-dialog" tabindex="-1">
        <h2 id="modal-title">Modal Title</h2>
        <!-- Modal content -->
    </div>
</div>
```

### Accessibility Features
- **Focus trapping** in modals and dialogs
- **Keyboard navigation** with proper tab order
- **Screen reader support** with ARIA labels
- **High contrast mode** compatibility
- **Reduced motion** preferences support
- **Touch-friendly** 44px minimum targets

## ⚡ Performance & Optimization

### Core Web Vitals
- **LCP optimization** with lazy loading
- **FID monitoring** with Performance Observer
- **CLS prevention** with size reservations
- **Lighthouse 95+ scores** out of the box

### Modern JavaScript Features
```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content
    }
  });
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  // Monitor Core Web Vitals
});
```

## 🔧 Build from Source

```bash
# Clone the repository
git clone https://github.com/mdferdousalam/hikma-ui.git
cd hikma-ui

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ iOS Safari 14+
- ✅ Android Chrome 88+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 Email: mdferdousalam@example.com
- 💬 GitHub Discussions: [Ask questions](https://github.com/mdferdousalam/hikma-ui/discussions)
- 🐛 Bug Reports: [Create an issue](https://github.com/mdferdousalam/hikma-ui/issues)

## 🙏 Acknowledgments

- Built with ❤️ by [Md Ferdous Alam](https://github.com/mdferdousalam)
- Inspired by modern CSS frameworks and accessibility best practices
- Special thanks to the open-source community

---

<div align="center">
  <p>Made with ❤️ in Bangladesh</p>
  <p>If you found this project helpful, please give it a ⭐!</p>
</div>