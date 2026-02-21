import * as React from "react";

import { expect } from "storybook/test";

import { Status, StatusIndicator, StatusLabel } from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Status",
  component: Status,
  subcomponents: { StatusIndicator, StatusLabel },
  tags: ["autodocs", "new"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning", "primary"],
      description: "Visual style variant of status badge",
      table: {
        defaultValue: { summary: "default" }
      }
    },
    asChild: {
      control: "boolean",
      description: "Merge props onto child element instead of rendering a div",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
});

export const Default = meta.story({
  render: (args) => (
    <Status {...args}>
      <StatusIndicator />
      <StatusLabel>Default</StatusLabel>
    </Status>
  ),
  args: {
    variant: "default"
  },
  play: async ({ canvas }) => {
    const status = canvas.getByText("Default").closest('[data-slot="status"]');
    await expect(status).toBeVisible();
    await expect(status).toHaveAttribute("data-slot", "status");
    await expect(status).toHaveAttribute("data-variant", "default");
  }
});

export const AllVariants = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Status variant="default">
        <StatusIndicator />
        <StatusLabel>Default</StatusLabel>
      </Status>
      <Status variant="success">
        <StatusIndicator />
        <StatusLabel>Success</StatusLabel>
      </Status>
      <Status variant="error">
        <StatusIndicator />
        <StatusLabel>Error</StatusLabel>
      </Status>
      <Status variant="warning">
        <StatusIndicator />
        <StatusLabel>Warning</StatusLabel>
      </Status>
      <Status variant="primary">
        <StatusIndicator />
        <StatusLabel>Primary</StatusLabel>
      </Status>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Default")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
    await expect(canvas.getByText("Error")).toBeVisible();
    await expect(canvas.getByText("Warning")).toBeVisible();
    await expect(canvas.getByText("Primary")).toBeVisible();
  }
});

export const Success = meta.story({
  render: () => (
    <Status variant="success">
      <StatusIndicator />
      <StatusLabel>Online</StatusLabel>
    </Status>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByText("Online").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "success");
  }
});

export const Error = meta.story({
  render: () => (
    <Status variant="error">
      <StatusIndicator />
      <StatusLabel>Offline</StatusLabel>
    </Status>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByText("Offline").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "error");
  }
});

export const Warning = meta.story({
  render: () => (
    <Status variant="warning">
      <StatusIndicator />
      <StatusLabel>Pending</StatusLabel>
    </Status>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByText("Pending").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "warning");
  }
});

export const Primary = meta.story({
  render: () => (
    <Status variant="primary">
      <StatusIndicator />
      <StatusLabel>Active</StatusLabel>
    </Status>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByText("Active").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "primary");
  }
});

export const WithoutIndicator = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Status variant="default">
        <StatusLabel>Default</StatusLabel>
      </Status>
      <Status variant="success">
        <StatusLabel>Completed</StatusLabel>
      </Status>
      <Status variant="error">
        <StatusLabel>Failed</StatusLabel>
      </Status>
      <Status variant="warning">
        <StatusLabel>In Progress</StatusLabel>
      </Status>
      <Status variant="primary">
        <StatusLabel>New</StatusLabel>
      </Status>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Completed")).toBeVisible();
    await expect(canvas.getByText("Failed")).toBeVisible();
    await expect(canvas.getByText("In Progress")).toBeVisible();
  }
});

export const IndicatorOnly = meta.story({
  render: () => (
    <div className="flex items-center gap-4">
      <Status variant="default">
        <StatusIndicator />
      </Status>
      <Status variant="success">
        <StatusIndicator />
      </Status>
      <Status variant="error">
        <StatusIndicator />
      </Status>
      <Status variant="warning">
        <StatusIndicator />
      </Status>
      <Status variant="primary">
        <StatusIndicator />
      </Status>
    </div>
  ),
  play: async ({ canvas }) => {
    const indicators = canvas.getAllByRole("generic").filter((el) => el.getAttribute("data-slot") === "status");
    await expect(indicators).toHaveLength(5);
  }
});

export const UserStatus = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary flex size-10 items-center justify-center rounded-full text-sm font-medium text-white">
          JD
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-100">John Doe</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Online</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
          AS
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-100">Alice Smith</span>
          <Status variant="warning">
            <StatusIndicator />
            <StatusLabel>Away</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-500 text-sm font-medium text-white">
          BW
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-100">Bob Wilson</span>
          <Status variant="error">
            <StatusIndicator />
            <StatusLabel>Offline</StatusLabel>
          </Status>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("John Doe")).toBeVisible();
    await expect(canvas.getByText("Online")).toBeVisible();
    await expect(canvas.getByText("Away")).toBeVisible();
    await expect(canvas.getByText("Offline")).toBeVisible();
  }
});

