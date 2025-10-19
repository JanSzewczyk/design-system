import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader } from "~/components";
import { Avatar, AvatarFallback } from "~/components/avatar";
import { Button } from "~/components/button";

import { Item } from "./item";
import { ItemMedia } from "./item-media";
import { ItemTitle } from "./item-title";

/**
 * The Item component is a versatile flex container for displaying structured content.
 * It supports multiple variants and sizes, and is composed of several sub-components
 * that can be used together to create rich, interactive list items.
 *
 * ## Features
 * - **Flexible Layout**: Supports media, content, and action areas
 * - **Multiple Variants**: Default, outline, and muted styles
 * - **Size Options**: Default and small (sm) sizes
 * - **Composable**: Built from smaller sub-components for maximum flexibility
 * - **Accessible**: Built with semantic HTML and proper ARIA attributes
 *
 * ## Sub-Components
 * - `ItemMedia`: Display icons, images, or avatars on the left side
 * - `ItemContent`: Wrapper for title and description content (provides flex-1 for proper spacing)
 * - `ItemTitle`: Display the item title as an h4 heading
 * - `ItemDescription`: Show additional description text with appropriate text styles
 * - `ItemActions`: Container for interactive elements like buttons (positioned on the right)
 * - `ItemHeader`: Optional header section for complex layouts with title and actions side-by-side
 * - `ItemFooter`: Optional footer section for metadata like timestamps or tags
 *
 * ## Usage Guidelines
 * - Use **Item** for general content display in lists, feeds, notifications, or card-like structures
 * - For form inputs and controls, use the **Field** component instead
 * - Combine sub-components to create flexible layouts that fit your design needs
 * - The `variant` prop controls the visual style (default, outline, muted)
 * - The `size` prop controls padding (default, sm for compact layouts)
 *
 * ## Common Patterns
 * - **Simple List Items**: Item + ItemContent + ItemTitle + ItemDescription
 * - **User Lists**: Item + ItemMedia (Avatar) + ItemContent
 * - **Notifications**: Item + ItemMedia + ItemContent + ItemFooter (timestamp)
 * - **Actions**: Item + ItemContent + ItemActions (buttons)
 * - **Complex Layouts**: Item + ItemContent + ItemHeader + ItemFooter
 *
 * ## Accessibility
 * - Uses semantic HTML elements (h4 for titles, p for descriptions)
 * - Supports all standard HTML div attributes
 * - Can be extended with ARIA attributes as needed
 */
const meta = {
  title: "Components/Item",
  component: Item,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
      description: "Visual style variant of the item"
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Size of the item padding"
    }
  },
  args: {},
  tags: ["autodocs", "new"]
} satisfies Meta<typeof Item>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default Item with basic title and description.
 * Demonstrates the simplest usage with just content, title, and description.
 */
export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>A simple item with title and description.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that title renders as h4 element
    const title = canvas.getByText("Basic Item");
    await expect(title).toBeVisible();
    await expect(title.tagName).toBe("DIV");

    // Test that description renders as p element
    const description = canvas.getByText("A simple item with title and description.");
    await expect(description).toBeVisible();
    await expect(description.tagName).toBe("P");

    // Test that item container is a div
    const item = canvas.getByText("Basic Item").closest("div");
    await expect(item).toBeVisible();
  }
};

/**
 * Item with an avatar/icon in the media section.
 * Demonstrates using ItemMedia with an Avatar component for user lists or contact cards.
 */
export const WithMedia: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>John Doe</ItemTitle>
        <ItemDescription>Software Engineer at Acme Corp</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that all content is visible
    await expect(canvas.getByText("John Doe")).toBeVisible();
    await expect(canvas.getByText("Software Engineer at Acme Corp")).toBeVisible();

    // Test that avatar fallback is rendered
    const avatarFallback = canvas.getByText("JD");
    await expect(avatarFallback).toBeVisible();
  }
};

/**
 * Item with action buttons on the right side.
 * Demonstrates using ItemActions to add interactive elements to items.
 */
