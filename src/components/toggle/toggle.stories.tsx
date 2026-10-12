import { BoldIcon, BookmarkIcon, ItalicIcon } from "lucide-react";

import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Toggle } from "./toggle";

const meta = preview.meta({
  argTypes: {
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state (uncontrolled)"
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle"
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state"
    },
    size: {
      control: "select",
      description: "Size of the toggle",
      options: ["sm", "default", "lg"]
    },
    variant: {
      control: "select",
      description: "Visual style of the toggle",
      options: ["default", "outline"]
    }
  },
  component: Toggle,
  title: "Components/Toggle"
});

export const ToggleStory = meta.story({
  args: {
    "aria-label": "Toggle bookmark",
    size: "sm",
    variant: "outline"
  },
  name: "Toggle",
  render(args) {
    return (
      <Toggle {...args}>
        <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
        Bookmark
      </Toggle>
    );
  }
});

ToggleStory.test("Has correct data-slot attribute", async ({ canvas }) => {
  const toggle = canvas.getByRole("button", { name: /bookmark/i });
  await expect(toggle).toHaveAttribute("data-slot", "toggle");
});

ToggleStory.test("Starts unpressed with data-state off", async ({ canvas }) => {
  const toggle = canvas.getByRole("button", { name: /bookmark/i });
  await expect(toggle).toHaveAttribute("data-state", "off");
});

ToggleStory.test("Click toggles data-state between off and on", async ({ canvas, userEvent }) => {
  const toggle = canvas.getByRole("button", { name: /bookmark/i });

  await expect(toggle).toHaveAttribute("data-state", "off");

  await userEvent.click(toggle);
  await expect(toggle).toHaveAttribute("data-state", "on");

  await userEvent.click(toggle);
  await expect(toggle).toHaveAttribute("data-state", "off");
});

ToggleStory.test("Enter key toggles the state", async ({ canvas, userEvent }) => {
  const toggle = canvas.getByRole("button", { name: /bookmark/i });

  await userEvent.tab();
  await expect(toggle).toHaveFocus();
  await expect(toggle).toHaveAttribute("data-state", "off");

  await userEvent.keyboard("{Enter}");
  await expect(toggle).toHaveAttribute("data-state", "on");

  await userEvent.keyboard("{Enter}");
  await expect(toggle).toHaveAttribute("data-state", "off");
});

export const Outline = meta.story({
  args: {
    "aria-label": "Toggle bold",
    variant: "outline"
  },
  render(args) {
    return (
      <Toggle {...args}>
        <BoldIcon />
        Bold
      </Toggle>
    );
  }
});

export const WithText = meta.story({
  args: {
    "aria-label": "Toggle italic"
  },
  name: "With Text",
  render(args) {
    return (
      <Toggle {...args}>
        <ItalicIcon />
        Italic
      </Toggle>
    );
  }
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Toggle small" size="sm" variant="outline">
        <ItalicIcon />
        Small
      </Toggle>
      <Toggle aria-label="Toggle default" size="default" variant="outline">
        <ItalicIcon />
        Default
      </Toggle>
      <Toggle aria-label="Toggle large" size="lg" variant="outline">
        <ItalicIcon />
        Large
      </Toggle>
    </div>
  )
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Toggle default disabled" disabled>
        Default
      </Toggle>
      <Toggle aria-label="Toggle outline disabled" disabled variant="outline">
        Outline
      </Toggle>
    </div>
  )
});

Disabled.test("Disabled toggles are not interactive", async ({ canvas, step }) => {
  const toggles = canvas.getAllByRole("button");

  await step("Both toggles are disabled", async () => {
    await expect(toggles[0]).toBeDisabled();
    await expect(toggles[1]).toBeDisabled();
  });

  await step("Both toggles remain unpressed", async () => {
    await expect(toggles[0]).toHaveAttribute("data-state", "off");
    await expect(toggles[1]).toHaveAttribute("data-state", "off");
  });
});

export const DefaultPressed = meta.story({
  args: {
    "aria-label": "Toggle italic",
    defaultPressed: true
  },
  name: "Default Pressed",
  render(args) {
    return (
      <Toggle {...args}>
        <ItalicIcon />
        Italic
      </Toggle>
    );
  }
});

DefaultPressed.test("Renders in pressed state by default", async ({ canvas }) => {
  const toggle = canvas.getByRole("button", { name: /italic/i });
  await expect(toggle).toHaveAttribute("data-state", "on");
});
