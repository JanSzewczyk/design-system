import * as React from "react";

import { ArrowUpRightIcon, BellIcon, CloudIcon, FolderIcon, RefreshCcwIcon, SearchIcon, UsersIcon } from "lucide-react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Avatar, AvatarFallback, AvatarImage, Button, Input } from "~/components";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./index";

const meta = {
  title: "Components/Empty",
  component: Empty,
  subcomponents: { EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia },
  tags: ["autodocs", "new"]
} satisfies Meta<typeof Empty>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  ),
  play: async ({ canvas, canvasElement, step }) => {
    await step("Empty container is rendered", async () => {
      const empty = canvasElement.querySelector('[data-slot="empty"]');
      await expect(empty).toBeInTheDocument();
    });

    await step("Title and description are visible", async () => {
      await expect(canvas.getByText("No Projects Yet")).toBeVisible();
      await expect(canvas.getByText(/You haven't created any projects yet/)).toBeVisible();
    });

    await step("Action buttons are visible", async () => {
      await expect(canvas.getByRole("button", { name: "Create Project" })).toBeVisible();
      await expect(canvas.getByRole("button", { name: "Import Project" })).toBeVisible();
    });
  }
};

export const WithBorder: Story = {
  render: () => (
    <Empty border>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Empty with border has border class", async () => {
      const empty = canvasElement.querySelector('[data-slot="empty"]');
      await expect(empty).toHaveClass("border");
      await expect(empty).not.toHaveClass("border-dashed");
    });
  }
};

export const WithDashedBorder: Story = {
  render: () => (
    <Empty border="dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Empty with dashed border has both border classes", async () => {
      const empty = canvasElement.querySelector('[data-slot="empty"]');
      await expect(empty).toHaveClass("border");
      await expect(empty).toHaveClass("border-dashed");
    });
  }
};

export const Background: Story = {
  render: () => (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
};

export const EmptyAvatar: Story = {
  name: "Avatar",
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar>
            <AvatarImage src="https://github.com/JanSzewczyk.png" className="grayscale" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvasElement, step }) => {
    await step("EmptyMedia with default variant has correct data attribute", async () => {
      const media = canvasElement.querySelector('[data-slot="empty-icon"]');
      await expect(media).toHaveAttribute("data-variant", "default");
    });
  }
};

export const SearchResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find anything matching your search. Try adjusting your filters or search terms.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear Filters</Button>
      </EmptyContent>
    </Empty>
  )
};

export const NoUsers: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersIcon />
        </EmptyMedia>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>Your team is empty. Invite members to collaborate on projects together.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Invite Members</Button>
      </EmptyContent>
    </Empty>
  )
};

export const EmptyInput: Story = {
  name: "Input",
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Input placeholder="Try searching for pages..." />
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvas, step }) => {
    await step("Input is rendered and visible", async () => {
      const input = canvas.getByPlaceholderText("Try searching for pages...");
      await expect(input).toBeVisible();
    });

    await step("Link in description is rendered", async () => {
      const link = canvas.getByRole("link", { name: "Contact support" });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "#");
    });
  }
};

// Test-only stories for comprehensive testing
export const DataAttributesTest: Story = {
  tags: ["test-only"],
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>Test Title</EmptyTitle>
        <EmptyDescription>Test description text.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Test Action</Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvas, canvasElement, step }) => {
    await step("Empty has correct data-slot attribute", async () => {
      const empty = canvasElement.querySelector('[data-slot="empty"]');
      await expect(empty).toBeInTheDocument();
      await expect(empty).toHaveAttribute("data-slot", "empty");
    });

    await step("EmptyHeader has correct data-slot attribute", async () => {
      const header = canvasElement.querySelector('[data-slot="empty-header"]');
      await expect(header).toBeInTheDocument();
      await expect(header).toHaveAttribute("data-slot", "empty-header");
    });

    await step("EmptyMedia has correct data-slot attribute", async () => {
      const media = canvasElement.querySelector('[data-slot="empty-icon"]');
      await expect(media).toBeInTheDocument();
      await expect(media).toHaveAttribute("data-slot", "empty-icon");
      await expect(media).toHaveAttribute("data-variant", "icon");
    });

    await step("EmptyTitle has correct data-slot attribute", async () => {
      const title = canvas.getByText("Test Title");
      await expect(title).toHaveAttribute("data-slot", "empty-title");
    });

    await step("EmptyDescription has correct data-slot attribute", async () => {
      const description = canvas.getByText("Test description text.");
      await expect(description).toHaveAttribute("data-slot", "empty-description");
    });

    await step("EmptyContent has correct data-slot attribute", async () => {
      const content = canvasElement.querySelector('[data-slot="empty-content"]');
      await expect(content).toBeInTheDocument();
      await expect(content).toHaveAttribute("data-slot", "empty-content");
    });
  }
};

