# Optional Dependencies in HikmaUI Core

## Overview

HikmaUI Core v0.3.0 achieves **true zero-dependency architecture** while maintaining the option for enhanced performance through optional dependencies.

## How It Works

The package uses **graceful degradation** - it attempts to import performance-optimized libraries, and automatically falls back to native Node.js implementations if they're not available.

## Optional Dependencies

### 1. fast-glob (90 KB)

**What it does:** High-performance file pattern matching
**Performance benefit:** ~3x faster than native implementation
**Fallback:** Native Node.js `fs` and `path` recursion

```bash
# Install for enhanced performance
pnpm add fast-glob

# Or skip it - native fallback works fine
```

### 2. chokidar (60 KB)

**What it does:** Cross-platform file watching
**Performance benefit:** Better handling of edge cases, more reliable across platforms
**Fallback:** Native Node.js `fs.watch()`

```bash
# Install for enhanced file watching
pnpm add chokidar

# Or skip it - native fallback works fine
```

## Usage Modes

### Zero-Dependency Mode (Default)

```bash
pnpm add @hikmaui/core
```

**Bundle size:** Core package only (~100 KB)
**Dependencies:** 0
**Performance:** Good (native Node.js implementations)

### Enhanced Mode

```bash
pnpm add @hikmaui/core fast-glob chokidar
```

**Bundle size:** ~250 KB total
**Dependencies:** 2 optional
**Performance:** Excellent (optimized libraries)

## Automatic Detection

HikmaUI automatically detects which dependencies are installed:

```typescript
import { JITCompiler } from '@hikmaui/core';

const compiler = new JITCompiler({
  config: hikmaConfig
});

// Console output shows which mode is active:
// ✓ [HikmaUI] Using fast-glob for enhanced performance
// OR
// ℹ [HikmaUI] Using native glob (fast-glob not installed)
```

## Comparison

| Feature | Zero-Dependency Mode | Enhanced Mode |
|---------|---------------------|---------------|
| **Installation Size** | ~100 KB | ~250 KB |
| **Required Dependencies** | 0 | 0 (2 optional) |
| **File Scanning** | Native Node.js | fast-glob |
| **File Watching** | fs.watch() | chokidar |
| **Build Speed** | Good | Excellent (3x faster) |
| **Cross-Platform** | Works everywhere | Better edge case handling |
| **Recommended For** | Simple projects, CLIs | Large projects, development |

## When to Use Each Mode

### Use Zero-Dependency Mode when:
- Building lightweight CLIs
- Minimal bundle size is critical
- You have simple file structures
- Deploying to constrained environments

### Use Enhanced Mode when:
- Working with large codebases
- Development experience is priority
- You need maximum performance
- Cross-platform compatibility is critical

## Implementation Details

The optional dependency system uses:

1. **Dynamic imports** - `tryImport()` helper safely attempts to load modules
2. **Fallback implementations** - Native Node.js equivalents for all features
3. **Runtime detection** - Automatically chooses best available implementation
4. **Zero breaking changes** - API remains identical in both modes

## Source Code

- **Optional dep helper:** `src/utils/optional-deps.ts`
- **Native glob:** `src/utils/native-glob.ts`
- **Native watcher:** `src/utils/native-watch.ts`
- **JIT compiler:** `src/jit/compiler.ts` (uses both modes)

## Migration Guide

If upgrading from v0.2.x:

```bash
# v0.2.x had required dependencies
pnpm remove fast-glob chokidar  # Optional: remove if you don't need enhanced mode

# v0.3.0 works with or without them
pnpm update @hikmaui/core
```

## Philosophy

> **"Make the common case fast, but keep the simple case possible."**

HikmaUI Core achieves this by:
- **Common case (enhanced mode):** Install optional deps for maximum performance
- **Simple case (zero-dep mode):** Skip optional deps for minimal footprint

Both modes provide identical functionality with different performance characteristics.

---

**Questions?** Open an issue on [GitHub](https://github.com/hikmaui/hikmaui/issues)
**Version:** v0.3.0+
**License:** MIT
