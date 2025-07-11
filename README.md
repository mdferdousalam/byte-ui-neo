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

- 🎨 **16+ UI Components** - Buttons, Forms, Modals, Navigation, Cards, and more
- 🌈 **8 Color Variants** - Primary, Secondary, Success, Danger, Warning, Info, Light, Dark
- 📱 **Mobile-First Responsive** - Works perfectly on all devices
- ♿ **Accessibility First** - WCAG compliant with proper ARIA attributes
- 🔧 **Highly Customizable** - CSS custom properties for easy theming
- 🚀 **Production Ready** - Minified CSS (53.3 KB) and JS (7.13 KB)
- 🎯 **Modern CSS** - Flexbox, Grid, and CSS Custom Properties
- 🔌 **JavaScript Components** - Interactive elements with vanilla JS

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

### 🔘 Buttons
```html
<!-- Solid Buttons -->
<button class="btn btn--primary">Primary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>

<!-- Outline Buttons -->
<button class="btn btn--outline-primary">Primary Outline</button>
<button class="btn btn--outline-success">Success Outline</button>

<!-- Button Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--lg">Large</button>

<!-- Button States -->
<button class="btn btn--primary" disabled>Disabled</button>
<button class="btn btn--primary btn--loading">Loading</button>
```

### 🃏 Cards
```html
<div class="card">
    <img src="image.jpg" class="card-img-top" alt="Card image">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <h6 class="card-subtitle">Card Subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
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

## 🎯 Utility Classes

### 📐 Spacing
```html
<!-- Margin -->
<div class="m-xs">Margin XS</div>
<div class="mt-md">Margin Top MD</div>
<div class="mx-auto">Margin X Auto (Center)</div>

<!-- Padding -->
<div class="p-sm">Padding SM</div>
<div class="py-lg">Padding Y LG</div>
<div class="px-xl">Padding X XL</div>
```

### 🎨 Display & Flexbox
```html
<!-- Display -->
<div class="d-none d-md-block">Hidden on mobile, visible on desktop</div>
<div class="d-flex">Flexbox container</div>

<!-- Flexbox -->
<div class="d-flex justify-content-center align-items-center">
    <div>Centered content</div>
</div>
<div class="d-flex flex-column flex-md-row">
    <div>Responsive flex direction</div>
</div>
```

### 📝 Typography
```html
<p class="text-center">Centered text</p>
<p class="text-uppercase">Uppercase text</p>
<p class="fw-bold">Bold text</p>
<p class="text-md-start text-lg-end">Responsive text alignment</p>
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

## 🎨 Customization

### CSS Custom Properties
```css
:root {
    /* Colors */
    --hikma-color-primary: #007bff;
    --hikma-color-success: #28a745;
    --hikma-color-danger: #dc3545;
    
    /* Spacing */
    --hikma-spacing-xs: 0.25rem;
    --hikma-spacing-sm: 0.5rem;
    --hikma-spacing-md: 1rem;
    --hikma-spacing-lg: 1.5rem;
    --hikma-spacing-xl: 2rem;
    
    /* Typography */
    --hikma-font-size-sm: 0.875rem;
    --hikma-font-size-base: 1rem;
    --hikma-font-size-lg: 1.25rem;
    
    /* Border */
    --hikma-border-radius: 0.375rem;
    --hikma-border-width: 1px;
}
```

### Dark Mode
```html
<body class="dark-mode">
    <!-- Your content here -->
</body>
```

```javascript
// Toggle dark mode
document.body.classList.toggle('dark-mode');
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