# 🃏 Cards

Cards are flexible and extensible content containers. They include options for headers, footers, content, colors, and more.

## Basic Card

```html
<div class="card">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
    </div>
</div>
```

## Card with Image

### Image Top
```html
<div class="card">
    <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Card image">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
    </div>
</div>
```

### Image Bottom
```html
<div class="card">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
    </div>
    <img src="https://via.placeholder.com/300x200" class="card-img-bottom" alt="Card image">
</div>
```

## Card with Header and Footer

```html
<div class="card">
    <div class="card-header">
        <h6 class="mb-0">Card Header</h6>
    </div>
    <div class="card-body">
        <h5 class="card-title">Special Title Treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
        2 days ago
    </div>
</div>
```

## Card with Subtitle

```html
<div class="card">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card Subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div>
```

## Card Layouts

### Horizontal Card
```html
<div class="card">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="https://via.placeholder.com/300x200" class="card-img" alt="Card image">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div>
```

### Card Grid
```html
<div class="row">
    <div class="col-sm-6 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Card image">
            <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <p class="card-text">Some quick example text.</p>
                <a href="#" class="btn btn--primary">Read More</a>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Card image">
            <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <p class="card-text">Some quick example text.</p>
                <a href="#" class="btn btn--primary">Read More</a>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Card image">
            <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <p class="card-text">Some quick example text.</p>
                <a href="#" class="btn btn--primary">Read More</a>
            </div>
        </div>
    </div>
</div>
```

## Card with List Group

```html
<div class="card">
    <div class="card-header">
        <h6 class="mb-0">Features</h6>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
    </ul>
</div>
```

## Card with Navigation

```html
<div class="card">
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="#tab1" data-bs-toggle="tab">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#tab2" data-bs-toggle="tab">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1">Disabled</a>
            </li>
        </ul>
    </div>
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tab1">
                <h5 class="card-title">Special Title Treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn--primary">Go somewhere</a>
            </div>
            <div class="tab-pane fade" id="tab2">
                <h5 class="card-title">Another Title</h5>
                <p class="card-text">Different content for the second tab.</p>
                <a href="#" class="btn btn--secondary">Learn More</a>
            </div>
        </div>
    </div>
</div>
```

## Card Styling

### Text Alignment
```html
<div class="card text-center">
    <div class="card-body">
        <h5 class="card-title">Special Title Treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn--primary">Go somewhere</a>
    </div>
</div>
```

### Background Colors
```html
<div class="card bg-primary text-white">
    <div class="card-body">
        <h5 class="card-title">Primary Card</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>

<div class="card bg-success text-white">
    <div class="card-body">
        <h5 class="card-title">Success Card</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>
```

### Border Colors
```html
<div class="card border-primary">
    <div class="card-body">
        <h5 class="card-title">Primary Border</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>

<div class="card border-success">
    <div class="card-body">
        <h5 class="card-title">Success Border</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>
```

## Advanced Examples

### Profile Card
```html
<div class="card text-center">
    <div class="card-body">
        <img src="https://via.placeholder.com/100x100" class="rounded-circle mb-3" alt="Profile">
        <h5 class="card-title">John Doe</h5>
        <h6 class="card-subtitle mb-2 text-muted">Software Developer</h6>
        <p class="card-text">Passionate about creating amazing user experiences and writing clean code.</p>
        <div class="btn-group">
            <a href="#" class="btn btn--primary btn--sm">Follow</a>
            <a href="#" class="btn btn--outline-primary btn--sm">Message</a>
        </div>
    </div>
</div>
```

### Product Card
```html
<div class="card">
    <div class="position-relative">
        <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Product">
        <span class="badge badge-success position-absolute top-0 end-0 m-2">New</span>
    </div>
    <div class="card-body">
        <h5 class="card-title">Product Name</h5>
        <p class="card-text">Brief description of the product and its features.</p>
        <div class="d-flex justify-content-between align-items-center">
            <span class="h5 mb-0 text-primary">$99.99</span>
            <div class="btn-group">
                <button class="btn btn--primary btn--sm">Add to Cart</button>
                <button class="btn btn--outline-secondary btn--sm">♡</button>
            </div>
        </div>
    </div>
</div>
```

### Blog Card
```html
<div class="card">
    <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="Blog post">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge badge-primary">Technology</span>
            <small class="text-muted">March 15, 2024</small>
        </div>
        <h5 class="card-title">Understanding CSS Grid Layout</h5>
        <p class="card-text">Learn how to create complex layouts using CSS Grid with practical examples and best practices.</p>
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img src="https://via.placeholder.com/32x32" class="rounded-circle me-2" alt="Author">
                <small class="text-muted">By John Smith</small>
            </div>
            <a href="#" class="btn btn--outline-primary btn--sm">Read More</a>
        </div>
    </div>
</div>
```

## CSS Variables

Customize card appearance using CSS custom properties:

```css
:root {
    /* Card spacing */
    --hikma-card-spacer-x: 1.25rem;
    --hikma-card-spacer-y: 0.75rem;
    
    /* Card appearance */
    --hikma-card-border-width: 1px;
    --hikma-card-border-color: #dee2e6;
    --hikma-card-border-radius: 0.375rem;
    --hikma-card-bg: #fff;
    --hikma-card-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    
    /* Card header/footer */
    --hikma-card-cap-bg: #f8f9fa;
    --hikma-card-cap-color: #6c757d;
    
    /* Card content */
    --hikma-card-title-mb: 0.75rem;
    --hikma-card-text-mb: 1rem;
}
```

## Responsive Cards

### Responsive Card Grid
```html
<div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Card image">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text flex-grow-1">Some quick example text.</p>
                <a href="#" class="btn btn--primary mt-auto">Read More</a>
            </div>
        </div>
    </div>
    <!-- Repeat for more cards -->
</div>
```

### Responsive Card Layout
```html
<div class="card">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="https://via.placeholder.com/300x200" class="card-img h-100" alt="Card image">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Responsive Card</h5>
                <p class="card-text">This card layout changes based on screen size.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div>
```

## Best Practices

1. **Use semantic HTML**: Include proper heading hierarchy and meaningful content
2. **Maintain consistency**: Use consistent spacing and styling across cards
3. **Optimize images**: Use appropriate image sizes and formats
4. **Consider accessibility**: Include alt text for images and proper ARIA labels
5. **Test responsiveness**: Ensure cards work well on all device sizes
6. **Keep content concise**: Cards should present information clearly and concisely
7. **Use appropriate actions**: Include relevant call-to-action buttons

## Accessibility

### ARIA Labels
```html
<div class="card" role="article" aria-labelledby="card-title-1">
    <div class="card-body">
        <h5 class="card-title" id="card-title-1">Accessible Card</h5>
        <p class="card-text">Card content with proper accessibility features.</p>
        <a href="#" class="btn btn--primary" aria-describedby="card-title-1">Learn More</a>
    </div>
</div>
```

### Keyboard Navigation
```html
<div class="card" tabindex="0">
    <div class="card-body">
        <h5 class="card-title">Keyboard Accessible Card</h5>
        <p class="card-text">This card can be focused using keyboard navigation.</p>
        <a href="#" class="btn btn--primary">Action</a>
    </div>
</div>
```