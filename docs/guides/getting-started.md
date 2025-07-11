# 🚀 Getting Started with Byte UI Neo

Welcome to Byte UI Neo! This guide will help you get up and running with our modern CSS framework in just a few minutes.

## What is Byte UI Neo?

Byte UI Neo is a lightweight, modern CSS framework built with Sass and vanilla JavaScript. It provides:

- **16+ Ready-to-use Components** - Buttons, forms, modals, navigation, and more
- **Comprehensive Utility Classes** - Spacing, flexbox, typography, and responsive utilities
- **Dark Mode Support** - Built-in theme switching capabilities
- **Accessibility First** - WCAG compliant components with proper ARIA attributes
- **Mobile-First Design** - Responsive components that work on all devices
- **Customizable** - Easy theming with CSS custom properties

## Installation

### Option 1: CDN (Quickest)

Add these lines to your HTML `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Byte UI Neo App</title>

		<!-- Byte UI Neo CSS -->
		<link
			rel="stylesheet"
			href="https://unpkg.com/byte-ui-neo@1.0.0/dist/byte-ui-neo.min.css"
		/>
	</head>
	<body>
		<!-- Your content here -->

		<!-- Byte UI Neo JavaScript -->
		<script src="https://unpkg.com/byte-ui-neo@1.0.0/dist/byte-ui-neo-js.min.js"></script>
	</body>
</html>
```

### Option 2: NPM (Recommended for Projects)

```bash
npm install byte-ui-neo
```

Then import in your CSS/SCSS:

```scss
// Import entire framework
@import '~byte-ui-neo/src/main.scss';

// Or import specific components
@import '~byte-ui-neo/src/components/button';
@import '~byte-ui-neo/src/components/card';
@import '~byte-ui-neo/src/utilities/spacing';
```

### Option 3: Download

