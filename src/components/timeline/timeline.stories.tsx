import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle
} from "./index";

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  subcomponents: {
    TimelineItem,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineHeader,
    TimelineTitle,
    TimelineDescription,
    TimelineTime
  },
  tags: ["autodocs", "new", "todo"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "The orientation of the timeline",
      table: {
        defaultValue: { summary: "vertical" }
      }
    },
    variant: {
      control: "select",
      options: ["default", "alternate"],
      description: "The visual variant of the timeline",
      table: {
        defaultValue: { summary: "default" }
      }
    },
    activeIndex: {
      control: { type: "number", min: 0 },
      description: "Index of the currently active step (0-based)"
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl"],
      description: "Text direction",
      table: {
        defaultValue: { summary: "ltr" }
      }
    }
  }
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Order Placed</TimelineTitle>
            <TimelineDescription>Your order has been confirmed</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>Jan 15, 2024</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Processing</TimelineTitle>
            <TimelineDescription>Your order is being processed</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>Jan 16, 2024</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Delivered</TimelineTitle>
            <TimelineDescription>Package has been delivered</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>Jan 18, 2024</TimelineTime>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    const timeline = canvas.getByRole("list");
    await expect(timeline).toBeVisible();
    await expect(timeline).toHaveAttribute("data-slot", "timeline");
    await expect(timeline).toHaveAttribute("data-orientation", "vertical");

    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(3);
  }
};

export const WithActiveStep: Story = {
  render: () => (
    <Timeline activeIndex={1}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Step 1: Account Created</TimelineTitle>
            <TimelineDescription>Your account has been set up</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Step 2: Profile Setup</TimelineTitle>
            <TimelineDescription>Currently setting up your profile</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Step 3: Verification</TimelineTitle>
            <TimelineDescription>Pending verification</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Step 4: Complete</TimelineTitle>
            <TimelineDescription>Ready to use</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole("listitem");

    // First item should be completed
    await expect(items[0]).toHaveAttribute("data-status", "completed");

    // Second item should be active
    await expect(items[1]).toHaveAttribute("data-status", "active");
    await expect(items[1]).toHaveAttribute("aria-current", "step");

    // Third and fourth items should be pending
    await expect(items[2]).toHaveAttribute("data-status", "pending");
    await expect(items[3]).toHaveAttribute("data-status", "pending");
  }
};

export const Horizontal: Story = {
  render: () => (
    <Timeline orientation="horizontal" activeIndex={2}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Cart</TimelineTitle>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Shipping</TimelineTitle>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Payment</TimelineTitle>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Confirmation</TimelineTitle>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    const timeline = canvas.getByRole("list");
    await expect(timeline).toHaveAttribute("data-orientation", "horizontal");
  }
};

export const Alternate: Story = {
  render: () => (
    <Timeline variant="alternate" activeIndex={2}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Founded</TimelineTitle>
            <TimelineDescription>Company was established</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>2020</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>First Product</TimelineTitle>
            <TimelineDescription>Launched our first product</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>2021</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Series A</TimelineTitle>
            <TimelineDescription>Raised $10M in funding</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>2022</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Global Expansion</TimelineTitle>
            <TimelineDescription>Opened offices worldwide</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>2023</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>IPO</TimelineTitle>
            <TimelineDescription>Went public</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>2024</TimelineTime>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    const timeline = canvas.getByRole("list");
    await expect(timeline).toHaveAttribute("data-variant", "alternate");
  }
};

export const HorizontalAlternate: Story = {
  render: () => (
    <Timeline orientation="horizontal" variant="alternate" activeIndex={1}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Q1</TimelineTitle>
            <TimelineDescription>Planning</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Q2</TimelineTitle>
            <TimelineDescription>Development</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Q3</TimelineTitle>
            <TimelineDescription>Testing</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Q4</TimelineTitle>
            <TimelineDescription>Launch</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    const timeline = canvas.getByRole("list");
    await expect(timeline).toHaveAttribute("data-orientation", "horizontal");
    await expect(timeline).toHaveAttribute("data-variant", "alternate");
  }
};

export const WithCustomDotContent: Story = {
  render: () => (
    <Timeline activeIndex={1}>
      <TimelineItem>
        <TimelineDot className="size-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </TimelineDot>
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Completed Task</TimelineTitle>
            <TimelineDescription>This task has been finished</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot className="size-6">
          <div className="bg-primary size-2 animate-pulse rounded-full" />
        </TimelineDot>
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>In Progress</TimelineTitle>
            <TimelineDescription>Currently working on this</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot className="size-6">
          <span className="text-muted-foreground text-xs">3</span>
        </TimelineDot>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Pending Task</TimelineTitle>
            <TimelineDescription>Waiting to be started</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Completed Task")).toBeVisible();
    await expect(canvas.getByText("In Progress")).toBeVisible();
    await expect(canvas.getByText("Pending Task")).toBeVisible();
  }
};

