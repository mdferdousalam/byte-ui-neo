# 🔘 Buttons

Buttons are one of the most important interactive elements in any user interface. Hikma UI provides a comprehensive set of button styles, sizes, and states to cover all your needs.

## Basic Usage

```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
```

## Button Variants

### Solid Buttons

Solid buttons are the default style with filled backgrounds.

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--warning">Warning</button>
<button class="btn btn--info">Info</button>
<button class="btn btn--light">Light</button>
<button class="btn btn--dark">Dark</button>
```

### Outline Buttons

Outline buttons have transparent backgrounds with colored borders.

```html
<button class="btn btn--outline-primary">Primary Outline</button>
<button class="btn btn--outline-secondary">Secondary Outline</button>
<button class="btn btn--outline-success">Success Outline</button>
<button class="btn btn--outline-danger">Danger Outline</button>
<button class="btn btn--outline-warning">Warning Outline</button>
<button class="btn btn--outline-info">Info Outline</button>
<button class="btn btn--outline-light">Light Outline</button>
<button class="btn btn--outline-dark">Dark Outline</button>
```

## Button Sizes

### Small Buttons

```html
<button class="btn btn--primary btn--sm">Small Button</button>
<button class="btn btn--outline-secondary btn--sm">Small Outline</button>
```

### Default Buttons

```html
<button class="btn btn--primary">Default Button</button>
<button class="btn btn--outline-secondary">Default Outline</button>
```

### Large Buttons

```html
<button class="btn btn--primary btn--lg">Large Button</button>
<button class="btn btn--outline-secondary btn--lg">Large Outline</button>
```

## Button States

### Disabled State

```html
<button class="btn btn--primary" disabled>Disabled Button</button>
<button class="btn btn--secondary disabled">Disabled with Class</button>
```

### Loading State

```html
<button class="btn btn--primary btn--loading">Loading Button</button>
<button class="btn btn--success btn--loading">Processing</button>
```

### Focus State

Focus states are automatically applied when users navigate using keyboard.

```html
<button class="btn btn--primary">Focus me with Tab</button>
```

## Button Groups

### Horizontal Button Group

```html
<div class="btn-group">
	<button class="btn btn--primary">Left</button>
	<button class="btn btn--primary">Middle</button>
	<button class="btn btn--primary">Right</button>
</div>
```

### Vertical Button Group

```html
<div class="btn-group btn-group--vertical">
	<button class="btn btn--secondary">Top</button>
	<button class="btn btn--secondary">Middle</button>
	<button class="btn btn--secondary">Bottom</button>
</div>
```

### Mixed Button Group

```html
<div class="btn-group">
	<button class="btn btn--primary">Save</button>
	<button class="btn btn--outline-primary">Save & Continue</button>
	<button class="btn btn--outline-secondary">Cancel</button>
</div>
```

## Advanced Examples

### Button with Icons

```html
<button class="btn btn--primary">
	<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		<path
			d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
		/>
	</svg>
	Add Item
</button>
```

### Button as Link

```html
<a href="#" class="btn btn--primary">Link Button</a>
<a href="#" class="btn btn--outline-secondary">Outline Link</a>
```

### Block Button (Full Width)

```html
<button class="btn btn--primary w-100">Full Width Button</button>
<button class="btn btn--outline-primary w-100">Full Width Outline</button>
```

## JavaScript Integration

### Toggle Loading State

```javascript
const button = document.querySelector('.btn');
button.addEventListener('click', function () {
	this.classList.add('btn--loading');

	// Simulate API call
	setTimeout(() => {
		this.classList.remove('btn--loading');
	}, 2000);
});
```

### Disable Button Temporarily

```javascript
const button = document.querySelector('.btn');
button.disabled = true;

setTimeout(() => {
	button.disabled = false;
}, 3000);
```

## Accessibility

### ARIA Attributes

```html
<button class="btn btn--primary" aria-label="Save document">
	<svg aria-hidden="true"><!-- icon --></svg>
	Save
</button>
```

### Screen Reader Support

```html
<button class="btn btn--primary btn--loading" aria-live="polite">
	<span class="sr-only">Loading...</span>
	Submit Form
</button>
```

## CSS Variables

You can customize button appearance using CSS custom properties:

```css
:root {
	/* Button spacing */
	--byte-btn-padding-x: 1rem;
	--byte-btn-padding-y: 0.5rem;

	/* Button typography */
	--byte-btn-font-size: 1rem;
	--byte-btn-font-weight: 400;
	--byte-btn-line-height: 1.5;

	/* Button appearance */
	--byte-btn-border-radius: 0.375rem;
	--byte-btn-border-width: 1px;

	/* Button transitions */
	--byte-btn-transition: all 0.2s ease-in-out;
}
```

## Customization Examples

### Custom Button Colors

```css
.btn--custom {
	--byte-color-primary: #6f42c1;
	--byte-color-primary-hover: #5a2d91;

	color: var(--byte-text-color-white);
	background-color: var(--byte-color-primary);
	border-color: var(--byte-color-primary);
}

.btn--custom:hover {
	background-color: var(--byte-color-primary-hover);
	border-color: var(--byte-color-primary-hover);
}
```

### Custom Button Sizes

```css
.btn--xs {
	padding: 0.125rem 0.25rem;
	font-size: 0.75rem;
	line-height: 1.5;
	border-radius: 0.25rem;
}

.btn--xl {
	padding: 1rem 2rem;
	font-size: 1.5rem;
	line-height: 1.5;
	border-radius: 0.5rem;
}
```

## Best Practices

1. **Use semantic HTML**: Always use `<button>` for actions and `<a>` for navigation
2. **Provide clear labels**: Button text should clearly describe the action
3. **Use appropriate variants**: Primary for main actions, secondary for supporting actions
4. **Consider loading states**: Show feedback during asynchronous operations
5. **Test with keyboard**: Ensure buttons are accessible via keyboard navigation
6. **Group related actions**: Use button groups for related functionality
7. **Be consistent**: Use the same button styles throughout your application

## Examples in Real Applications

### Form Buttons

```html
<form>
	<!-- Form fields -->
	<div class="btn-group">
		<button type="submit" class="btn btn--primary">Submit</button>
		<button type="button" class="btn btn--outline-secondary">Cancel</button>
		<button type="reset" class="btn btn--outline-danger">Reset</button>
	</div>
</form>
```

### Modal Buttons

```html
<div class="modal-footer">
	<button class="btn btn--secondary" data-bs-dismiss="modal">Close</button>
	<button class="btn btn--primary btn--loading" id="saveBtn">
		Save Changes
	</button>
</div>
```

### Card Actions

```html
<div class="card">
	<div class="card-body">
		<h5 class="card-title">Card Title</h5>
		<p class="card-text">Some example text.</p>
		<div class="btn-group">
			<button class="btn btn--primary btn--sm">Edit</button>
			<button class="btn btn--outline-danger btn--sm">Delete</button>
		</div>
	</div>
</div>
```
