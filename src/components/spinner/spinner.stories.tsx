import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Spinner } from "~/components";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    className: {
      control: "text"
    }
  },
  tags: ["autodocs", "new"]
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Test that the spinner renders
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();

    // Test that it has the correct aria-label
    await expect(spinner).toHaveAttribute("aria-label", "Loading");

    // Test that it has the animate-spin class
    await expect(spinner).toHaveClass("animate-spin");
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-gray300 text-xs">Small (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-gray300 text-xs">Medium (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-gray300 text-xs">Large (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-12" />
        <span className="text-gray300 text-xs">Extra Large (48px)</span>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    // Test that all spinners are rendered
    const spinners = canvas.getAllByRole("status");
    await expect(spinners).toHaveLength(4);

    // Test that all spinners are visible
    for (const spinner of spinners) {
      await expect(spinner).toBeVisible();
      await expect(spinner).toHaveClass("animate-spin");
    }

    // Test that all size labels are rendered
    await expect(canvas.getByText("Small (16px)")).toBeVisible();
    await expect(canvas.getByText("Medium (24px)")).toBeVisible();
    await expect(canvas.getByText("Large (32px)")).toBeVisible();
    await expect(canvas.getByText("Extra Large (48px)")).toBeVisible();
  }
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-gray-100" />
        <span className="text-xs text-gray-100">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-primary-500 size-8" />
        <span className="text-xs text-gray-100">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-success-500 size-8" />
        <span className="text-xs text-gray-100">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-warning-500 size-8" />
        <span className="text-xs text-gray-100">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-error-500 size-8" />
        <span className="text-xs text-gray-100">Error</span>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    // Test that all spinners are rendered
    const spinners = canvas.getAllByRole("status");
    await expect(spinners).toHaveLength(5);

    // Test that all spinners are visible and spinning
    for (const spinner of spinners) {
      await expect(spinner).toBeVisible();
      await expect(spinner).toHaveClass("animate-spin");
    }

    // Test that all color labels are rendered
    await expect(canvas.getByText("Default")).toBeVisible();
    await expect(canvas.getByText("Primary")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
    await expect(canvas.getByText("Warning")).toBeVisible();
    await expect(canvas.getByText("Error")).toBeVisible();
  }
};

export const WithCustomClassName: Story = {
  tags: ["test-only"],
  render: () => <Spinner className="size-16 text-blue-500" data-testid="custom-spinner" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom className is applied
    const spinner = canvas.getByTestId("custom-spinner");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("size-16");
    await expect(spinner).toHaveClass("text-blue-500");
    await expect(spinner).toHaveClass("animate-spin");
  }
};

export const WithCustomProps: Story = {
  tags: ["test-only"],
  render: () => <Spinner strokeWidth={3} data-testid="custom-props-spinner" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom props are applied
    const spinner = canvas.getByTestId("custom-props-spinner");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveAttribute("stroke-width", "3");
  }
};

export const InButton: Story = {
  render: () => (
    <button
      type="button"
      className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2"
      disabled
    >
      <Spinner className="size-4" />
      Loading...
    </button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the button with spinner is rendered
    const button = canvas.getByRole("button");
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
    await expect(canvas.getByText("Loading...")).toBeVisible();

    // Test that the spinner is visible
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("animate-spin");
  }
};

export const CenteredInCard: Story = {
  render: () => (
    <div className="bg-app-foreground flex h-48 w-64 items-center justify-center rounded-lg border border-gray-800 p-6 shadow-sm">
      <Spinner className="size-8" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the spinner is centered and visible
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("animate-spin");
  }
};
