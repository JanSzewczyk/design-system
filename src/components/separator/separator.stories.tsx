import { type Meta, type StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"]
} satisfies Meta<typeof Separator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const separator = canvas.getByRole("separator");
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
};

export const Vertical: Story = {
  args: { orientation: "vertical", className: "h-32" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const separator = canvas.getByRole("separator");
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
    await expect(separator).toHaveAttribute("data-orientation", "vertical");
  }
};

export const Decorative: Story = {
  args: { decorative: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const separator = canvas.getByRole("none");
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  }
};
