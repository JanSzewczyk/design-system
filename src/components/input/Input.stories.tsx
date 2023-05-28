import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { IconBrandGoogle, IconCurrencyDollar } from "@tabler/icons-react";

import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"]
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Base: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Input {...args} />
      <Input placeholder="With Placeholder" {...args} />
      <Input defaultValue="With default value" {...args} />
      <Input
        defaultValue="Start Icon"
        startIcon={<IconBrandGoogle className="h-4 w-4" />}
        {...args}
      />
      <Input defaultValue="End Icon" endIcon={<IconBrandGoogle className="h-4 w-4" />} {...args} />
    </div>
  ),
  args: {}
};

export const Disabled: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Input {...args} />
      <Input placeholder="With Placeholder" {...args} />
      <Input defaultValue="With default value" {...args} />
      <Input
        defaultValue="Start Icon"
        startIcon={<IconCurrencyDollar className="h-4 w-4" />}
        {...args}
      />
      <Input defaultValue="End Icon" endIcon={<IconBrandGoogle className="h-4 w-4" />} {...args} />
    </div>
  ),
  args: {
    disabled: true
  }
};

export const Invalid: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Input {...args} />
      <Input placeholder="With Placeholder" {...args} />
      <Input defaultValue="With default value" {...args} />
      <Input
        defaultValue="Start Icon"
        startIcon={<IconBrandGoogle className="h-4 w-4" />}
        {...args}
      />
      <Input defaultValue="End Icon" endIcon={<IconBrandGoogle className="h-4 w-4" />} {...args} />
    </div>
  ),
  args: {
    invalid: true
  }
};
