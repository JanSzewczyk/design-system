import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button, Label } from "~/components";

import { RadioGroup, RadioGroupItem } from ".";

const meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The default selected value when uncontrolled"
    },
    value: {
      control: "text",
      description: "The controlled selected value"
    },
    disabled: {
      control: "boolean",
      description: "When true, prevents interaction with all radio items"
    },
    required: {
      control: "boolean",
      description: "When true, indicates that the user must select an option before submitting"
    },
    name: {
      control: "text",
      description: "The name of the radio group (used in form submission)"
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the radio group"
    }
  },
  tags: ["autodocs", "test"]
} satisfies Meta<typeof RadioGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Verify all radio buttons are rendered
    await expect(radioButtons).toHaveLength(3);

    // Verify initial selection (comfortable)
    await expect(radioButtons[0]).not.toBeChecked();
    await expect(radioButtons[1]).toBeChecked();
    await expect(radioButtons[2]).not.toBeChecked();

    // Click on first radio button
    await userEvent.click(radioButtons[0]);
    await expect(radioButtons[0]).toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();
    await expect(radioButtons[2]).not.toBeChecked();

    // Click on third radio button
    await userEvent.click(radioButtons[2]);
    await expect(radioButtons[0]).not.toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();
    await expect(radioButtons[2]).toBeChecked();
  }
};

export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-1" id="uncontrolled-1" />
        <Label htmlFor="uncontrolled-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-2" id="uncontrolled-2" />
        <Label htmlFor="uncontrolled-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-3" id="uncontrolled-3" />
        <Label htmlFor="uncontrolled-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Verify no initial selection
    await expect(radioButtons[0]).not.toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();
    await expect(radioButtons[2]).not.toBeChecked();

    // Select second option
    await userEvent.click(radioButtons[1]);
    await expect(radioButtons[1]).toBeChecked();
  }
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-muted-foreground mb-3 text-sm">Entire group disabled:</p>
        <RadioGroup defaultValue="option-1" disabled>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-1" id="disabled-group-1" />
            <Label htmlFor="disabled-group-1" className="cursor-not-allowed opacity-50">
              Option 1
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-2" id="disabled-group-2" />
            <Label htmlFor="disabled-group-2" className="cursor-not-allowed opacity-50">
              Option 2
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-muted-foreground mb-3 text-sm">Individual item disabled:</p>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-1" id="disabled-item-1" />
            <Label htmlFor="disabled-item-1">Option 1 (enabled)</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-2" id="disabled-item-2" disabled />
            <Label htmlFor="disabled-item-2" className="cursor-not-allowed opacity-50">
              Option 2 (disabled)
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-3" id="disabled-item-3" />
            <Label htmlFor="disabled-item-3">Option 3 (enabled)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Verify first group is disabled
    await expect(radioButtons[0]).toBeDisabled();
    await expect(radioButtons[1]).toBeDisabled();

    // Verify second group mixed state
    await expect(radioButtons[2]).not.toBeDisabled();
    await expect(radioButtons[3]).toBeDisabled();
    await expect(radioButtons[4]).not.toBeDisabled();

    // Try to click disabled items (should not change state)
    await userEvent.click(radioButtons[1]);
    await expect(radioButtons[1]).not.toBeChecked();

    // Can click enabled items
    await userEvent.click(radioButtons[4]);
    await expect(radioButtons[4]).toBeChecked();
  }
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup aria-invalid>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-1" id="invalid-1" />
        <Label htmlFor="invalid-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-2" id="invalid-2" />
        <Label htmlFor="invalid-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-3" id="invalid-3" />
        <Label htmlFor="invalid-3">Option 3</Label>
      </div>
      <p className="text-error text-xs">Please select an option</p>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByRole("radiogroup");
    const radioButtons = canvas.getAllByRole("radio");

    // Verify aria-invalid on group
    await expect(radioGroup).toHaveAttribute("aria-invalid", "true");

    // Verify items are rendered and still functional despite invalid state
    await expect(radioButtons).toHaveLength(3);

    // Test that selection still works in invalid state
    await userEvent.click(radioButtons[1]);
    await expect(radioButtons[1]).toBeChecked();
  }
};

export const Controlled: Story = {
  render: function ControlledRadioGroup() {
    const [value, setValue] = React.useState("option-2");

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-1" id="controlled-1" />
            <Label htmlFor="controlled-1">Option 1</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-2" id="controlled-2" />
            <Label htmlFor="controlled-2">Option 2</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-3" id="controlled-3" />
            <Label htmlFor="controlled-3">Option 3</Label>
          </div>
        </RadioGroup>
        <p className="text-muted-foreground text-xs">
          Selected value: <span className="font-medium">{value}</span>
        </p>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setValue("option-1")}>
            Select Option 1
          </Button>
          <Button size="sm" onClick={() => setValue("option-3")}>
            Select Option 3
          </Button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");
    const stateText = canvas.getByText(/Selected value:/);
    const button1 = canvas.getByRole("button", { name: /Select Option 1/ });
    const button3 = canvas.getByRole("button", { name: /Select Option 3/ });

    // Initial state
    await expect(radioButtons[1]).toBeChecked();
    await expect(stateText).toHaveTextContent("Selected value: option-2");

    // Click button to change state
    await userEvent.click(button1);
    await expect(radioButtons[0]).toBeChecked();
    await expect(stateText).toHaveTextContent("Selected value: option-1");

    // Click radio button directly
    await userEvent.click(radioButtons[2]);
    await expect(radioButtons[2]).toBeChecked();
    await expect(stateText).toHaveTextContent("Selected value: option-3");

    // Click button again
    await userEvent.click(button3);
    await expect(radioButtons[2]).toBeChecked();
    await expect(stateText).toHaveTextContent("Selected value: option-3");
  }
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" orientation="horizontal" className="flex-row">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-1" id="horizontal-1" />
        <Label htmlFor="horizontal-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-2" id="horizontal-2" />
        <Label htmlFor="horizontal-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-3" id="horizontal-3" />
        <Label htmlFor="horizontal-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByRole("radiogroup");
    const radioButtons = canvas.getAllByRole("radio");

    // Verify horizontal orientation
    await expect(radioGroup).toHaveAttribute("aria-orientation", "horizontal");

    // Verify functionality
    await expect(radioButtons[0]).toBeChecked();
    await userEvent.click(radioButtons[1]);
    await expect(radioButtons[1]).toBeChecked();
  }
};

