import { Code, Layers, Rocket } from "lucide-react";

import { expect, within } from "storybook/test";
import preview from "~/.storybook/preview";
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

const meta = preview.meta({
  argTypes: {
    activeIndex: {
      control: { min: 0, type: "number" },
      description: "Index of currently active step (0-based)"
    },
    dir: {
      control: "select",
      description: "Text direction",
      options: ["ltr", "rtl"],
      table: {
        defaultValue: { summary: "ltr" }
      }
    },
    orientation: {
      control: "select",
      description: "The orientation of timeline",
      options: ["vertical", "horizontal"],
      table: {
        defaultValue: { summary: "vertical" }
      }
    },
    variant: {
      control: "select",
      description: "The visual variant of timeline",
      options: ["default", "alternate"],
      table: {
        defaultValue: { summary: "default" }
      }
    }
  },
  component: Timeline,
  subcomponents: {
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineDot,
    TimelineHeader,
    TimelineItem,
    TimelineTime,
    TimelineTitle
  },
  tags: ["autodocs", "new", "todo", "test"],
  title: "Components/Timeline"
});

const timelineItems = [
  {
    date: "January 15, 2025",
    dateTime: "2025-01-15",
    description: "Initial meeting to define scope.",
    id: "project-kickoff",
    title: "Project Kickoff"
  },
  {
    date: "February 1, 2025",
    dateTime: "2025-02-01",
    description: "Created wireframes and mockups.",
    id: "design-phase",
    title: "Design Phase"
  },
  {
    date: "March 1, 2025",
    dateTime: "2025-03-01",
    description: "Building core features.",
    id: "development",
    title: "Development"
  }
];

export const Example = meta.story({
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
  },
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
  )
});

const timelineItemsHorizontalTimeline = [
  {
    date: "Jan - Mar",
    dateTime: "2025-01",
    description: "Research and planning",
    id: "research-and-planning",
    title: "Q1"
  },
  {
    date: "Apr - Jun",
    dateTime: "2025-04",
    description: "Development sprint",
    id: "development-sprint",
    title: "Q2"
  },
  {
    date: "Jul - Sep",
    dateTime: "2025-07",
    description: "Beta launch",
    id: "beta-launch",
    title: "Q3"
  }
];

export const Horizontal = meta.story({
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
  },
  render: () => (
    <Timeline activeIndex={1} orientation="horizontal">
      {timelineItemsHorizontalTimeline.map((item) => (
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
  )
});

const timelineItemsRTL = [
  {
    date: "January 1, 2025",
    dateTime: "2025-01-01",
    description: "Online registration portal opens.",
    id: "registration-opened",
    title: "Registration Opened"
  },
  {
    date: "February 15, 2025",
    dateTime: "2025-02-15",
    description: "Last day for early bird pricing.",
    id: "early-bird-deadline",
    title: "Early Bird Deadline"
  },
  {
    date: "March 1, 2025",
    dateTime: "2025-03-01",
    description: "Main event begins at 9:00 AM.",
    id: "event-day",
    title: "Event Day"
  }
];

export const RTL = meta.story({
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
  },
  render: () => (
    <Timeline activeIndex={1} dir="rtl">
      {timelineItemsRTL.map((item) => (
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
  )
});

const timelineItemsAlternate = [
  {
    date: "January 15, 2025",
    dateTime: "2025-01-15",
    description: "Initial meeting to define scope.",
    id: "project-kickoff",
    title: "Project Kickoff"
  },
  {
    date: "February 1, 2025",
    dateTime: "2025-02-01",
    description: "Created wireframes and mockups.",
    id: "design-phase",
    title: "Design Phase"
  },
  {
    date: "March 1, 2025",
    dateTime: "2025-03-01",
    description: "Building core features.",
    id: "development",
    title: "Development"
  }
];

export const Alternate = meta.story({
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
  },
  render: () => (
    <Timeline activeIndex={1} variant="alternate">
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
  )
});

const timelineItemsHorizontalAlternate = [
  {
    date: "June 2023",
    dateTime: "2023-06",
    description: "Started with a team of five.",
    id: "company-founded",
    title: "Company Founded"
  },
  {
    date: "March 2024",
    dateTime: "2024-03",
    description: "Raised $10M seed funding.",
    id: "series-a-funding",
    title: "Series A Funding"
  },
  {
    date: "January 2025",
    dateTime: "2025-01",
    description: "Released MVP to beta testers.",
    id: "product-launch",
    title: "Product Launch"
  }
];

export const HorizontalAlternate = meta.story({
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
  },
  render: () => (
    <Timeline activeIndex={1} orientation="horizontal" variant="alternate">
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
  )
});

const timelineItemsWithCustomDots = [
  {
    date: "January 15, 2025",
    dateTime: "2025-01-15",
    description: "Initial meeting to define scope.",
    icon: Rocket,
    id: "project-kickoff",
    title: "Project Kickoff"
  },
  {
    date: "February 1, 2025",
    dateTime: "2025-02-01",
    description: "Created wireframes and mockups.",
    icon: Layers,
    id: "design-phase",
    title: "Design Phase"
  },
  {
    date: "March 1, 2025",
    dateTime: "2025-03-01",
    description: "Building core features.",
    icon: Code,
    id: "development",
    title: "Development"
  }
];

export const WithCustomDots = meta.story({
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
  },
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
  )
});
