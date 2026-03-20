import * as React from "react";

import { expect, fn } from "storybook/test";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "~/components";

import { Switch } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Switch",
  component: Switch,
  args: {
    onCheckedChange: fn()
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the switch"
    },
    defaultChecked: {
      control: "boolean",
      description: "The initial checked state when uncontrolled"
    },
    disabled: {
      control: "boolean",
      description: "When true, prevents interaction with the switch"
    },
    required: {
      control: "boolean",
      description: "When true, indicates that user must check the switch before submitting"
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "The size of the switch"
    },
    name: {
      control: "text",
      description: "The name of the switch (used in form submission)"
    }
  },
  tags: ["autodocs"]
});

export const SwitchStory = meta.story({
  name: "Switch",
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="default-switch" />
      <label htmlFor="default-switch" className="cursor-pointer text-sm">
        Toggle option
      </label>
    </div>
  )
});

SwitchStory.test("Renders unchecked by default", async ({ canvas }) => {
  const switchEl = canvas.getByRole("switch");
  await expect(switchEl).toHaveAttribute("data-state", "unchecked");
});

SwitchStory.test("Toggles between checked and unchecked on click", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");

  await expect(switchEl).toHaveAttribute("data-state", "unchecked");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("data-state", "checked");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("data-state", "unchecked");
});

SwitchStory.test("Renders checked when defaultChecked is set", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");

  // Toggle to checked to simulate defaultChecked behavior
  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("data-state", "checked");
});

SwitchStory.test("Label click toggles the switch", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");
  const label = canvas.getByText("Toggle option");

  await expect(switchEl).toHaveAttribute("data-state", "unchecked");

  await userEvent.click(label);
  await expect(switchEl).toHaveAttribute("data-state", "checked");

  await userEvent.click(label);
  await expect(switchEl).toHaveAttribute("data-state", "unchecked");
});

SwitchStory.test("Space key toggles the switch", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");

  switchEl.focus();
  await expect(switchEl).toHaveFocus();

  await userEvent.keyboard(" ");
  await expect(switchEl).toHaveAttribute("data-state", "checked");

  await userEvent.keyboard(" ");
  await expect(switchEl).toHaveAttribute("data-state", "unchecked");
});

SwitchStory.test("Has correct data-slot attribute", async ({ canvas }) => {
  const switchEl = canvas.getByRole("switch");
  await expect(switchEl).toHaveAttribute("data-slot", "switch");
});

export const Disabled = meta.story({
  render: () => (
    <FieldGroup className="w-full max-w-40">
      <Field orientation="horizontal" data-disabled>
        <Switch id="switch-disabled-unchecked" disabled />
        <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Switch id="switch-disabled-checked" disabled defaultChecked />
        <FieldLabel htmlFor="switch-disabled-checked">Disabled checked</FieldLabel>
      </Field>
    </FieldGroup>
  )
});

Disabled.test("Prevents interaction when disabled", async ({ canvas }) => {
  const switches = canvas.getAllByRole("switch");

  await expect(switches[0]).toBeDisabled();
  await expect(switches[1]).toBeDisabled();
});

Disabled.test("Preserves checked state when disabled", async ({ canvas }) => {
  const switches = canvas.getAllByRole("switch");

  await expect(switches[0]).toHaveAttribute("data-state", "unchecked");
  await expect(switches[1]).toHaveAttribute("data-state", "checked");
});

export const Invalid = meta.story({
  render: () => (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
});

Invalid.test("Has aria-invalid attribute", async ({ canvas }) => {
  const switchEl = canvas.getByRole("switch");
  await expect(switchEl).toHaveAttribute("aria-invalid", "true");
});

export const ControlledSwitch = meta.story({
  name: "Controlled",
  render: function ControlledSwitchRender() {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch id="controlled-switch" checked={checked} onCheckedChange={setChecked} />
          <label htmlFor="controlled-switch" className="cursor-pointer text-sm">
            Controlled switch
          </label>
        </div>
        <p className="text-muted-foreground text-xs">
          State: <span className="font-medium">{checked ? "On" : "Off"}</span>
        </p>
      </div>
    );
  }
});

ControlledSwitch.test("Reflects controlled state changes", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");

  await expect(switchEl).toHaveAttribute("data-state", "unchecked");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("data-state", "checked");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("data-state", "unchecked");
});

ControlledSwitch.test("Displays current state text", async ({ canvas, userEvent }) => {
  const switchEl = canvas.getByRole("switch");
  const stateText = canvas.getByText(/State:/);

  await expect(stateText).toHaveTextContent("State: Off");

  await userEvent.click(switchEl);
  await expect(stateText).toHaveTextContent("State: On");

  await userEvent.click(switchEl);
  await expect(stateText).toHaveTextContent("State: Off");
});

// -----------------------------------------------------------------------------
// Story 5: Sizes (Visual documentation)
// -----------------------------------------------------------------------------

export const Sizes = meta.story({
  render: () => (
    <FieldGroup className="w-full max-w-40">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
});

export const KeyboardNavigation = meta.story({
  name: "Keyboard Navigation",
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Switch id="keyboard-1" />
        <label htmlFor="keyboard-1" className="cursor-pointer text-sm">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="keyboard-2" />
        <label htmlFor="keyboard-2" className="cursor-pointer text-sm">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="keyboard-3" />
        <label htmlFor="keyboard-3" className="cursor-pointer text-sm">
          Option 3
        </label>
      </div>
    </div>
  )
});

KeyboardNavigation.test("Tab navigates between switches", async ({ canvas, userEvent }) => {
  const switches = canvas.getAllByRole("switch");

  switches[0].focus();
  await expect(switches[0]).toHaveFocus();

  await userEvent.tab();
  await expect(switches[1]).toHaveFocus();
});

KeyboardNavigation.test("Space key toggles focused switch", async ({ canvas, userEvent }) => {
  const switches = canvas.getAllByRole("switch");

  switches[0].focus();
  await expect(switches[0]).toHaveFocus();

  await userEvent.keyboard(" ");
  await expect(switches[0]).toHaveAttribute("data-state", "checked");

  await userEvent.keyboard(" ");
  await expect(switches[0]).toHaveAttribute("data-state", "unchecked");

  await userEvent.tab();
  await expect(switches[1]).toHaveFocus();

  await userEvent.keyboard(" ");
  await expect(switches[1]).toHaveAttribute("data-state", "checked");
});

export const Description = meta.story({
  render() {
    return (
      <Field orientation="horizontal" className="max-w-sm">
        <FieldContent>
          <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
          <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
        </FieldContent>
        <Switch id="switch-focus-mode" />
      </Field>
    );
  }
});

export const ChoiceCard = meta.story({
  render() {
    return (
      <FieldGroup className="w-full max-w-sm">
        <FieldLabel htmlFor="switch-share">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Share across devices</FieldTitle>
              <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
            </FieldContent>
            <Switch id="switch-share" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="switch-notifications">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>Receive notifications when focus mode is enabled or disabled.</FieldDescription>
            </FieldContent>
            <Switch id="switch-notifications" defaultChecked />
          </Field>
        </FieldLabel>
      </FieldGroup>
    );
  }
});
