/**
 * Native Node.js file watcher (zero dependencies)
 * Fallback when chokidar is not installed
 */

import { watch as fsWatch, FSWatcher } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { EventEmitter } from 'events';

export interface WatchOptions {
  ignoreInitial?: boolean;
  ignored?: RegExp | string | ((path: string) => boolean);
  persistent?: boolean;
  cwd?: string;
}

/**
 * Simple file watcher using native Node.js fs.watch
 * Provides a chokidar-compatible API
 */
export class NativeWatcher extends EventEmitter {
  private watchers: Map<string, FSWatcher> = new Map();
  private options: WatchOptions;
  private patterns: string[];

  constructor(patterns: string | string[], options: WatchOptions = {}) {
    super();
    this.patterns = Array.isArray(patterns) ? patterns : [patterns];
    this.options = options;
  }

  /**
   * Start watching files
   */
  async start(): Promise<void> {
    for (const pattern of this.patterns) {
      // For simplicity, treat patterns as directory paths
      // A full implementation would parse glob patterns
      const watchPath = pattern.replace(/\/\*\*?\/.*$/, '');

      try {
        await this.watchDirectory(watchPath || '.');
      } catch (error) {
        console.warn(`[NativeWatcher] Could not watch: ${watchPath}`, error);
      }
    }
  }

  /**
   * Recursively watch directory
   */
  private async watchDirectory(dir: string): Promise<void> {
    try {
      const entries = await readdir(dir, { withFileTypes: true });

      // Watch the directory itself
      if (!this.watchers.has(dir)) {
        const watcher = fsWatch(
          dir,
          { persistent: this.options.persistent ?? true, recursive: true },
          (eventType, filename) => {
            if (!filename) return;

            const fullPath = join(dir, filename);

            // Check if path should be ignored
            if (this.shouldIgnore(fullPath)) return;

            // Emit events compatible with chokidar
            if (eventType === 'change') {
              this.emit('change', fullPath);
            } else if (eventType === 'rename') {
              // fs.watch fires 'rename' for both add and unlink
              // We'll emit 'add' - a full implementation would check if file exists
              this.emit('add', fullPath);
            }
          }
        );

        this.watchers.set(dir, watcher);
      }

      // Recursively watch subdirectories
      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Skip node_modules and hidden directories
          if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
            continue;
          }
          const subDir = join(dir, entry.name);
          await this.watchDirectory(subDir);
        }
      }
    } catch (error) {
      // Silently skip directories we can't access
    }
  }

  /**
   * Check if path should be ignored
   */
  private shouldIgnore(path: string): boolean {
    if (!this.options.ignored) return false;

    if (typeof this.options.ignored === 'function') {
      return this.options.ignored(path);
    }

    if (this.options.ignored instanceof RegExp) {
      return this.options.ignored.test(path);
    }

    if (typeof this.options.ignored === 'string') {
      return path.includes(this.options.ignored);
    }

    return false;
  }

  /**
   * Stop watching and cleanup
   */
  close(): void {
    for (const [path, watcher] of this.watchers) {
      watcher.close();
    }
    this.watchers.clear();
    this.removeAllListeners();
  }

  /**
   * Chokidar-compatible API methods
   */
  on(event: 'change' | 'add' | 'unlink', listener: (path: string) => void): this {
    return super.on(event, listener);
  }
}

/**
 * Factory function compatible with chokidar.watch()
 */
export function nativeWatch(
  patterns: string | string[],
  options: WatchOptions = {}
): NativeWatcher {
  const watcher = new NativeWatcher(patterns, options);

  // Auto-start watching (defer to next tick to allow event listeners to be attached)
  process.nextTick(() => {
    watcher.start().catch((error) => {
      console.error('[NativeWatcher] Error starting watcher:', error);
    });
  });

  return watcher;
}
