import { expect } from "storybook/test";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { TabsList, TabsTrigger, TabsContent }
});

// ---------------------------------------------------------------------------
// DefaultDemo
// ---------------------------------------------------------------------------

export const TabsStory = meta.story({
  name: "Tabs",
  render() {
    return (
      <Tabs defaultValue="overview" className="w-140">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              View your key metrics and recent project activity. Track progress across all your active projects.
            </p>
            <p className="mt-2 text-sm">You have 12 active projects and 3 pending tasks.</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Track performance and user engagement metrics. Monitor trends and identify growth opportunities.
            </p>
            <p className="mt-2 text-sm">Page views are up 25% compared to last month.</p>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Reports</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Generate and download your detailed reports. Export data in multiple formats for analysis.
            </p>
            <p className="mt-2 text-sm">You have 5 reports ready and available to export.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Manage your account preferences and options. Customize your experience to fit your needs.
            </p>
            <p className="mt-2 text-sm">Configure notifications, security, and themes.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
});

TabsStory.test("Renders 4 tabs", async ({ canvas }) => {
  await expect(canvas.getAllByRole("tab")).toHaveLength(4);
});

TabsStory.test("Overview tab is active by default", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveAttribute("data-state", "active");
});

TabsStory.test("Overview content is visible by default", async ({ canvas }) => {
  await expect(canvas.getByText("You have 12 active projects and 3 pending tasks.")).toBeVisible();
});

TabsStory.test("Clicking Analytics tab activates it and shows its content", async ({ canvas, userEvent, step }) => {
  const analyticsTab = canvas.getByRole("tab", { name: "Analytics" });

  await step("Click Analytics tab", async () => {
    await userEvent.click(analyticsTab);
    await expect(analyticsTab).toHaveAttribute("data-state", "active");
  });

  await step("Analytics content is visible", async () => {
    await expect(canvas.getByText("Page views are up 25% compared to last month.")).toBeVisible();
  });
});

TabsStory.test("Clicking Reports tab shows Reports content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("tab", { name: "Reports" }));
  await expect(canvas.getByText("You have 5 reports ready and available to export.")).toBeVisible();
});

TabsStory.test("Clicking Settings tab shows Settings content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("tab", { name: "Settings" }));
  await expect(canvas.getByText("Configure notifications, security, and themes.")).toBeVisible();
});

// ---------------------------------------------------------------------------
// LineVariant
// ---------------------------------------------------------------------------

export const LineVariant = meta.story({
  render() {
    return (
      <Tabs defaultValue="overview" className="w-125">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Overview content.</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Analytics content.</p>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Reports content.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
});

LineVariant.test("TabsList has data-variant=line", async ({ canvas }) => {
  await expect(canvas.getByRole("tablist")).toHaveAttribute("data-variant", "line");
});

LineVariant.test("First tab is active by default", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveAttribute("data-state", "active");
});

LineVariant.test("Clicking Analytics tab switches content", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("tab", { name: "Analytics" }));
  await expect(canvas.getByText("Analytics content.")).toBeVisible();
});

// ---------------------------------------------------------------------------
// VerticalOrientation
// ---------------------------------------------------------------------------

export const VerticalOrientation = meta.story({
  render() {
    return (
      <Tabs defaultValue="account" orientation="vertical" className="w-150">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Account settings content.</p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Password settings content.</p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Notifications settings content.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
});

VerticalOrientation.test("Root element has data-orientation=vertical", async ({ canvas }) => {
  const root = canvas.getByRole("tablist").closest('[data-slot="tabs"]');
  await expect(root).toHaveAttribute("data-orientation", "vertical");
});

VerticalOrientation.test("TabsList has aria-orientation=vertical", async ({ canvas }) => {
  await expect(canvas.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
});

VerticalOrientation.test("Clicking Password tab activates it", async ({ canvas, userEvent }) => {
  const passwordTab = canvas.getByRole("tab", { name: "Password" });
  await userEvent.click(passwordTab);
  await expect(passwordTab).toHaveAttribute("data-state", "active");
});

// ---------------------------------------------------------------------------
// WithDisabled
// ---------------------------------------------------------------------------

export const WithDisabled = meta.story({
  render() {
    return (
      <Tabs defaultValue="home" className="w-96">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Home content.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Settings content.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
});

WithDisabled.test("Settings tab has disabled attribute", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Settings" })).toBeDisabled();
});

WithDisabled.test("Home tab is active by default", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Home" })).toHaveAttribute("data-state", "active");
});

WithDisabled.test("Settings tab has data-state=inactive", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Settings" })).toHaveAttribute("data-state", "inactive");
});

// ---------------------------------------------------------------------------
// WithIcons
// ---------------------------------------------------------------------------

export const WithIcons = meta.story({
  render() {
    return (
      <Tabs defaultValue="preview" className="w-96">
        <TabsList>
          <TabsTrigger value="preview">
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
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="M6 8h.01M2 12h20" />
            </svg>
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
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
              aria-hidden="true"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Component preview content.</p>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="rounded-lg border p-4">
            <p className="text-sm">Source code content.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
});

WithIcons.test("Renders 2 tabs", async ({ canvas }) => {
  await expect(canvas.getAllByRole("tab")).toHaveLength(2);
});

WithIcons.test("Each trigger contains an SVG element", async ({ canvas }) => {
  const tabs = canvas.getAllByRole("tab");
  for (const tab of tabs) {
    await expect(tab.querySelector("svg")).toBeInTheDocument();
  }
});

WithIcons.test("Preview tab is active by default", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: "Preview" })).toHaveAttribute("data-state", "active");
});