export const ServiceHealth = meta.story({
  render: () => (
    <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-100">Service Health</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">API Server</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Operational</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Database</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Operational</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">CDN</span>
          <Status variant="warning">
            <StatusIndicator />
            <StatusLabel>Degraded</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Email Service</span>
          <Status variant="error">
            <StatusIndicator />
            <StatusLabel>Outage</StatusLabel>
          </Status>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Service Health")).toBeVisible();
    await expect(canvas.getByText("API Server")).toBeVisible();
    await expect(canvas.getAllByText("Operational")).toHaveLength(2);
    await expect(canvas.getByText("Degraded")).toBeVisible();
    await expect(canvas.getByText("Outage")).toBeVisible();
  }
});

export const OrderStatus = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-100">Order #12345</span>
          <span className="text-xs text-gray-400">Placed on Jan 15, 2024</span>
        </div>
        <Status variant="success">
          <StatusLabel>Delivered</StatusLabel>
        </Status>
      </div>
      <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-100">Order #12346</span>
          <span className="text-xs text-gray-400">Placed on Jan 18, 2024</span>
        </div>
        <Status variant="primary">
          <StatusIndicator />
          <StatusLabel>In Transit</StatusLabel>
        </Status>
      </div>
      <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-100">Order #12347</span>
          <span className="text-xs text-gray-400">Placed on Jan 19, 2024</span>
        </div>
        <Status variant="warning">
          <StatusIndicator />
          <StatusLabel>Processing</StatusLabel>
        </Status>
      </div>
      <div className="bg-app-foreground flex items-center justify-between rounded-lg border border-gray-800 p-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-100">Order #12348</span>
          <span className="text-xs text-gray-400">Placed on Jan 10, 2024</span>
        </div>
        <Status variant="error">
          <StatusLabel>Cancelled</StatusLabel>
        </Status>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Delivered")).toBeVisible();
    await expect(canvas.getByText("In Transit")).toBeVisible();
    await expect(canvas.getByText("Processing")).toBeVisible();
    await expect(canvas.getByText("Cancelled")).toBeVisible();
  }
});

export const DataSlotAttributes = meta.story({
  tags: ["test"],
  render: () => (
    <Status variant="success">
      <StatusIndicator />
      <StatusLabel>Test</StatusLabel>
    </Status>
  ),
  play: async ({ canvas, step }) => {
    await step("Status has correct data-slot attribute", async () => {
      const status = canvas.getByText("Test").closest('[data-slot="status"]');
      await expect(status).toHaveAttribute("data-slot", "status");
      await expect(status).toHaveAttribute("data-variant", "success");
    });

    await step("StatusIndicator has correct data-slot attribute", async () => {
      const indicator = canvas.getByText("Test").parentElement?.querySelector('[data-slot="status-indicator"]');
      await expect(indicator).toBeVisible();
    });

    await step("StatusLabel has correct data-slot attribute", async () => {
      const label = canvas.getByText("Test");
      await expect(label).toHaveAttribute("data-slot", "status-label");
    });
  }
});

export const AsChildPattern = meta.story({
  render: () => (
    <Status asChild variant="success">
      <a href="#" className="cursor-pointer hover:opacity-80">
        <StatusIndicator />
        <StatusLabel>Clickable Status</StatusLabel>
      </a>
    </Status>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("data-slot", "status");
    await expect(link).toHaveAttribute("data-variant", "success");
  }
});

export const CustomStyling = meta.story({
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Status variant="success" className="px-4 py-2">
        <StatusIndicator />
        <StatusLabel>Larger Padding</StatusLabel>
      </Status>
      <Status variant="primary" className="rounded-md">
        <StatusIndicator />
        <StatusLabel>Less Rounded</StatusLabel>
      </Status>
      <Status variant="warning" className="border-2">
        <StatusIndicator />
        <StatusLabel>Thicker Border</StatusLabel>
      </Status>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Larger Padding")).toBeVisible();
    await expect(canvas.getByText("Less Rounded")).toBeVisible();
    await expect(canvas.getByText("Thicker Border")).toBeVisible();
  }
});
