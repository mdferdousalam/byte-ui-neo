/**
 * Component registry schema for HikmaUI CLI.
 * Defines the structure for component metadata and installation.
 */

/**
 * Component category types.
 */
export type ComponentCategory = "foundation" | "feedback" | "navigation" | "data" | "layout";

/**
 * Component type classifications.
 */
export type ComponentType = "component" | "hook" | "util";

/**
 * File type for component files.
 */
export type FileType = "tsx" | "ts" | "css" | "json";

/**
 * Individual file in a component.
 */
export interface ComponentFile {
  /**
   * Relative path where the file should be installed.
   * @example "components/ui/button.tsx"
   */
  path: string;

  /**
   * File content (for small files) or path to template file.
   */
  content?: string;

  /**
   * Template file path (relative to CLI templates directory).
   * @example "components/button/button.tsx"
   */
  template?: string;

  /**
   * File type extension.
   */
  type: FileType;

  /**
   * Whether this file is the main export.
   */
  isMain?: boolean;
}

/**
 * Component metadata and installation configuration.
 */
export interface Component {
  /**
   * Component identifier (kebab-case).
   * @example "button", "data-table", "command-palette"
   */
  name: string;

  /**
   * Human-readable component description.
   */
  description: string;

  /**
   * Component category for organization.
   */
  category: ComponentCategory;

  /**
   * Component type classification.
   */
  type: ComponentType;

  /**
   * npm dependencies required by this component.
   * @example ["class-variance-authority", "clsx"]
   */
  dependencies: string[];

  /**
   * npm dev dependencies required by this component.
   * @example ["@types/react"]
   */
  devDependencies: string[];

  /**
   * Other components from the registry that this component depends on.
   * @example ["button", "input"]
   */
  registryDependencies: string[];

  /**
   * Files that make up this component.
   */
  files: ComponentFile[];

  /**
   * Tags for searchability.
   * @example ["form", "input", "validation"]
   */
  tags?: string[];

  /**
   * Complexity level (1-5, where 1 is simplest).
   */
  complexity?: 1 | 2 | 3 | 4 | 5;

  /**
   * Whether this component is experimental.
   */
  experimental?: boolean;

  /**
   * Minimum HikmaUI version required.
   * @example "0.2.0"
   */
  minVersion?: string;
}

/**
 * Complete component registry.
 */
export interface ComponentRegistry {
  /**
   * JSON Schema version.
   */
  $schema: string;

  /**
   * Registry version.
   */
  version: string;

  /**
   * All available components.
   */
  components: Component[];

  /**
   * Last updated timestamp.
   */
  lastUpdated?: string;
}

/**
 * Configuration for component installation.
 */
export interface InstallConfig {
  /**
   * Components to install.
   */
  components: string[];

  /**
   * Whether to overwrite existing files.
   */
  overwrite?: boolean;

  /**
   * Whether to install dependencies.
   */
  installDeps?: boolean;

  /**
   * Target directory for components.
   */
  targetDir?: string;

  /**
   * Whether to use TypeScript.
   */
  typescript?: boolean;
}

/**
 * Result of component installation.
 */
export interface InstallResult {
  /**
   * Whether installation was successful.
   */
  success: boolean;

  /**
   * Components that were installed.
   */
  installed: string[];

  /**
   * Components that were skipped.
   */
  skipped: string[];

  /**
   * Components that failed to install.
   */
  failed: Array<{ name: string; error: string }>;

  /**
   * Dependencies that were installed.
   */
  dependencies: string[];

  /**
   * Files that were created.
   */
  files: string[];
}

/**
 * Helper to create a component definition.
 */
export function defineComponent(config: Component): Component {
  return {
    ...config,
    complexity: config.complexity ?? 1,
    experimental: config.experimental ?? false,
    tags: config.tags ?? [],
  };
}

/**
 * Helper to create the registry.
 */
export function defineRegistry(components: Component[]): ComponentRegistry {
  return {
    $schema: "https://hikmaui.dev/schema/registry.json",
    version: "0.2.0",
    components,
    lastUpdated: new Date().toISOString(),
  };
}
