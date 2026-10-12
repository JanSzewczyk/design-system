import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Input } from "~/components/input";
import { cn } from "~/utils";

import { COLOR_PICKER_INPUT_NAME } from "./color-picker.constants";
import { useColorPickerContext } from "./color-picker.context";
import { useColorPickerStore, useColorPickerStoreContext } from "./color-picker.store";
import { inputGroupItemVariants } from "./color-picker.styles";
import { type ColorPickerContextValue, type ColorValue, type HSVColorValue } from "./color-picker.types";
import { hslToRgb, hsvToRgb, parseColorString, rgbToHex, rgbToHsl, rgbToHsv } from "./color-picker.utils";

type InputElement = React.ComponentRef<typeof Input>;

export type ColorPickerInputProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "color"> & {
  withoutAlpha?: boolean;
};

export function ColorPickerInput(props: ColorPickerInputProps) {
  const store = useColorPickerStoreContext(COLOR_PICKER_INPUT_NAME);
  const context = useColorPickerContext(COLOR_PICKER_INPUT_NAME);

  const color = useColorPickerStore((state) => state.color);
  const format = useColorPickerStore((state) => state.format);
  const hsv = useColorPickerStore((state) => state.hsv);

  const onColorChange = React.useCallback(
    (newColor: ColorValue) => {
      const newHsv = rgbToHsv(newColor);
      store.setColor(newColor);
      store.setHsv(newHsv);
    },
    [store]
  );

  if (format === "hex") {
    return <HexInput color={color} context={context} onColorChange={onColorChange} {...props} />;
  }

  if (format === "rgb") {
    return <RgbInput color={color} context={context} onColorChange={onColorChange} {...props} />;
  }

  if (format === "hsl") {
    return <HslInput color={color} context={context} onColorChange={onColorChange} {...props} />;
  }

  if (format === "hsb") {
    return <HsbInput context={context} hsv={hsv} onColorChange={onColorChange} {...props} />;
  }
}

interface InputGroupItemProps extends React.ComponentProps<typeof Input>, VariantProps<typeof inputGroupItemVariants> {}

function InputGroupItem({ className, position, ...props }: InputGroupItemProps) {
  return (
    <Input className={cn(inputGroupItemVariants({ className, position }))} data-slot="color-picker-input" {...props} />
  );
}

interface FormatInputProps extends ColorPickerInputProps {
  color: ColorValue;
  onColorChange: (color: ColorValue) => void;
  context: ColorPickerContextValue;
}

function HexInput(props: FormatInputProps) {
  const { color, onColorChange, context, withoutAlpha, className, ...inputProps } = props;

  const hexValue = rgbToHex(color);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onHexChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = event.target.value;
      const parsedColor = parseColorString(value);
      if (parsedColor) {
        onColorChange({ ...parsedColor, a: color?.a ?? 1 });
      }
    },
    [color, onColorChange]
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        onColorChange({ ...color, a: value / 100 });
      }
    },
    [color, onColorChange]
  );

  if (withoutAlpha) {
    return (
      <InputGroupItem
        aria-label="Hex color value"
        position="isolated"
        {...inputProps}
        className={cn("font-code", className)}
        disabled={context.disabled}
        onChange={onHexChange}
        placeholder="#000000"
        value={hexValue}
      />
    );
  }

  return (
    <div className={cn("flex flex-1 items-center", className)} data-slot="color-picker-input-wrapper">
      <InputGroupItem
        aria-label="Hex color value"
        position="first"
        {...inputProps}
        className="flex-1 font-code"
        disabled={context.disabled}
        onChange={onHexChange}
        placeholder="#000000"
        value={hexValue}
      />
      <InputGroupItem
        aria-label="Alpha transparency percentage"
        position="last"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onAlphaChange}
        pattern="[0-9]*"
        placeholder="100"
        value={alphaValue}
      />
    </div>
  );
}

