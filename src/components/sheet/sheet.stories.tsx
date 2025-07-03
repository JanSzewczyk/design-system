import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { userEvent, waitFor, within, expect } from "storybook/test";

import { Button } from "../button";

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

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"]
} satisfies Meta<typeof Sheet>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Sheet",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet Description</SheetDescription>
        </SheetHeader>
        <div className="py-6">BODY CONTENT</div>
        <SheetFooter>Sheet Component Footer</SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await userEvent.click(canvas.getByRole("button", { name: /open/i }));

    const sheetContent = canvas.getByRole("dialog", { name: /Sheet Title/ });
    await expect(sheetContent).toBeVisible();
    await expect(sheetContent).toHaveAttribute("data-state", "open");

    const sheetContentCanvas = within(sheetContent);

    await expect(sheetContentCanvas.getByRole("heading", { name: /Sheet Title/ })).toBeVisible();

    await expect(sheetContentCanvas.getByRole("button", { name: /Close/ })).toBeVisible();
  }
};

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export const Side: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outlined" color="neutral">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you&lsquo;re done.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">Some content</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" variant="contained">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
};

export const WithCloseButton: Story = {
  name: "Sheet with Close Button",
  tags: ["test-only", "interaction"],
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet with Close Button</SheetTitle>
          <SheetDescription>This sheet demonstrates close button functionality</SheetDescription>
        </SheetHeader>
        <div className="py-6">Sheet content goes here</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="contained">Close Sheet</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open sheet
    await userEvent.click(canvas.getByRole("button", { name: /open sheet/i }));

    // Verify sheet is open
    const sheetContent = canvas.getByRole("dialog");
    await expect(sheetContent).toBeVisible();
    await expect(sheetContent).toHaveAttribute("data-state", "open");

    // Click the custom close button
    const closeButton = within(sheetContent).getByRole("button", { name: /close sheet/i });
    await userEvent.click(closeButton);

    // Verify sheet is closed
    await waitFor(async () => {
      await expect(sheetContent).toHaveAttribute("data-state", "closed");
    });
  }
};

export const EscKeyClosing: Story = {
  name: "Sheet with ESC Key Closing",
  tags: ["test-only", "interaction"],
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Press ESC to Close</SheetTitle>
          <SheetDescription>This sheet can be closed by pressing the ESC key</SheetDescription>
        </SheetHeader>
        <div className="py-6">Press ESC key to close this sheet</div>
      </SheetContent>
    </Sheet>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open sheet
    await userEvent.click(canvas.getByRole("button", { name: /open sheet/i }));

    // Verify sheet is open
    const sheetContent = canvas.getByRole("dialog");
    await expect(sheetContent).toBeVisible();
    await expect(sheetContent).toHaveAttribute("data-state", "open");

    // Press ESC key to close the sheet
    await userEvent.keyboard("{Escape}");

    // Verify sheet is closed
    await waitFor(async () => {
      await expect(sheetContent).toHaveAttribute("data-state", "closed");
    });
  }
};

export const OutsideClickClosing: Story = {
  name: "Sheet with Outside Click Closing",
  tags: ["test-only", "interaction"],
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Click Outside to Close</SheetTitle>
          <SheetDescription>This sheet can be closed by clicking outside of it</SheetDescription>
        </SheetHeader>
        <div className="py-6">Click outside this sheet to close it</div>
      </SheetContent>
    </Sheet>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open sheet
    await userEvent.click(canvas.getByRole("button", { name: /open sheet/i }));

    // Verify sheet is open
    const sheetContent = canvas.getByRole("dialog");
    await expect(sheetContent).toBeVisible();
    await expect(sheetContent).toHaveAttribute("data-state", "open");

    // Click outside the sheet (on the overlay)
    await userEvent.click(document.elementFromPoint(0, 0) as Element);

    // Verify sheet is closed
    await waitFor(async () => {
      await expect(sheetContent).toHaveAttribute("data-state", "closed");
    });
  }
};
