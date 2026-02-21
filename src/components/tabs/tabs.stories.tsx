import * as React from "react";

import { expect } from "storybook/test";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  tags: ["autodocs", "new"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The value of tab that should be active when initially rendered"
    },
    value: {
      control: "text",
      description: "The controlled value of tab to activate"
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of tabs",
      table: {
        defaultValue: { summary: "horizontal" }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
});

export const Default = meta.story({
  render: () => (
    <Tabs defaultValue="account" className="w-100">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Account</h3>
          <p className="mt-2 text-sm text-gray-400">Make changes to your account here. Click save when you are done.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Password</h3>
          <p className="mt-2 text-sm text-gray-400">Change your password here. After saving, you will be logged out.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const tabs = canvas.getByRole("tablist");
    await expect(tabs).toBeVisible();
    await expect(tabs).toHaveAttribute("data-slot", "tabs-list");

    const accountTab = canvas.getByRole("tab", { name: "Account" });
    await expect(accountTab).toHaveAttribute("data-state", "active");

    const accountContent = canvas.getByText(/Make changes to your account here/);
    await expect(accountContent).toBeVisible();
  }
});

export const ThreeTabs = meta.story({
  render: () => (
    <Tabs defaultValue="overview" className="w-125">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Overview</h3>
          <p className="mt-2 text-sm text-gray-400">View your dashboard overview and key metrics.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Analytics</h3>
          <p className="mt-2 text-sm text-gray-400">Detailed analytics and insights about your data.</p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-gray-100">Reports</h3>
          <p className="mt-2 text-sm text-gray-400">Generate and download reports.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs).toHaveLength(3);
  }
});

export const TabSwitching = meta.story({
  render: () => (
    <Tabs defaultValue="tab1" className="w-100">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Content for Tab 1</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Content for Tab 2</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Content for Tab 3</p>
        </div>
      </TabsContent>
    </Tabs>
  )
});

export const DisabledTab = meta.story({
  render: () => (
    <Tabs defaultValue="active" className="w-100">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">This tab is active and clickable.</p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">You should not see this content.</p>
        </div>
      </TabsContent>
      <TabsContent value="other">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">This is other tab content.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const disabledTab = canvas.getByRole("tab", { name: "Disabled" });
    await expect(disabledTab).toBeDisabled();

    // Verify active tab stays active (disabled tab should not be selectable)
    const activeTab = canvas.getByRole("tab", { name: "Active" });
    await expect(activeTab).toHaveAttribute("data-state", "active");

    // Verify disabled tab has correct attributes
    await expect(disabledTab).toHaveAttribute("data-state", "inactive");
  }
});

export const WithIcons = meta.story({
  render: () => (
    <Tabs defaultValue="music" className="w-100">
      <TabsList>
        <TabsTrigger value="music">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          Music
        </TabsTrigger>
        <TabsTrigger value="photos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0-.777-.416V7.87a.5.5 0L6 21" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m16 13-5.223 3.482a.5.5 0 .777-.416V7.87a.5.5 0L6 21" />
          </svg>
          Photos
        </TabsTrigger>
        <TabsTrigger value="videos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 13 5.223 3.482a.5.5 0 .777-.416V7.87a.5.5 0L6 21" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a.5.5 0L6 21" />
          </svg>
          Videos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="music">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Your music library.</p>
        </div>
      </TabsContent>
      <TabsContent value="photos">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Your photo gallery.</p>
        </div>
      </TabsContent>
      <TabsContent value="videos">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Your video collection.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs).toHaveLength(3);

    // Each tab should contain an SVG icon
    for (const tab of tabs) {
      const svg = tab.querySelector("svg");
      await expect(svg).toBeInTheDocument();
    }
  }
});

export const FullWidth = meta.story({
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          All
        </TabsTrigger>
        <TabsTrigger value="unread" className="flex-1">
          Unread
        </TabsTrigger>
        <TabsTrigger value="archived" className="flex-1">
          Archived
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">All messages</p>
        </div>
      </TabsContent>
      <TabsContent value="unread">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Unread messages</p>
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="bg-app-foreground rounded-lg border border-gray-800 p-4">
          <p className="text-sm text-gray-300">Archived messages</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const tabsList = canvas.getByRole("tablist");
    await expect(tabsList).toHaveClass("w-full");
  }
});

export const SettingsExample = meta.story({
  render: () => (
    <Tabs defaultValue="general" className="w-125">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="bg-app-foreground space-y-4 rounded-lg border border-gray-800 p-4">
          <div>
            <label className="text-sm font-medium text-gray-100">Display Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-100">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-100">Current Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-100">New Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="bg-app-foreground space-y-4 rounded-lg border border-gray-800 p-4">
          <h3 className="mb-4 text-lg font-semibold text-gray-100">Security</h3>
          <div>
            <label className="text-sm font-medium text-gray-100">Current Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-100">New Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="bg-app-foreground space-y-4 rounded-lg border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-100">Email notifications</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-100">Push notifications</span>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-100">SMS notifications</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Display Name")).toBeVisible();

    const securityTab = canvas.getByRole("tab", { name: "Security" });
    await userEvent.click(securityTab);
    await expect(canvas.getByText("Current Password")).toBeVisible();

    const notificationsTab = canvas.getByRole("tab", { name: "Notifications" });
    await userEvent.click(notificationsTab);
    await expect(canvas.getByText("Email notifications")).toBeVisible();
  }
});

export const DataSlotAttributes = meta.story({
  tags: ["test"],
  render: () => (
    <Tabs defaultValue="test" className="w-75">
      <TabsList>
        <TabsTrigger value="test">Test Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="test">Test Content</TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, step }) => {
    await step("Tabs has correct data-slot attribute", async () => {
      const tabs = canvas.getByRole("tablist").closest('[data-slot="tabs"]');
      await expect(tabs).toHaveAttribute("data-slot", "tabs");
    });

    await step("TabsList has correct data-slot attribute", async () => {
      const tabsList = canvas.getByRole("tablist");
      await expect(tabsList).toHaveAttribute("data-slot", "tabs-list");
    });

    await step("TabsTrigger has correct data-slot attribute", async () => {
      const trigger = canvas.getByRole("tab");
      await expect(trigger).toHaveAttribute("data-slot", "tabs-trigger");
    });

    await step("TabsContent has correct data-slot attribute", async () => {
      const content = canvas.getByRole("tabpanel");
      await expect(content).toHaveAttribute("data-slot", "tabs-content");
    });
  }
});

export const KeyboardNavigation = meta.story({
  tags: ["test"],
  render: () => (
    <Tabs defaultValue="first" className="w-100">
      <TabsList>
        <TabsTrigger value="first">First</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
        <TabsTrigger value="third">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="first">First content</TabsContent>
      <TabsContent value="second">Second content</TabsContent>
      <TabsContent value="third">Third content</TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    const firstTab = canvas.getByRole("tab", { name: "First" });

    // Focus first tab
    await userEvent.click(firstTab);
    await expect(firstTab).toHaveFocus();

    // Use arrow key to navigate to next tab
    await userEvent.keyboard("{ArrowRight}");
    const secondTab = canvas.getByRole("tab", { name: "Second" });
    await expect(secondTab).toHaveFocus();

    // Navigate to third tab
    await userEvent.keyboard("{ArrowRight}");
    const thirdTab = canvas.getByRole("tab", { name: "Third" });
    await expect(thirdTab).toHaveFocus();

    // Navigate back with ArrowLeft
    await userEvent.keyboard("{ArrowLeft}");
    await expect(secondTab).toHaveFocus();
  }
});
