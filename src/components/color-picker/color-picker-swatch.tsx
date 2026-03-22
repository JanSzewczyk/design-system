import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { COLOR_PICKER_SWATCH_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore } from "./color-picker.store";
import { colorToString } from "./color-picker.utils";

export type ColorPickerSwatchProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export function ColorPickerSwatch(props: ColorPickerSwatchProps) {
  const { asChild, className, ...swatchProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_SWATCH_NAME);
  const color = useColorPickerStore((state) => state.color);
  const format = useColorPickerStore((state) => state.format);

  const backgroundStyle = React.useMemo(() => {
    if (!color) {
      return {
        background:
          "linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat"
      };
    }

    const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

    if (color.a < 1) {
      return {
        background: `linear-gradient(${colorString}, ${colorString}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 8px 8px`
      };
    }

    return { backgroundColor: colorString };
  }, [color]);

  const ariaLabel = !color ? "No color selected" : `Current color: ${colorToString(color, format)}`;
  const SwatchPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <SwatchPrimitive
      role="img"
      aria-label={ariaLabel}
      data-slot="color-picker-swatch"
      {...swatchProps}
      className={cn("box-border size-8 rounded-sm border shadow-sm", context.disabled && "opacity-50", className)}
      style={{ ...backgroundStyle, forcedColorAdjust: "none" }}
    />
  );
}
