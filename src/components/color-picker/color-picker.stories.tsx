import * as React from "react";

import { expect, fn, screen, waitFor } from "storybook/test";
import { Button } from "~/components";

import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Color Picker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle:
        "A composable color picker built with a store-backed state machine. Supports inline and popover modes, multiple color formats (HEX, RGB, HSL, HSB), alpha transparency, eye dropper, and form integration."
    }
  },
  argTypes: {
    defaultValue: { control: "color" },
    value: { control: "color" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    inline: { control: "boolean" },
    defaultFormat: {
      control: "select",
      options: ["hex", "rgb", "hsl", "hsb"]
    },
    onValueChange: { control: false },
    onFormatChange: { control: false }
  },
  args: {
    onValueChange: fn(),
    onFormatChange: fn()
  }
});

export const InlineColorPicker = meta.story({
  name: "Inline Color Picker",
  args: {
    inline: true,
    defaultValue: "#3b82f6"
  },
  render(args) {
    return (
      <ColorPicker
        defaultValue={args.defaultValue}
        onValueChange={args.onValueChange}
        onFormatChange={args.onFormatChange}
        inline={args.inline}
        defaultFormat="hex"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ColorPickerSwatch className="size-8" />
            <span className="text-sm font-medium">Selected Color</span>
          </div>
          <div className="flex flex-col gap-4 rounded border p-4">
            <ColorPickerArea />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <div className="flex flex-1 flex-col gap-2">
                <ColorPickerHueSlider />
                <ColorPickerAlphaSlider />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerFormatSelect />
              <ColorPickerInput />
            </div>
          </div>
        </div>
      </ColorPicker>
    );
  }
});

InlineColorPicker.test("renders color picker area", async ({ canvas }) => {
  const area = canvas.getByRole("img", { name: /current color/i });
  await expect(area).toBeVisible();
});

InlineColorPicker.test("renders hue and alpha sliders", async ({ canvas }) => {
  const sliders = canvas.getAllByRole("slider");
  await expect(sliders.length).toBeGreaterThanOrEqual(2);
});

InlineColorPicker.test("renders format select with HEX selected", async ({ canvas }) => {
  const formatSelect = canvas.getByRole("combobox");
  await expect(formatSelect).toBeVisible();
  await expect(formatSelect).toHaveTextContent(/hex/i);
});

InlineColorPicker.test("renders hex input with initial value", async ({ canvas }) => {
  const hexInput = canvas.getByRole("textbox", { name: /hex color value/i });
  await expect(hexInput).toBeVisible();
  await expect(hexInput).toHaveValue("#3b82f6");
});

InlineColorPicker.test("changing hue slider updates color swatch", async ({ canvas, userEvent }) => {
  const [hueSlider] = canvas.getAllByRole("slider");
  await userEvent.click(hueSlider!);
  await userEvent.keyboard("{ArrowRight}");
  await waitFor(async () => {
    const swatch = canvas.getByRole("img", { name: /current color/i });
    await expect(swatch).toBeVisible();
  });
});

InlineColorPicker.test("changing format calls onFormatChange", async ({ canvas, userEvent, args }) => {
  const formatSelect = canvas.getByRole("combobox");
  await userEvent.click(formatSelect);
  const rgbOption = screen.getByRole("option", { name: /rgb/i });
  await userEvent.click(rgbOption);
  await waitFor(async () => {
    await expect(args.onFormatChange).toHaveBeenCalledWith("rgb");
  });
});

const presetColors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#64748b" // gray
];

export const ControlledState = meta.story({
  render() {
    const [color, setColor] = React.useState("#3b82f6");
    const [isOpen, setIsOpen] = React.useState(false);

    const onReset = React.useCallback(() => {
      setColor("#000000");
      setIsOpen(false);
    }, []);

    const onPresetSelect = React.useCallback((presetColor: string) => {
      setColor(presetColor);
    }, []);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ColorPicker
            value={color}
            onValueChange={setColor}
            open={isOpen}
            onOpenChange={setIsOpen}
            defaultFormat="hex"
          >
            <ColorPickerTrigger asChild>
              <Button variant="outline" startIcon={<ColorPickerSwatch className="size-4" />}>
                Pick Color
              </Button>
            </ColorPickerTrigger>
            <ColorPickerContent>
              <ColorPickerArea />
              <div className="flex items-center gap-2">
                <ColorPickerEyeDropper />
                <div className="flex flex-1 flex-col gap-2">
                  <ColorPickerHueSlider />
                  <ColorPickerAlphaSlider />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ColorPickerFormatSelect />
                <ColorPickerInput />
              </div>
            </ColorPickerContent>
          </ColorPicker>

          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium">Preset Colors</h4>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                type="button"
                className="hover:border-border focus:border-ring size-8 rounded border-2 border-transparent focus:outline-none"
                style={{ backgroundColor: presetColor }}
                onClick={() => onPresetSelect(presetColor)}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div>
            <span className="font-medium">Current color:</span>
            <code className="ml-2 font-mono">{color}</code>
          </div>
          <div>
            <span className="font-medium">Picker state:</span>
            <span className="ml-2">{isOpen ? "Open" : "Closed"}</span>
          </div>
        </div>
      </div>
    );
  }
});
