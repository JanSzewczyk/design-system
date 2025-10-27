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
  tags: ["autodocs"]
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

    await step("Trigger button is rendered", async () => {
      const triggerButton = canvas.getByRole("button", { name: "Open Dialog" });
      await expect(triggerButton).toBeInTheDocument();
      await expect(triggerButton).toBeVisible();
    });

    await step("Dialog is initially closed", async () => {
      await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
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
  )
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

export const CloseDialogWithEscapeKey: Story = {
  tags: ["test-only", "interaction"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open Dialog</button>
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

    // Close dialog with escape key
    await userEvent.keyboard("{Escape}");

    // Wait for dialog to disappear
    await waitFor(async () => {
      const dialog = canvas.queryByRole("dialog");
      await expect(dialog).not.toBeVisible();
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

    // Test accessibility attributes
    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");

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
