# 📚 Byte UI Neo Documentation

Welcome to the comprehensive documentation for Byte UI Neo - a modern, lightweight CSS framework built with Sass and vanilla JavaScript.

## 📖 Table of Contents

### 🚀 Getting Started
- [Quick Start Guide](./guides/getting-started.md) - Get up and running in minutes
- [Installation Options](./guides/getting-started.md#installation) - CDN, NPM, Download
- [Browser Support](./guides/getting-started.md#browser-support) - Compatibility information

### 🎨 Customization
- [Customization Guide](./guides/customization.md) - Themes, colors, and styling
- [CSS Variables](./guides/customization.md#css-custom-properties) - Available custom properties
- [Dark Mode](./guides/customization.md#dark-theme) - Dark theme implementation
- [Responsive Design](./guides/customization.md#responsive-customization) - Breakpoint customization

### 🧩 Components
- [Buttons](./components/buttons.md) - All button variants and states
- [Cards](./components/cards.md) - Flexible content containers
- [Forms](./components/forms.md) - Form controls and validation
- [Modals](./components/modals.md) - Dialog boxes and overlays
- [Navigation](./components/navigation.md) - Navbar and breadcrumbs
- [Alerts](./components/alerts.md) - Contextual feedback messages
- [Badges](./components/badges.md) - Small count and labeling component
- [Carousel](./components/carousel.md) - Image and content sliders
- [Dropdown](./components/dropdown.md) - Toggleable contextual overlays
- [Pagination](./components/pagination.md) - Navigation for paged content
- [Spinner](./components/spinner.md) - Loading indicators
- [Toast](./components/toast.md) - Non-intrusive notifications
- [Tabs](./components/tabs.md) - Tabbed content organization

### 🔧 JavaScript API
- [API Reference](./api/javascript.md) - Complete JavaScript API documentation
- [Event System](./api/javascript.md#event-management) - Event handling and custom events
- [Component Methods](./api/javascript.md#component-apis) - Methods for each component
- [Utility Functions](./api/javascript.md#utility-functions) - Helper functions and utilities

### 🛠️ Utilities
- [Spacing](./utilities/spacing.md) - Margin and padding utilities
- [Flexbox](./utilities/flexbox.md) - Flex container and item utilities
- [Typography](./utilities/typography.md) - Text styling and alignment
- [Display](./utilities/display.md) - Display and visibility utilities
- [Positioning](./utilities/positioning.md) - Position and z-index utilities
- [Borders](./utilities/borders.md) - Border and border-radius utilities
- [Colors](./utilities/colors.md) - Text and background color utilities
- [Shadows](./utilities/shadows.md) - Box shadow utilities
- [Sizing](./utilities/sizing.md) - Width and height utilities

### 📱 Responsive Design
- [Breakpoints](./responsive/breakpoints.md) - Available breakpoints and usage
- [Grid System](./responsive/grid.md) - Flexible grid layout system
- [Responsive Utilities](./responsive/utilities.md) - Breakpoint-specific utilities
- [Container System](./responsive/container.md) - Responsive containers

### 🎯 Examples
- [Page Layouts](./examples/layouts.md) - Common page layout patterns
- [Component Examples](./examples/components.md) - Real-world component usage
- [Form Examples](./examples/forms.md) - Complete form implementations
- [Dashboard Examples](./examples/dashboard.md) - Admin dashboard layouts
- [E-commerce Examples](./examples/ecommerce.md) - Shopping site components

## 🏗️ Framework Architecture

### File Structure
```
byte-ui-neo/
├── src/
│   ├── main.scss              # Main entry point
│   ├── base/                  # Base styles and variables
│   │   ├── _variables.scss    # CSS custom properties
│   │   ├── _reset.scss        # CSS reset
│   │   └── _typography.scss   # Typography base
│   ├── components/            # UI Components
│   │   ├── _button.scss       # Button component
│   │   ├── _card.scss         # Card component
│   │   ├── _form.scss         # Form components
│   │   └── ...               # Other components
│   ├── layout/                # Layout components
│   │   ├── _container.scss    # Container system
│   │   ├── _grid.scss         # Grid system
│   │   └── _sections.scss     # Section layouts
│   ├── utilities/             # Utility classes
│   │   ├── _spacing.scss      # Spacing utilities
│   │   ├── _flex.scss         # Flexbox utilities
│   │   └── ...               # Other utilities
│   ├── theme/                 # Theme variations
│   │   └── _dark-mode.scss    # Dark mode theme
│   └── javascript/            # JavaScript functionality
│       ├── contrast-checker.js # Accessibility utilities
│       └── index.js           # Main JS entry point
├── dist/                      # Built files
├── docs/                      # Documentation
└── examples/                  # Example implementations
```

### Design System

#### Color Palette
- **Primary**: `#007bff` (Blue)
- **Secondary**: `#6c757d` (Gray)
- **Success**: `#28a745` (Green)
- **Danger**: `#dc3545` (Red)
- **Warning**: `#ffc107` (Yellow)
- **Info**: `#17a2b8` (Cyan)
- **Light**: `#f8f9fa` (Light Gray)
- **Dark**: `#343a40` (Dark Gray)

#### Typography Scale
- **XS**: 0.75rem (12px)
- **SM**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **LG**: 1.125rem (18px)
- **XL**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)

#### Spacing Scale
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 2.5rem (40px)
- **3XL**: 3rem (48px)

#### Breakpoints
- **SM**: 576px and up
- **MD**: 768px and up
- **LG**: 992px and up
- **XL**: 1200px and up
- **XXL**: 1400px and up

## 🎯 Design Principles

### 1. **Accessibility First**
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

### 2. **Mobile-First Responsive**
- Mobile-first approach
- Flexible grid system
- Responsive utilities
- Touch-friendly interactions

### 3. **Performance Optimized**
- Lightweight CSS (53.3KB minified)
- Minimal JavaScript (7.13KB minified)
- Tree-shakeable components
- Efficient selectors

### 4. **Developer Experience**
- Intuitive class naming
- Consistent patterns
- Comprehensive documentation
- TypeScript support (coming soon)

### 5. **Customizable**
- CSS custom properties
- Sass variables
- Modular architecture
- Theme system

## 🔄 Migration Guide

### From Other Frameworks

#### From Bootstrap
```scss
// Bootstrap to Byte UI class mappings
.btn-primary     → .btn.btn--primary
.card-body       → .card-body (same)
.form-control    → .form-control (same)
.d-flex          → .d-flex (same)
.justify-content-center → .justify-content-center (same)
```

#### From Tailwind CSS
```scss
// Tailwind to Byte UI class mappings
.bg-blue-500     → .bg-primary
.text-white      → .text-white
.p-4             → .p-md
.rounded-lg      → .rounded-lg
.shadow-lg       → .shadow-lg
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Use GitHub Issues
2. **Request Features**: Use GitHub Discussions
3. **Submit PRs**: Follow our contribution guidelines
4. **Improve Docs**: Help us make documentation better
5. **Share Examples**: Show us what you've built

### Development Setup
```bash
# Clone the repository
git clone https://github.com/mdferdousalam/byte-ui-neo.git
cd byte-ui-neo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📄 License

Byte UI is released under the MIT License. See [LICENSE](../LICENSE) for details.

## 🙏 Acknowledgments

- Built with ❤️ by [Md Ferdous Alam](https://github.com/mdferdousalam)
- Inspired by modern CSS frameworks and design systems
- Special thanks to the open-source community
- Icons by [Heroicons](https://heroicons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📞 Support

Need help? We're here for you:

- 📧 **Email**: mdferdousalam@example.com
- 💬 **GitHub Discussions**: [Ask questions](https://github.com/mdferdousalam/byte-ui-neo/discussions)
- 🐛 **Bug Reports**: [Create an issue](https://github.com/mdferdousalam/byte-ui-neo/issues)
- 📚 **Documentation**: You're reading it!
- 🌟 **Show Support**: [Star us on GitHub](https://github.com/mdferdousalam/byte-ui-neo)

---

<div align="center">
  <p><strong>Made with ❤️ in Bangladesh</strong></p>
  <p>If you find Byte UI helpful, please consider giving it a ⭐ on GitHub!</p>
</div>