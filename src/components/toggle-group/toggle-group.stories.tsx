import * as React from "react";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { expect } from "storybook/test";

import { ToggleGroup, ToggleGroupItem } from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Toggle Group",
  component: ToggleGroup,
  subcomponents: { ToggleGroupItem },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Whether a single or multiple items can be selected at a time"
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style of toggle items"
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of toggle items"
    },
    spacing: {
      control: "number",
      description: "Gap between items in spacing scale units. Use 0 to join items without gap."
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction of the group"
    },
    disabled: {
      control: "boolean",
      description: "Disable all items"
    }
  }
});

export const FormattingToolbar = meta.story({
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

export const Outline = meta.story({
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="all">
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
    </ToggleGroup>
  )
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" size="default">
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
});

export const Spacing = meta.story({
  render: () => (
    <ToggleGroup type="single" variant="outline" size="sm" spacing={2} defaultValue="top">
      <ToggleGroupItem value="top">Top</ToggleGroupItem>
      <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  )
});

export const Vertical = meta.story({
  render: () => (
    <ToggleGroup type="multiple" orientation="vertical" spacing={1} defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

export const AllDisabled = meta.story({
  render: () => (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

export const Custom = meta.story({
  render: () => {
    const [fontWeight, setFontWeight] = React.useState("normal");

    return (
      <div className="flex flex-col items-center gap-4">
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={2}
          size="lg"
          value={fontWeight}
          onValueChange={(value) => {
            if (value) setFontWeight(value);
          }}
        >
          <ToggleGroupItem value="light" aria-label="Font weight light" className="h-auto flex-col px-4 py-2">
            <span className="text-2xl font-light">Aa</span>
            <span className="text-xs">Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="normal" aria-label="Font weight normal" className="h-auto flex-col px-4 py-2">
            <span className="text-2xl font-normal">Aa</span>
            <span className="text-xs">Normal</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" aria-label="Font weight medium" className="h-auto flex-col px-4 py-2">
            <span className="text-2xl font-medium">Aa</span>
            <span className="text-xs">Medium</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="bold" aria-label="Font weight bold" className="h-auto flex-col px-4 py-2">
            <span className="text-2xl font-bold">Aa</span>
            <span className="text-xs">Bold</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-muted-foreground text-sm">Selected: {fontWeight}</p>
      </div>
    );
  }
});

export const MultiplePreselected = meta.story({
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold", "underline"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

// ─── Test Stories ──────────────────────────────────────────────────────────────

export const DataSlotAttributes = meta.story({
  tags: ["test"],
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

DataSlotAttributes.test("Root has data-slot toggle-group attribute", async ({ canvas }) => {
  const root = canvas.getByRole("group");
  await expect(root).toHaveAttribute("data-slot", "toggle-group");
});

DataSlotAttributes.test("Each item has data-slot toggle-group-item attribute", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-slot", "toggle-group-item");
  }
});

export const SingleSelection = meta.story({
  tags: ["test"],
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

SingleSelection.test("Clicking an item sets it to data-state on", async ({ canvas, userEvent }) => {
  const boldItem = canvas.getByRole("radio", { name: /toggle bold/i });
  await userEvent.click(boldItem);
  await expect(boldItem).toHaveAttribute("data-state", "on");
});

SingleSelection.test("Clicking a second item deselects the first", async ({ canvas, userEvent, step }) => {
  const boldItem = canvas.getByRole("radio", { name: /toggle bold/i });
  const italicItem = canvas.getByRole("radio", { name: /toggle italic/i });

  await step("Select bold item", async () => {
    await userEvent.click(boldItem);
    await expect(boldItem).toHaveAttribute("data-state", "on");
  });

  await step("Select italic item — bold becomes off", async () => {
    await userEvent.click(italicItem);
    await expect(italicItem).toHaveAttribute("data-state", "on");
    await expect(boldItem).toHaveAttribute("data-state", "off");
  });
});

export const MultipleSelection = meta.story({
  tags: ["test"],
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

MultipleSelection.test("Multiple items can be selected simultaneously", async ({ canvas, userEvent, step }) => {
  const boldItem = canvas.getByRole("button", { name: /toggle bold/i });
  const italicItem = canvas.getByRole("button", { name: /toggle italic/i });

  await step("Select bold", async () => {
    await userEvent.click(boldItem);
    await expect(boldItem).toHaveAttribute("data-state", "on");
  });

  await step("Select italic — both are on", async () => {
    await userEvent.click(italicItem);
    await expect(italicItem).toHaveAttribute("data-state", "on");
    await expect(boldItem).toHaveAttribute("data-state", "on");
  });
});

MultipleSelection.test("Clicking a selected item deselects it", async ({ canvas, userEvent, step }) => {
  const boldItem = canvas.getByRole("button", { name: /toggle bold/i });

  await step("Select bold", async () => {
    await userEvent.click(boldItem);
    await expect(boldItem).toHaveAttribute("data-state", "on");
  });

  await step("Click again to deselect", async () => {
    await userEvent.click(boldItem);
    await expect(boldItem).toHaveAttribute("data-state", "off");
  });
});

export const DisabledGroup = meta.story({
  tags: ["test"],
  render: () => (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

DisabledGroup.test("All items have disabled attribute when group is disabled", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toBeDisabled();
  }
});

DisabledGroup.test("Clicking disabled items does not change data-state", async ({ canvas, userEvent }) => {
  const boldItem = canvas.getByRole("button", { name: /toggle bold/i });
  await expect(boldItem).toHaveAttribute("data-state", "off");
  await userEvent.click(boldItem);
  await expect(boldItem).toHaveAttribute("data-state", "off");
});

export const ContextInheritance = meta.story({
  tags: ["test"],
  render: () => (
    <ToggleGroup type="multiple" variant="outline" size="sm">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
});

ContextInheritance.test("Variant from root context propagates to items via data-variant", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-variant", "outline");
  }
});

ContextInheritance.test("Size from root context propagates to items via data-size", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-size", "sm");
  }
});
