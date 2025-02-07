import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Label } from ".";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"]
} satisfies Meta<typeof Label>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Label htmlFor="email">Your email address</Label>
};
