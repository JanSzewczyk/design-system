import { expect } from "storybook/test";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import { Header } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="flex w-full justify-between">
        <h1 className="text-heading-4">LOGO</h1>
        <div className="ml-16 flex flex-row items-center">
          <div className="mr-8 flex flex-row items-center gap-4">
            <div className="text-button">Docs</div>
            <div className="text-button">Source</div>
          </div>

          <Avatar>
            <AvatarImage
              alt="User avatar"
              src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
            />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["container", "full"],
      description:
        "Controls the width constraint of the header's inner content area. `container` constrains content to the responsive container max-width; `full` stretches content to the full viewport width with horizontal padding.",
      table: {
        defaultValue: { summary: "container" }
      }
    }
  }
});

export const Container = meta.story({});

Container.test("Renders correctly", async ({ canvas, step }) => {
  await step("Header element is visible with correct slot", async () => {
    const header = canvas.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toHaveAttribute("data-slot", "header");
  });
  await step("Children are rendered", async () => {
    await expect(canvas.getByText("LOGO")).toBeVisible();
  });
});

Container.test("Applies container layout class", async ({ canvas }) => {
  const inner = canvas.getByRole("banner").querySelector("div");
  await expect(inner).toHaveClass("container");
});

export const Full = meta.story({
  args: {
    variant: "full"
  }
});

Full.test("Renders correctly", async ({ canvas, step }) => {
  await step("Header element is visible with correct slot", async () => {
    const header = canvas.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toHaveAttribute("data-slot", "header");
  });
  await step("Children are rendered", async () => {
    await expect(canvas.getByText("LOGO")).toBeVisible();
  });
});

Full.test("Applies full-width layout classes", async ({ canvas }) => {
  const inner = canvas.getByRole("banner").querySelector("div");
  await expect(inner).toHaveClass("w-full");
});
