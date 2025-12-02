import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { userEvent, waitFor, within, expect } from "storybook/test";
import { Input, Label } from "~/components";

import { Button } from "../button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from ".";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog component built on Radix UI primitives. Provides a modal dialog overlay that can contain any content. Supports multiple width variants, controlled/uncontrolled modes, nested dialogs, and proper focus management."
      }
    }
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of the dialog. Must be used with `onOpenChange`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" }
      }
    },
    defaultOpen: {
      control: "boolean",
      description: "The open state of the dialog when it is initially rendered. Use when not controlling state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    onOpenChange: {
      description: "Event handler called when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" }
      }
    },
    modal: {
      control: "boolean",
      description: "When true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" }
      }
    }
  }
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

const BasicDialogContent = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>This is a description of what this dialog is for.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>This is the main content of the dialog.</p>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button color="neutral">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
);

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <BasicDialogContent />
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Trigger button is rendered with data-slot", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await expect(triggerButton).toBeInTheDocument();
      await expect(triggerButton).toBeVisible();
      await expect(triggerButton).toHaveAttribute("data-slot", "dialog-trigger");
    });

    await step("Dialog is initially closed", async () => {
      await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await step("Open and verify dialog structure", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await userEvent.click(triggerButton);

      await waitFor(async () => {
        const dialog = canvas.getByRole("dialog");
        await expect(dialog).toBeVisible();
      });

      // Verify all data-slot attributes are present
      await expect(document.querySelector('[data-slot="dialog-overlay"]')).toBeInTheDocument();
      await expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
      await expect(document.querySelector('[data-slot="dialog-header"]')).toBeInTheDocument();
      await expect(document.querySelector('[data-slot="dialog-title"]')).toBeInTheDocument();
      await expect(document.querySelector('[data-slot="dialog-description"]')).toBeInTheDocument();
      await expect(document.querySelector('[data-slot="dialog-footer"]')).toBeInTheDocument();
    });

    await step("Close dialog with Cancel button", async () => {
      const cancelButton = canvas.getByRole("button", { name: "Cancel" });
      await userEvent.click(cancelButton);

      await waitFor(async () => {
        await expect(canvas.queryByRole("dialog")).not.toBeVisible();
      });
    });
  }
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog without X Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No X Button Dialog</DialogTitle>
          <DialogDescription>
            This dialog does not have a close button in the top-right corner.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>You can close this dialog using:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>The Cancel button below</li>
            <li>The Escape key</li>
            <li>Clicking outside the dialog</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="neutral">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Open dialog", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog without X Button" });
      await userEvent.click(triggerButton);
      await waitFor(async () => {
        await expect(canvas.getByRole("dialog")).toBeVisible();
      });
    });

    await step("Verify X close button is NOT present", async () => {
      // Check that there is no button with sr-only text "Close"
      const buttons = document.querySelectorAll('button');
      let xButton: HTMLElement | null = null;

      buttons.forEach(button => {
        const srOnly = button.querySelector('.sr-only');
        if (srOnly?.textContent === 'Close') {
          xButton = button;
        }
      });

      await expect(xButton).toBeNull();
    });

    await step("Verify other close options work", async () => {
      // Verify Cancel button is present
      const cancelButton = canvas.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      // Close with Cancel button
      await userEvent.click(cancelButton);
      await waitFor(async () => {
        await expect(canvas.queryByRole("dialog")).not.toBeVisible();
      });
    });
  }
};

export const WithCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog with Close Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Dialog with Close Button</DialogTitle>
          <DialogDescription>
            This dialog displays a close button (X) in the top-right corner for additional closing control.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>You can close this dialog using:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>The X button in the top-right corner</li>
            <li>The Cancel button below</li>
            <li>The Escape key</li>
            <li>Clicking outside the dialog</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="neutral">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Open dialog", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog with Close Button" });
      await userEvent.click(triggerButton);
      await waitFor(async () => {
        await expect(canvas.getByRole("dialog")).toBeVisible();
      });
    });

    await step("Verify close button is visible", async () => {
      // The close button contains an X icon and sr-only text
      const closeButtons = canvas.getAllByRole("button");
      const closeButton = closeButtons.find(btn => btn.querySelector('[class*="sr-only"]')?.textContent === 'Close');
      await expect(closeButton).toBeVisible();
    });

    await step("Close with X button", async () => {
      // Find the X close button by looking for the button with sr-only text "Close"
      const buttons = document.querySelectorAll('button');
      let xButton: HTMLElement | null = null;

      buttons.forEach(button => {
        const srOnly = button.querySelector('.sr-only');
        if (srOnly?.textContent === 'Close') {
          xButton = button;
        }
      });

      await expect(xButton).not.toBeNull();
      if (xButton) {
        await userEvent.click(xButton);
        await waitFor(async () => {
          await expect(canvas.queryByRole("dialog")).not.toBeVisible();
        });
      }
    });
  }
};

