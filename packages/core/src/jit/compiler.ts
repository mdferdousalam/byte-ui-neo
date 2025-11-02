/**
 * JIT Compiler for HikmaUI
 * Inspired by Tailwind CSS JIT engine
 */

import { readFile } from 'fs/promises';
import { watch } from 'chokidar';
import glob from 'fast-glob';
import { ConfigLoader } from '../config/loader';
import { UtilityGenerator } from '../utilities/generator';
import { VariantHandler } from '../variants/handler';
import type { HikmaConfig } from '../types/config';
import type { CompiledUtility } from '../types/utility';

export interface JITCompilerOptions {
  config: HikmaConfig;
  mode?: 'development' | 'production';
  watch?: boolean;
}

export class JITCompiler {
  private config: HikmaConfig;
  private mode: 'development' | 'production';
  private utilityGenerator: UtilityGenerator;
  private variantHandler: VariantHandler;
  private classCache: Map<string, CompiledUtility>;
  private contentFiles: Set<string>;

  constructor(options: JITCompilerOptions) {
    this.config = options.config;
    this.mode = options.mode || 'development';
    this.utilityGenerator = new UtilityGenerator(this.config);
    this.variantHandler = new VariantHandler(this.config);
    this.classCache = new Map();
    this.contentFiles = new Set();

    if (options.watch) {
      this.setupFileWatcher();
    }
  }

  /**
   * Scan content files and extract class names
   */
  async scanContent(): Promise<Set<string>> {
    const classNames = new Set<string>();
    const files = await glob(this.config.content || []);

    for (const file of files) {
      this.contentFiles.add(file);
      const content = await readFile(file, 'utf-8');
      const extracted = this.extractClasses(content);
      extracted.forEach(cls => classNames.add(cls));
    }

    return classNames;
  }

  /**
   * Extract class names from content using regex
   */
  private extractClasses(content: string): string[] {
    const classes: string[] = [];

    // Match class="..." and className="..."
    const classRegex = /class(?:Name)?=["'`]([^"'`]*)["'`]/g;
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      const classString = match[1];
      // Split by whitespace and filter empty strings
      const classNames = classString.split(/\s+/).filter(Boolean);
      classes.push(...classNames);
    }

    // Also match classes in template literals (for styled components)
    const templateRegex = /class(?:Name)?=\{`([^`]*)`\}/g;
    while ((match = templateRegex.exec(content)) !== null) {
      const classString = match[1];
      const classNames = classString.split(/\s+/).filter(Boolean);
      classes.push(...classNames);
    }

    return classes;
  }

  /**
   * Compile class names to CSS
   */
  async compile(classNames?: Set<string>): Promise<string> {
    const classes = classNames || await this.scanContent();
    const css: string[] = [];

    // Add base styles (preflight)
    if (this.config.corePlugins?.preflight !== false) {
      css.push(this.generatePreflight());
    }

    // Process each class
    for (const className of classes) {
      // Skip if already cached and in production
      if (this.mode === 'production' && this.classCache.has(className)) {
        css.push(this.classCache.get(className)!.css);
        continue;
      }

      // Parse variants (hover:, md:, dark:, etc.)
      const parsed = this.variantHandler.parse(className);

      if (!parsed) continue;

      // Generate utility CSS
      const utility = this.utilityGenerator.generate(parsed.utility, parsed.value);

      if (!utility) continue;

      // Apply variants
      let compiledCSS = utility.css;

      if (parsed.variants.length > 0) {
        compiledCSS = this.variantHandler.apply(utility.css, parsed.variants);
      }

      const compiled: CompiledUtility = {
        className,
        css: compiledCSS,
        variants: parsed.variants,
        utility: parsed.utility,
      };

      this.classCache.set(className, compiled);
      css.push(compiledCSS);
    }

    return css.join('\n');
  }

  /**
   * Generate preflight (reset) styles
   */
  private generatePreflight(): string {
    return `
/* HikmaUI Preflight (CSS Reset) */
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ${this.config.theme?.fontFamily?.sans?.[0] || 'system-ui'}, sans-serif;
}

body {
  margin: 0;
  line-height: inherit;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: ${this.config.theme?.fontFamily?.mono?.[0] || 'monospace'}, monospace;
  font-size: 1em;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button, [role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}
    `.trim();
  }

  /**
   * Setup file watcher for development mode
   */
  private setupFileWatcher(): void {
    const watcher = watch(this.config.content || [], {
      ignoreInitial: true,
    });

    watcher.on('change', async (path) => {
      console.log(`[HikmaUI] File changed: ${path}`);
      // Re-scan and recompile
      const classes = await this.scanContent();
      await this.compile(classes);
    });

    watcher.on('add', async (path) => {
      console.log(`[HikmaUI] File added: ${path}`);
      this.contentFiles.add(path);
      const classes = await this.scanContent();
      await this.compile(classes);
    });
  }

  /**
   * Clear cache (useful for development)
   */
  clearCache(): void {
    this.classCache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      cachedClasses: this.classCache.size,
      contentFiles: this.contentFiles.size,
      mode: this.mode,
    };
  }
}
