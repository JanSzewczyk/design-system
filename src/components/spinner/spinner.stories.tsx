import { expect, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { Spinner } from "~/components";

const meta = preview.meta({
  argTypes: {
    className: {
      control: "text"
    }
  },
  component: Spinner,
  tags: ["autodocs", "new"],
  title: "Components/Spinner"
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    // Test that spinner renders
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();

    // Test that it has correct aria-label
    await expect(spinner).toHaveAttribute("aria-label", "Loading");

    // Test that it has the animate-spin class
    await expect(spinner).toHaveClass("animate-spin");
  }
});

export const Sizes = meta.story({
  play: async ({ canvas }) => {
    // Test that all spinners are rendered
    const spinners = canvas.getAllByRole("status");
    await expect(spinners).toHaveLength(4);

    // Test that all spinners are visible
    for (const spinner of spinners) {
      await expect(spinner).toBeVisible();
      await expect(spinner).toHaveClass("animate-spin");
    }

    // Test that all size labels are rendered
    await expect(canvas.getByText("Small (16px)")).toBeVisible();
    await expect(canvas.getByText("Medium (24px)")).toBeVisible();
    await expect(canvas.getByText("Large (32px)")).toBeVisible();
    await expect(canvas.getByText("Extra Large (48px)")).toBeVisible();
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-gray-300 text-xs">Small (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-gray-300 text-xs">Medium (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-gray-300 text-xs">Large (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-12" />
        <span className="text-gray-300 text-xs">Extra Large (48px)</span>
      </div>
    </div>
  )
});

export const Colors = meta.story({
  play: async ({ canvas }) => {
    // Test that all spinners are rendered
    const spinners = canvas.getAllByRole("status");
    await expect(spinners).toHaveLength(5);

    // Test that all spinners are visible and spinning
    for (const spinner of spinners) {
      await expect(spinner).toBeVisible();
      await expect(spinner).toHaveClass("animate-spin");
    }

    // Test that all color labels are rendered
    await expect(canvas.getByText("Default")).toBeVisible();
    await expect(canvas.getByText("Primary")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
    await expect(canvas.getByText("Warning")).toBeVisible();
    await expect(canvas.getByText("Error")).toBeVisible();
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-gray-100" />
        <span className="text-gray-100 text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-primary-500" />
        <span className="text-gray-100 text-xs">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-success-500" />
        <span className="text-gray-100 text-xs">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-warning-500" />
        <span className="text-gray-100 text-xs">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8 text-error-500" />
        <span className="text-gray-100 text-xs">Error</span>
      </div>
    </div>
  )
});

export const WithCustomClassName = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom className is applied
    const spinner = canvas.getByTestId("custom-spinner");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("size-16");
    await expect(spinner).toHaveClass("text-blue-500");
    await expect(spinner).toHaveClass("animate-spin");
  },
  render: () => <Spinner className="size-16 text-blue-500" data-testid="custom-spinner" />
});

export const WithCustomProps = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that custom props are applied
    const spinner = canvas.getByTestId("custom-props-spinner");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveAttribute("stroke-width", "3");
  },
  render: () => <Spinner data-testid="custom-props-spinner" strokeWidth={3} />
});

export const InButton = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that button with spinner is rendered
    const button = canvas.getByRole("button");
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
    await expect(canvas.getByText("Loading...")).toBeVisible();

    // Test that spinner is visible
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("animate-spin");
  },
  render: () => (
    <button
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
      disabled
      type="button"
    >
      <Spinner className="size-4" />
      Loading...
    </button>
  )
});

export const CenteredInCard = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that spinner is centered and visible
    const spinner = canvas.getByRole("status");
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveClass("animate-spin");
  },
  render: () => (
    <div className="flex h-48 w-64 items-center justify-center rounded-lg border border-gray-800 bg-app-foreground p-6 shadow-sm">
      <Spinner className="size-8" />
    </div>
  )
});
