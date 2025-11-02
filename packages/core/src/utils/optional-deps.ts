/**
 * Optional Dependency Helpers
 * Provides graceful fallbacks when optional dependencies are not installed
 */

/**
 * Safely import an optional dependency
 * Returns null if the dependency is not installed
 */
export async function tryImport<T = any>(
  moduleName: string
): Promise<T | null> {
  try {
    const module = await import(moduleName);
    return module.default || module;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
      return null;
    }
    throw error;
  }
}

/**
 * Check if an optional dependency is available
 */
export async function hasOptionalDep(moduleName: string): Promise<boolean> {
  return (await tryImport(moduleName)) !== null;
}