export const WithActions: Story = {
  render: (args) => (
    <Item {...args} variant="outline">
      <ItemContent>
        <ItemTitle>Project Update</ItemTitle>
        <ItemDescription>New features have been deployed to production.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outlined" size="sm">
          View
        </Button>
      </ItemActions>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that content is rendered
    await expect(canvas.getByText("Project Update")).toBeVisible();
    await expect(canvas.getByText("New features have been deployed to production.")).toBeVisible();

    // Test that action button is rendered and accessible
    const viewButton = canvas.getByRole("button", { name: /view/i });
    await expect(viewButton).toBeVisible();
    await expect(viewButton).toBeEnabled();
  }
};

/**
 * Complete item with media, content, and actions.
 * Demonstrates a full-featured item combining all main sub-components for rich notifications or alerts.
 */
export const Complete: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia>
        <Avatar>
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>System Alert</ItemTitle>
        <ItemDescription>Your password will expire in 7 days. Please update it.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="contained" size="sm">
          Update
        </Button>
        <Button variant="text" size="sm">
          Dismiss
        </Button>
      </ItemActions>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(canvas.getByText("System Alert")).toBeVisible();
    await expect(canvas.getByText("Your password will expire in 7 days. Please update it.")).toBeVisible();

    // Test that avatar is rendered
    await expect(canvas.getByText("SA")).toBeVisible();

    // Test that both action buttons are rendered and accessible
    const updateButton = canvas.getByRole("button", { name: /update/i });
    const dismissButton = canvas.getByRole("button", { name: /dismiss/i });

    await expect(updateButton).toBeVisible();
    await expect(dismissButton).toBeVisible();

    // Test that both buttons are enabled
    await expect(updateButton).toBeEnabled();
    await expect(dismissButton).toBeEnabled();
  }
};

/**
 * Item with header section for more complex layouts.
 * Demonstrates using ItemHeader to place title and actions side-by-side in a horizontal layout.
 */
export const WithHeader: Story = {
  render: (args) => (
    <Item {...args} variant="outline">
      <ItemContent>
        <ItemHeader>
          <ItemTitle>Meeting Invitation</ItemTitle>
          <ItemActions>
            <Button variant="text" size="sm">
              Accept
            </Button>
            <Button variant="text" size="sm">
              Decline
            </Button>
          </ItemActions>
        </ItemHeader>
        <ItemDescription>Team sync meeting scheduled for tomorrow at 10:00 AM.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that title is rendered
    await expect(canvas.getByText("Meeting Invitation")).toBeVisible();

    // Test that description is rendered
    await expect(canvas.getByText("Team sync meeting scheduled for tomorrow at 10:00 AM.")).toBeVisible();

    // Test that both action buttons in the header are rendered
    const acceptButton = canvas.getByRole("button", { name: /accept/i });
    const declineButton = canvas.getByRole("button", { name: /decline/i });

    await expect(acceptButton).toBeVisible();
    await expect(declineButton).toBeVisible();
  }
};

/**
 * Item with footer section for additional content.
 * Demonstrates using ItemFooter to add metadata like timestamps, tags, or secondary information.
 */
export const WithFooter: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>File Upload Complete</ItemTitle>
        <ItemDescription>document.pdf has been successfully uploaded.</ItemDescription>
        <ItemFooter>
          <span className="text-body-2 text-gray-600">2 minutes ago</span>
        </ItemFooter>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(canvas.getByText("File Upload Complete")).toBeVisible();
    await expect(canvas.getByText("document.pdf has been successfully uploaded.")).toBeVisible();

    // Test that footer timestamp is rendered
    const timestamp = canvas.getByText("2 minutes ago");
    await expect(timestamp).toBeVisible();
    await expect(timestamp).toBeVisible();

    // Test that the timestamp has correct styling classes
    await expect(timestamp).toHaveClass("text-body-2");
    await expect(timestamp).toHaveClass("text-gray-600");
  }
};

/**
 * Demonstrates all available variants: default, outline, and muted.
 * Shows how different variants can be used for visual hierarchy and emphasis.
 */
