import * as React from "react";

import { AlertCircleIcon, InfoIcon, RocketIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Alert, AlertDescription, AlertTitle } from "./index";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs", "new"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "The visual style variant of the alert",
      table: {
        defaultValue: { summary: "default" }
      }
    }
  }
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  )
};

export const Default: Story = {
  args: {
    children: (
      <>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </>
    )
  }
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </>
    )
  }
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert without an icon.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert without an icon.</AlertDescription>
      </Alert>
    </div>
  )
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational message for the user.</AlertDescription>
      </Alert>
      <Alert>
        <RocketIcon />
        <AlertTitle>New Feature</AlertTitle>
        <AlertDescription>Check out our latest feature release!</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please review your input before proceeding.</AlertDescription>
      </Alert>
    </div>
  )
};

export const TitleOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <TerminalIcon />
        <AlertTitle>Quick tip: Use keyboard shortcuts for faster navigation</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Connection lost. Attempting to reconnect...</AlertTitle>
      </Alert>
    </div>
  )
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <InfoIcon />
        <AlertDescription>
          Your changes have been saved automatically. You can continue editing or close this page.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertDescription>
          Failed to save your changes. Please check your network connection and try again.
        </AlertDescription>
      </Alert>
    </div>
  )
};

export const LongContent: Story = {
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>Important System Update</AlertTitle>
      <AlertDescription>
        <p>
          We have made significant improvements to our platform that will enhance your experience. These changes include
          performance optimizations, new features, and bug fixes.
        </p>
        <p>
          Please note that some features may look or behave differently after the update. We recommend reviewing our
          documentation for detailed information about all the changes.
        </p>
      </AlertDescription>
    </Alert>
  )
};

export const DataAttributes: Story = {
  render: () => (
    <Alert>
      <TerminalIcon />
      <AlertTitle>Check data-slot attributes</AlertTitle>
      <AlertDescription>Each component has a data-slot attribute for styling and testing.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvas, step }) => {
    await step("Alert has correct data-slot attribute", async () => {
      const alert = canvas.getByRole("alert");
      await expect(alert).toHaveAttribute("data-slot", "alert");
    });

    await step("AlertTitle has correct data-slot attribute", async () => {
      const title = canvas.getByText("Check data-slot attributes");
      await expect(title).toHaveAttribute("data-slot", "alert-title");
    });

    await step("AlertDescription has correct data-slot attribute", async () => {
      const description = canvas.getByText(/Each component has a data-slot/);
      await expect(description).toHaveAttribute("data-slot", "alert-description");
    });
  }
};

export const InteractionTest: Story = {
  tags: ["test"],
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <TerminalIcon />
        <AlertTitle>Default Alert Title</AlertTitle>
        <AlertDescription>Default alert description text.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Destructive Alert Title</AlertTitle>
        <AlertDescription>Destructive alert description text.</AlertDescription>
      </Alert>
    </div>
  ),
  play: async ({ canvas, step }) => {
    await step("Both alert variants are rendered with correct role", async () => {
      const alerts = canvas.getAllByRole("alert");
      await expect(alerts).toHaveLength(2);

      for (const alert of alerts) {
        await expect(alert).toHaveAttribute("data-slot", "alert");
      }
    });

    await step("Default alert is visible with correct content", async () => {
      const defaultTitle = canvas.getByText("Default Alert Title");
      const defaultDescription = canvas.getByText("Default alert description text.");

      await expect(defaultTitle).toBeVisible();
      await expect(defaultDescription).toBeVisible();
    });

    await step("Destructive alert is visible with correct content", async () => {
      const destructiveTitle = canvas.getByText("Destructive Alert Title");
      const destructiveDescription = canvas.getByText("Destructive alert description text.");

      await expect(destructiveTitle).toBeVisible();
      await expect(destructiveDescription).toBeVisible();
    });
  }
};
