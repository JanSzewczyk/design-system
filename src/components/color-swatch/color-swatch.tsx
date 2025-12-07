import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { colorSwatchVariants } from "~/components/color-swatch/color-swatch.styles";
import { type ColorSwatchSize } from "~/components/color-swatch/color-swatch.types";
import { getHasAlpha, getIsCssColor } from "~/components/color-swatch/color-swatch.utils";
import { cn } from "~/utils";

export type ColorSwatchProps = React.ComponentProps<"div"> & {
  size?: ColorSwatchSize;
  color?: string;
  asChild?: boolean;
  disabled?: boolean;
  withoutTransparency?: boolean;
};

export function ColorSwatch({
  color,
  size = "default",
  asChild = false,
  disabled = false,
  withoutTransparency = false,
  className,
  style,
  ...props
}: ColorSwatchProps) {
  const colorValue = color?.trim();

  const backgroundStyle = React.useMemo<React.CSSProperties>(() => {
    if (!colorValue) {
      return {
        background:
          "linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat"
      };
    }

    if (!getIsCssColor(colorValue)) {
      return { backgroundColor: "transparent" };
    }

    if (!withoutTransparency && getHasAlpha(colorValue)) {
      return {
        background: `linear-gradient(${colorValue}, ${colorValue}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 10px 10px`
      };
    }

    return { backgroundColor: colorValue };
  }, [colorValue, withoutTransparency]);

  const ariaLabel = !colorValue ? "No color selected" : `Color swatch: ${colorValue}`;

  const Primitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <Primitive
      role="img"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      data-slot="color-swatch"
      {...props}
      className={cn(colorSwatchVariants({ size }), className)}
      style={{
        ...backgroundStyle,
        forcedColorAdjust: "none",
        ...style
      }}
    />
  );
}
