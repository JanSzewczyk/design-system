import * as React from "react";

import { HomeIcon, LayoutDashboardIcon, PanelLeftIcon, SearchIcon, SettingsIcon, UsersIcon } from "lucide-react";

import { expect } from "storybook/test";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sidebar",
  component: SidebarProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle: "A composable sidebar navigation component with mobile support and collapsible states."
    },
    layout: "fullscreen"
  }
});

function DemoSidebar({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded text-xs font-bold">
              A
            </div>
            <span className="text-sm font-semibold">Acme Corp</span>
          </div>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home">
                    <HomeIcon />
                    <span>Home</span>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Users">
                    <UsersIcon />
                    <span>Users</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive>
                        <span>All Users</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Admins</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-muted-foreground px-2 py-1 text-xs">Version 1.0.0</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Main Content</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6">
          {children ?? <p className="text-muted-foreground text-sm">Select an item from the sidebar to get started.</p>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Default = meta.story({
  name: "Default",
  render() {
    return <DemoSidebar />;
  }
});

Default.test("renders sidebar wrapper with data-slot attribute", async ({ canvasElement }) => {
  const wrapper = canvasElement.querySelector('[data-slot="sidebar-wrapper"]');
  await expect(wrapper).toBeTruthy();
});

Default.test("renders sidebar with navigation items", async ({ canvas }) => {
  await expect(canvas.getByText("Dashboard")).toBeVisible();
  await expect(canvas.getByText("Home")).toBeVisible();
  await expect(canvas.getByText("Users")).toBeVisible();
  await expect(canvas.getByText("Settings")).toBeVisible();
});

Default.test("renders sidebar header and footer", async ({ canvas }) => {
  await expect(canvas.getByText("Acme Corp")).toBeVisible();
  await expect(canvas.getByText("Version 1.0.0")).toBeVisible();
});

Default.test("renders sidebar trigger button", async ({ canvasElement }) => {
  const trigger = canvasElement.querySelector('[data-slot="sidebar-trigger"]');
  await expect(trigger).toBeTruthy();
});

Default.test("renders sub-menu items", async ({ canvas }) => {
  await expect(canvas.getByText("All Users")).toBeVisible();
  await expect(canvas.getByText("Admins")).toBeVisible();
});

Default.test("renders menu badge", async ({ canvas }) => {
  await expect(canvas.getByText("3")).toBeVisible();
});

export const Collapsed = meta.story({
  name: "Collapsed",
  render() {
    return (
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded text-xs font-bold">
                A
              </div>
              <span className="text-sm font-semibold">Acme Corp</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard">
                      <LayoutDashboardIcon />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Search">
                      <SearchIcon />
                      <span>Search</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Content Area</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    );
  }
});

Collapsed.test("renders sidebar in collapsed state", async ({ canvasElement }) => {
  const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
  await expect(sidebar).toBeTruthy();
  await expect(sidebar?.getAttribute("data-state")).toBe("collapsed");
});

export const SkeletonLoading = meta.story({
  name: "Skeleton Loading",
  render() {
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded text-xs font-bold">
                A
              </div>
              <span className="text-sm font-semibold">Acme Corp</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Loading...</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Loading state</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    );
  }
});

SkeletonLoading.test("renders skeleton items", async ({ canvasElement }) => {
  const skeletons = canvasElement.querySelectorAll('[data-sidebar="menu-skeleton"]');
  await expect(skeletons.length).toBe(5);
});

SkeletonLoading.test("renders skeleton icon placeholders", async ({ canvasElement }) => {
  const icons = canvasElement.querySelectorAll('[data-sidebar="menu-skeleton-icon"]');
  await expect(icons.length).toBe(5);
});

SkeletonLoading.test("renders skeleton text placeholders", async ({ canvasElement }) => {
  const texts = canvasElement.querySelectorAll('[data-sidebar="menu-skeleton-text"]');
  await expect(texts.length).toBe(5);
});

export const FloatingVariant = meta.story({
  name: "Floating Variant",
  render() {
    return (
      <SidebarProvider>
        <Sidebar variant="floating">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded text-xs font-bold">
                F
              </div>
              <span className="text-sm font-semibold">Floating</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <LayoutDashboardIcon />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Floating Sidebar</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    );
  }
});

FloatingVariant.test("renders sidebar with floating variant", async ({ canvasElement }) => {
  const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
  await expect(sidebar?.getAttribute("data-variant")).toBe("floating");
});

export const IconCollapsible = meta.story({
  name: "Icon Collapsible",
  render() {
    return (
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded text-xs font-bold">
                A
              </div>
              <span className="text-sm font-semibold">Acme Corp</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Dashboard">
                      <LayoutDashboardIcon />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Users">
                      <UsersIcon />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Icon Collapsible Sidebar</span>
          </header>
          <div className="p-6">
            <p className="text-muted-foreground text-sm">
              Collapse the sidebar to icon-only mode using the trigger or Ctrl/Cmd+B.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
});

IconCollapsible.test("renders sidebar with icon collapsible mode", async ({ canvasElement }) => {
  const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
  await expect(sidebar).toBeTruthy();
});

IconCollapsible.test("renders menu buttons with tooltips", async ({ canvas }) => {
  await expect(canvas.getByText("Dashboard")).toBeVisible();
  await expect(canvas.getByText("Users")).toBeVisible();
  await expect(canvas.getByText("Settings")).toBeVisible();
});

export const PanelLeftIconStory = meta.story({
  name: "With Right Side",
  render() {
    return (
      <SidebarProvider>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <span className="flex-1 text-sm font-medium">Main Content</span>
            <SidebarTrigger>
              <PanelLeftIcon />
            </SidebarTrigger>
          </header>
        </SidebarInset>
        <Sidebar side="right">
          <SidebarHeader>
            <div className="px-2 py-1 text-sm font-semibold">Right Panel</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Options</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon />
                      <span>Preferences</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
  }
});

PanelLeftIconStory.test("renders right-side sidebar", async ({ canvasElement }) => {
  const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
  await expect(sidebar?.getAttribute("data-side")).toBe("right");
});