export const ProjectTimeline: Story = {
  render: () => (
    <div className="w-[400px]">
      <Timeline activeIndex={2}>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Project Kickoff</TimelineTitle>
              <TimelineDescription>
                Initial meeting with stakeholders to define project scope and objectives.
              </TimelineDescription>
            </TimelineHeader>
            <TimelineTime dateTime="2024-01-15">January 15, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Design Phase</TimelineTitle>
              <TimelineDescription>Created wireframes and high-fidelity mockups for user approval.</TimelineDescription>
            </TimelineHeader>
            <TimelineTime dateTime="2024-02-01">February 1, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Development Sprint</TimelineTitle>
              <TimelineDescription>Building core features and implementing the design system.</TimelineDescription>
            </TimelineHeader>
            <TimelineTime dateTime="2024-03-01">March 1, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Testing & QA</TimelineTitle>
              <TimelineDescription>Comprehensive testing and bug fixes before release.</TimelineDescription>
            </TimelineHeader>
            <TimelineTime dateTime="2024-04-01">April 1, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Launch</TimelineTitle>
              <TimelineDescription>Public release and deployment to production.</TimelineDescription>
            </TimelineHeader>
            <TimelineTime dateTime="2024-05-01">May 1, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Project Kickoff")).toBeVisible();
    await expect(canvas.getByText("Launch")).toBeVisible();
  }
};

export const DataSlotAttributes: Story = {
  tags: ["test"],
  render: () => (
    <Timeline activeIndex={0}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Test Title</TimelineTitle>
            <TimelineDescription>Test Description</TimelineDescription>
          </TimelineHeader>
          <TimelineTime>Test Time</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineTitle>Second Item</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvas, step }) => {
    await step("Timeline has correct data-slot attribute", async () => {
      const timeline = canvas.getByRole("list");
      await expect(timeline).toHaveAttribute("data-slot", "timeline");
    });

    await step("TimelineItem has correct data-slot attribute", async () => {
      const items = canvas.getAllByRole("listitem");
      await expect(items[0]).toHaveAttribute("data-slot", "timeline-item");
    });

    await step("TimelineDot has correct data-slot attribute", async () => {
      const dot = canvas
        .getByText("Test Title")
        .closest('[data-slot="timeline-item"]')
        ?.querySelector('[data-slot="timeline-dot"]');
      await expect(dot).toBeInTheDocument();
    });

    await step("TimelineConnector has correct data-slot attribute", async () => {
      const connector = canvas
        .getByText("Test Title")
        .closest('[data-slot="timeline-item"]')
        ?.querySelector('[data-slot="timeline-connector"]');
      await expect(connector).toBeInTheDocument();
    });

    await step("TimelineContent has correct data-slot attribute", async () => {
      const content = canvas.getByText("Test Title").closest('[data-slot="timeline-content"]');
      await expect(content).toBeInTheDocument();
    });

    await step("TimelineTitle has correct data-slot attribute", async () => {
      const title = canvas.getByText("Test Title");
      await expect(title).toHaveAttribute("data-slot", "timeline-title");
    });

    await step("TimelineDescription has correct data-slot attribute", async () => {
      const description = canvas.getByText("Test Description");
      await expect(description).toHaveAttribute("data-slot", "timeline-description");
    });

    await step("TimelineTime has correct data-slot attribute", async () => {
      const time = canvas.getByText("Test Time");
      await expect(time).toHaveAttribute("data-slot", "timeline-time");
    });
  }
};

export const StatusTransitions: Story = {
  tags: ["test"],
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            className="rounded bg-gray-700 px-3 py-1 text-sm text-white"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(Math.min(2, activeIndex + 1))}
            className="bg-primary rounded px-3 py-1 text-sm text-white"
          >
            Next
          </button>
          <span className="text-sm text-gray-400">Active: {activeIndex}</span>
        </div>
        <Timeline activeIndex={activeIndex}>
          <TimelineItem>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>Step 1</TimelineTitle>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>Step 2</TimelineTitle>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Step 3</TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Step 1")).toBeVisible();
    await expect(canvas.getByText("Step 2")).toBeVisible();
    await expect(canvas.getByText("Step 3")).toBeVisible();
  }
};
