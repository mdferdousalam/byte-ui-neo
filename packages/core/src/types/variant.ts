export interface ParsedClass {
  variants: string[];
  utility: string;
  value?: string;
}

export interface Variant {
  name: string;
  apply: (css: string) => string;
}
