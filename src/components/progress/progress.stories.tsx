import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs", "new"]
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    value: 50
  },
  play: async ({ canvas }) => {
    const progressbar = canvas.getByRole("progressbar");
    await expect(progressbar).toBeVisible();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    await expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    await expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    await expect(progressbar).toHaveAttribute("data-slot", "progress");
  }
};

export const DataAttributes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} />
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Progress has correct data-slot attribute", async () => {
      const progressbar = canvas.getByRole("progressbar");
      await expect(progressbar).toHaveAttribute("data-slot", "progress");

      const indicator = progressbar.querySelector('[data-slot="progress-indicator"]');
      await expect(indicator).toBeVisible();
    });
  }
};

export const AccessibilityTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="space-y-4">
      <Progress value={33} max={100} />
      <Progress value={50} max={200} />
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Progress has correct ARIA attributes", async () => {
      const progressbars = canvas.getAllByRole("progressbar");
      await expect(progressbars).toHaveLength(2);

      await expect(progressbars[0]).toHaveAttribute("aria-valuemin", "0");
      await expect(progressbars[0]).toHaveAttribute("aria-valuemax", "100");
      await expect(progressbars[0]).toHaveAttribute("aria-valuenow", "33");

      await expect(progressbars[1]).toHaveAttribute("aria-valuemin", "0");
      await expect(progressbars[1]).toHaveAttribute("aria-valuemax", "200");
      await expect(progressbars[1]).toHaveAttribute("aria-valuenow", "50");
    });
  }
};
