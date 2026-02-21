import * as React from "react";

import { within, expect } from "storybook/test";

import { Textarea } from "./textarea";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs", "beta"]
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox");

    // Test that textarea is rendered and accessible
    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toBeVisible();
    await expect(textarea).not.toBeDisabled();
  }
});

export const Base = meta.story({
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {},
  play: async ({ canvas }) => {
    const textareas = canvas.getAllByRole("textbox");

    // Test all textareas are rendered
    await expect(textareas).toHaveLength(3);

    // Test placeholder
    const placeholderTextarea = canvas.getByPlaceholderText("With Placeholder");
    await expect(placeholderTextarea).toBeInTheDocument();

    // Test default value
    const defaultValueTextarea = canvas.getByDisplayValue("With default value");
    await expect(defaultValueTextarea).toBeInTheDocument();
    await expect(defaultValueTextarea).toHaveValue("With default value");
  }
});

export const Disabled = meta.story({
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {
    disabled: true
  },
  play: async ({ canvas, userEvent }) => {
    const textareas = canvas.getAllByRole("textbox");

    // Test all textareas are disabled
    for (const textarea of textareas) {
      await expect(textarea).toBeDisabled();
    }

    // Test that disabled textarea cannot be interacted with
    const firstTextarea = textareas[0];
    await userEvent.click(firstTextarea);
    await userEvent.type(firstTextarea, "This should not work");
    await expect(firstTextarea).toHaveValue("");
  }
});

export const Invalid = meta.story({
  render: (args) => (
    <div className="w-full max-w-sm space-y-4">
      <Textarea {...args} />
      <Textarea placeholder="With Placeholder" {...args} />
      <Textarea defaultValue="With default value" {...args} />
    </div>
  ),
  args: {
    invalid: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareas = canvas.getAllByRole("textbox");

    // Test all textareas have invalid attribute/styling
    for (const textarea of textareas) {
      await expect(textarea).toBeVisible();
      // Check if invalid prop is applied (this might need adjustment based on your implementation)
      await expect(textarea).toHaveAttribute("aria-invalid", "true");
    }
  }
});

export const ReadOnly = meta.story({
  args: {
    readOnly: true,
    defaultValue: "This is read-only content"
  },
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox");

    // Test readonly attribute
    await expect(textarea).toHaveAttribute("readonly");
    await expect(textarea).toHaveValue("This is read-only content");

    // Test that content cannot be changed
    await userEvent.click(textarea);
    await userEvent.type(textarea, "Should not change");
    await expect(textarea).toHaveValue("This is read-only content");
  }
});

export const UserInteraction = meta.story({
  args: {
    placeholder: "Type something here..."
  },
  tags: ["test-only", "interaction"],
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox");

    // Test typing functionality
    await userEvent.click(textarea);
    await userEvent.type(textarea, "Hello, World!");
    await expect(textarea).toHaveValue("Hello, World!");

    // Test clearing content
    await userEvent.clear(textarea);
    await expect(textarea).toHaveValue("");

    // Test multiline input
    await userEvent.type(textarea, "Line 1{enter}Line 2{enter}Line 3");
    await expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
  }
});

export const FocusAndBlur = meta.story({
  args: {
    placeholder: "Focus and blur test"
  },
  tags: ["test-only", "interaction"],
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox");

    // Test focus
    await userEvent.click(textarea);
    await expect(textarea).toHaveFocus();

    // Test blur
    await userEvent.tab();
    await expect(textarea).not.toHaveFocus();
  }
});

export const KeyboardNavigation = meta.story({
  render: () => (
    <div className="space-y-4">
      <input placeholder="Previous element" />
      <Textarea placeholder="Textarea for keyboard test" />
      <button>Next element</button>
    </div>
  ),
  tags: ["test-only", "interaction"],
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText("Previous element");
    const textarea = canvas.getByPlaceholderText("Textarea for keyboard test");
    const button = canvas.getByRole("button");

    // Start from input
    await userEvent.click(input);
    await expect(input).toHaveFocus();

    // Tab to textarea
    await userEvent.tab();
    await expect(textarea).toHaveFocus();

    // Tab to button
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Shift+Tab back to textarea
    await userEvent.tab({ shift: true });
    await expect(textarea).toHaveFocus();
  }
});

export const MaxLength = meta.story({
  args: {
    maxLength: 10,
    placeholder: "Max 10 characters"
  },
  tags: ["test-only", "interaction"],
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox");

    // Test maxLength attribute
    await expect(textarea).toHaveAttribute("maxlength", "10");

    // Test typing within limit
    await userEvent.click(textarea);
    await userEvent.type(textarea, "1234567890");
    await expect(textarea).toHaveValue("1234567890");

    // Test typing beyond limit (should not exceed)
    await userEvent.type(textarea, "11");
    await expect(textarea).toHaveValue("1234567890");
  }
});

export const Required = meta.story({
  args: {
    required: true,
    placeholder: "This field is required"
  },
  tags: ["test-only", "interaction"],
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox");

    // Test required attribute
    await expect(textarea).toBeRequired();
    await expect(textarea).toHaveAttribute("required");
  }
});
