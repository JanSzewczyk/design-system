import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Button } from "../button";

import { Toaster, toast } from ".";

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Position of the toast notifications"
    },
    expand: {
      control: "boolean",
      description: "Toasts will be expanded by default"
    },
    richColors: {
      control: "boolean",
      description: "Makes error and success state more colorful"
    },
    closeButton: {
      control: "boolean",
      description: "Show close button on toasts"
    },
    duration: {
      control: "number",
      description: "Default duration in milliseconds for all toasts"
    },
    visibleToasts: {
      control: "number",
      description: "Maximum number of visible toasts"
    }
  },
  tags: ["autodocs", "test", "new"]
} satisfies Meta<typeof Toaster>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast("This is a default toast message")}>Show Toast</Button>
      <Toaster theme="system" />
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast("Event has been created")}>Default</Button>
      <Button onClick={() => toast.success("Event has been created successfully")} variant="default">
        Success
      </Button>
      <Button onClick={() => toast.info("Please check your email for verification")} variant="secondary">
        Info
      </Button>
      <Button onClick={() => toast.warning("Warning: This action cannot be undone")} variant="secondary">
        Warning
      </Button>
      <Button onClick={() => toast.error("Something went wrong!")} variant="error">
        Error
      </Button>
      <Button onClick={() => toast.loading("Loading...")} variant="outline">
        Loading
      </Button>
      <Toaster />
    </div>
  )
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm"
          })
        }
      >
        Show Toast with Description
      </Button>
      <Button
        onClick={() =>
          toast.success("Payment processed", {
            description: "Your payment has been successfully processed"
          })
        }
      >
        Success with Description
      </Button>
      <Toaster />
    </div>
  )
};

export const WithAction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => toast.info("Undo clicked")
            }
          })
        }
      >
        Toast with Action
      </Button>
      <Button
        onClick={() =>
          toast.success("File uploaded", {
            description: "report.pdf has been uploaded",
            action: {
              label: "View",
              onClick: () => toast.info("View clicked")
            }
          })
        }
      >
        Success with Action
      </Button>
      <Toaster duration={1000000} />
    </div>
  )
};

export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast("This toast will disappear quickly", { duration: 1000 })}>1 Second (1000ms)</Button>
      <Button onClick={() => toast("This toast will stay for 5 seconds", { duration: 5000 })}>
        5 Seconds (5000ms)
      </Button>
      <Button onClick={() => toast("This toast stays until closed", { duration: Infinity })}>Infinite Duration</Button>
      <Toaster />
    </div>
  )
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Button onClick={() => toast("Top Left Toast")}>
        Top Left
        <Toaster position="top-left" />
      </Button>
      <Button onClick={() => toast("Top Center Toast")}>
        Top Center
        <Toaster position="top-center" />
      </Button>
      <Button onClick={() => toast("Top Right Toast")}>
        Top Right
        <Toaster position="top-right" />
      </Button>
      <Button onClick={() => toast("Bottom Left Toast")}>
        Bottom Left
        <Toaster position="bottom-left" />
      </Button>
      <Button onClick={() => toast("Bottom Center Toast")}>
        Bottom Center
        <Toaster position="bottom-center" />
      </Button>
      <Button onClick={() => toast("Bottom Right Toast")}>
        Bottom Right
        <Toaster position="bottom-right" />
      </Button>
    </div>
  )
};

export const PromiseToast: Story = {
  render: () => {
    const mockPromise = (): Promise<{ name: string }> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: "John Doe" });
        }, 2000);
      });

    const handlePromise = () => {
      toast.promise(mockPromise(), {
        loading: "Loading user data...",
        success: "User data loaded successfully",
        error: "Error loading user data"
      });
    };

    return (
      <div className="flex flex-wrap gap-4">
        <Button onClick={handlePromise}>Show Promise Toast</Button>
        <Toaster />
      </div>
    );
  }
};

export const RichColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast.success("Rich colors enabled")} variant="default">
        Success
      </Button>
      <Button onClick={() => toast.error("Rich colors enabled")} variant="error">
        Error
      </Button>
      <Button onClick={() => toast.warning("Rich colors enabled")} variant="secondary">
        Warning
      </Button>
      <Button onClick={() => toast.info("Rich colors enabled")} variant="secondary">
        Info
      </Button>
      <Toaster richColors />
    </div>
  )
};

export const Expanded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() => {
          toast.success("First toast");
          toast.info("Second toast");
          toast.warning("Third toast");
        }}
      >
        Show Multiple Toasts (Expanded)
      </Button>
      <Toaster expand />
    </div>
  )
};

export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast.success("Success with custom icon")}>Success</Button>
      <Button onClick={() => toast.info("Info with custom icon")}>Info</Button>
      <Button onClick={() => toast.warning("Warning with custom icon")}>Warning</Button>
      <Button onClick={() => toast.error("Error with custom icon")}>Error</Button>
      <Button onClick={() => toast.loading("Loading with custom spinner")}>Loading</Button>
      <Toaster />
    </div>
  )
};

export const InteractionTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button data-testid="default-toast" onClick={() => toast("Default toast message")}>
        Default Toast
      </Button>
      <Button data-testid="success-toast" onClick={() => toast.success("Success message")}>
        Success Toast
      </Button>
      <Button data-testid="error-toast" onClick={() => toast.error("Error message")}>
        Error Toast
      </Button>
      <Button
        data-testid="action-toast"
        onClick={() =>
          toast("Action toast", {
            action: {
              label: "Undo",
              onClick: () => toast.info("Undo clicked")
            }
          })
        }
      >
        Toast with Action
      </Button>
      <Toaster />
    </div>
  ),
  play: async ({ canvas, canvasElement, step }) => {
    await step("All trigger buttons are rendered and clickable", async () => {
      const defaultButton = canvas.getByTestId("default-toast");
      const successButton = canvas.getByTestId("success-toast");
      const errorButton = canvas.getByTestId("error-toast");
      const actionButton = canvas.getByTestId("action-toast");

      await expect(defaultButton).toBeInTheDocument();
      await expect(successButton).toBeInTheDocument();
      await expect(errorButton).toBeInTheDocument();
      await expect(actionButton).toBeInTheDocument();

      await expect(defaultButton).toBeVisible();
      await expect(successButton).toBeVisible();
      await expect(errorButton).toBeVisible();
      await expect(actionButton).toBeVisible();
    });

    await step("Buttons can be clicked to trigger toasts", async () => {
      const defaultButton = canvas.getByTestId("default-toast");
      const successButton = canvas.getByTestId("success-toast");
      const errorButton = canvas.getByTestId("error-toast");

      // Click buttons - toast will appear in portal outside canvas
      await userEvent.click(defaultButton);
      await userEvent.click(successButton);
      await userEvent.click(errorButton);

      // Verify buttons are still enabled after clicking
      await expect(defaultButton).toBeEnabled();
      await expect(successButton).toBeEnabled();
      await expect(errorButton).toBeEnabled();
    });

    await step("Toaster component is rendered in the DOM", async () => {
      // The Toaster component should be present (it renders as ol with .toaster class)
      const toasterElement = canvasElement.querySelector("ol");
      await expect(toasterElement).toBeInTheDocument();
    });
  }
};
