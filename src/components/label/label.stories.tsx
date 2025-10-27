import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Checkbox } from "~/components/checkbox";

import { Label } from ".";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs", "beta"]
} satisfies Meta<typeof Label>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
};
