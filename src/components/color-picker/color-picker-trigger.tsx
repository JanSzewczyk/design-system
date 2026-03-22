import * as React from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { Button } from "~/components/button";
import { PopoverTrigger } from "~/components/popover";

import { COLOR_PICKER_TRIGGER_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";

export type ColorPickerTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

export function ColorPickerTrigger(props: ColorPickerTriggerProps) {
  const { asChild, disabled, ...triggerProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_TRIGGER_NAME);
  const isDisabled = disabled || context.disabled;
  const TriggerPrimitive = asChild ? SlotPrimitive.Slot : Button;

  return (
    <PopoverTrigger asChild disabled={isDisabled}>
      <TriggerPrimitive data-slot="color-picker-trigger" {...triggerProps} />
    </PopoverTrigger>
  );
}
