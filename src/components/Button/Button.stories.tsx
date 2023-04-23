import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    as: {
      control: "text"
    },
    children: {
      control: "text"
    }
  }
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
  args: {
    children: "Label"
  },
  parameters: { pseudo: { hover: true } }
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-row items-center gap-x-4">
      <Button size="sm" {...args}>
        SMALL
      </Button>
      <Button {...args}>MEDIUM</Button>
      <Button size="lg" {...args}>
        LARGE
      </Button>
    </div>
  )
};
