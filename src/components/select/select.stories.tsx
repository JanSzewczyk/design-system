import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Select, SelectItem, SelectContent, SelectGroup, SelectLabel } from ".";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs", "beta"],
  decorators: [(story) => <div className="max-w-md">{story()}</div>]
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <Select placeholder="Select a fruit">
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const DefaultValue: Story = {
  render: () => (
    <Select defaultValue="apple" placeholder="Select a fruit">
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="apple" placeholder="Select a fruit">
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const Invalid: Story = {
  render: () => (
    <Select invalid defaultValue="apple" placeholder="Select a fruit">
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Select size="sm" placeholder="Small"></Select>
      <Select size="default" placeholder="Default"></Select>
    </div>
  )
};
