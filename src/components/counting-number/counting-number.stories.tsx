import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { CountingNumber } from "~/components";

const meta = {
  title: "Components/Counting Number",
  component: CountingNumber,
  tags: ["autodocs", "new"],
  argTypes: {
    from: {
      control: { type: "number" },
      description: "Starting value for the animation",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    to: {
      control: { type: "number" },
      description: "Target value for the animation",
      table: {
        defaultValue: { summary: "100" }
      }
    },
    duration: {
      control: { type: "number", min: 0.1, max: 10, step: 0.1 },
      description: "Animation duration in seconds",
      table: {
        defaultValue: { summary: "2" }
      }
    },
    delay: {
      control: { type: "number", min: 0, step: 100 },
      description: "Delay before animation starts in milliseconds",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when element comes into view",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    once: {
      control: "boolean",
      description: "Whether to animate only once",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    format: {
      description: "Custom formatting function for the displayed value"
    },
    onComplete: {
      description: "Callback function called when animation completes"
    }
  }
} satisfies Meta<typeof CountingNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    from: 0,
    to: 100,
    duration: 2,
    startOnView: false
  },
  play: async ({ canvas }) => {
    const element = canvas.getByText(/\d+/);
    await expect(element).toBeVisible();
    await expect(element).toHaveAttribute("data-slot", "counting-number");
  }
};

export const CustomRange: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-400">0 → 50:</span>
        <CountingNumber from={0} to={50} duration={1.5} startOnView={false} className="text-2xl font-bold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-400">100 → 0:</span>
        <CountingNumber from={100} to={0} duration={1.5} startOnView={false} className="text-2xl font-bold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-400">-50 → 50:</span>
        <CountingNumber from={-50} to={50} duration={1.5} startOnView={false} className="text-2xl font-bold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-400">0 → 1000:</span>
        <CountingNumber from={0} to={1000} duration={2} startOnView={false} className="text-2xl font-bold" />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/^-?\d+$/);
    await expect(elements.length).toBeGreaterThanOrEqual(4);

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }
};

export const Durations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">0.5s (fast):</span>
        <CountingNumber to={100} duration={0.5} startOnView={false} className="text-xl font-semibold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">2s (default):</span>
        <CountingNumber to={100} duration={2} startOnView={false} className="text-xl font-semibold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">5s (slow):</span>
        <CountingNumber to={100} duration={5} startOnView={false} className="text-xl font-semibold" />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBeGreaterThanOrEqual(3);
  }
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">No delay:</span>
        <CountingNumber to={100} duration={1} delay={0} startOnView={false} className="text-xl font-semibold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">500ms delay:</span>
        <CountingNumber to={100} duration={1} delay={500} startOnView={false} className="text-xl font-semibold" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">1000ms delay:</span>
        <CountingNumber to={100} duration={1} delay={1000} startOnView={false} className="text-xl font-semibold" />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBeGreaterThanOrEqual(3);
  }
};

export const WithFormatting: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">Currency:</span>
        <CountingNumber
          to={9999}
          duration={2}
          startOnView={false}
          format={(value) =>
            `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          }
          className="text-2xl font-bold text-green-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">Percentage:</span>
        <CountingNumber
          to={87.5}
          duration={2}
          startOnView={false}
          format={(value) => `${value.toFixed(1)}%`}
          className="text-2xl font-bold text-blue-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">With suffix:</span>
        <CountingNumber
          to={1500}
          duration={2}
          startOnView={false}
          format={(value) => `${Math.round(value)}+ users`}
          className="text-2xl font-bold text-purple-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-400">Compact:</span>
        <CountingNumber
          to={25000}
          duration={2}
          startOnView={false}
          format={(value) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k`;
            }
            return Math.round(value).toString();
          }}
          className="text-2xl font-bold text-orange-500"
        />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/\$/)).toBeVisible();
        await expect(canvas.getByText(/%/)).toBeVisible();
        await expect(canvas.getByText(/users/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

export const Styling: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CountingNumber to={100} duration={1.5} startOnView={false} className="text-primary text-4xl font-black" />
      <CountingNumber
        to={100}
        duration={1.5}
        startOnView={false}
        className="text-3xl font-light text-gray-400 italic"
      />
      <CountingNumber
        to={100}
        duration={1.5}
        startOnView={false}
        className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent"
      />
      <CountingNumber
        to={100}
        duration={1.5}
        startOnView={false}
        className="bg-success text-success-foreground rounded-lg px-4 py-2 text-2xl font-bold"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBe(4);

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }
};

export const OnCompleteCallback: Story = {
  render: function Render() {
    const [completed, setCompleted] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <CountingNumber
          to={100}
          duration={1}
          startOnView={false}
          onComplete={() => setCompleted(true)}
          className="text-3xl font-bold"
        />
        <p className="text-sm text-gray-400" data-testid="completion-status">
          Status: {completed ? "Animation completed!" : "Animating..."}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      async () => {
        await expect(canvas.getByTestId("completion-status")).toHaveTextContent("Animation completed!");
      },
      { timeout: 3000 }
    );
  }
};

export const StatisticsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
        <CountingNumber
          to={1234}
          duration={2}
          startOnView={false}
          format={(v) => Math.round(v).toLocaleString()}
          className="text-primary text-4xl font-bold"
        />
        <span className="mt-2 text-sm text-gray-400">Total Users</span>
      </div>
      <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
        <CountingNumber
          to={98.7}
          duration={2}
          startOnView={false}
          format={(v) => `${v.toFixed(1)}%`}
          className="text-success text-4xl font-bold"
        />
        <span className="mt-2 text-sm text-gray-400">Success Rate</span>
      </div>
      <div className="bg-app-foreground flex flex-col items-center rounded-lg border border-gray-800 p-6">
        <CountingNumber
          to={42}
          duration={2}
          startOnView={false}
          format={(v) => `${Math.round(v)}ms`}
          className="text-warning text-4xl font-bold"
        />
        <span className="mt-2 text-sm text-gray-400">Avg. Response</span>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Total Users")).toBeVisible();
    await expect(canvas.getByText("Success Rate")).toBeVisible();
    await expect(canvas.getByText("Avg. Response")).toBeVisible();
  }
};

export const DataSlotAttribute: Story = {
  tags: ["test"],
  args: {
    to: 50,
    duration: 0.5,
    startOnView: false
  },
  play: async ({ canvas }) => {
    const element = canvas.getByText(/\d+/);
    await expect(element).toHaveAttribute("data-slot", "counting-number");
  }
};

export const AnimationTest: Story = {
  tags: ["test"],
  render: () => {
    return <CountingNumber from={0} to={10} duration={0.5} startOnView={false} data-testid="animated-number" />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial render should show some number
    const element = canvas.getByTestId("animated-number");
    await expect(element).toBeVisible();

    // Wait for animation to complete and check final value
    await waitFor(
      async () => {
        await expect(element).toHaveTextContent("10");
      },
      { timeout: 2000 }
    );
  }
};
