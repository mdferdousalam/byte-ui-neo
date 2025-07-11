# 🎨 Customization Guide

Byte UI Neo is built with customization in mind. This guide shows you how to customize colors, spacing, typography, and create your own themes.

## CSS Custom Properties

Byte UI Neo uses CSS custom properties (CSS variables) for easy customization. You can override these variables to match your brand and design requirements.

### Color System

```css
:root {
	/* Primary Colors */
	--byte-color-primary: #007bff;
	--byte-color-primary-hover: #0056b3;
	--byte-color-primary-rgb: 0, 123, 255;

	/* Secondary Colors */
	--byte-color-secondary: #6c757d;
	--byte-color-secondary-hover: #545b62;
	--byte-color-secondary-rgb: 108, 117, 125;

	/* Success Colors */
	--byte-color-success: #28a745;
	--byte-color-success-hover: #1e7e34;
	--byte-color-success-rgb: 40, 167, 69;

	/* Danger Colors */
	--byte-color-danger: #dc3545;
	--byte-color-danger-hover: #c82333;
	--byte-color-danger-rgb: 220, 53, 69;

	/* Warning Colors */
	--byte-color-warning: #ffc107;
	--byte-color-warning-hover: #e0a800;
	--byte-color-warning-rgb: 255, 193, 7;

	/* Info Colors */
	--byte-color-info: #17a2b8;
	--byte-color-info-hover: #117a8b;
	--byte-color-info-rgb: 23, 162, 184;

	/* Light Colors */
	--byte-color-light: #f8f9fa;
	--byte-color-light-hover: #e2e6ea;
	--byte-color-light-rgb: 248, 249, 250;

	/* Dark Colors */
	--byte-color-dark: #343a40;
	--byte-color-dark-hover: #23272b;
	--byte-color-dark-rgb: 52, 58, 64;
}
```

### Typography

```css
:root {
	/* Font Families */
	--byte-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, sans-serif;
	--byte-font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, sans-serif;
	--byte-font-family-code: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
		Courier, monospace;

	/* Font Sizes */
	--byte-font-size-xs: 0.75rem; /* 12px */
	--byte-font-size-sm: 0.875rem; /* 14px */
	--byte-font-size-base: 1rem; /* 16px */
	--byte-font-size-lg: 1.125rem; /* 18px */
	--byte-font-size-xl: 1.25rem; /* 20px */
	--byte-font-size-2xl: 1.5rem; /* 24px */
	--byte-font-size-3xl: 1.875rem; /* 30px */
	--byte-font-size-4xl: 2.25rem; /* 36px */

	/* Font Weights */
	--byte-font-weight-light: 300;
	--byte-font-weight-normal: 400;
	--byte-font-weight-medium: 500;
	--byte-font-weight-semibold: 600;
	--byte-font-weight-bold: 700;

	/* Line Heights */
	--byte-line-height-tight: 1.25;
	--byte-line-height-base: 1.5;
	--byte-line-height-relaxed: 1.625;
	--byte-line-height-loose: 2;
}
```

### Spacing Scale

```css
:root {
	/* Spacing Scale */
	--byte-spacing-xs: 0.25rem; /* 4px */
	--byte-spacing-sm: 0.5rem; /* 8px */
	--byte-spacing-md: 1rem; /* 16px */
	--byte-spacing-lg: 1.5rem; /* 24px */
	--byte-spacing-xl: 2rem; /* 32px */
	--byte-spacing-2xl: 2.5rem; /* 40px */
	--byte-spacing-3xl: 3rem; /* 48px */
	--byte-spacing-4xl: 4rem; /* 64px */
	--byte-spacing-5xl: 5rem; /* 80px */
	--byte-spacing-6xl: 6rem; /* 96px */
}
```

### Borders and Shadows