const DIALOGS_WIDTHS = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"] as const;
export const Width: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2">
      {DIALOGS_WIDTHS.map((width) => (
        <Dialog key={width}>
          <DialogTrigger asChild>
            <Button color="neutral">{width}</Button>
          </DialogTrigger>
          <DialogContent width={width}>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>This is a description of what this dialog is for.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>This is the main content of the dialog.</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button color="neutral">Cancel</Button>
              </DialogClose>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    for (const width of DIALOGS_WIDTHS) {
      await step(`Test ${width} width variant`, async () => {
        const triggerButton = canvas.getByRole("button", { name: width });
        await userEvent.click(triggerButton);

        await waitFor(async () => {
          const dialog = canvas.getByRole("dialog");
          await expect(dialog).toBeVisible();
        });

        // Verify the width class is applied
        const content = document.querySelector('[data-slot="dialog-content"]');
        await expect(content).toBeInTheDocument();
        await expect(content?.className).toContain(`w-${width}`);

        // Close the dialog
        const cancelButton = canvas.getByRole("button", { name: "Cancel" });
        await userEvent.click(cancelButton);

        await waitFor(async () => {
          await expect(canvas.queryByRole("dialog")).not.toBeVisible();
        });
      });
    }
  }
};

export const OpenDialog: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <BasicDialogContent />
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeInTheDocument();
      await expect(dialog).toBeVisible();
    });

    // Test dialog content
    const dialogTitle = canvas.getByRole("heading", { name: "Dialog Title" });
    await expect(dialogTitle).toBeVisible();

    const dialogDescription = canvas.getByText("This is a description of what this dialog is for.");
    await expect(dialogDescription).toBeVisible();

    const mainContent = canvas.getByText("This is the main content of the dialog.");
    await expect(mainContent).toBeVisible();
  }
};

export const DialogWithFooterButtons: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <BasicDialogContent />
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeVisible();
    });

    // Test footer buttons
    await expect(canvas.getByRole("button", { name: "Cancel" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Confirm" })).toBeVisible();
  }
};

export const CloseDialogWithCancelButton: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <BasicDialogContent />
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeVisible();
    });

    // Close dialog with cancel button
    const cancelButton = canvas.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);

    // Wait for dialog to disappear
    await waitFor(async () => {
      const dialog = canvas.queryByRole("dialog");
      await expect(dialog).not.toBeVisible();
    });
  }
};

export const CloseDialogWithOverlayClick: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Click Outside Test</DialogTitle>
          <DialogDescription>Click outside the dialog to close it</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This dialog can be closed by clicking the overlay.</p>
        </div>
        <DialogFooter>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Open the dialog", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await userEvent.click(triggerButton);

      await waitFor(async () => {
        const dialog = canvas.getByRole("dialog");
        await expect(dialog).toBeVisible();
      });
    });

    await step("Verify overlay is present", async () => {
      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      await expect(overlay).toBeInTheDocument();
      await expect(overlay).toBeVisible();
    });

    await step("Close dialog by clicking overlay", async () => {
      const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      if (overlay) {
        await userEvent.click(overlay);

        await waitFor(async () => {
          const dialog = canvas.queryByRole("dialog");
          await expect(dialog).not.toBeVisible();
        });
      }
    });
  }
};

export const CloseDialogWithEscapeKey: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <BasicDialogContent />
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Open the dialog", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await userEvent.click(triggerButton);

      await waitFor(async () => {
        const dialog = canvas.getByRole("dialog");
        await expect(dialog).toBeVisible();
      });
    });

    await step("Verify dialog content is visible", async () => {
      await expect(canvas.getByRole("heading", { name: "Dialog Title" })).toBeVisible();
      await expect(canvas.getByText("This is a description of what this dialog is for.")).toBeVisible();
    });

    await step("Close dialog with escape key", async () => {
      await userEvent.keyboard("{Escape}");

      await waitFor(async () => {
        const dialog = canvas.queryByRole("dialog");
        await expect(dialog).not.toBeVisible();
      });
    });

    await step("Verify trigger button is still accessible", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await expect(triggerButton).toBeVisible();
      await expect(triggerButton).toBeEnabled();
    });
  }
};

export const DialogFocusManagement: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Input before dialog" />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Focus Test Dialog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input placeholder="First input in dialog" />
            <Input placeholder="Second input in dialog" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" color="neutral">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Input placeholder="Input after dialog" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Focus should initially be manageable outside dialog
    const inputBefore = canvas.getByPlaceholderText("Input before dialog");
    await userEvent.click(inputBefore);
    await expect(inputBefore).toHaveFocus();

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      await expect(canvas.getByRole("dialog")).toBeVisible();
    });

    // Focus should be trapped within dialog
    // Tab through dialog elements
    await expect(canvas.getByPlaceholderText("First input in dialog")).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByPlaceholderText("Second input in dialog")).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Close" })).toHaveFocus();
  }
};

