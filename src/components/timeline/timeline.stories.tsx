import * as React from "react";

import { Code, Layers, Rocket } from "lucide-react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

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
  tags: ["autodocs", "new", "todo", "test"],
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

const timelineItems = [
  {
    id: "project-kickoff",
    dateTime: "2025-01-15",
    date: "January 15, 2025",
    title: "Project Kickoff",
    description: "Initial meeting to define scope."
  },
  {
    id: "design-phase",
    dateTime: "2025-02-01",
    date: "February 1, 2025",
    title: "Design Phase",
    description: "Created wireframes and mockups."
  },
  {
    id: "development",
    dateTime: "2025-03-01",
    date: "March 1, 2025",
    title: "Development",
    description: "Building core features."
  }
];

export const Example: Story = {
  render: () => (
    <Timeline activeIndex={1}>
      {timelineItems.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
              <TimelineTitle>{item.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all timeline items are rendered
    await expect(canvas.getByText("Project Kickoff")).toBeInTheDocument();
    await expect(canvas.getByText("Design Phase")).toBeInTheDocument();
    await expect(canvas.getByText("Development")).toBeInTheDocument();

    // Check dates are rendered
    await expect(canvas.getByText("January 15, 2025")).toBeInTheDocument();
    await expect(canvas.getByText("February 1, 2025")).toBeInTheDocument();
    await expect(canvas.getByText("March 1, 2025")).toBeInTheDocument();

    // Check descriptions are rendered
    await expect(canvas.getByText("Initial meeting to define scope.")).toBeInTheDocument();
    await expect(canvas.getByText("Created wireframes and mockups.")).toBeInTheDocument();
    await expect(canvas.getByText("Building core features.")).toBeInTheDocument();

    // Check timeline structure
    const timeline = canvasElement.querySelector("[data-slot='timeline']");
    await expect(timeline).toBeInTheDocument();
    await expect(timeline).toHaveAttribute("data-orientation", "vertical");

    // Check active index state - second item (index 1) should be active
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};

const timelineItemsHorizontalTimeline = [
  {
    id: "research-and-planning",
    dateTime: "2025-01",
    date: "Jan - Mar",
    title: "Q1",
    description: "Research and planning"
  },
  {
    id: "development-sprint",
    dateTime: "2025-04",
    date: "Apr - Jun",
    title: "Q2",
    description: "Development sprint"
  },
  {
    id: "beta-launch",
    dateTime: "2025-07",
    date: "Jul - Sep",
    title: "Q3",
    description: "Beta launch"
  }
];

export const Horizontal: Story = {
  render: () => (
    <Timeline orientation="horizontal" activeIndex={1}>
      {timelineItemsHorizontalTimeline.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all quarters are rendered
    await expect(canvas.getByText("Q1")).toBeInTheDocument();
    await expect(canvas.getByText("Q2")).toBeInTheDocument();
    await expect(canvas.getByText("Q3")).toBeInTheDocument();

    // Check descriptions
    await expect(canvas.getByText("Research and planning")).toBeInTheDocument();
    await expect(canvas.getByText("Development sprint")).toBeInTheDocument();
    await expect(canvas.getByText("Beta launch")).toBeInTheDocument();

    // Check horizontal orientation
    const timeline = canvasElement.querySelector("[data-slot='timeline']");
    await expect(timeline).toBeInTheDocument();
    await expect(timeline).toHaveAttribute("data-orientation", "horizontal");

    // Check active index state
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};

const timelineItemsRTL = [
  {
    id: "registration-opened",
    dateTime: "2025-01-01",
    date: "January 1, 2025",
    title: "Registration Opened",
    description: "Online registration portal opens."
  },
  {
    id: "early-bird-deadline",
    dateTime: "2025-02-15",
    date: "February 15, 2025",
    title: "Early Bird Deadline",
    description: "Last day for early bird pricing."
  },
  {
    id: "event-day",
    dateTime: "2025-03-01",
    date: "March 1, 2025",
    title: "Event Day",
    description: "Main event begins at 9:00 AM."
  }
];
export const RTL: Story = {
  render: () => (
    <Timeline dir="rtl" activeIndex={1}>
      {timelineItemsRTL.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all items are rendered
    await expect(canvas.getByText("Registration Opened")).toBeInTheDocument();
    await expect(canvas.getByText("Early Bird Deadline")).toBeInTheDocument();
    await expect(canvas.getByText("Event Day")).toBeInTheDocument();

    // Check RTL direction
    const timeline = canvasElement.querySelector("[data-slot='timeline']");
    await expect(timeline).toBeInTheDocument();
    await expect(timeline).toHaveAttribute("dir", "rtl");

    // Check active index state
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};

const timelineItemsAlternate = [
  {
    id: "project-kickoff",
    dateTime: "2025-01-15",
    date: "January 15, 2025",
    title: "Project Kickoff",
    description: "Initial meeting to define scope."
  },
  {
    id: "design-phase",
    dateTime: "2025-02-01",
    date: "February 1, 2025",
    title: "Design Phase",
    description: "Created wireframes and mockups."
  },
  {
    id: "development",
    dateTime: "2025-03-01",
    date: "March 1, 2025",
    title: "Development",
    description: "Building core features."
  }
];
export const Alternate: Story = {
  render: () => (
    <Timeline variant="alternate" activeIndex={1}>
      {timelineItemsAlternate.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
              <TimelineTitle>{item.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all items are rendered
    await expect(canvas.getByText("Project Kickoff")).toBeInTheDocument();
    await expect(canvas.getByText("Design Phase")).toBeInTheDocument();
    await expect(canvas.getByText("Development")).toBeInTheDocument();

    // Check alternate variant
    const timeline = canvasElement.querySelector("[data-slot='timeline']");
    await expect(timeline).toBeInTheDocument();
    await expect(timeline).toHaveAttribute("data-variant", "alternate");
    await expect(timeline).toHaveAttribute("data-orientation", "vertical");

    // Check active index state
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};

const timelineItemsHorizontalAlternate = [
  {
    id: "company-founded",
    dateTime: "2023-06",
    date: "June 2023",
    title: "Company Founded",
    description: "Started with a team of five."
  },
  {
    id: "series-a-funding",
    dateTime: "2024-03",
    date: "March 2024",
    title: "Series A Funding",
    description: "Raised $10M seed funding."
  },
  {
    id: "product-launch",
    dateTime: "2025-01",
    date: "January 2025",
    title: "Product Launch",
    description: "Released MVP to beta testers."
  }
];
export const HorizontalAlternate: Story = {
  render: () => (
    <Timeline variant="alternate" orientation="horizontal" activeIndex={1}>
      {timelineItemsHorizontalAlternate.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
              <TimelineTitle>{item.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all items are rendered
    await expect(canvas.getByText("Company Founded")).toBeInTheDocument();
    await expect(canvas.getByText("Series A Funding")).toBeInTheDocument();
    await expect(canvas.getByText("Product Launch")).toBeInTheDocument();

    // Check descriptions
    await expect(canvas.getByText("Started with a team of five.")).toBeInTheDocument();
    await expect(canvas.getByText("Raised $10M seed funding.")).toBeInTheDocument();
    await expect(canvas.getByText("Released MVP to beta testers.")).toBeInTheDocument();

    // Check horizontal alternate variant
    const timeline = canvasElement.querySelector("[data-slot='timeline']");
    await expect(timeline).toBeInTheDocument();
    await expect(timeline).toHaveAttribute("data-variant", "alternate");
    await expect(timeline).toHaveAttribute("data-orientation", "horizontal");

    // Check active index state
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};

const timelineItemsWithCustomDots = [
  {
    id: "project-kickoff",
    dateTime: "2025-01-15",
    date: "January 15, 2025",
    title: "Project Kickoff",
    description: "Initial meeting to define scope.",
    icon: Rocket
  },
  {
    id: "design-phase",
    dateTime: "2025-02-01",
    date: "February 1, 2025",
    title: "Design Phase",
    description: "Created wireframes and mockups.",
    icon: Layers
  },
  {
    id: "development",
    dateTime: "2025-03-01",
    date: "March 1, 2025",
    title: "Development",
    description: "Building core features.",
    icon: Code
  }
];
export const WithCustomDots: Story = {
  render: () => (
    <Timeline activeIndex={1} className="[--timeline-dot-size:2rem]">
      {timelineItemsWithCustomDots.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineDot>
            <item.icon className="size-3.5" />
          </TimelineDot>
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTime dateTime={item.dateTime}>{item.date}</TimelineTime>
              <TimelineTitle>{item.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all items are rendered
    await expect(canvas.getByText("Project Kickoff")).toBeInTheDocument();
    await expect(canvas.getByText("Design Phase")).toBeInTheDocument();
    await expect(canvas.getByText("Development")).toBeInTheDocument();

    // Check custom dots are rendered with icons inside
    const timelineDots = canvasElement.querySelectorAll("[data-slot='timeline-dot']");
    await expect(timelineDots).toHaveLength(3);

    // Verify each dot contains an SVG icon
    for (const dot of Array.from(timelineDots)) {
      const svg = dot.querySelector("svg");
      await expect(svg).toBeInTheDocument();
    }

    // Check active index state
    const timelineItems = canvasElement.querySelectorAll("[data-slot='timeline-item']");
    await expect(timelineItems).toHaveLength(3);
    await expect(timelineItems[0]).toHaveAttribute("data-status", "completed");
    await expect(timelineItems[1]).toHaveAttribute("data-status", "active");
    await expect(timelineItems[2]).toHaveAttribute("data-status", "pending");
  }
};
