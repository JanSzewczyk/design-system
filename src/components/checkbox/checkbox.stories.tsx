import * as React from "react";

import { expect, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { Button } from "~/components";
import { Checkbox } from ".";

const meta = preview.meta({
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of checkbox"
    },
    defaultChecked: {
      control: "boolean",
      description: "The initial checked state when uncontrolled"
    },
    disabled: {
      control: "boolean",
      description: "When true, prevents interaction with checkbox"
    },
    name: {
      control: "text",
      description: "The name of checkbox (used in form submission)"
    },
    required: {
      control: "boolean",
      description: "When true, indicates that user must check checkbox before submitting"
    }
  },
  component: Checkbox,
  tags: ["autodocs", "new"],
  title: "Components/Checkbox"
});

export const Default = meta.story({
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");

    // Verify initial unchecked state
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");

    // Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "checked");

    // Click to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox name="asd asd as dasd" required />
      <label className="cursor-pointer text-sm" htmlFor="terms">
        Accept terms and conditions
      </label>
    </div>
  )
});

export const Checked = meta.story({
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox");

    // Verify initially checked
    await expect(checkbox).toHaveAttribute("data-state", "checked");
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked id="checked" />
      <label className="cursor-pointer text-sm" htmlFor="checked">
        Already checked
      </label>
    </div>
  )
});

export const Disabled = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");

    // Verify both checkboxes are disabled
    await expect(checkboxes[0]).toBeDisabled();
    await expect(checkboxes[1]).toBeDisabled();

    // Verify unchecked state for first checkbox
    await expect(checkboxes[0]).toHaveAttribute("data-state", "unchecked");

    // Verify checked state for second checkbox
    await expect(checkboxes[1]).toHaveAttribute("data-state", "checked");
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox disabled id="disabled-unchecked" />
        <label className="cursor-not-allowed text-sm opacity-50" htmlFor="disabled-unchecked">
          Disabled (unchecked)
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked disabled id="disabled-checked" />
        <label className="cursor-not-allowed text-sm opacity-50" htmlFor="disabled-checked">
          Disabled (checked)
        </label>
      </div>
    </div>
  )
});

export const Invalid = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify aria-invalid attribute is present
    await expect(checkbox).toHaveAttribute("aria-invalid", "true");
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox aria-invalid id="invalid" />
      <label className="cursor-pointer text-sm" htmlFor="invalid">
        This field is required
      </label>
    </div>
  )
});

export const Controlled = meta.story({
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    const stateText = canvas.getByText(/State:/);

    // Initial state
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");
    await expect(stateText).toHaveTextContent("State: Unchecked");

    // Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "checked");
    await expect(stateText).toHaveTextContent("State: Checked");

    // Click to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");
    await expect(stateText).toHaveTextContent("State: Unchecked");
  },
  render: function ControlledCheckbox() {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={checked} id="controlled" onCheckedChange={(value) => setChecked(!!value)} />
          <label className="cursor-pointer text-sm" htmlFor="controlled">
            Controlled checkbox
          </label>
        </div>
        <p className="text-muted-foreground text-xs">
          State: <span className="font-medium">{checked ? "Checked" : "Unchecked"}</span>
        </p>
      </div>
    );
  }
});

export const WithForm = meta.story({
  play: async ({ canvas }) => {
    // Verify form attributes
    await expect(canvas.getByRole("checkbox", { name: /Subscribe to newsletter/ })).toBeVisible();

    await expect(canvas.getByRole("checkbox", { name: /I agree to terms and conditions */ })).toBeVisible();
    await expect(canvas.getByRole("checkbox", { name: /I agree to terms and conditions */ })).toBeRequired();
  },
  render: () => (
    <form className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" name="newsletter" value="subscribed" />
        <label className="cursor-pointer text-sm" htmlFor="newsletter">
          Subscribe to newsletter
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms-form" name="terms" required />
        <label className="cursor-pointer text-sm" htmlFor="terms-form">
          I agree to terms and conditions <span className="text-error">*</span>
        </label>
      </div>
      <Button fullWidth type="submit">
        Submit
      </Button>
    </form>
  )
});