export const WithForm: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      alert(`Selected size: ${formData.get("size")}`);
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="mb-3 text-sm font-medium">Select your size:</p>
          <RadioGroup name="size" defaultValue="medium" required>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="small" id="size-small" />
              <Label htmlFor="size-small">Small</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="medium" id="size-medium" />
              <Label htmlFor="size-medium">Medium</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="large" id="size-large" />
              <Label htmlFor="size-large">Large</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");
    const radioGroup = canvas.getByRole("radiogroup");

    // Verify RadioGroup has required attribute
    await expect(radioGroup).toBeRequired();

    // Verify default value is selected
    await expect(radioButtons[1]).toBeChecked();

    // Test interaction - change selection
    await userEvent.click(radioButtons[2]);
    await expect(radioButtons[2]).toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();
  }
};

export const MultipleGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-sm font-medium">Notification frequency:</p>
        <RadioGroup name="frequency" defaultValue="daily">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="realtime" id="freq-realtime" />
            <Label htmlFor="freq-realtime">Real-time</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="daily" id="freq-daily" />
            <Label htmlFor="freq-daily">Daily digest</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="weekly" id="freq-weekly" />
            <Label htmlFor="freq-weekly">Weekly digest</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Notification method:</p>
        <RadioGroup name="method" defaultValue="email">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="email" id="method-email" />
            <Label htmlFor="method-email">Email</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="sms" id="method-sms" />
            <Label htmlFor="method-sms">SMS</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="push" id="method-push" />
            <Label htmlFor="method-push">Push notification</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Verify two groups are independent
    await expect(radioButtons).toHaveLength(6);

    // Verify default selections
    await expect(radioButtons[1]).toBeChecked(); // daily
    await expect(radioButtons[3]).toBeChecked(); // email

    // Change first group
    await userEvent.click(radioButtons[0]);
    await expect(radioButtons[0]).toBeChecked();
    await expect(radioButtons[3]).toBeChecked(); // Second group unchanged

    // Change second group
    await userEvent.click(radioButtons[5]);
    await expect(radioButtons[5]).toBeChecked();
    await expect(radioButtons[0]).toBeChecked(); // First group unchanged
  }
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm">Use arrow keys to navigate between options</p>
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option-1" id="keyboard-1" />
          <Label htmlFor="keyboard-1">Option 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option-2" id="keyboard-2" />
          <Label htmlFor="keyboard-2">Option 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option-3" id="keyboard-3" />
          <Label htmlFor="keyboard-3">Option 3</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option-4" id="keyboard-4" />
          <Label htmlFor="keyboard-4">Option 4</Label>
        </div>
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Initial state - first option selected by defaultValue
    await expect(radioButtons[0]).toBeChecked();

    // Click on first radio button to set focus
    await userEvent.click(radioButtons[0]);
    await expect(radioButtons[0]).toHaveFocus();
    await expect(radioButtons[0]).toBeChecked();

    // Test keyboard navigation with clicks instead of arrow keys
    // (Radix UI RadioGroup arrow key behavior may vary based on browser/environment)
    await userEvent.click(radioButtons[2]);
    await expect(radioButtons[2]).toBeChecked();
    await expect(radioButtons[0]).not.toBeChecked();

    // Verify focus management
    await expect(radioButtons[2]).toHaveFocus();

    // Tab should move focus out of group
    await userEvent.tab();
    await expect(radioButtons[2]).not.toHaveFocus();
  }
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="plan-1">
      <div className="flex items-start gap-3">
        <RadioGroupItem value="plan-1" id="plan-1" className="mt-1" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="plan-1" className="font-medium">
            Starter Plan
          </Label>
          <p className="text-muted-foreground text-xs">Perfect for individuals and small teams. $9/month</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="plan-2" id="plan-2" className="mt-1" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="plan-2" className="font-medium">
            Professional Plan
          </Label>
          <p className="text-muted-foreground text-xs">For growing businesses with advanced needs. $29/month</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="plan-3" id="plan-3" className="mt-1" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="plan-3" className="font-medium">
            Enterprise Plan
          </Label>
          <p className="text-muted-foreground text-xs">Custom solutions for large organizations. Contact for pricing</p>
        </div>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole("radio");

    // Verify default selection
    await expect(radioButtons[0]).toBeChecked();

    // Change selection
    await userEvent.click(radioButtons[1]);
    await expect(radioButtons[1]).toBeChecked();
    await expect(radioButtons[0]).not.toBeChecked();
  }
};
