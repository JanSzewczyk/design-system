import { expect } from "storybook/test";
import { Field, FieldLabel, Select, SelectContent, SelectGroup, SelectItem } from "~/components";

import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Pagination",
  component: Pagination
});

export const PaginationStory = meta.story({
  name: "Pagination",
  render() {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
});

PaginationStory.test("Renders all sub-components with correct data-slots", async ({ canvas, step }) => {
  const nav = canvas.getByRole("navigation", { name: /pagination/i });

  await step("Navigation root has data-slot", async () => {
    await expect(nav).toHaveAttribute("data-slot", "pagination");
  });

  await step("Content list has data-slot", async () => {
    const content = nav.querySelector("[data-slot='pagination-content']");
    await expect(content).not.toBeNull();
  });

  await step("All list items have data-slot", async () => {
    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(6);
    for (const item of items) {
      await expect(item).toHaveAttribute("data-slot", "pagination-item");
    }
  });

  await step("Renders 5 pagination buttons (3 pages + prev + next)", async () => {
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(5);
  });
});

PaginationStory.test(
  "Active page has aria-current and data-active, inactive pages do not",
  async ({ canvas, step }) => {
    await step("Active page 2 has aria-current=page and data-active=true", async () => {
      const active = canvas.getByRole("button", { name: "2" });
      await expect(active).toHaveAttribute("aria-current", "page");
      await expect(active).toHaveAttribute("data-active", "true");
    });

    await step("Inactive pages 1 and 3 have no aria-current", async () => {
      const link1 = canvas.getByRole("button", { name: "1" });
      const link3 = canvas.getByRole("button", { name: "3" });
      await expect(link1).not.toHaveAttribute("aria-current");
      await expect(link3).not.toHaveAttribute("aria-current");
    });
  }
);

PaginationStory.test("Previous and Next buttons have correct aria-labels", async ({ canvas }) => {
  const prev = canvas.getByRole("button", { name: /go to previous page/i });
  const next = canvas.getByRole("button", { name: /go to next page/i });
  await expect(prev).toBeVisible();
  await expect(next).toBeVisible();
});

PaginationStory.test("Ellipsis has aria-hidden and sr-only text", async ({ canvas }) => {
  const nav = canvas.getByRole("navigation");
  const ellipsis = nav.querySelector("[data-slot='pagination-ellipsis']");
  await expect(ellipsis).not.toBeNull();
  await expect(ellipsis).toHaveAttribute("aria-hidden", "true");
  const srOnly = ellipsis!.querySelector(".sr-only");
  await expect(srOnly).not.toBeNull();
  await expect(srOnly!.textContent).toBe("More pages");
});

export const Simple = meta.story({
  render() {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
});

Simple.test("Renders five page buttons with only page 2 active", async ({ canvas, step }) => {
  const buttons = canvas.getAllByRole("button");

  await step("Renders exactly 5 page buttons", async () => {
    await expect(buttons).toHaveLength(5);
  });

  await step("Only page 2 has aria-current=page", async () => {
    for (const button of buttons) {
      if (button.textContent === "2") {
        await expect(button).toHaveAttribute("aria-current", "page");
      } else {
        await expect(button).not.toHaveAttribute("aria-current");
      }
    }
  });
});

export const IconsOnly = meta.story({
  name: "Icons Only",
  render() {
    return (
      <div className="flex items-center justify-between gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select defaultValue="25" className="w-20" id="select-rows-per-page">
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
});

IconsOnly.test("Renders previous and next navigation buttons", async ({ canvas }) => {
  const prev = canvas.getByRole("button", { name: /go to previous page/i });
  const next = canvas.getByRole("button", { name: /go to next page/i });
  await expect(prev).toBeVisible();
  await expect(next).toBeVisible();
});

IconsOnly.test("Custom className merges with pagination", async ({ canvas }) => {
  const nav = canvas.getByRole("navigation");
  await expect(nav).toHaveClass("mx-0");
  await expect(nav).toHaveClass("w-auto");
});
