import { type COLOR_FORMATS } from "./color-picker.constants";

export type ColorFormat = (typeof COLOR_FORMATS)[number];

export type Direction = "ltr" | "rtl";

export type ColorValue = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type HSVColorValue = {
  h: number;
  s: number;
  v: number;
  a: number;
};

/**
 * @see https://gist.github.com/bkrmendy/f4582173f50fab209ddfef1377ab31e3
 */
export type EyeDropper = {
  open: (options?: { signal?: AbortSignal }) => Promise<{ sRGBHex: string }>;
};

declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropper;
    };
  }
}

export type ColorPickerContextValue = {
  dir: Direction;
  disabled?: boolean;
  inline?: boolean;
  readOnly?: boolean;
  required?: boolean;
};
