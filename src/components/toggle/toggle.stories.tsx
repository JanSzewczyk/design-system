import * as React from "react";

import { expect } from "storybook/test";

import { Toggle } from "./toggle";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs", "new"],
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
    disabled: {
      control: "boolean",
      description: "Disable the toggle"
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state"
    }
  }
});

export const Default = meta.story({
  render: () => <Toggle>Toggle</Toggle>
});

export const Variants = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  )
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  )
});

export const Pressed = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle variant="outline" defaultPressed>
        Pressed Outline
      </Toggle>
    </div>
  )
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled defaultPressed>
        Disabled Pressed
      </Toggle>
      <Toggle variant="outline" disabled>
        Disabled Outline
      </Toggle>
    </div>
  )
});

export const WithIcon = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="outline" aria-label="Bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
          <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
        </svg>
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" x2="10" y1="4" y2="4" />
          <line x1="14" x2="5" y1="20" y2="20" />
          <line x1="15" x2="9" y1="4" y2="20" />
        </svg>
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4v6a6 6 0 0 0 12 0V4" />
          <line x1="4" x2="20" y1="20" y2="20" />
        </svg>
      </Toggle>
    </div>
  )
});

export const DataSlotAttributes = meta.story({
  tags: ["test"],
  render: () => <Toggle>Test</Toggle>,
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button");
    await expect(toggle).toHaveAttribute("data-slot", "toggle");
  }
});

export const PressedInteraction = meta.story({
  tags: ["test"],
  render: () => <Toggle variant="outline">Click me</Toggle>,
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button");

    await expect(toggle).toHaveAttribute("data-state", "off");

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-state", "on");

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-state", "off");
  }
});