```css
:root {
	/* Border Radius */
	--byte-border-radius-none: 0;
	--byte-border-radius-sm: 0.125rem; /* 2px */
	--byte-border-radius: 0.375rem; /* 6px */
	--byte-border-radius-lg: 0.5rem; /* 8px */
	--byte-border-radius-xl: 0.75rem; /* 12px */
	--byte-border-radius-2xl: 1rem; /* 16px */
	--byte-border-radius-full: 9999px;

	/* Border Width */
	--byte-border-width: 1px;
	--byte-border-width-2: 2px;
	--byte-border-width-4: 4px;
	--byte-border-width-8: 8px;

	/* Box Shadows */
	--byte-box-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	--byte-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	--byte-box-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	--byte-box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	--byte-box-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px
			rgba(0, 0, 0, 0.04);
	--byte-box-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

## Creating Custom Themes

### Brand Theme Example

```css
:root {
	/* Custom Brand Colors */
	--byte-color-primary: #6366f1; /* Indigo */
	--byte-color-primary-hover: #4f46e5;
	--byte-color-primary-rgb: 99, 102, 241;

	--byte-color-secondary: #64748b; /* Slate */
	--byte-color-secondary-hover: #475569;
	--byte-color-secondary-rgb: 100, 116, 139;

	--byte-color-success: #10b981; /* Emerald */
	--byte-color-success-hover: #059669;
	--byte-color-success-rgb: 16, 185, 129;

	--byte-color-danger: #ef4444; /* Red */
	--byte-color-danger-hover: #dc2626;
	--byte-color-danger-rgb: 239, 68, 68;

	/* Custom Typography */
	--byte-font-family-base: 'Poppins', sans-serif;
	--byte-font-family-heading: 'Poppins', sans-serif;

	/* Custom Spacing */
	--byte-border-radius: 0.5rem; /* More rounded */
	--byte-border-radius-lg: 1rem;

	/* Custom Shadows */
	--byte-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Custom button styles */
.btn {
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
}

/* Custom card styles */
.card {
	border: none;
	box-shadow: var(--byte-box-shadow);
}
```

### Dark Theme

```css
.dark-mode {
	/* Dark Color Palette */
	--byte-background-color-base: #1a1a1a;
	--byte-background-color-light: #2d2d2d;
	--byte-background-color-dark: #000000;

	--byte-text-color-base: #ffffff;
	--byte-text-color-muted: #a0a0a0;
	--byte-text-color-light: #e0e0e0;
	--byte-text-color-dark: #ffffff;

	--byte-border-color-base: #404040;
	--byte-border-color-light: #606060;
	--byte-border-color-dark: #202020;

	/* Dark Component Overrides */
	--byte-card-bg: #2d2d2d;
	--byte-card-border-color: #404040;
	--byte-card-cap-bg: #3a3a3a;

	--byte-navbar-bg: #2d2d2d;
	--byte-navbar-border: #404040;

	--byte-form-control-bg: #3a3a3a;
	--byte-form-control-border: #606060;
	--byte-form-control-focus-border: var(--byte-color-primary);
}
```

## Component-Specific Customization

### Button Customization

```css
/* Custom button variant */
.btn--gradient {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border: none;
	color: white;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	transition: all 0.3s ease;
}

.btn--gradient:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

/* Custom button sizes */
.btn--xs {
	padding: 0.125rem 0.375rem;
	font-size: 0.75rem;
	line-height: 1.5;
	border-radius: 0.25rem;
}

.btn--2xl {
	padding: 1.25rem 2.5rem;
	font-size: 1.375rem;
	line-height: 1.5;
	border-radius: 0.75rem;
}
```

### Card Customization

```css
/* Glassmorphism card */
.card--glass {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Hover effects */
.card--hover {
	transition: all 0.3s ease;
	cursor: pointer;
}

.card--hover:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Gradient border */
.card--gradient-border {
	position: relative;
	background: white;
	border-radius: 0.5rem;
	padding: 2px;
}

.card--gradient-border::before {
	content: '';
	position: absolute;
	inset: 0;
	padding: 2px;
	background: linear-gradient(45deg, #667eea, #764ba2);
	border-radius: inherit;
	mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
	mask-composite: subtract;
}
```

### Form Customization

```css
/* Custom form control */
.form-control--modern {
	border: 2px solid transparent;
	border-radius: 0.5rem;
	background: linear-gradient(white, white) padding-box, linear-gradient(
				45deg,
				#667eea,
				#764ba2
			) border-box;
	transition: all 0.3s ease;
}

.form-control--modern:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Floating labels */
.form-floating {
	position: relative;
}

.form-floating > .form-control {
	padding: 1rem 0.75rem 0.25rem;
}

.form-floating > label {
	position: absolute;
	top: 0;
	left: 0;
	padding: 1rem 0.75rem;
	pointer-events: none;
	color: #6c757d;
	transition: all 0.3s ease;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
	transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
	opacity: 0.65;
}
```

## Advanced Customization

### CSS-in-JS Integration

```javascript
// For React/styled-components
import styled from 'styled-components';

const CustomButton = styled.button`
	${(props) => props.theme.byte.button.base}

	background: ${(props) => props.theme.colors.primary};
	color: white;
	border: none;
	padding: ${(props) => props.theme.spacing.md} ${(props) =>
			props.theme.spacing.lg};
	border-radius: ${(props) => props.theme.borderRadius.md};
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;

	&:hover {
		background: ${(props) => props.theme.colors.primaryHover};
		transform: translateY(-2px);
	}
`;

// Theme object
const theme = {
	colors: {
		primary: '#6366f1',
		primaryHover: '#4f46e5',
		// ... other colors
	},
	spacing: {
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		// ... other spacing
	},
	borderRadius: {
		sm: '0.25rem',
		md: '0.5rem',
		lg: '1rem',
		// ... other border radius
	},
	byte: {
		button: {
			base: `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                text-decoration: none;
                text-align: center;
                transition: all 0.2s ease;
                user-select: none;
            `,
		},
	},
};
```

### Sass Variables Override

```scss
// Override default variables before importing
$byte-color-primary: #6366f1;
$byte-color-secondary: #64748b;
$byte-font-family-base: 'Poppins', sans-serif;
$byte-border-radius: 0.5rem;
$byte-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

// Import Byte UI Neo
@import '~byte-ui-neo/src/main.scss';

// Custom additions
.btn {
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
}

.card {
	border: none;
	box-shadow: $byte-box-shadow;
}
```

## Responsive Customization

### Breakpoint-Specific Themes

```css
/* Mobile theme */
@media (max-width: 767px) {
	:root {
		--byte-font-size-base: 0.875rem;
		--byte-spacing-md: 0.75rem;
		--byte-border-radius: 0.25rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}

	.card {
		margin-bottom: 1rem;
	}
}

/* Tablet theme */
@media (min-width: 768px) and (max-width: 1023px) {
	:root {
		--byte-font-size-base: 1rem;
		--byte-spacing-md: 1rem;
		--byte-border-radius: 0.375rem;
	}
}

/* Desktop theme */
@media (min-width: 1024px) {
	:root {
		--byte-font-size-base: 1.125rem;
		--byte-spacing-md: 1.25rem;
		--byte-border-radius: 0.5rem;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}
}
```

## Performance Optimization

### Purge Unused CSS

```javascript
// webpack.config.js
module.exports = {
	plugins: [
		new PurgeCSSPlugin({
			paths: glob.sync([
				path.join(__dirname, 'src/**/*.html'),
				path.join(__dirname, 'src/**/*.js'),
				path.join(__dirname, 'src/**/*.jsx'),
				path.join(__dirname, 'src/**/*.ts'),
				path.join(__dirname, 'src/**/*.tsx'),
			]),
			defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
			safelist: [
				// Byte UI classes to always keep
				'btn',
				'card',
				'form-control',
				'alert',
				/^btn--/,
				/^card--/,
				/^alert-/,
				/^badge-/,
				// Dynamic classes
				'show',
				'active',
				'disabled',
				'loading',
			],
		}),
	],
};
```

### Custom Build

```scss
// custom-build.scss - Include only what you need
@import '~byte-ui-neo/src/core/variables';
@import '~byte-ui-neo/src/core/mixins';
@import '~byte-ui-neo/src/core/base';

// Only include components you use
@import '~byte-ui-neo/src/components/button';
@import '~byte-ui-neo/src/components/card';
@import '~byte-ui-neo/src/components/form';

// Only include utilities you use
@import '~byte-ui-neo/src/utilities/spacing';
@import '~byte-ui-neo/src/utilities/flex';
@import '~byte-ui-neo/src/utilities/text';
```

## Best Practices

1. **Use CSS Custom Properties**: They provide better performance and easier maintenance
2. **Maintain Consistency**: Keep your custom styles consistent with the existing design system
3. **Test Responsively**: Always test your customizations on different screen sizes
4. **Document Changes**: Keep track of your customizations for future maintenance
5. **Performance First**: Only include styles you actually use
6. **Accessibility**: Ensure your customizations don't break accessibility features
7. **Version Control**: Keep your custom theme files in version control

This comprehensive customization guide should help you create unique designs while maintaining the robust foundation that Byte UI Neo provides!
