import * as React from "react";

import { COLOR_PICKER_ROOT_NAME } from "./color-picker.constants";
import { type ColorPickerContextValue } from "./color-picker.types";

export const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(null);

export function useColorPickerContext(consumerName: string): ColorPickerContextValue {
  const context = React.useContext(ColorPickerContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${COLOR_PICKER_ROOT_NAME}\``);
  }
  return context;
}
