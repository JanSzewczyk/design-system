import * as React from "react";

import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { COLOR_PICKER_ALPHA_SLIDER_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";

export type ColorPickerAlphaSliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

export function ColorPickerAlphaSlider(props: ColorPickerAlphaSliderProps) {
  const { className, ...sliderProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_ALPHA_SLIDER_NAME);
  const store = useColorPickerStoreContext(COLOR_PICKER_ALPHA_SLIDER_NAME);
  const color = useColorPickerStore((state) => state.color);
  const hsv = useColorPickerStore((state) => state.hsv);

  const onValueChange = React.useCallback(
    (values: number[]) => {
      const alpha = (values[0] ?? 0) / 100;
      store.setColor({ ...color, a: alpha });
      store.setHsv({ ...hsv, a: alpha });
    },
    [color, hsv, store]
  );

  const gradientColor = `rgb(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0})`;

  return (
    <SliderPrimitive.Root
      data-slot="color-picker-alpha-slider"
      {...sliderProps}
      max={100}
      step={1}
      disabled={context.disabled}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      value={[Math.round((color?.a ?? 1) * 100)]}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track
        className="relative h-3 w-full grow overflow-hidden rounded-full"
        style={{
          background:
            "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px"
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${gradientColor})` }}
        />
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="border-primary/50 bg-background focus-visible:ring-ring block size-4 rounded-full border shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}
