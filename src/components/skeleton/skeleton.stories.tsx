import * as React from "react";

import { expect, within } from "storybook/test";
import { Skeleton } from "~/components";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    className: {
      control: "text"
    }
  },
  tags: ["autodocs"]
});

export const Default = meta.story({
  args: {
    className: "h-4 w-48"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeleton = canvas.getByRole("generic", { hidden: true });
    await expect(skeleton).toHaveAttribute("data-slot", "skeleton");
    await expect(skeleton).toHaveClass("animate-pulse");
  }
});

export const TextLines = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-48" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons).toHaveLength(3);
    for (const skeleton of Array.from(skeletons)) {
      await expect(skeleton).toHaveClass("animate-pulse");
    }
  }
});

export const Card = meta.story({
  render: () => (
    <div className="flex w-64 flex-col gap-3 rounded-lg border p-4">
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons).toHaveLength(5);
  }
});

export const Avatar = meta.story({
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons).toHaveLength(3);
  }
});
