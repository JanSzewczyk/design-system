import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Select } from "./select";
import { SelectItem } from "./select-item";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-52">{Story()}</div>]
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Select {...args}>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};

export const Placeholder: Story = {
  args: {
    placeholder: "Placeholder"
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};

export const DefaultValue: Story = {
  args: {
    defaultValue: "chicken"
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};

export const Invalid: Story = {
  args: {
    invalid: true
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="beef">Beef</SelectItem>
      <SelectItem value="chicken">Chicken</SelectItem>
      <SelectItem value="lamb">Lamb</SelectItem>
      <SelectItem value="pork">Pork</SelectItem>
    </Select>
  )
};
