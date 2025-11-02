export interface CompiledUtility {
  className?: string;
  css?: string;
  variants?: string[];
  utility?: string;
  selector?: string;  // Optional selector for utilities
  declarations?: Array<{ property: string; value: string }>;  // Optional declarations
}
