import * as React from "react";

import { BoldIcon, BookmarkIcon, ItalicIcon } from "lucide-react";

import { expect } from "storybook/test";

import { Toggle } from "./toggle";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style of the toggle"
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of the toggle"
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state"
    },
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state (uncontrolled)"
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle"
    }
  }
});

export const ToggleStory = meta.story({
  name: "Toggle",
  render: () => (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
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

ToggleStory.test("Space key toggles the state", async ({ canvas, userEvent }) => {
  const toggle = canvas.getByRole("button", { name: /bookmark/i });

  toggle.focus();
  await expect(toggle).toHaveFocus();

  await userEvent.keyboard("{Space}");
  await expect(toggle).toHaveAttribute("data-state", "on");

  await userEvent.keyboard("{Space}");
  await expect(toggle).toHaveAttribute("data-state", "off");
});

export const Outline = meta.story({
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bold">
      <BoldIcon />
      Bold
    </Toggle>
  )
});

export const WithText = meta.story({
  name: "With Text",
  render: () => (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="outline" size="sm" aria-label="Toggle small">
        <ItalicIcon />
        Small
      </Toggle>
      <Toggle variant="outline" size="default" aria-label="Toggle default">
        <ItalicIcon />
        Default
      </Toggle>
      <Toggle variant="outline" size="lg" aria-label="Toggle large">
        <ItalicIcon />
        Large
      </Toggle>
    </div>
  )
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle disabled aria-label="Toggle default disabled">
        Default
      </Toggle>
      <Toggle variant="outline" disabled aria-label="Toggle outline disabled">
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
  name: "Default Pressed",
  render: () => (
    <Toggle defaultPressed aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
});

DefaultPressed.test("Renders in pressed state by default", async ({ canvas }) => {
  const toggle = canvas.getByRole("button", { name: /italic/i });
  await expect(toggle).toHaveAttribute("data-state", "on");
});
