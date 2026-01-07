import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { Button } from "../button";

import { Tooltip, TooltipContent, TooltipTrigger } from ".";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    onOpenChange: fn()
  },
  tags: ["autodocs", "beta"],
  parameters: {
    docs: {
      description: {
        component:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. Built on Radix UI Tooltip primitive."
      }
    }
  }
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  )
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
    </div>
  )
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Delayed (500ms)</Button>
      </TooltipTrigger>
      <TooltipContent>This tooltip has a 500ms delay</TooltipContent>
    </Tooltip>
  )
};

export const Controlled: Story = {
  render: function ControlledTooltip() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setOpen(!open)}>
          Toggle: {open ? "Open" : "Closed"}
        </Button>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button>Controlled trigger</Button>
          </TooltipTrigger>
          <TooltipContent>Controlled tooltip</TooltipContent>
        </Tooltip>
      </div>
    );
  }
};

export const InteractionTest: Story = {
  tags: ["test-only"],
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button data-testid="tooltip-trigger">Trigger</Button>
      </TooltipTrigger>
      <TooltipContent data-testid="tooltip-content">Tooltip content</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step("Tooltip trigger has correct data-slot", async () => {
      const trigger = canvas.getByTestId("tooltip-trigger");
      await expect(trigger).toHaveAttribute("data-slot", "tooltip-trigger");
    });

    await step("Tooltip content is rendered when defaultOpen", async () => {
      const content = body.getByTestId("tooltip-content");
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveAttribute("data-slot", "tooltip-content");
    });
  }
};

export const HoverInteractionTest: Story = {
  tags: ["test-only"],
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button data-testid="hover-trigger">Hover trigger</Button>
      </TooltipTrigger>
      <TooltipContent data-testid="hover-content">Hover tooltip</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step("Tooltip appears on hover", async () => {
      const trigger = canvas.getByTestId("hover-trigger");
      await userEvent.hover(trigger);

      const content = await body.findByTestId("hover-content");
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveAttribute("data-state", "delayed-open");
    });

    await step("Tooltip closes on unhover", async () => {
      const trigger = canvas.getByTestId("hover-trigger");
      await userEvent.unhover(trigger);

      const content = body.getByTestId("hover-content");
      await expect(content).toHaveAttribute("data-state", "closed");
    });
  }
};
