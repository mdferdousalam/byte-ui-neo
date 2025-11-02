/**
 * @hikmaui/core
 * Core utilities and JIT compiler for HikmaUI
 */

export { JITCompiler } from './jit/compiler';
export { ConfigLoader } from './config/loader';
export { UtilityGenerator } from './utilities/generator';
export { VariantHandler } from './variants/handler';
export { ArbitraryValueParser } from './parsers/arbitrary';

// Presets
export { minimalPreset, defaultPreset, completePreset, presets } from './presets';

export type { HikmaConfig } from './types/config';
export type { CompiledUtility } from './types/utility';
export type { Variant } from './types/variant';
