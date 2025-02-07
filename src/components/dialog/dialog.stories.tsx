import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Select, SelectItem } from "../select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from ".";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"]
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined" color="neutral">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lorem ipsum dolor sit amet</DialogTitle>
          <DialogDescription>Maecenas ac sapien vestibulum, consequat nisl sit amet, pretium ipsum.</DialogDescription>
        </DialogHeader>
        <div>
          Ut tincidunt tristique dui sit amet ultrices. Proin ultrices, turpis sed tincidunt commodo, arcu quam mollis
          turpis, et maximus ligula arcu id dui. Aliquam fermentum lorem et leo tempus sodales. Duis vulputate, metus
          nec malesuada feugiat, dui metus rutrum ipsum, in finibus ante massa nec sem.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" color="neutral" variant="outlined">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

const DIALOGS_WIDTHS = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"] as const;
export const Width: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2">
      {DIALOGS_WIDTHS.map((width) => (
        <Dialog key={width}>
          <DialogTrigger asChild>
            <Button variant="outlined" color="neutral">
              {width}
            </Button>
          </DialogTrigger>
          <DialogContent width={width}>
            <DialogHeader>
              <DialogTitle>Lorem ipsum dolor sit amet</DialogTitle>
              <DialogDescription>
                Maecenas ac sapien vestibulum, consequat nisl sit amet, pretium ipsum.
              </DialogDescription>
            </DialogHeader>
            <div>
              Ut tincidunt tristique dui sit amet ultrices. Proin ultrices, turpis sed tincidunt commodo, arcu quam
              mollis turpis, et maximus ligula arcu id dui. Aliquam fermentum lorem et leo tempus sodales. Duis
              vulputate, metus nec malesuada feugiat, dui metus rutrum ipsum, in finibus ante massa nec sem.
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" color="neutral" variant="outlined">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
};

export const Form: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined" color="neutral">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lorem ipsum dolor sit amet</DialogTitle>
          <DialogDescription>Maecenas ac sapien vestibulum, consequat nisl sit amet, pretium ipsum.</DialogDescription>
        </DialogHeader>
        <div>
          <form>
            <Select>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Select>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" color="neutral" variant="outlined">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
