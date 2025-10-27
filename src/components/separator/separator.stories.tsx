import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs", "beta"]
} satisfies Meta<typeof Separator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
};

export const Vertical: Story = {
  args: { orientation: "vertical", className: "h-32" },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
    await expect(separator).toHaveAttribute("data-orientation", "vertical");
  }
};

export const Decorative: Story = {
  args: { decorative: true },
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("none");
    await expect(separator).toBeVisible();
    await expect(separator).not.toHaveAttribute("aria-orientation", "horizontal");
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
};