export const BorderVariantsTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex flex-col gap-8">
      <Empty data-testid="empty-no-border">
        <EmptyHeader>
          <EmptyTitle>No Border</EmptyTitle>
        </EmptyHeader>
      </Empty>
      <Empty border data-testid="empty-solid-border">
        <EmptyHeader>
          <EmptyTitle>Solid Border</EmptyTitle>
        </EmptyHeader>
      </Empty>
      <Empty border="dashed" data-testid="empty-dashed-border">
        <EmptyHeader>
          <EmptyTitle>Dashed Border</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Empty without border prop has no border class", async () => {
      const empty = canvasElement.querySelector('[data-testid="empty-no-border"]');
      await expect(empty).not.toHaveClass("border");
      await expect(empty).not.toHaveClass("border-dashed");
    });

    await step("Empty with border={true} has border class but not border-dashed", async () => {
      const empty = canvasElement.querySelector('[data-testid="empty-solid-border"]');
      await expect(empty).toHaveClass("border");
      await expect(empty).not.toHaveClass("border-dashed");
    });

    await step("Empty with border='dashed' has both border and border-dashed classes", async () => {
      const empty = canvasElement.querySelector('[data-testid="empty-dashed-border"]');
      await expect(empty).toHaveClass("border");
      await expect(empty).toHaveClass("border-dashed");
    });
  }
};

export const MediaVariantsTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex flex-col gap-8">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default" data-testid="media-default">
            <FolderIcon className="text-muted-foreground size-16" />
          </EmptyMedia>
          <EmptyTitle>Default Media Variant</EmptyTitle>
        </EmptyHeader>
      </Empty>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" data-testid="media-icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>Icon Media Variant</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("EmptyMedia with default variant has correct attributes", async () => {
      const media = canvasElement.querySelector('[data-testid="media-default"]');
      await expect(media).toHaveAttribute("data-variant", "default");
      await expect(media).toHaveClass("bg-transparent");
    });

    await step("EmptyMedia with icon variant has correct attributes and styling", async () => {
      const media = canvasElement.querySelector('[data-testid="media-icon"]');
      await expect(media).toHaveAttribute("data-variant", "icon");
      await expect(media).toHaveClass("bg-muted");
    });
  }
};

export const AllSubcomponentsTest: Story = {
  tags: ["test-only"],
  render: () => (
    <Empty border>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>Complete Empty State</EmptyTitle>
        <EmptyDescription>
          This tests all subcomponents together. <a href="#">Learn more</a>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvas, canvasElement, step }) => {
    await step("All structural elements are present", async () => {
      await expect(canvasElement.querySelector('[data-slot="empty"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('[data-slot="empty-header"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('[data-slot="empty-icon"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('[data-slot="empty-title"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('[data-slot="empty-description"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('[data-slot="empty-content"]')).toBeInTheDocument();
    });

    await step("Text content is visible", async () => {
      await expect(canvas.getByText("Complete Empty State")).toBeVisible();
      await expect(canvas.getByText(/This tests all subcomponents together/)).toBeVisible();
    });

    await step("Action buttons are accessible", async () => {
      const primaryButton = canvas.getByRole("button", { name: "Primary Action" });
      const secondaryButton = canvas.getByRole("button", { name: "Secondary Action" });

      await expect(primaryButton).toBeVisible();
      await expect(secondaryButton).toBeVisible();
    });

    await step("Link in description works", async () => {
      const link = canvas.getByRole("link", { name: "Learn more" });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "#");
    });

    await step("Border is applied correctly", async () => {
      const empty = canvasElement.querySelector('[data-slot="empty"]');
      await expect(empty).toHaveClass("border");
    });
  }
};
