import * as React from "react";

import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "~/utils";

import { COLOR_PICKER_HUE_SLIDER_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";
import { hsvToRgb } from "./color-picker.utils";

export type ColorPickerHueSliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

export function ColorPickerHueSlider(props: ColorPickerHueSliderProps) {
  const { className, ...sliderProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_HUE_SLIDER_NAME);
  const store = useColorPickerStoreContext(COLOR_PICKER_HUE_SLIDER_NAME);
  const hsv = useColorPickerStore((state) => state.hsv);

  const onValueChange = React.useCallback(
    (values: number[]) => {
      const newHsv = { h: values[0] ?? 0, s: hsv?.s ?? 0, v: hsv?.v ?? 0, a: hsv?.a ?? 1 };
      store.setHsv(newHsv);
      store.setColor(hsvToRgb(newHsv));
    },
    [hsv, store]
  );

  return (
    <SliderPrimitive.Root
      data-slot="color-picker-hue-slider"
      {...sliderProps}
      max={360}
      step={1}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      value={[hsv?.h ?? 0]}
      onValueChange={onValueChange}
      disabled={context.disabled}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-[linear-gradient(to_right,#ff0000_0%,#ffff00_16.66%,#00ff00_33.33%,#00ffff_50%,#0000ff_66.66%,#ff00ff_83.33%,#ff0000_100%)]">
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="border-primary/50 bg-background focus-visible:ring-ring block size-4 rounded-full border shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}
