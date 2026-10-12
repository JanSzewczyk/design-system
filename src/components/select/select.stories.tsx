import preview from "~/.storybook/preview";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from ".";

const meta = preview.meta({
  component: Select,
  decorators: [(story) => <div className="max-w-md">{story()}</div>],
  tags: ["autodocs", "beta"],
  title: "Components/Select"
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
    <Select defaultValue="apple" disabled placeholder="Select a fruit">
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
    <Select defaultValue="apple" invalid placeholder="Select a fruit">
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
      <Select placeholder="Small" size="sm"></Select>
      <Select placeholder="Default" size="default"></Select>
    </div>
  )
});
