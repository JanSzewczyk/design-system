import * as React from "react";

import { Select, SelectContent, SelectItem } from "~/components/select";
import { cn } from "~/utils";

import { COLOR_FORMATS, COLOR_PICKER_FORMAT_SELECT_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";
import { type ColorFormat } from "./color-picker.types";

export type ColorPickerFormatSelectProps = Omit<React.ComponentProps<typeof Select>, "value" | "onValueChange">;

export function ColorPickerFormatSelect(props: ColorPickerFormatSelectProps) {
  const { size, disabled, className, ...selectProps } = props;

  const context = useColorPickerContext(COLOR_PICKER_FORMAT_SELECT_NAME);
  const store = useColorPickerStoreContext(COLOR_PICKER_FORMAT_SELECT_NAME);
  const isDisabled = disabled || context.disabled;
  const format = useColorPickerStore((state) => state.format);

  const onFormatChange = React.useCallback(
    (value: ColorFormat) => {
      store.setFormat(value);
    },
    [store]
  );

  return (
    <Select
      data-slot="color-picker-format-select"
      {...selectProps}
      value={format}
      onValueChange={onFormatChange}
      disabled={isDisabled}
      size={size ?? "sm"}
      className={cn(className)}
    >
      <SelectContent>
        {COLOR_FORMATS.map((f) => (
          <SelectItem key={f} value={f}>
            {f.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
