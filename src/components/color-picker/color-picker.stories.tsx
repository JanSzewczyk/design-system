import * as React from "react";

import { expect, fn, screen, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
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

const meta = preview.meta({
  args: {
    onFormatChange: fn(),
    onValueChange: fn()
  },
  argTypes: {
    defaultFormat: {
      control: "select",
      options: ["hex", "rgb", "hsl", "hsb"]
    },
    defaultValue: { control: "color" },
    disabled: { control: "boolean" },
    inline: { control: "boolean" },
    onFormatChange: { control: false },
    onValueChange: { control: false },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    value: { control: "color" }
  },
  component: ColorPicker,
  parameters: {
    docs: {
      subtitle:
        "A composable color picker built with a store-backed state machine. Supports inline and popover modes, multiple color formats (HEX, RGB, HSL, HSB), alpha transparency, eye dropper, and form integration."
    }
  },
  tags: ["autodocs"],
  title: "Components/Color Picker"
});

export const InlineColorPicker = meta.story({
  args: {
    defaultValue: "#3b82f6",
    inline: true
  },
  name: "Inline Color Picker",
  render(args) {
    return (
      <ColorPicker
        defaultFormat="hex"
        defaultValue={args.defaultValue}
        inline={args.inline}
        onFormatChange={args.onFormatChange}
        onValueChange={args.onValueChange}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ColorPickerSwatch className="size-8" />
            <span className="font-medium text-sm">Selected Color</span>
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
            defaultFormat="hex"
            onOpenChange={setIsOpen}
            onValueChange={setColor}
            open={isOpen}
            value={color}
          >
            <ColorPickerTrigger asChild>
              <Button startIcon={<ColorPickerSwatch className="size-4" />} variant="outline">
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

          <Button onClick={onReset} variant="outline">
            Reset
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm">Preset Colors</h4>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((presetColor) => (
              <button
                aria-label={`Select color ${presetColor}`}
                className="size-8 rounded border-2 border-transparent hover:border-border focus:border-ring focus:outline-none"
                key={presetColor}
                onClick={() => onPresetSelect(presetColor)}
                style={{ backgroundColor: presetColor }}
                type="button"
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
