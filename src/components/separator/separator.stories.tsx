import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Separator } from "./separator";

const meta = preview.meta({
  component: Separator,
  tags: ["autodocs", "beta"],
  title: "Components/Separator"
});

export const Horizontal = meta.story({
  args: { orientation: "horizontal" },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
});

export const Vertical = meta.story({
  args: { className: "h-32", orientation: "vertical" },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
    await expect(separator).toHaveAttribute("data-orientation", "vertical");
  }
});

export const Decorative = meta.story({
  args: { decorative: true },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("none");
    await expect(separator).toBeVisible();
    await expect(separator).not.toHaveAttribute("aria-orientation", "horizontal");
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
});
