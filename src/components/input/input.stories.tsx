import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs", "new"],
  decorators: [(story) => <div className="max-w-lg">{story()}</div>]
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    type: "email",
    placeholder: "Email"
  }
};

export const File: Story = {
  args: {
    type: "file"
  }
};

export const Disabled: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    disabled: true
  }
};

export const Invalid: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    invalid: true,
    value: "incorrect@email.com"
  }
};
