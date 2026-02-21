import { expect } from "storybook/test";

import { Separator } from "./separator";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs", "beta"]
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
  args: { orientation: "vertical", className: "h-32" },
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
