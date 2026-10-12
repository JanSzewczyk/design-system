import * as React from "react";

import { expect, waitFor, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { CountingNumber } from "~/components";

const meta = preview.meta({
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes"
    },
    delay: {
      control: { min: 0, step: 100, type: "number" },
      description: "Delay before animation starts in milliseconds",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    duration: {
      control: { max: 10, min: 0.1, step: 0.1, type: "number" },
      description: "Animation duration in seconds",
      table: {
        defaultValue: { summary: "2" }
      }
    },
    format: {
      description: "Custom formatting function for displayed value"
    },
    from: {
      control: { type: "number" },
      description: "Starting value for the animation",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    onComplete: {
      description: "Callback function called when animation completes"
    },
    once: {
      control: "boolean",
      description: "Whether to animate only once",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when element comes into view",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    to: {
      control: { type: "number" },
      description: "Target value for the animation",
      table: {
        defaultValue: { summary: "100" }
      }
    }
  },
  component: CountingNumber,
  tags: ["autodocs", "new"],
  title: "Components/Counting Number"
});

export const Default = meta.story({
  args: {
    duration: 2,
    from: 0,
    startOnView: false,
    to: 100
  },
  play: async ({ canvas }) => {
    const element = canvas.getByText(/\d+/);
    await expect(element).toBeVisible();
    await expect(element).toHaveAttribute("data-slot", "counting-number");
  }
});

export const CustomRange = meta.story({
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/^-?\d+$/);
    await expect(elements.length).toBeGreaterThanOrEqual(4);

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-24 text-gray-400 text-sm">0 → 50:</span>
        <CountingNumber className="font-bold text-2xl" duration={1.5} from={0} startOnView={false} to={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-gray-400 text-sm">100 → 0:</span>
        <CountingNumber className="font-bold text-2xl" duration={1.5} from={100} startOnView={false} to={0} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-gray-400 text-sm">-50 → 50:</span>
        <CountingNumber className="font-bold text-2xl" duration={1.5} from={-50} startOnView={false} to={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-gray-400 text-sm">0 → 1000:</span>
        <CountingNumber className="font-bold text-2xl" duration={2} from={0} startOnView={false} to={1000} />
      </div>
    </div>
  )
});

export const Durations = meta.story({
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBeGreaterThanOrEqual(3);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">0.5s (fast):</span>
        <CountingNumber className="font-semibold text-xl" duration={0.5} startOnView={false} to={100} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">2s (default):</span>
        <CountingNumber className="font-semibold text-xl" duration={2} startOnView={false} to={100} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">5s (slow):</span>
        <CountingNumber className="font-semibold text-xl" duration={5} startOnView={false} to={100} />
      </div>
    </div>
  )
});

export const WithDelay = meta.story({
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBeGreaterThanOrEqual(3);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">No delay:</span>
        <CountingNumber className="font-semibold text-xl" delay={0} duration={1} startOnView={false} to={100} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">500ms delay:</span>
        <CountingNumber className="font-semibold text-xl" delay={500} duration={1} startOnView={false} to={100} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">1000ms delay:</span>
        <CountingNumber className="font-semibold text-xl" delay={1000} duration={1} startOnView={false} to={100} />
      </div>
    </div>
  )
});

export const WithFormatting = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/\$/)).toBeVisible();
        await expect(canvas.getByText(/%/)).toBeVisible();
        await expect(canvas.getByText(/users/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">Currency:</span>
        <CountingNumber
          className="font-bold text-2xl text-green-500"
          duration={2}
          format={(value) =>
            `$${value.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
          }
          startOnView={false}
          to={9999}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">Percentage:</span>
        <CountingNumber
          className="font-bold text-2xl text-blue-500"
          duration={2}
          format={(value) => `${value.toFixed(1)}%`}
          startOnView={false}
          to={87.5}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">With suffix:</span>
        <CountingNumber
          className="font-bold text-2xl text-purple-500"
          duration={2}
          format={(value) => `${Math.round(value)}+ users`}
          startOnView={false}
          to={1500}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-gray-400 text-sm">Compact:</span>
        <CountingNumber
          className="font-bold text-2xl text-orange-500"
          duration={2}
          format={(value) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k`;
            }
            return Math.round(value).toString();
          }}
          startOnView={false}
          to={25000}
        />
      </div>
    </div>
  )
});

export const Styling = meta.story({
  play: async ({ canvas }) => {
    const elements = canvas.getAllByText(/\d+/);
    await expect(elements.length).toBe(4);

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <CountingNumber className="font-black text-4xl text-primary" duration={1.5} startOnView={false} to={100} />
      <CountingNumber
        className="font-light text-3xl text-gray-400 italic"
        duration={1.5}
        startOnView={false}
        to={100}
      />
      <CountingNumber
        className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text font-extrabold text-5xl text-transparent"
        duration={1.5}
        startOnView={false}
        to={100}
      />
      <CountingNumber
        className="rounded-lg bg-success px-4 py-2 font-bold text-2xl text-success-foreground"
        duration={1.5}
        startOnView={false}
        to={100}
      />
    </div>
  )
});

export const OnCompleteCallback = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      async () => {
        await expect(canvas.getByTestId("completion-status")).toHaveTextContent("Animation completed!");
      },
      { timeout: 3000 }
    );
  },
  render: function Render() {
    const [completed, setCompleted] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <CountingNumber
          className="font-bold text-3xl"
          duration={1}
          onComplete={() => setCompleted(true)}
          startOnView={false}
          to={100}
        />
        <p className="text-gray-400 text-sm" data-testid="completion-status">
          Status: {completed ? "Animation completed!" : "Animating..."}
        </p>
      </div>
    );
  }
});

export const StatisticsCard = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Total Users")).toBeVisible();
    await expect(canvas.getByText("Success Rate")).toBeVisible();
    await expect(canvas.getByText("Avg. Response")).toBeVisible();
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center rounded-lg border border-gray-800 bg-app-foreground p-6">
        <CountingNumber
          className="font-bold text-4xl text-primary"
          duration={2}
          format={(v) => Math.round(v).toLocaleString()}
          startOnView={false}
          to={1234}
        />
        <span className="mt-2 text-gray-400 text-sm">Total Users</span>
      </div>
      <div className="flex flex-col items-center rounded-lg border border-gray-800 bg-app-foreground p-6">
        <CountingNumber
          className="font-bold text-4xl text-success"
          duration={2}
          format={(v) => `${v.toFixed(1)}%`}
          startOnView={false}
          to={98.7}
        />
        <span className="mt-2 text-gray-400 text-sm">Success Rate</span>
      </div>
      <div className="flex flex-col items-center rounded-lg border border-gray-800 bg-app-foreground p-6">
        <CountingNumber
          className="font-bold text-4xl text-warning"
          duration={2}
          format={(v) => `${Math.round(v)}ms`}
          startOnView={false}
          to={42}
        />
        <span className="mt-2 text-gray-400 text-sm">Avg. Response</span>
      </div>
    </div>
  )
});

export const DataSlotAttribute = meta.story({
  args: {
    duration: 0.5,
    startOnView: false,
    to: 50
  },
  play: async ({ canvas }) => {
    const element = canvas.getByText(/\d+/);
    await expect(element).toHaveAttribute("data-slot", "counting-number");
  }
});

export const AnimationTest = meta.story({
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
  },
  render: () => {
    return <CountingNumber data-testid="animated-number" duration={0.5} from={0} startOnView={false} to={10} />;
  }
});
