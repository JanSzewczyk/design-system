import * as React from "react";

import { Select, SelectItem, SelectContent, SelectGroup, SelectLabel } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Select",
  component: Select,
  tags: ["autodocs", "beta"],
  decorators: [(story) => <div className="max-w-md">{story()}</div>]
});

export const Example = meta.story({
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
});

export const DefaultValue = meta.story({
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
});

export const Disabled = meta.story({
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
});

export const Invalid = meta.story({
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
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Select size="sm" placeholder="Small"></Select>
      <Select size="default" placeholder="Default"></Select>
    </div>
  )
});
