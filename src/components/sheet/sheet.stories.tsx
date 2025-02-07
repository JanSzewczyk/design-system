import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

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
      </SheetContent>
    </Sheet>
  )
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
