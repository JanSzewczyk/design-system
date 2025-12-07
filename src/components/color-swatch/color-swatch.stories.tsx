import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ColorSwatch } from "./color-swatch";

const meta = {
  title: "Components/Color Swatch",
  component: ColorSwatch,
  tags: ["autodocs", "new"],
  argTypes: {
    color: {
      control: "color",
      description: "The color to display in the swatch"
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of the color swatch"
    },
    disabled: {
      control: "boolean",
      description: "Whether the swatch is disabled"
    },
    withoutTransparency: {
      control: "boolean",
      description: "Whether to hide the transparency checkerboard pattern for colors with alpha"
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child element using Radix Slot"
    }
  }
} satisfies Meta<typeof ColorSwatch>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#3b82f6"
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch size="sm" color="#3b82f6" />
      <ColorSwatch size="default" color="#3b82f6" />
      <ColorSwatch size="lg" color="#3b82f6" />
    </div>
  )
};

export const ColorFormats: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ColorSwatch color="#ff5733" />
        <span className="text-muted-foreground text-sm">Hex: #ff5733</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="rgb(59, 130, 246)" />
        <span className="text-muted-foreground text-sm">RGB: rgb(59, 130, 246)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="hsl(220, 90%, 56%)" />
        <span className="text-muted-foreground text-sm">HSL: hsl(220, 90%, 56%)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="oklch(0.637 0.237 25.331)" />
        <span className="text-muted-foreground text-sm">OKLCH: oklch(0.637 0.237 25.331)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="rebeccapurple" />
        <span className="text-muted-foreground text-sm">Named: rebeccapurple</span>
      </div>
    </div>
  )
};

export const TransparentColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
        <span className="text-muted-foreground text-sm">RGBA with 50% alpha (checkerboard visible)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="hsla(220, 90%, 56%, 0.3)" />
        <span className="text-muted-foreground text-sm">HSLA with 30% alpha (checkerboard visible)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="#3b82f680" />
        <span className="text-muted-foreground text-sm">Hex with alpha (checkerboard visible)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="oklch(0.637 0.237 250 / 50%)" />
        <span className="text-muted-foreground text-sm">OKLCH with alpha (checkerboard visible)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="transparent" />
        <span className="text-muted-foreground text-sm">Transparent</span>
      </div>
    </div>
  )
};

export const WithoutTransparencyPattern: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
        <span className="text-muted-foreground text-sm">With transparency pattern (default)</span>
      </div>
      <div className="flex items-center gap-4">
        <ColorSwatch color="rgba(59, 130, 246, 0.5)" withoutTransparency />
        <span className="text-muted-foreground text-sm">Without transparency pattern</span>
      </div>
    </div>
  )
};

export const NoColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch />
      <span className="text-muted-foreground text-sm">No color (shows diagonal line)</span>
    </div>
  )
};

export const InvalidColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="not-a-color" />
      <span className="text-muted-foreground text-sm">Invalid color (transparent background)</span>
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" />
      <ColorSwatch color="#3b82f6" disabled />
    </div>
  )
};

export const AsChild: Story = {
  render: () => (
    <ColorSwatch color="#3b82f6" asChild>
      <button type="button" onClick={() => alert("Clicked!")}>
        Click me
      </button>
    </ColorSwatch>
  ),
  play: async ({ canvas, step }) => {
    await step("AsChild renders the child element with swatch styles", async () => {
      const button = canvas.getByRole("img", { name: /Color swatch: #3b82f6/ });

      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute("data-slot", "color-swatch");
      // The button type attribute should be preserved
      await expect(button).toHaveAttribute("type", "button");
    });
  }
};

export const Accessibility: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch data-testid="swatch-with-color" color="#3b82f6" />
      <ColorSwatch data-testid="swatch-no-color" />
      <ColorSwatch data-testid="swatch-disabled" color="#3b82f6" disabled />
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Swatches have correct ARIA attributes", async () => {
      const withColor = canvas.getByTestId("swatch-with-color");
      const noColor = canvas.getByTestId("swatch-no-color");
      const disabled = canvas.getByTestId("swatch-disabled");

      // All should have role="img"
      await expect(withColor).toHaveAttribute("role", "img");
      await expect(noColor).toHaveAttribute("role", "img");
      await expect(disabled).toHaveAttribute("role", "img");

      // Check aria-labels
      await expect(withColor).toHaveAttribute("aria-label", "Color swatch: #3b82f6");
      await expect(noColor).toHaveAttribute("aria-label", "No color selected");
      await expect(disabled).toHaveAttribute("aria-label", "Color swatch: #3b82f6");

      // Check disabled state
      await expect(disabled).toHaveAttribute("aria-disabled", "true");
      await expect(disabled).toHaveAttribute("data-disabled", "");
    });
  }
};

export const ColorValidation: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch data-testid="hex-color" color="#ff5733" />
      <ColorSwatch data-testid="rgb-color" color="rgb(59, 130, 246)" />
      <ColorSwatch data-testid="rgba-color" color="rgba(59, 130, 246, 0.5)" />
      <ColorSwatch data-testid="named-color" color="rebeccapurple" />
      <ColorSwatch data-testid="invalid-color" color="not-a-valid-color" />
      <ColorSwatch data-testid="empty-color" color="" />
      <ColorSwatch data-testid="whitespace-color" color="   " />
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Valid colors render with correct aria-label", async () => {
      const hexColor = canvas.getByTestId("hex-color");
      const rgbColor = canvas.getByTestId("rgb-color");
      const rgbaColor = canvas.getByTestId("rgba-color");
      const namedColor = canvas.getByTestId("named-color");

      await expect(hexColor).toHaveAttribute("aria-label", "Color swatch: #ff5733");
      await expect(rgbColor).toHaveAttribute("aria-label", "Color swatch: rgb(59, 130, 246)");
      await expect(rgbaColor).toHaveAttribute("aria-label", "Color swatch: rgba(59, 130, 246, 0.5)");
      await expect(namedColor).toHaveAttribute("aria-label", "Color swatch: rebeccapurple");
    });

    await step("Empty/whitespace colors show no color selected", async () => {
      const emptyColor = canvas.getByTestId("empty-color");
      const whitespaceColor = canvas.getByTestId("whitespace-color");

      await expect(emptyColor).toHaveAttribute("aria-label", "No color selected");
      await expect(whitespaceColor).toHaveAttribute("aria-label", "No color selected");
    });
  }
};
