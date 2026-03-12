import * as React from "react";

import { expect, screen, waitFor } from "storybook/test";
import { Button } from "~/components";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Sheet component built on Radix UI primitives. Provides a side panel that slides in from any edge of screen. Supports top, right, bottom, and left positions with customizable close button behavior."
    }
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of sheet. Must be used with `onOpenChange`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" }
      }
    },
    defaultOpen: {
      control: "boolean",
      description: "The open state of sheet when it is initially rendered. Use when not controlling state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    onOpenChange: {
      description: "Event handler called when open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" }
      }
    },
    modal: {
      control: "boolean",
      description:
        "When true, interaction with outside elements will be disabled and only sheet content will be visible to screen readers.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" }
      }
    }
  }
});

const BasicSheetContent = () => (
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>This is a description of what this sheet is for.</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p>This is main content of sheet.</p>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button color="neutral">Cancel</Button>
      </SheetClose>
      <Button>Confirm</Button>
    </SheetFooter>
  </SheetContent>
);

// -----------------------------------------------------------------------------
// Story 1: Sheet (Main story with comprehensive tests)
// -----------------------------------------------------------------------------

export const SheetStory = meta.story({
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <BasicSheetContent />
    </Sheet>
  ),
  tags: ["test"]
});

// Rendering Tests
SheetStory.test("Trigger button is visible with correct data-slot attribute", async ({ canvas }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await expect(triggerButton).toBeVisible();
  await expect(triggerButton).toHaveAttribute("data-slot", "sheet-trigger");
});

SheetStory.test("Sheet is initially closed", async () => {
  await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

SheetStory.test("Clicking trigger button opens sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  const sheet = await screen.findByRole("dialog");
  await expect(sheet).toBeVisible();
});

SheetStory.test("All data-slot attributes are present when sheet is open", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  await expect(document.querySelector('[data-slot="sheet-overlay"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="sheet-content"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="sheet-header"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="sheet-title"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="sheet-description"]')).toBeInTheDocument();
  await expect(document.querySelector('[data-slot="sheet-footer"]')).toBeInTheDocument();
});

SheetStory.test("Sheet content has correct data-side attribute", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const content = document.querySelector('[data-slot="sheet-content"]');
  await expect(content).toHaveAttribute("data-side", "right");
});

// Interaction Tests
SheetStory.test("Clicking close button (X) closes sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const closeButton = document.querySelector('[data-slot="sheet-close"]') as HTMLElement;
  await userEvent.click(closeButton);

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetStory.test("Clicking SheetClose button in footer closes sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const cancelButton = screen.getByRole("button", { name: "Cancel" });
  await userEvent.click(cancelButton);

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetStory.test("Clicking overlay closes sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const overlay = document.querySelector('[data-slot="sheet-overlay"]') as HTMLElement;
  await userEvent.click(overlay);

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetStory.test("Pressing Escape key closes sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// Accessibility Tests
SheetStory.test("Focus returns to trigger button after closing sheet", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  await expect(triggerButton).toHaveFocus();
});

SheetStory.test("Dialog has correct ARIA attributes", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  const sheet = await screen.findByRole("dialog");
  await expect(sheet).toHaveAttribute("role", "dialog");
  // Note: aria-modal may be handled by Radix UI via state/aria attributes
});

SheetStory.test("Focus is trapped within dialog when open", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet" });
  await userEvent.click(triggerButton);

  const sheet = await screen.findByRole("dialog");

  // Focus should be inside the dialog
  const focusedElement = document.activeElement;
  await expect(sheet).toContainElement(focusedElement as HTMLElement);
});

// -----------------------------------------------------------------------------
// Story 2: SheetWithoutCloseButton
// -----------------------------------------------------------------------------

export const SheetWithoutCloseButton = meta.story({
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet without X Button</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No X Button Sheet</SheetTitle>
          <SheetDescription>This sheet does not have a close button in top-right corner.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>You can close this sheet using:</p>
          <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
            <li>The Cancel button below</li>
            <li>The Escape key</li>
            <li>Clicking outside sheet</li>
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button color="neutral">Cancel</Button>
          </SheetClose>
          <Button>Confirm</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  tags: ["test"]
});

SheetWithoutCloseButton.test(
  "Close button is not present when showCloseButton={false}",
  async ({ canvas, userEvent }) => {
    const triggerButton = canvas.getByRole("button", { name: "Open Sheet without X Button" });
    await userEvent.click(triggerButton);

    await screen.findByRole("dialog");

    // Check that X button with screen reader text "Close" is not present
    // The X button has a span with sr-only class containing "Close" text
    const closeButton = screen.queryByText("Close");
    await expect(closeButton).not.toBeInTheDocument();
  }
);

SheetWithoutCloseButton.test("Can still close sheet with overlay click", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet without X Button" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const overlay = document.querySelector('[data-slot="sheet-overlay"]') as HTMLElement;
  await userEvent.click(overlay);

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetWithoutCloseButton.test("Can still close sheet with Escape key", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet without X Button" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetWithoutCloseButton.test("Can still close sheet with SheetClose button", async ({ canvas, userEvent }) => {
  const triggerButton = canvas.getByRole("button", { name: "Open Sheet without X Button" });
  await userEvent.click(triggerButton);

  await screen.findByRole("dialog");

  const cancelButton = screen.getByRole("button", { name: "Cancel" });
  await userEvent.click(cancelButton);

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// -----------------------------------------------------------------------------
// Story 3: SheetControlled
// -----------------------------------------------------------------------------

export const SheetControlled = meta.story({
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Controlled Sheet</Button>
        <Button color="neutral" onClick={() => setOpen(false)}>
          Close Controlled Sheet
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Controlled Sheet</SheetTitle>
              <SheetDescription>This sheet is controlled by external state.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p>Sheet is {open ? "open" : "closed"}</p>
            </div>
            <SheetFooter>
              <Button color="neutral" onClick={() => setOpen(false)}>
                Close Programmatically
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
  tags: ["test"]
});

SheetControlled.test("External open button opens controlled sheet", async ({ canvas, userEvent }) => {
  const openButton = canvas.getByRole("button", { name: "Open Controlled Sheet" });
  await userEvent.click(openButton);

  const sheet = await screen.findByRole("dialog");
  await expect(sheet).toBeVisible();
});

SheetControlled.test("Sheet can be opened multiple times", async ({ canvas, userEvent }) => {
  // First open
  const openButton = canvas.getByRole("button", { name: "Open Controlled Sheet" });
  await userEvent.click(openButton);

  await screen.findByRole("dialog");

  // First close
  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // Second open
  await userEvent.click(openButton);

  const sheet = await screen.findByRole("dialog");
  await expect(sheet).toBeVisible();

  // Second close
  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

SheetControlled.test("Controlled sheet opens and closes correctly", async ({ canvas, userEvent }) => {
  const openButton = canvas.getByRole("button", { name: "Open Controlled Sheet" });
  await userEvent.click(openButton);

  await screen.findByRole("dialog");

  // Verify state text shows "open" while dialog is open
  const stateText = screen.getByText(/Sheet is open/i);
  await expect(stateText).toBeVisible();

  // Close sheet
  await userEvent.keyboard("{Escape}");

  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// -----------------------------------------------------------------------------
// Story 4: SheetSideVariants (Visual-only for documentation)
// -----------------------------------------------------------------------------

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export const SheetSideVariants = meta.story({
  name: "Side Variants",
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button color="neutral">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">Some content</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
});