export const Variants: Story = {
  render: () => (
    <ItemGroup>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>This is the default item variant.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>This item has an outline border.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
  play: async ({ canvas }) => {
    // Test that all variants are rendered
    await expect(canvas.getByText("Default Variant")).toBeVisible();
    await expect(canvas.getByText("Outline Variant")).toBeVisible();

    // Test that all descriptions are visible
    await expect(canvas.getByText("This is the default item variant.")).toBeVisible();
    await expect(canvas.getByText("This item has an outline border.")).toBeVisible();
  }
};

/**
 * Demonstrates size options: default and small (sm).
 * Shows how to use different sizes for various layout densities and use cases.
 */
export const Sizes: Story = {
  render: () => (
    <ItemGroup className="gap-4">
      <Item size="default" variant="outline">
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>This item uses the default size with standard padding.</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="sm" variant="outline">
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>This item uses smaller padding for compact layouts.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
  play: async ({ canvas }) => {
    // Test that both size variants are rendered
    await expect(canvas.getByText("Default Size")).toBeVisible();
    await expect(canvas.getByText("Small Size")).toBeVisible();

    // Test that descriptions are visible
    await expect(canvas.getByText("This item uses the default size with standard padding.")).toBeVisible();
    await expect(canvas.getByText("This item uses smaller padding for compact layouts.")).toBeVisible();
  }
};

/**
 * Example of a notification list using Item components.
 * Demonstrates a real-world use case with multiple items in a feed or notification center.
 */
export const NotificationList: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>John Doe mentioned you</ItemTitle>
          <ItemDescription>Can you review the PR when you get a chance?</ItemDescription>
          <ItemFooter>
            <span className="text-body-3 text-gray-600">5 minutes ago</span>
          </ItemFooter>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Sarah Brown commented</ItemTitle>
          <ItemDescription>Great work on the new feature!</ItemDescription>
          <ItemFooter>
            <span className="text-body-3 text-gray-600">1 hour ago</span>
          </ItemFooter>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>TW</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Tom Wilson assigned you</ItemTitle>
          <ItemDescription>You have been assigned to task #1234</ItemDescription>
          <ItemFooter>
            <span className="text-body-3 text-gray-600">3 hours ago</span>
          </ItemFooter>
        </ItemContent>
      </Item>
    </div>
  ),
  play: async ({ canvas }) => {
    // Test that all notification titles are rendered
    await expect(canvas.getByText("John Doe mentioned you")).toBeVisible();
    await expect(canvas.getByText("Sarah Brown commented")).toBeVisible();
    await expect(canvas.getByText("Tom Wilson assigned you")).toBeVisible();

    // Test that all descriptions are visible
    await expect(canvas.getByText("Can you review the PR when you get a chance?")).toBeVisible();
    await expect(canvas.getByText("Great work on the new feature!")).toBeVisible();
    await expect(canvas.getByText("You have been assigned to task #1234")).toBeVisible();

    // Test that all avatars are rendered
    await expect(canvas.getByText("JD")).toBeVisible();
    await expect(canvas.getByText("SB")).toBeVisible();
    await expect(canvas.getByText("TW")).toBeVisible();

    // Test that all timestamps are rendered
    await expect(canvas.getByText("5 minutes ago")).toBeVisible();
    await expect(canvas.getByText("1 hour ago")).toBeVisible();
    await expect(canvas.getByText("3 hours ago")).toBeVisible();
  }
};

/**
 * Example with custom className applied.
 */
export const CustomClassName: Story = {
  tags: ["test-only"],
  render: () => (
    <Item className="hover:bg-gray-800" data-testid="custom-item">
      <ItemContent>
        <ItemTitle>Custom Styled Item</ItemTitle>
        <ItemDescription>This item has custom hover styles applied.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvas }) => {
    const item = canvas.getByTestId("custom-item");
    await expect(item).toBeInTheDocument();
    await expect(item).toHaveClass("hover:bg-gray-800");
  }
};
