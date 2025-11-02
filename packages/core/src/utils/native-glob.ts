/**
 * Native Node.js glob implementation (zero dependencies)
 * Fallback when fast-glob is not installed
 */

import { readdir, stat } from 'fs/promises';
import { join, sep } from 'path';

/**
 * Convert glob pattern to regex
 */
function globToRegex(pattern: string): RegExp {
  let regexStr = pattern
    // Escape special regex characters
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    // Convert glob ** to match any path segment
    .replace(/\*\*/g, '§GLOBSTAR§')
    // Convert glob * to match anything except path separator
    .replace(/\*/g, '[^/\\\\]*')
    // Restore ** as .*
    .replace(/§GLOBSTAR§/g, '.*')
    // Convert glob ? to match single character
    .replace(/\?/g, '.');

  return new RegExp(`^${regexStr}$`);
}

/**
 * Recursively walk directory and match patterns
 */
async function walkDirectory(
  dir: string,
  patterns: RegExp[],
  results: string[] = []
): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
          continue;
        }
        await walkDirectory(fullPath, patterns, results);
      } else if (entry.isFile()) {
        // Normalize path separators for pattern matching
        const normalizedPath = fullPath.split(sep).join('/');

        // Check if file matches any pattern
        for (const pattern of patterns) {
          if (pattern.test(normalizedPath)) {
            results.push(fullPath);
            break;
          }
        }
      }
    }
  } catch (error) {
    // Silently skip directories we can't read
  }

  return results;
}

/**
 * Simple glob implementation using native Node.js
 * Supports basic patterns: *, **, ?, and path separators
 *
 * @param patterns - Array of glob patterns or single pattern
 * @param options - Options (currently unused, for API compatibility)
 * @returns Array of matched file paths
 *
 * @example
 * await nativeGlob('src/**\/*.ts')
 * await nativeGlob(['src/**\/*.ts', 'lib/**\/*.js'])
 */
export async function nativeGlob(
  patterns: string | string[],
  options?: any
): Promise<string[]> {
  const patternArray = Array.isArray(patterns) ? patterns : [patterns];
  const regexPatterns = patternArray.map(globToRegex);

  const results: string[] = [];

  // Determine starting directory from patterns
  // For simplicity, start from current working directory
  const startDir = process.cwd();

  await walkDirectory(startDir, regexPatterns, results);

  return results;
}

/**
 * Sync version (wraps async in a promise - not truly sync)
 * Provided for API compatibility
 */
export function nativeGlobSync(
  patterns: string | string[],
  options?: any
): string[] {
  throw new Error(
    'nativeGlobSync is not implemented. Use async nativeGlob() instead or install fast-glob for sync support.'
  );
}
