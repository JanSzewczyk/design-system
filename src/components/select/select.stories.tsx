import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { SelectItem } from "./item";
import { Select } from "./select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [(story) => <div className="w-52">{story()}</div>]
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};
