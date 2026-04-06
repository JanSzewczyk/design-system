import { ChevronDownIcon, DotIcon } from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
  }
});

// ---------------------------------------------------------------------------
// ThreeLevel
// ---------------------------------------------------------------------------

export const ThreeLevel = meta.story({
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
});

ThreeLevel.test("Renders correctly", async ({ canvas, step }) => {
  await step("Navigation landmark is visible", async () => {
    await expect(canvas.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
  });
  await step("All items are rendered", async () => {
    await expect(canvas.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Components" })).toBeVisible();
    await expect(canvas.getByText("Breadcrumb")).toBeVisible();
  });
});

ThreeLevel.test("Current page has aria-current", async ({ canvas }) => {
  const page = canvas.getByText("Breadcrumb");
  await expect(page).toHaveAttribute("aria-current", "page");
});

// ---------------------------------------------------------------------------
// Custom Separator
// ---------------------------------------------------------------------------

export const CustomSeparator = meta.story({
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
});

CustomSeparator.test("Renders correctly", async ({ canvas, step }) => {
  await step("Navigation landmark is visible", async () => {
    await expect(canvas.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
  });
  await step("Links and current page are rendered", async () => {
    await expect(canvas.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Components" })).toBeVisible();
    await expect(canvas.getByText("Breadcrumb")).toBeVisible();
  });
});

CustomSeparator.test("Separators are hidden from assistive technology", async () => {
  const separators = document.querySelectorAll('[data-slot="breadcrumb-separator"]');
  await expect(separators.length).toBe(2);
  for (const sep of Array.from(separators)) {
    await expect(sep).toHaveAttribute("aria-hidden", "true");
    await expect(sep).toHaveAttribute("role", "presentation");
  }
});

// ---------------------------------------------------------------------------
// With Dropdown
// ---------------------------------------------------------------------------

export const WithDropdown = meta.story({
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1">
                Components
                <ChevronDownIcon className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
});

WithDropdown.test("Renders correctly", async ({ canvas, step }) => {
  await step("Navigation landmark is visible", async () => {
    await expect(canvas.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
  });
  await step("Dropdown trigger is rendered", async () => {
    await expect(canvas.getByRole("button", { name: /components/i })).toBeVisible();
  });
});

WithDropdown.test("Clicking trigger opens dropdown menu", async ({ canvas, userEvent, step }) => {
  const trigger = canvas.getByRole("button", { name: /components/i });

  await step("Dropdown is closed initially", async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeInTheDocument();
  });

  await step("Dropdown opens on click", async () => {
    await userEvent.click(trigger);
    await waitFor(async () => {
      await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
    });
    await expect(screen.getByText("Documentation")).toBeVisible();
    await expect(screen.getByText("Themes")).toBeVisible();
    await expect(screen.getByText("GitHub")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Collapsed (Ellipsis)
// ---------------------------------------------------------------------------

export const Collapsed = meta.story({
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
});

Collapsed.test("Renders correctly", async ({ canvas, step }) => {
  await step("Navigation landmark is visible", async () => {
    await expect(canvas.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
  });
  await step("Visible links and current page are rendered", async () => {
    await expect(canvas.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Components" })).toBeVisible();
    await expect(canvas.getByText("Breadcrumb")).toBeVisible();
  });
});

Collapsed.test("Ellipsis is hidden from assistive technology", async () => {
  const ellipsis = document.querySelector('[data-slot="breadcrumb-ellipsis"]');
  await expect(ellipsis).toHaveAttribute("aria-hidden", "true");
  await expect(ellipsis).toHaveAttribute("role", "presentation");
});