function RgbInput(props: FormatInputProps) {
  const { color, onColorChange, context, withoutAlpha, className, ...inputProps } = props;

  const rValue = Math.round(color?.r ?? 0);
  const gValue = Math.round(color?.g ?? 0);
  const bValue = Math.round(color?.b ?? 0);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onChannelChange = React.useCallback(
    (channel: "r" | "g" | "b" | "a", max: number, isAlpha = false) =>
      (event: React.ChangeEvent<InputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= max) {
          const newValue = isAlpha ? value / 100 : value;
          onColorChange({ ...color, [channel]: newValue });
        }
      },
    [color, onColorChange]
  );

  return (
    <div className={cn("flex flex-1 items-center", className)} data-slot="color-picker-input-wrapper">
      <InputGroupItem
        aria-label="Red color component (0-255)"
        position="first"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange("r", 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={rValue}
      />
      <InputGroupItem
        aria-label="Green color component (0-255)"
        position="middle"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange("g", 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={gValue}
      />
      <InputGroupItem
        aria-label="Blue color component (0-255)"
        position={withoutAlpha ? "last" : "middle"}
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="255"
        min="0"
        onChange={onChannelChange("b", 255)}
        pattern="[0-9]*"
        placeholder="0"
        value={bValue}
      />
      {!withoutAlpha && (
        <InputGroupItem
          aria-label="Alpha transparency percentage"
          position="last"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onChannelChange("a", 100, true)}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </div>
  );
}

function HslInput(props: FormatInputProps) {
  const { color, onColorChange, context, withoutAlpha, className, ...inputProps } = props;

  const hsl = React.useMemo(() => rgbToHsl(color), [color]);
  const alphaValue = Math.round((color?.a ?? 1) * 100);

  const onHslChannelChange = React.useCallback(
    (channel: "h" | "s" | "l", max: number) => (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= max) {
        const newHsl = { ...hsl, [channel]: value };
        const newColor = hslToRgb(newHsl, color?.a ?? 1);
        onColorChange(newColor);
      }
    },
    [hsl, color, onColorChange]
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        onColorChange({ ...color, a: value / 100 });
      }
    },
    [color, onColorChange]
  );

  return (
    <div className={cn("flex items-center", className)} data-slot="color-picker-input-wrapper">
      <InputGroupItem
        aria-label="Hue degree (0-360)"
        position="first"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="360"
        min="0"
        onChange={onHslChannelChange("h", 360)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.h}
      />
      <InputGroupItem
        aria-label="Saturation percentage (0-100)"
        position="middle"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHslChannelChange("s", 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.s}
      />
      <InputGroupItem
        aria-label="Lightness percentage (0-100)"
        position={withoutAlpha ? "last" : "middle"}
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHslChannelChange("l", 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsl.l}
      />
      {!withoutAlpha && (
        <InputGroupItem
          aria-label="Alpha transparency percentage"
          position="last"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onAlphaChange}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </div>
  );
}

interface HsbInputProps extends Omit<FormatInputProps, "color"> {
  hsv: HSVColorValue;
}

function HsbInput(props: HsbInputProps) {
  const { hsv, onColorChange, context, withoutAlpha, className, ...inputProps } = props;

  const alphaValue = Math.round((hsv?.a ?? 1) * 100);

  const onHsvChannelChange = React.useCallback(
    (channel: "h" | "s" | "v", max: number) => (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= max) {
        const newHsv = { ...hsv, [channel]: value };
        const newColor = hsvToRgb(newHsv);
        onColorChange(newColor);
      }
    },
    [hsv, onColorChange]
  );

  const onAlphaChange = React.useCallback(
    (event: React.ChangeEvent<InputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (!Number.isNaN(value) && value >= 0 && value <= 100) {
        const currentColor = hsvToRgb(hsv);
        onColorChange({ ...currentColor, a: value / 100 });
      }
    },
    [hsv, onColorChange]
  );

  return (
    <div className={cn("flex items-center", className)} data-slot="color-picker-input-wrapper">
      <InputGroupItem
        aria-label="Hue degree (0-360)"
        position="first"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="360"
        min="0"
        onChange={onHsvChannelChange("h", 360)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.h ?? 0}
      />
      <InputGroupItem
        aria-label="Saturation percentage (0-100)"
        position="middle"
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHsvChannelChange("s", 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.s ?? 0}
      />
      <InputGroupItem
        aria-label="Brightness percentage (0-100)"
        position={withoutAlpha ? "last" : "middle"}
        {...inputProps}
        className="w-14"
        disabled={context.disabled}
        inputMode="numeric"
        max="100"
        min="0"
        onChange={onHsvChannelChange("v", 100)}
        pattern="[0-9]*"
        placeholder="0"
        value={hsv?.v ?? 0}
      />
      {!withoutAlpha && (
        <InputGroupItem
          aria-label="Alpha transparency percentage"
          position="last"
          {...inputProps}
          className="w-14"
          disabled={context.disabled}
          inputMode="numeric"
          max="100"
          min="0"
          onChange={onAlphaChange}
          pattern="[0-9]*"
          placeholder="100"
          value={alphaValue}
        />
      )}
    </div>
  );
}
