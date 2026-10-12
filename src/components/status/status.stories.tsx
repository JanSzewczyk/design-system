import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Status, StatusIndicator, StatusLabel } from "./index";

const meta = preview.meta({
  argTypes: {
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
    },
    variant: {
      control: "select",
      description: "Visual style variant of status badge",
      options: ["default", "success", "error", "warning", "primary"],
      table: {
        defaultValue: { summary: "default" }
      }
    }
  },
  component: Status,
  subcomponents: { StatusIndicator, StatusLabel },
  tags: ["autodocs", "new"],
  title: "Components/Status"
});

export const Default = meta.story({
  args: {
    variant: "default"
  },
  play: async ({ canvas }) => {
    const status = canvas.getByText("Default").closest('[data-slot="status"]');
    await expect(status).toBeVisible();
    await expect(status).toHaveAttribute("data-slot", "status");
    await expect(status).toHaveAttribute("data-variant", "default");
  },
  render: (args) => (
    <Status {...args}>
      <StatusIndicator />
      <StatusLabel>Default</StatusLabel>
    </Status>
  )
});

export const AllVariants = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Default")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
    await expect(canvas.getByText("Error")).toBeVisible();
    await expect(canvas.getByText("Warning")).toBeVisible();
    await expect(canvas.getByText("Primary")).toBeVisible();
  },
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
  )
});

export const Success = meta.story({
  play: async ({ canvas }) => {
    const status = canvas.getByText("Online").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "success");
  },
  render: () => (
    <Status variant="success">
      <StatusIndicator />
      <StatusLabel>Online</StatusLabel>
    </Status>
  )
});

export const Error = meta.story({
  play: async ({ canvas }) => {
    const status = canvas.getByText("Offline").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "error");
  },
  render: () => (
    <Status variant="error">
      <StatusIndicator />
      <StatusLabel>Offline</StatusLabel>
    </Status>
  )
});

export const Warning = meta.story({
  play: async ({ canvas }) => {
    const status = canvas.getByText("Pending").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "warning");
  },
  render: () => (
    <Status variant="warning">
      <StatusIndicator />
      <StatusLabel>Pending</StatusLabel>
    </Status>
  )
});

export const Primary = meta.story({
  play: async ({ canvas }) => {
    const status = canvas.getByText("Active").closest('[data-slot="status"]');
    await expect(status).toHaveAttribute("data-variant", "primary");
  },
  render: () => (
    <Status variant="primary">
      <StatusIndicator />
      <StatusLabel>Active</StatusLabel>
    </Status>
  )
});

export const WithoutIndicator = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Completed")).toBeVisible();
    await expect(canvas.getByText("Failed")).toBeVisible();
    await expect(canvas.getByText("In Progress")).toBeVisible();
  },
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
  )
});

export const IndicatorOnly = meta.story({
  play: async ({ canvas }) => {
    const indicators = canvas.getAllByRole("generic").filter((el) => el.getAttribute("data-slot") === "status");
    await expect(indicators).toHaveLength(5);
  },
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
  )
});

export const UserStatus = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("John Doe")).toBeVisible();
    await expect(canvas.getByText("Online")).toBeVisible();
    await expect(canvas.getByText("Away")).toBeVisible();
    await expect(canvas.getByText("Offline")).toBeVisible();
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary font-medium text-sm text-white">
          JD
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-100 text-sm">John Doe</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Online</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-purple-500 font-medium text-sm text-white">
          AS
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-100 text-sm">Alice Smith</span>
          <Status variant="warning">
            <StatusIndicator />
            <StatusLabel>Away</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-500 font-medium text-sm text-white">
          BW
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-100 text-sm">Bob Wilson</span>
          <Status variant="error">
            <StatusIndicator />
            <StatusLabel>Offline</StatusLabel>
          </Status>
        </div>
      </div>
    </div>
  )
});

export const ServiceHealth = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Service Health")).toBeVisible();
    await expect(canvas.getByText("API Server")).toBeVisible();
    await expect(canvas.getAllByText("Operational")).toHaveLength(2);
    await expect(canvas.getByText("Degraded")).toBeVisible();
    await expect(canvas.getByText("Outage")).toBeVisible();
  },
  render: () => (
    <div className="rounded-lg border border-gray-800 bg-app-foreground p-4">
      <h3 className="mb-4 font-semibold text-gray-100 text-sm">Service Health</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">API Server</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Operational</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Database</span>
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Operational</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">CDN</span>
          <Status variant="warning">
            <StatusIndicator />
            <StatusLabel>Degraded</StatusLabel>
          </Status>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Email Service</span>
          <Status variant="error">
            <StatusIndicator />
            <StatusLabel>Outage</StatusLabel>
          </Status>
        </div>
      </div>
    </div>
  )
});

export const OrderStatus = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Delivered")).toBeVisible();
    await expect(canvas.getByText("In Transit")).toBeVisible();
    await expect(canvas.getByText("Processing")).toBeVisible();
    await expect(canvas.getByText("Cancelled")).toBeVisible();
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-app-foreground p-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-100 text-sm">Order #12345</span>
          <span className="text-gray-400 text-xs">Placed on Jan 15, 2024</span>
        </div>
        <Status variant="success">
          <StatusLabel>Delivered</StatusLabel>
        </Status>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-app-foreground p-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-100 text-sm">Order #12346</span>
          <span className="text-gray-400 text-xs">Placed on Jan 18, 2024</span>
        </div>
        <Status variant="primary">
          <StatusIndicator />
          <StatusLabel>In Transit</StatusLabel>
        </Status>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-app-foreground p-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-100 text-sm">Order #12347</span>
          <span className="text-gray-400 text-xs">Placed on Jan 19, 2024</span>
        </div>
        <Status variant="warning">
          <StatusIndicator />
          <StatusLabel>Processing</StatusLabel>
        </Status>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-app-foreground p-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-100 text-sm">Order #12348</span>
          <span className="text-gray-400 text-xs">Placed on Jan 10, 2024</span>
        </div>
        <Status variant="error">
          <StatusLabel>Cancelled</StatusLabel>
        </Status>
      </div>
    </div>
  )
});

export const DataSlotAttributes = meta.story({
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
  },
  render: () => (
    <Status variant="success">
      <StatusIndicator />
      <StatusLabel>Test</StatusLabel>
    </Status>
  )
});

export const AsChildPattern = meta.story({
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("data-slot", "status");
    await expect(link).toHaveAttribute("data-variant", "success");
  },
  render: () => (
    <Status asChild variant="success">
      <a className="cursor-pointer hover:opacity-80" href="#">
        <StatusIndicator />
        <StatusLabel>Clickable Status</StatusLabel>
      </a>
    </Status>
  )
});

export const CustomStyling = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Larger Padding")).toBeVisible();
    await expect(canvas.getByText("Less Rounded")).toBeVisible();
    await expect(canvas.getByText("Thicker Border")).toBeVisible();
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Status className="px-4 py-2" variant="success">
        <StatusIndicator />
        <StatusLabel>Larger Padding</StatusLabel>
      </Status>
      <Status className="rounded-md" variant="primary">
        <StatusIndicator />
        <StatusLabel>Less Rounded</StatusLabel>
      </Status>
      <Status className="border-2" variant="warning">
        <StatusIndicator />
        <StatusLabel>Thicker Border</StatusLabel>
      </Status>
    </div>
  )
});
