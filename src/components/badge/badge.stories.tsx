import { BadgeCheckIcon, ShieldCheckIcon, StarIcon, XIcon } from "lucide-react";

import { expect, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { Badge } from "~/components";
import { BadgeButton } from "~/components/badge/badge-button";
import { BadgeDot } from "~/components/badge/badge-dot";

const meta = preview.meta({
  component: Badge,
  tags: ["autodocs", "beta"],
  title: "Components/Badge"
});

export const Example = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Destructive</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge className="bg-success text-success-foreground" variant="secondary">
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
});

export const Variants = meta.story({
  render: () => (
    <div className="flex flex-col items-start gap-2 sm:flex-row">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Destructive</Badge>
    </div>
  )
});

export const WithIcons = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>
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
});

export const WithDot = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>
        <BadgeDot />
        Primary
      </Badge>
      <Badge variant="secondary">
        <BadgeDot />
        Secondary
      </Badge>
      <Badge variant="outline">
        <BadgeDot />
        Outline
      </Badge>
      <Badge variant="success">
        <BadgeDot />
        Success
      </Badge>
      <Badge variant="warning">
        <BadgeDot />
        Warning
      </Badge>
      <Badge variant="error">
        <BadgeDot /> Destructive
      </Badge>
    </div>
  )
});

export const RemoveButton = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>
        Primary
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
      <Badge variant="secondary">
        Secondary
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
      <Badge variant="outline">
        Outline
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
      <Badge variant="success">
        Success
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
      <Badge variant="warning">
        Warning
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
      <Badge variant="error">
        Error
        <BadgeButton>
          <XIcon />
        </BadgeButton>
      </Badge>
    </div>
  )
});

export const CustomStyles = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge className="bg-success text-success-foreground" variant="secondary">
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
      <Badge className="rounded-sm uppercase tracking-wider" variant="outline">
        New
      </Badge>
    </div>
  )
});

export const NotificationBadges = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative">
        <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">Messages</button>
        <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">3</Badge>
      </div>
      <div className="relative">
        <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">Notifications</button>
        <Badge
          className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="error"
        >
          99+
        </Badge>
      </div>
      <div className="relative">
        <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">Updates</button>
        <Badge className="absolute -top-1 -right-1 size-2 rounded-full border-2 border-background p-0" />
      </div>
    </div>
  )
});

export const AsLink = meta.story({
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
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge asChild>
        <a href="#default">Clickable Default</a>
      </Badge>
      <Badge asChild variant="secondary">
        <a href="#secondary">Clickable Secondary</a>
      </Badge>
      <Badge asChild variant="outline">
        <a href="#outline">Clickable Outline</a>
      </Badge>
      <Badge asChild variant="error">
        <a href="#error">Clickable Error</a>
      </Badge>
    </div>
  )
});

export const DataAttributes = meta.story({
  play: async ({ canvas, step }) => {
    await step("Badge has correct data-slot attribute", async () => {
      const badge = canvas.getByText("Check data-slot");
      await expect(badge).toHaveAttribute("data-slot", "badge");
    });
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>Check data-slot</Badge>
    </div>
  )
});

export const InteractionTest = meta.story({
  play: async ({ canvas, step, userEvent }) => {
    await step("All badge variants are rendered", async () => {
      const primarytBadge = canvas.getByText("Primary Badge");
      const secondaryBadge = canvas.getByText("Secondary Badge");
      const errorBadge = canvas.getByText("Error Badge");
      const outlineBadge = canvas.getByText("Outline Badge");

      await expect(primarytBadge).toBeVisible();
      await expect(secondaryBadge).toBeVisible();
      await expect(errorBadge).toBeVisible();
      await expect(outlineBadge).toBeVisible();

      await expect(primarytBadge).toHaveAttribute("data-slot", "badge");
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
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>Primary Badge</Badge>
      <Badge variant="secondary">Secondary Badge</Badge>
      <Badge variant="error">Error Badge</Badge>
      <Badge variant="outline">Outline Badge</Badge>
      <Badge asChild>
        <button type="button">Clickable Badge</button>
      </Badge>
    </div>
  )
});
