# Contributing to Hikma UI

First off, thank you for considering contributing to Hikma UI! 🎉

The following is a set of guidelines for contributing to Hikma UI. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [mdferdousalam@example.com].

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `good-first-issue` and `help-wanted` issues:

- **Good first issues** - issues which should only require a few lines of code
- **Help wanted issues** - issues which should be a bit more involved

### Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible Hikma UI
- Enable a sustainable system for maintainers to review contributions

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/hikma-ui.git
   cd hikma-ui
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Make your changes** and test them thoroughly

7. **Build the project** to ensure everything works:
   ```bash
   npm run build
   ```

### Project Structure

```
hikma-ui/
├── src/
│   ├── components/        # SCSS component files
│   ├── utilities/         # Utility classes
│   ├── base/             # Base styles and variables
│   ├── layout/           # Layout components
│   ├── theme/            # Theme variations
│   └── javascript/       # JavaScript functionality
├── docs/                 # Documentation
├── examples/             # Example implementations
├── dist/                 # Built files (auto-generated)
└── tests/                # Test files
```

## Pull Request Process

1. **Ensure your code follows our style guidelines**
2. **Update documentation** if you're adding new features
3. **Add tests** for new functionality
4. **Run the build process** and ensure it passes
5. **Create a pull request** with a clear title and description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] I have tested this change locally
- [ ] I have added tests for this change
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
```

## Style Guidelines

### SCSS Guidelines

1. **Use BEM methodology** for class naming:
   ```scss
   .component {}
   .component__element {}
   .component--modifier {}
   ```

2. **Use CSS custom properties** for theming:
   ```scss
   .component {
     color: var(--hikma-text-color-base);
     background: var(--hikma-background-color-base);
   }
   ```

3. **Follow the mobile-first approach**:
   ```scss
   .component {
     // Mobile styles first
     width: 100%;
     
     // Then larger screens
     @include media-up(md) {
       width: auto;
     }
   }
   ```

4. **Use consistent spacing** with our scale:
   ```scss
   .component {
     margin: var(--hikma-spacing-md);
     padding: var(--hikma-spacing-sm);
   }
   ```

### JavaScript Guidelines

1. **Use vanilla JavaScript** (no frameworks)
2. **Follow ES6+ standards**
3. **Use consistent naming conventions**:
   ```javascript
   // Classes: PascalCase
   class ComponentName {}
   
   // Functions: camelCase
   function handleClick() {}
   
   // Constants: UPPER_CASE
   const DEFAULT_OPTIONS = {};
   ```

4. **Add JSDoc comments** for functions:
   ```javascript
   /**
    * Adjusts text color for better contrast
    * @param {string} backgroundColor - The background color
    * @param {string} textColor - The original text color
    * @returns {string} The adjusted text color
    */
   function adjustTextColor(backgroundColor, textColor) {}
   ```

### Documentation Guidelines

1. **Use clear, concise language**
2. **Include code examples** for all features
3. **Follow the existing documentation structure**
4. **Update the table of contents** when adding new sections

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```
feat(buttons): add loading state for buttons
fix(cards): resolve border-radius calculation issue
docs(readme): update installation instructions
style(components): improve SCSS formatting
refactor(utilities): optimize spacing utility classes
test(forms): add validation tests
chore(build): update webpack configuration
```

## Recognition

Contributors will be recognized in the following ways:

- Listed in the README.md contributors section
- Mentioned in release notes for significant contributions
- Eligible for contributor swag (coming soon!)

## Getting Help

If you need help, you can:

- Open an issue with the "question" label
- Start a discussion in GitHub Discussions
- Email us at mdferdousalam@example.com

## License

By contributing to Hikma UI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Hikma UI! 🚀