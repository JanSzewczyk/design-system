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

// ─── Visual Stories ────────────────────────────────────────────────────────────

export const FormattingToolbar = meta.story({
  args: {
    type: "multiple",
    variant: "outline"
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
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
    );
  }
});

FormattingToolbar.test("Renders group with correct data-slot attribute", async ({ canvas }) => {
  const root = canvas.getByRole("group");
  await expect(root).toHaveAttribute("data-slot", "toggle-group");
});

FormattingToolbar.test("Each item has correct data-slot attribute", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-slot", "toggle-group-item");
  }
});

FormattingToolbar.test("Variant from args propagates to items via data-variant", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-variant", "outline");
  }
});

FormattingToolbar.test("Multiple items can be selected simultaneously", async ({ canvas, userEvent, step }) => {
  const bold = canvas.getByRole("button", { name: /toggle bold/i });
  const italic = canvas.getByRole("button", { name: /toggle italic/i });

  await step("Select bold", async () => {
    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("data-state", "on");
  });

  await step("Select italic — both remain on", async () => {
    await userEvent.click(italic);
    await expect(italic).toHaveAttribute("data-state", "on");
    await expect(bold).toHaveAttribute("data-state", "on");
  });
});

FormattingToolbar.test("Clicking a selected item deselects it", async ({ canvas, userEvent, step }) => {
  const bold = canvas.getByRole("button", { name: /toggle bold/i });

  await step("Select bold", async () => {
    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("data-state", "on");
  });

  await step("Click again to deselect", async () => {
    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("data-state", "off");
  });
});

export const Outline = meta.story({
  args: {
    type: "single",
    variant: "outline",
    defaultValue: "all"
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
      </ToggleGroup>
    );
  }
});

Outline.test("Default value item starts as on", async ({ canvas }) => {
  const all = canvas.getByRole("radio", { name: /all/i });
  await expect(all).toHaveAttribute("data-state", "on");
});

Outline.test("Clicking another item deselects the current one", async ({ canvas, userEvent, step }) => {
  const all = canvas.getByRole("radio", { name: /all/i });
  const missed = canvas.getByRole("radio", { name: /missed/i });

  await step("All starts selected", async () => {
    await expect(all).toHaveAttribute("data-state", "on");
  });

  await step("Click missed — all becomes off", async () => {
    await userEvent.click(missed);
    await expect(missed).toHaveAttribute("data-state", "on");
    await expect(all).toHaveAttribute("data-state", "off");
  });
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

Sizes.test("Items inherit size from root via data-size", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  const smItems = Array.from(groups[0].querySelectorAll("[data-slot='toggle-group-item']"));
  const defaultItems = Array.from(groups[1].querySelectorAll("[data-slot='toggle-group-item']"));

  for (const item of smItems) {
    await expect(item).toHaveAttribute("data-size", "sm");
  }
  for (const item of defaultItems) {
    await expect(item).toHaveAttribute("data-size", "default");
  }
});

export const Spacing = meta.story({
  args: {
    type: "single",
    variant: "outline",
    size: "sm",
    spacing: 2,
    defaultValue: "top"
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
  }
});

Spacing.test("Items have data-spacing matching root spacing prop", async ({ canvas }) => {
  const items = canvas.getAllByRole("radio");
  for (const item of items) {
    await expect(item).toHaveAttribute("data-spacing", "2");
  }
});

export const Vertical = meta.story({
  args: {
    type: "multiple",
    orientation: "vertical",
    spacing: 1,
    defaultValue: ["bold", "italic"]
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
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
    );
  }
});

Vertical.test("Root has data-orientation vertical", async ({ canvas }) => {
  const root = canvas.getByRole("group");
  await expect(root).toHaveAttribute("data-orientation", "vertical");
});

Vertical.test("Default values are pre-selected on mount", async ({ canvas }) => {
  const bold = canvas.getByRole("button", { name: /toggle bold/i });
  const italic = canvas.getByRole("button", { name: /toggle italic/i });
  const underline = canvas.getByRole("button", { name: /toggle underline/i });

  await expect(bold).toHaveAttribute("data-state", "on");
  await expect(italic).toHaveAttribute("data-state", "on");
  await expect(underline).toHaveAttribute("data-state", "off");
});

export const AllDisabled = meta.story({
  args: {
    type: "multiple",
    disabled: true
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
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
    );
  }
});

AllDisabled.test("All items have disabled attribute when group is disabled", async ({ canvas }) => {
  const items = canvas.getAllByRole("button");
  for (const item of items) {
    await expect(item).toBeDisabled();
  }
});

AllDisabled.test("Clicking disabled items does not change data-state", async ({ canvas, userEvent }) => {
  const bold = canvas.getByRole("button", { name: /toggle bold/i });
  await expect(bold).toHaveAttribute("data-state", "off");
  await userEvent.click(bold);
  await expect(bold).toHaveAttribute("data-state", "off");
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

Custom.test("Selecting an item updates the controlled state display", async ({ canvas, userEvent, step }) => {
  const bold = canvas.getByRole("radio", { name: /font weight bold/i });
  const selectedText = canvas.getByText(/selected:/i);

  await step("Initially shows normal", async () => {
    await expect(selectedText).toHaveTextContent("Selected: normal");
  });

  await step("After clicking bold, display updates", async () => {
    await userEvent.click(bold);
    await expect(selectedText).toHaveTextContent("Selected: bold");
    await expect(bold).toHaveAttribute("data-state", "on");
  });
});

export const MultiplePreselected = meta.story({
  args: {
    type: "multiple",
    defaultValue: ["bold", "underline"]
  },
  render(args) {
    return (
      <ToggleGroup {...args}>
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
    );
  }
});

MultiplePreselected.test("Pre-selected items start with data-state on", async ({ canvas }) => {
  const bold = canvas.getByRole("button", { name: /toggle bold/i });
  const italic = canvas.getByRole("button", { name: /toggle italic/i });
  const underline = canvas.getByRole("button", { name: /toggle underline/i });

  await expect(bold).toHaveAttribute("data-state", "on");
  await expect(italic).toHaveAttribute("data-state", "off");
  await expect(underline).toHaveAttribute("data-state", "on");
});