export const ControlledDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>This dialog is controlled by external state.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>Dialog is {open ? "open" : "closed"}</p>
            </div>
            <DialogFooter>
              <Button color="neutral" onClick={() => setOpen(false)}>
                Close Programmatically
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Test controlled opening
    const openButton = canvas.getByRole("button", { name: "Open Controlled Dialog" });
    await userEvent.click(openButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeVisible();
    });

    // Test programmatic closing
    const closeButton = canvas.getByRole("button", { name: "Close Programmatically" });
    await userEvent.click(closeButton);

    // Wait for dialog to disappear
    await waitFor(async () => {
      const dialog = canvas.queryByRole("dialog");
      await expect(dialog).not.toBeVisible();
    });
  }
};

export const DialogWithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Form Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>Please fill out the form below.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" color="neutral">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Form Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      await expect(canvas.getByRole("dialog")).toBeVisible();
    });

    // Test form interaction
    const nameInput = canvas.getByLabelText("Name");
    const emailInput = canvas.getByLabelText("Email");

    await userEvent.type(nameInput, "John Doe");
    await expect(nameInput).toHaveValue("John Doe");

    await userEvent.type(emailInput, "john@example.com");
    await expect(emailInput).toHaveValue("john@example.com");

    // Test form buttons
    const cancelButton = canvas.getByRole("button", { name: "Cancel" });
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    await expect(cancelButton).toBeVisible();
    await expect(submitButton).toBeVisible();
  }
};

export const DataSlotAttributes: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Data Slot Test</DialogTitle>
          <DialogDescription>Testing data-slot attributes</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>All dialog components should have appropriate data-slot attributes.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Verify trigger has data-slot", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await expect(triggerButton).toHaveAttribute("data-slot", "dialog-trigger");
    });

    await step("Open dialog and verify data-slot attributes", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await userEvent.click(triggerButton);

      await waitFor(async () => {
        await expect(canvas.getByRole("dialog")).toBeVisible();
      });

      // Check overlay data-slot
      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      await expect(overlay).toBeInTheDocument();

      // Check content data-slot
      const content = document.querySelector('[data-slot="dialog-content"]');
      await expect(content).toBeInTheDocument();

      // Check header data-slot
      const header = document.querySelector('[data-slot="dialog-header"]');
      await expect(header).toBeInTheDocument();

      // Check title data-slot
      const title = document.querySelector('[data-slot="dialog-title"]');
      await expect(title).toBeInTheDocument();

      // Check description data-slot
      const description = document.querySelector('[data-slot="dialog-description"]');
      await expect(description).toBeInTheDocument();

      // Check footer data-slot
      const footer = document.querySelector('[data-slot="dialog-footer"]');
      await expect(footer).toBeInTheDocument();

      // Check close button data-slot (both the X and the Close button)
      const closeButtons = document.querySelectorAll('[data-slot="dialog-close"]');
      await expect(closeButtons.length).toBeGreaterThanOrEqual(2); // X button and Close button
    });
  }
};

export const AccessibilityTest: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Accessible Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accessibility Test</DialogTitle>
          <DialogDescription>Testing dialog accessibility features.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This dialog should be properly accessible.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  tags: ["test-only", "interaction"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    // Open the dialog
    const triggerButton = canvas.getByRole("button", { name: "Open Accessible Dialog" });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeVisible();
    });

    // Test that title is properly associated
    const title = canvas.getByRole("heading", { name: "Accessibility Test" });
    await expect(title).toBeVisible();

    // Test that description is accessible
    const description = canvas.getByText("Testing dialog accessibility features.");
    await expect(description).toBeVisible();
  }
};

export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Parent Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parent Dialog</DialogTitle>
          <DialogDescription>This is the parent dialog.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Child Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Child Dialog</DialogTitle>
                <DialogDescription>This is a nested dialog.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Nested dialog content.</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">Close Child</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close Parent</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  tags: ["test-only", "interaction"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);

    await step("Open parent dialog", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open Parent Dialog" }));

      await waitFor(async () => {
        await expect(canvas.getByRole("dialog")).toBeVisible();
      });
    });

    await step("Open child dialog", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open Child Dialog" }));

      // Wait for child dialog to appear
      await waitFor(async () => {
        await expect(canvas.getByRole("heading", { name: "Child Dialog" })).toBeVisible();
      });
    });

    await step("Parent dialog should still be open after close child dialog", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Close Child" }));

      await waitFor(async () => {
        await expect(canvas.getByRole("heading", { name: "Parent Dialog" })).toBeVisible();
      });
    });
  }
};
