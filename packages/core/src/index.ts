/**
 * @hikmaui/core
 * Core utilities and JIT compiler for HikmaUI
 */

// JIT Compiler & Config
export { JITCompiler } from './jit/compiler';
export { ConfigLoader } from './config/loader';
export { UtilityGenerator } from './utilities/generator';
export { VariantHandler } from './variants/handler';
export { ArbitraryValueParser } from './parsers/arbitrary';

// Presets
export { minimalPreset, defaultPreset, completePreset, presets } from './presets';

// Component Utilities (v0.2.1)
export { cx, classNames, clsx } from './utilities/class-names';
export { ClassMerger, merge, twMerge, cn } from './utilities/class-merge';
export { createVariants, cva } from './utilities/variants';

// Types
export type { HikmaConfig } from './types/config';
export type { CompiledUtility } from './types/utility';
export type { Variant } from './types/variant';
export type { ClassValue } from './utilities/class-names';
export type { VariantProps, VariantSchema, VariantConfig, VariantsOf, ExtractVariantProps } from './utilities/variants';
