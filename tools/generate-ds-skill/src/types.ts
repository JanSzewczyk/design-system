export type ComponentProp = {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
};

export type CvaVariants = {
  variants: Record<string, Array<string>>;
  defaultVariants: Record<string, string>;
};

export type StoryExample = {
  name: string;
  isAntiPattern: boolean;
  code: string | null;
  description: string | null;
};

export type ComponentDoc = {
  name: string;
  category: string;
  isPublic: boolean;
  importPath: string;
  componentFile: string;
  props: Array<ComponentProp>;
  cva: CvaVariants | null;
  stories: Array<StoryExample>;
  notes: Array<string>;
};

export type GeneratorConfig = {
  srcDir: string;
  outDir: string;
  cssDir: string;
  pkgPath: string;
  packageName: string;
  packageVersion: string;
};

export type ColorToken = {
  name: string;
  light: string;
  dark: string;
};

export type ColorTokenGroup = {
  title: string;
  tokens: Array<ColorToken>;
};

export type CssVariable = {
  name: string;
  value: string;
  comment: string | null;
};

export type TypographyUtility = {
  name: string;
  apply: string;
};

export type TypographyDoc = {
  fonts: Array<CssVariable>;
  fontSizes: Array<CssVariable>;
  lineHeights: Array<CssVariable>;
  letterSpacings: Array<CssVariable>;
  utilities: Array<TypographyUtility>;
};
