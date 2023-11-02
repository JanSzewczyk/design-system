import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

import { BadgeIcon, GitHubLogoIcon } from "../../icons";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [(story) => <div className="w-52">{story()}</div>]
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
      <Input defaultValue="Start Icon" startIcon={<BadgeIcon className="h-4 w-4" />} {...args} />
      <Input defaultValue="End Icon" endIcon={<GitHubLogoIcon className="h-4 w-4" />} {...args} />
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
      <Input defaultValue="Start Icon" startIcon={<BadgeIcon className="h-4 w-4" />} {...args} />
      <Input defaultValue="End Icon" endIcon={<GitHubLogoIcon className="h-4 w-4" />} {...args} />
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
      <Input defaultValue="Start Icon" startIcon={<BadgeIcon className="h-4 w-4" />} {...args} />
      <Input defaultValue="End Icon" endIcon={<GitHubLogoIcon className="h-4 w-4" />} {...args} />
    </div>
  ),
  args: {
    invalid: true
  }
};
