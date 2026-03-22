import * as React from "react";

import { expect, screen, waitFor } from "storybook/test";

import { Button } from "../button";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Popover component built on Radix UI primitives. Displays rich content in a portal overlay anchored to a trigger element. Supports controlled/uncontrolled modes, multiple placement options, and composable sub-components."
    }
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of the popover. Must be used with `onOpenChange`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" }
      }
    },
    defaultOpen: {
      control: "boolean",
      description: "The open state when initially rendered. Use when not controlling state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    onOpenChange: {
      description: "Event handler called when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" }
      }
    },
    modal: {
      control: "boolean",
      description:
        "When true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    }
  }
});

// -- Example ------------------------------------------------------------------

export const Example = meta.story({
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>This is the popover content. It can contain any elements.</p>
      </PopoverContent>
    </Popover>
  )
});

Example.test("trigger is visible and has correct data-slot", async ({ canvas }) => {
  const trigger = canvas.getByRole("button", { name: "Open Popover" });
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
});

Example.test("popover content is not mounted initially", async () => {
  await expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
});

Example.test("opens on trigger click", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open Popover" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(screen.getByText("This is the popover content. It can contain any elements.")).toBeVisible();
});

Example.test("closes with Escape key", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open Popover" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
  });
});

Example.test("closes when clicking outside", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open Popover" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await userEvent.click(document.body);

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
  });
});

// -- WithHeader ---------------------------------------------------------------

export const WithHeader = meta.story({
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open with Header</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>This is a helpful description of the popover content.</PopoverDescription>
        </PopoverHeader>
        <p className="text-sm">Additional content can follow the header.</p>
      </PopoverContent>
    </Popover>
  )
});

WithHeader.test("renders title, description and body inside popover", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open with Header" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(screen.getByRole("heading", { name: "Popover Title" })).toBeVisible();
  await expect(screen.getByText("This is a helpful description of the popover content.")).toBeVisible();
  await expect(screen.getByText("Additional content can follow the header.")).toBeVisible();
});

WithHeader.test("all sub-components have correct data-slot attributes", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Open with Header" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(document.querySelector('[data-slot="popover-header"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="popover-title"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="popover-description"]')).toBeInTheDocument();
});

// -- Positions ----------------------------------------------------------------

export const Positions = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 p-16">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">Appears above the trigger.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">Appears to the right of the trigger.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">Appears below the trigger.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">Appears to the left of the trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
});

// Note: we check content text, not data-side — Radix sets data-side after collision
// detection which can flip the side based on available viewport space.

Positions.test("opens Top popover and shows its content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Top" }));

  await waitFor(async () => {
    await expect(screen.getByText("Appears above the trigger.")).toBeVisible();
  });
});

Positions.test("opens Right popover and shows its content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Right" }));

  await waitFor(async () => {
    await expect(screen.getByText("Appears to the right of the trigger.")).toBeVisible();
  });
});

Positions.test("opens Bottom popover and shows its content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Bottom" }));

  await waitFor(async () => {
    await expect(screen.getByText("Appears below the trigger.")).toBeVisible();
  });
});

Positions.test("opens Left popover and shows its content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Left" }));

  await waitFor(async () => {
    await expect(screen.getByText("Appears to the left of the trigger.")).toBeVisible();
  });
});

// -- Alignments ---------------------------------------------------------------

export const Alignments = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="text-sm">Content aligned to the start of the trigger.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="text-sm">Content centered on the trigger (default).</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-sm">Content aligned to the end of the trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
});

Alignments.test("opens start-aligned popover with correct data-align", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Align Start" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  // data-align reflects the requested alignment (Radix does not flip alignment, only side)
  await expect(document.querySelector('[data-slot="popover-content"]')).toHaveAttribute("data-align", "start");
});

Alignments.test("opens end-aligned popover with correct data-align", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Align End" }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(document.querySelector('[data-slot="popover-content"]')).toHaveAttribute("data-align", "end");
});

// -- Controlled ---------------------------------------------------------------

export const Controlled = meta.story({
  render: function ControlledPopover() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
          Toggle: {open ? "Open" : "Closed"}
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverAnchor asChild>
            <Button>Anchor</Button>
          </PopoverAnchor>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Controlled Popover</PopoverTitle>
              <PopoverDescription>This popover is controlled by external state.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
});

Controlled.test("is initially closed", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /Toggle: Closed/i })).toBeVisible();
  await expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
});

Controlled.test("opens when toggle is clicked", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /Toggle: Closed/i }));

  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(canvas.getByRole("button", { name: /Toggle: Open/i })).toBeVisible();
});

// -- WithCustomContent --------------------------------------------------------

export const WithCustomContent = meta.story({
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Notification Settings</PopoverTitle>
          <PopoverDescription>Configure how you receive notifications.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm font-medium">Email notifications</span>
            <input type="checkbox" defaultChecked aria-label="Toggle email notifications" />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm font-medium">Push notifications</span>
            <input type="checkbox" aria-label="Toggle push notifications" />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm font-medium">SMS notifications</span>
            <input type="checkbox" aria-label="Toggle SMS notifications" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
});

WithCustomContent.test("renders all notification options", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(screen.getByText("Email notifications")).toBeVisible();
  await expect(screen.getByText("Push notifications")).toBeVisible();
  await expect(screen.getByText("SMS notifications")).toBeVisible();
});

WithCustomContent.test("checkboxes have correct initial state", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  await expect(screen.getByRole("checkbox", { name: "Toggle email notifications" })).toBeChecked();
  await expect(screen.getByRole("checkbox", { name: "Toggle push notifications" })).not.toBeChecked();
  await expect(screen.getByRole("checkbox", { name: "Toggle SMS notifications" })).not.toBeChecked();
});

WithCustomContent.test("unchecked checkbox can be toggled on", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });

  const pushCheckbox = screen.getByRole("checkbox", { name: "Toggle push notifications" });
  await expect(pushCheckbox).not.toBeChecked();

  await userEvent.click(pushCheckbox);
  await expect(pushCheckbox).toBeChecked();
});
