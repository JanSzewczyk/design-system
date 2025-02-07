import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"]
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Base: Story = {
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {}
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {
    disabled: true
  }
};

export const Invalid: Story = {
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {
    invalid: true
  }
};
