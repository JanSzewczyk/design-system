import * as React from "react";

import { Label } from ".";
import { Meta, StoryObj } from "@storybook/react";

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
