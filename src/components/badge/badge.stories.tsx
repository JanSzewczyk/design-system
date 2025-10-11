import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Badge, type BadgeVariantType } from "~/components";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    children: {
      control: "text"
    }
  },
  tags: ["autodocs", "test"]
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children, ...args }) => <Badge {...args}>{children}</Badge>,
  args: {
    children: "Badge"
  },
  play: async ({ canvas }) => {
    // Test that the badge renders with correct content
    const badge = canvas.getByText("Badge");
    await expect(badge).toBeVisible();

    // Test that it's a span element
    await expect(badge.tagName).toBe("SPAN");
  }
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Badge {...args}>Contained</Badge>
      <Badge variant="outlined" {...args}>
        Outlined
      </Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    // Test all variant badges are rendered
    await expect(canvas.getByText("Contained")).toBeVisible();
    await expect(canvas.getByText("Outlined")).toBeVisible();
  }
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      {["contained", "outlined"].map((variant) => (
        <div key={variant} className="flex flex-wrap gap-4">
          <Badge color="neutral" variant={variant as BadgeVariantType}>
            Neutral
          </Badge>
          <Badge color="primary" variant={variant as BadgeVariantType}>
            Primary
          </Badge>
          <Badge color="success" variant={variant as BadgeVariantType}>
            Success
          </Badge>
          <Badge color="warning" variant={variant as BadgeVariantType}>
            Warning
          </Badge>
          <Badge color="error" variant={variant as BadgeVariantType}>
            Error
          </Badge>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all colors render (3 variants × 5 colors = 15 badges)
    const neutralBadges = canvas.getAllByText("Neutral");
    const primaryBadges = canvas.getAllByText("Primary");
    const successBadges = canvas.getAllByText("Success");
    const warningBadges = canvas.getAllByText("Warning");
    const errorBadges = canvas.getAllByText("Error");

    await expect(neutralBadges).toHaveLength(2);
    await expect(primaryBadges).toHaveLength(2);
    await expect(successBadges).toHaveLength(2);
    await expect(warningBadges).toHaveLength(2);
    await expect(errorBadges).toHaveLength(2);
  }
};

export const ContainedVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge color="neutral">Neutral</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test contained variant with all colors
    await expect(canvas.getByText("Neutral")).toBeVisible();
    await expect(canvas.getByText("Primary")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
    await expect(canvas.getByText("Warning")).toBeVisible();
    await expect(canvas.getByText("Error")).toBeVisible();
  }
};

export const OutlinedVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge color="neutral" variant="outlined">
        Neutral
      </Badge>
      <Badge color="primary" variant="outlined">
        Primary
      </Badge>
      <Badge color="success" variant="outlined">
        Success
      </Badge>
      <Badge color="warning" variant="outlined">
        Warning
      </Badge>
      <Badge color="error" variant="outlined">
        Error
      </Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test outlined variant with all colors
    const badges = canvas.getAllByText(/Neutral|Primary|Success|Warning|Error/);
    await expect(badges).toHaveLength(5);

    for (const badge of badges) {
      await expect(badge).toBeVisible();
    }
  }
};

export const CustomClassName: Story = {
  tags: ["test-only"],
  render: () => (
    <Badge className="rounded-full" data-testid="custom-badge">
      Custom
    </Badge>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom className is applied
    const badge = canvas.getByTestId("custom-badge");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass("rounded-full");
  }
};

export const WithCustomProps: Story = {
  tags: ["test-only"],
  render: () => (
    <Badge onClick={() => {}} role="status" aria-label="Badge status" data-testid="clickable-badge">
      Clickable
    </Badge>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom props are applied
    const badge = canvas.getByTestId("clickable-badge");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute("role", "status");
    await expect(badge).toHaveAttribute("aria-label", "Badge status");
  }
};

export const AsButton: Story = {
  tags: ["test-only"],
  render: () => (
    <Badge asChild>
      <button type="button" className="cursor-copy" onClick={() => console.log("Clicked!")}>
        Clickable
      </button>
    </Badge>
  )
};