export const MultipleCheckboxes = meta.story({
  play: async ({ canvas, userEvent }) => {
    const checkboxes = canvas.getAllByRole("checkbox");

    // Verify all checkboxes are rendered
    await expect(checkboxes).toHaveLength(5);

    // Select first and third checkbox
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[2]);

    await expect(checkboxes[0]).toHaveAttribute("data-state", "checked");
    await expect(checkboxes[1]).toHaveAttribute("data-state", "unchecked");
    await expect(checkboxes[2]).toHaveAttribute("data-state", "checked");
    await expect(checkboxes[3]).toHaveAttribute("data-state", "unchecked");
    await expect(checkboxes[4]).toHaveAttribute("data-state", "unchecked");
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-sm">Select your interests:</p>
      <div className="flex flex-col gap-2">
        {["Technology", "Design", "Science", "Sports", "Music"].map((interest) => (
          <div className="flex items-center gap-2" key={interest}>
            <Checkbox id={interest.toLowerCase()} name="interests" value={interest.toLowerCase()} />
            <label className="cursor-pointer text-sm" htmlFor={interest.toLowerCase()}>
              {interest}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
});

export const Indeterminate = meta.story({
  play: async ({ canvas, userEvent }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    const selectAllCheckbox = checkboxes[0];

    // Initial state: one item checked, so indeterminate
    await expect(selectAllCheckbox).toHaveAttribute("data-state", "indeterminate");

    // Select all items individually
    // await userEvent.click(checśkboxes[1]); // Check item-2
    await userEvent.click(checkboxes[2]); // Check item-3
    await userEvent.click(checkboxes[3]); // Check item-3

    // Now all should be checked
    await expect(selectAllCheckbox).toHaveAttribute("data-state", "checked");

    // Click select all to uncheck everything
    await userEvent.click(selectAllCheckbox);
    await expect(selectAllCheckbox).toHaveAttribute("data-state", "unchecked");
    await expect(checkboxes[1]).toHaveAttribute("data-state", "unchecked");
    await expect(checkboxes[2]).toHaveAttribute("data-state", "unchecked");
    await expect(checkboxes[3]).toHaveAttribute("data-state", "unchecked");
  },
  render: function IndeterminateCheckbox() {
    const [selectedItems, setSelectedItems] = React.useState<string[]>(["item-1"]);

    const allItems = ["item-1", "item-2", "item-3"];
    const allChecked = selectedItems.length === allItems.length;
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < allItems.length;

    const handleSelectAll = (checked: boolean) => {
      setSelectedItems(checked ? allItems : []);
    };

    const handleSelectItem = (item: string, checked: boolean) => {
      setSelectedItems((prev) => (checked ? [...prev, item] : prev.filter((i) => i !== item)));
    };

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b pb-2">
          <Checkbox
            checked={isIndeterminate ? "indeterminate" : allChecked}
            id="select-all"
            onCheckedChange={handleSelectAll}
          />
          <label className="cursor-pointer font-medium text-sm" htmlFor="select-all">
            Select All
          </label>
        </div>
        <div className="flex flex-col gap-2 pl-6">
          {allItems.map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <Checkbox
                checked={selectedItems.includes(item)}
                id={item}
                onCheckedChange={(checked) => handleSelectItem(item, checked === true || checked === "indeterminate")}
              />
              <label className="cursor-pointer text-sm" htmlFor={item}>
                {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
});

export const KeyboardNavigation = meta.story({
  play: async ({ canvas, userEvent }) => {
    const checkboxes = canvas.getAllByRole("checkbox");

    // Focus first checkbox
    checkboxes[0].focus();
    await expect(checkboxes[0]).toHaveFocus();

    // Toggle with Space key
    await userEvent.keyboard(" ");
    await expect(checkboxes[0]).toHaveAttribute("data-state", "checked");

    // Toggle again with Space key
    await userEvent.keyboard(" ");
    await expect(checkboxes[0]).toHaveAttribute("data-state", "unchecked");

    // Tab to next checkbox
    await userEvent.tab();
    await expect(checkboxes[1]).toHaveFocus();

    // Check with Space
    await userEvent.keyboard(" ");
    await expect(checkboxes[1]).toHaveAttribute("data-state", "checked");
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="keyboard-1" />
        <label className="cursor-pointer text-sm" htmlFor="keyboard-1">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="keyboard-2" />
        <label className="cursor-pointer text-sm" htmlFor="keyboard-2">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="keyboard-3" />
        <label className="cursor-pointer text-sm" htmlFor="keyboard-3">
          Option 3
        </label>
      </div>
    </div>
  )
});
