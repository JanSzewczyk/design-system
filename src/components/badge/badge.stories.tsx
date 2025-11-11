import * as React from "react";

import { BadgeCheckIcon, ShieldCheckIcon, StarIcon, XIcon } from "lucide-react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Badge } from "~/components";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs", "test"]
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="error">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge variant="secondary" className="bg-success text-success-foreground">
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="error">
          99
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
          20+
        </Badge>
      </div>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">
        <BadgeCheckIcon />
        Verified
      </Badge>
      <Badge variant="secondary">
        <StarIcon />
        Featured
      </Badge>
      <Badge variant="error">
        <XIcon />
        Error
      </Badge>
      <Badge variant="outline">
        <ShieldCheckIcon />
        Protected
      </Badge>
    </div>
  )
};

export const CustomStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="secondary" className="bg-success text-success-foreground">
        <BadgeCheckIcon />
        Custom Success
      </Badge>
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="error">
        99
      </Badge>
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
        20+
      </Badge>
      <Badge className="rounded-sm tracking-wider uppercase" variant="outline">
        New
      </Badge>
    </div>
  )
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative">
        <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Messages</button>
        <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">3</Badge>
      </div>
      <div className="relative">
        <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Notifications</button>
        <Badge
          variant="error"
          className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        >
          99+
        </Badge>
      </div>
      <div className="relative">
        <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Updates</button>
        <Badge className="border-background absolute -top-1 -right-1 size-2 rounded-full border-2 p-0" />
      </div>
    </div>
  )
};

export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge asChild>
        <a href="#default">Clickable Default</a>
      </Badge>
      <Badge variant="secondary" asChild>
        <a href="#secondary">Clickable Secondary</a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#outline">Clickable Outline</a>
      </Badge>
      <Badge variant="error" asChild>
        <a href="#error">Clickable Error</a>
      </Badge>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Badges render as links", async () => {
      const defaultLink = canvas.getByRole("link", { name: /clickable default/i });
      const secondaryLink = canvas.getByRole("link", { name: /clickable secondary/i });
      const outlineLink = canvas.getByRole("link", { name: /clickable outline/i });
      const errorLink = canvas.getByRole("link", { name: /clickable error/i });

      await expect(defaultLink).toBeVisible();
      await expect(secondaryLink).toBeVisible();
      await expect(outlineLink).toBeVisible();
      await expect(errorLink).toBeVisible();

      await expect(defaultLink).toHaveAttribute("href", "#default");
      await expect(secondaryLink).toHaveAttribute("href", "#secondary");
      await expect(outlineLink).toHaveAttribute("href", "#outline");
      await expect(errorLink).toHaveAttribute("href", "#error");
    });
  }
};

export const DataAttributes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>Check data-slot</Badge>
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Badge has correct data-slot attribute", async () => {
      const badge = canvas.getByText("Check data-slot");
      await expect(badge).toHaveAttribute("data-slot", "badge");
    });
  }
};

export const InteractionTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default Badge</Badge>
      <Badge variant="secondary">Secondary Badge</Badge>
      <Badge variant="error">Error Badge</Badge>
      <Badge variant="outline">Outline Badge</Badge>
      <Badge asChild>
        <button type="button">Clickable Badge</button>
      </Badge>
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("All badge variants are rendered", async () => {
      const defaultBadge = canvas.getByText("Default Badge");
      const secondaryBadge = canvas.getByText("Secondary Badge");
      const errorBadge = canvas.getByText("Error Badge");
      const outlineBadge = canvas.getByText("Outline Badge");

      await expect(defaultBadge).toBeVisible();
      await expect(secondaryBadge).toBeVisible();
      await expect(errorBadge).toBeVisible();
      await expect(outlineBadge).toBeVisible();

      await expect(defaultBadge).toHaveAttribute("data-slot", "badge");
      await expect(secondaryBadge).toHaveAttribute("data-slot", "badge");
      await expect(errorBadge).toHaveAttribute("data-slot", "badge");
      await expect(outlineBadge).toHaveAttribute("data-slot", "badge");
    });

    await step("Badge with asChild renders as button and is clickable", async () => {
      const clickableBadge = canvas.getByRole("button", { name: "Clickable Badge" });
      await expect(clickableBadge).toBeVisible();
      await expect(clickableBadge).toHaveAttribute("data-slot", "badge");

      await userEvent.click(clickableBadge);
    });
  }
};
