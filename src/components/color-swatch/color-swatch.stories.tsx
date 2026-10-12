import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { ColorSwatch } from "~/components";

const meta = preview.meta({
  argTypes: {
    asChild: {
      control: "boolean",
      description: "Whether to render as a child element using Radix Slot"
    },
    color: {
      control: "color",
      description: "The color to display in the swatch"
    },
    disabled: {
      control: "boolean",
      description: "Whether the swatch is disabled"
    },
    size: {
      control: "select",
      description: "Size of the color swatch",
      options: ["sm", "default", "lg"]
    },
    withoutTransparency: {
      control: "boolean",
      description: "Whether to hide the transparency checkerboard pattern for colors with alpha"
    }
  },
  component: ColorSwatch,
  tags: ["autodocs", "new"],
  title: "Components/Color Swatch"
});

export const Default = meta.story({
  args: {
    color: "#3b82f6"
  }
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" size="sm" />
      <ColorSwatch color="#3b82f6" size="default" />
      <ColorSwatch color="#3b82f6" size="lg" />
    </div>
  )
});

export const ColorFormats = meta.story({
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
});

export const TransparentColors = meta.story({
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
});

export const WithoutTransparencyPattern = meta.story({
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
});

export const NoColor = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch />
      <span className="text-muted-foreground text-sm">No color (shows diagonal line)</span>
    </div>
  )
});

export const InvalidColor = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="not-a-color" />
      <span className="text-muted-foreground text-sm">Invalid color (transparent background)</span>
    </div>
  )
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" />
      <ColorSwatch color="#3b82f6" disabled />
    </div>
  )
});

export const AsChild = meta.story({
  play: async ({ canvas, step }) => {
    await step("AsChild renders child element with swatch styles", async () => {
      const button = canvas.getByRole("img", { name: /Color swatch: #3b82f6/ });

      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute("data-slot", "color-swatch");
      // The button type attribute should be preserved
      await expect(button).toHaveAttribute("type", "button");
    });
  },
  render: () => (
    <ColorSwatch asChild color="#3b82f6">
      <button onClick={() => alert("Clicked!")} type="button">
        Click me
      </button>
    </ColorSwatch>
  )
});

export const Accessibility = meta.story({
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
  },
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" data-testid="swatch-with-color" />
      <ColorSwatch data-testid="swatch-no-color" />
      <ColorSwatch color="#3b82f6" data-testid="swatch-disabled" disabled />
    </div>
  )
});

export const ColorValidation = meta.story({
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
  },
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#ff5733" data-testid="hex-color" />
      <ColorSwatch color="rgb(59, 130, 246)" data-testid="rgb-color" />
      <ColorSwatch color="rgba(59, 130, 246, 0.5)" data-testid="rgba-color" />
      <ColorSwatch color="rebeccapurple" data-testid="named-color" />
      <ColorSwatch color="not-a-valid-color" data-testid="invalid-color" />
      <ColorSwatch color="" data-testid="empty-color" />
      <ColorSwatch color="   " data-testid="whitespace-color" />
    </div>
  )
});