1. Download the latest release from [GitHub](https://github.com/mdferdousalam/byte-ui-neo/releases)
2. Extract the files
3. Include the CSS and JavaScript files in your project

```html
<link rel="stylesheet" href="path/to/byte-ui-neo.min.css" />
<script src="path/to/byte-ui-neo-js.min.js"></script>
```

## Your First Page

Let's create a simple page to see Byte UI in action:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My First Byte UI Neo Page</title>
		<link
			rel="stylesheet"
			href="https://unpkg.com/byte-ui-neo@1.0.0/dist/byte-ui-neo.min.css"
		/>
	</head>
	<body>
		<!-- Navigation -->
		<nav class="navbar navbar-expand-md">
			<div class="container">
				<a class="navbar-brand" href="#">My App</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<a class="nav-link active" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">About</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<div class="container mt-lg">
			<div class="row">
				<div class="col-md-8">
					<!-- Hero Section -->
					<div class="section section-primary text-center p-xl mb-lg">
						<h1>Welcome to Byte UI Neo</h1>
						<p class="lead">
							Build beautiful, responsive websites with our modern CSS
							framework.
						</p>
						<div class="btn-group">
							<button class="btn btn--primary btn--lg">Get Started</button>
							<button class="btn btn--outline-primary btn--lg">
								Learn More
							</button>
						</div>
					</div>

					<!-- Features -->
					<div class="row">
						<div class="col-md-6 mb-md">
							<div class="card h-100">
								<div class="card-body">
									<h5 class="card-title">🚀 Easy to Use</h5>
									<p class="card-text">
										Get started quickly with our comprehensive documentation and
										examples.
									</p>
								</div>
							</div>
						</div>
						<div class="col-md-6 mb-md">
							<div class="card h-100">
								<div class="card-body">
									<h5 class="card-title">📱 Responsive</h5>
									<p class="card-text">
										Mobile-first design that works perfectly on all devices.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<!-- Contact Form -->
					<div class="card">
						<div class="card-header">
							<h6 class="mb-0">Contact Us</h6>
						</div>
						<div class="card-body">
							<form>
								<div class="mb-md">
									<label for="name" class="form-label">Name</label>
									<input type="text" class="form-control" id="name" required />
								</div>
								<div class="mb-md">
									<label for="email" class="form-label">Email</label>
									<input
										type="email"
										class="form-control"
										id="email"
										required
									/>
								</div>
								<div class="mb-md">
									<label for="message" class="form-label">Message</label>
									<textarea
										class="form-control"
										id="message"
										rows="3"
										required
									></textarea>
								</div>
								<button type="submit" class="btn btn--primary w-100">
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="mt-xl py-lg bg-dark text-white">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<h6>Byte UI Neo</h6>
						<p>Modern CSS framework for beautiful web applications.</p>
					</div>
					<div class="col-md-6 text-md-end">
						<p>&copy; 2024 Byte UI Neo. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>

		<script src="https://unpkg.com/byte-ui-neo@1.0.0/dist/byte-ui-neo-js.min.js"></script>
	</body>
</html>
```

## Key Concepts

### 1. Container System

```html
<div class="container">
	<!-- Content is centered with max-width -->
</div>
```

### 2. Grid System

```html
<div class="row">
	<div class="col-md-6">Half width on medium screens+</div>
	<div class="col-md-6">Half width on medium screens+</div>
</div>
```

### 3. Responsive Classes

```html
<div class="d-none d-md-block">Hidden on small, visible on medium+</div>
<div class="text-center text-md-start">Centered on small, left on medium+</div>
```

### 4. Utility Classes

```html
<div class="p-md mb-lg">Padding medium, margin-bottom large</div>
<div class="text-primary bg-light">Primary text, light background</div>
```

## Essential Components

### Buttons

```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--outline-secondary">Outline Button</button>
<button class="btn btn--success btn--sm">Small Success</button>
```

### Cards

```html
<div class="card">
	<div class="card-body">
		<h5 class="card-title">Card Title</h5>
		<p class="card-text">Card content goes here.</p>
		<a href="#" class="btn btn--primary">Action</a>
	</div>
</div>
```

### Forms

```html
<form>
	<div class="mb-md">
		<label for="input1" class="form-label">Label</label>
		<input type="text" class="form-control" id="input1" />
	</div>
	<button type="submit" class="btn btn--primary">Submit</button>
</form>
```

### Alerts

```html
<div class="alert alert-success" role="alert">
	Success! Your action was completed.
</div>
```

## Customization

### CSS Custom Properties

You can customize Byte UI by overriding CSS variables:

```css
:root {
	/* Brand Colors */
	--byte-color-primary: #007bff;
	--byte-color-secondary: #6c757d;
	--byte-color-success: #28a745;

	/* Typography */
	--byte-font-family-base: 'Inter', sans-serif;
	--byte-font-size-base: 1rem;
	--byte-line-height-base: 1.5;

	/* Spacing */
	--byte-spacing-xs: 0.25rem;
	--byte-spacing-sm: 0.5rem;
	--byte-spacing-md: 1rem;
	--byte-spacing-lg: 1.5rem;
	--byte-spacing-xl: 2rem;

	/* Borders */
	--byte-border-radius: 0.375rem;
	--byte-border-width: 1px;
}
```

### Dark Mode

Enable dark mode by adding the `dark-mode` class to the body:

```html
<body class="dark-mode">
	<!-- Your content here -->
</body>
```

Or toggle it with JavaScript:

```javascript
// Toggle dark mode
document.body.classList.toggle('dark-mode');

// Save preference
localStorage.setItem(
	'theme',
	document.body.classList.contains('dark-mode') ? 'dark' : 'light',
);
```

## Browser Support

Byte UI supports all modern browsers:

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ iOS Safari 14+
- ✅ Android Chrome 88+

## Next Steps

Now that you have Byte UI set up, here's what you can do next:

1. **Explore Components**: Check out our [component documentation](../components/) to see all available components
2. **Learn Utilities**: Master our [utility classes](../utilities/) for rapid development
3. **Customize**: Learn how to [customize themes](./customization.md) to match your brand
4. **Build**: Start building your application with our [examples](../examples/)

## Getting Help

If you need help:

- 📚 Check our [documentation](../README.md)
- 🐛 Report bugs on [GitHub Issues](https://github.com/mdferdousalam/byte-ui-neo/issues)
- 💬 Ask questions in [GitHub Discussions](https://github.com/mdferdousalam/byte-ui-neo/discussions)
- 📧 Email us at mdferdousalam@example.com

## Common Patterns

### Page Layout

```html
<div class="container">
	<header class="py-lg">
		<!-- Header content -->
	</header>

	<main class="py-xl">
		<!-- Main content -->
	</main>

	<footer class="py-lg bg-dark text-white">
		<!-- Footer content -->
	</footer>
</div>
```

### Two-Column Layout

```html
<div class="row">
	<div class="col-md-8">
		<!-- Main content -->
	</div>
	<div class="col-md-4">
		<!-- Sidebar -->
	</div>
</div>
```

### Card Grid

```html
<div class="row">
	<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
		<div class="card h-100">
			<!-- Card content -->
		</div>
	</div>
	<!-- Repeat for more cards -->
</div>
```

Happy coding with Byte UI Neo! 🎉
