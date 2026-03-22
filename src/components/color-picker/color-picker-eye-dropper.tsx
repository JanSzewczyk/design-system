import * as React from "react";

import { PipetteIcon } from "lucide-react";

import { Button } from "~/components/button";

import { COLOR_PICKER_EYE_DROPPER_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";
import { hexToRgb, rgbToHsv } from "./color-picker.utils";

export type ColorPickerEyeDropperProps = React.ComponentProps<typeof Button>;

export function ColorPickerEyeDropper(props: ColorPickerEyeDropperProps) {
  const { size: sizeProp, children, disabled, ...buttonProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_EYE_DROPPER_NAME);
  const store = useColorPickerStoreContext(COLOR_PICKER_EYE_DROPPER_NAME);
  const color = useColorPickerStore((state) => state.color);

  const isDisabled = disabled || context.disabled;

  const onEyeDropper = React.useCallback(async () => {
    if (!window.EyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result.sRGBHex) {
        const newColor = hexToRgb(result.sRGBHex, color?.a ?? 1);
        store.setColor(newColor);
        store.setHsv(rgbToHsv(newColor));
      }
    } catch (error) {
      console.warn("EyeDropper error:", error);
    }
  }, [color, store]);

  const hasEyeDropper = typeof window !== "undefined" && !!window.EyeDropper;
  if (!hasEyeDropper) return null;

  const size = sizeProp ?? (children ? "default" : "icon");

  return (
    <Button
      data-slot="color-picker-eye-dropper"
      {...buttonProps}
      variant="outline"
      size={size}
      onClick={onEyeDropper}
      disabled={isDisabled}
    >
      {children ?? <PipetteIcon />}
    </Button>
  );
}
