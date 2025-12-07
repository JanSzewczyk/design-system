import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Separator } from "~/components/separator";

import { ScrollArea } from "./scroll-area";
import { ScrollBar } from "./scroll-bar";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs", "new"]
} satisfies Meta<typeof ScrollArea>;
export default meta;

type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const works = [
  {
    artist: "Claude Monet",
    art: "Water Lilies"
  },
  {
    artist: "Vincent van Gogh",
    art: "Starry Night"
  },
  {
    artist: "Leonardo da Vinci",
    art: "Mona Lisa"
  },
  {
    artist: "Johannes Vermeer",
    art: "Girl with a Pearl Earring"
  },
  {
    artist: "Edvard Munch",
    art: "The Scream"
  },
  {
    artist: "Gustav Klimt",
    art: "The Kiss"
  },
  {
    artist: "Sandro Botticelli",
    art: "The Birth of Venus"
  }
];

export const Example: Story = {
  render: () => (
    <ScrollArea className="border-border h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
};

export const HorizontalScrolling: Story = {
  render: () => (
    <ScrollArea className="border-border w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((work) => (
          <figure key={work.art} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={`https://avatar.vercel.sh/${work.art}`}
                alt={`Artwork: ${work.art}`}
                className="aspect-[3/4] h-fit w-[150px] object-cover"
              />
            </div>
            <figcaption className="text-muted-foreground pt-2 text-xs">
              <span className="text-foreground font-semibold">{work.artist}</span>
              <br />
              {work.art}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="border-border size-72 rounded-md border">
      <div className="w-[500px] p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Both Directions</h4>
        <p className="text-muted-foreground text-sm">
          This ScrollArea supports scrolling in both vertical and horizontal directions. The content inside is wider and
          taller than the visible area, allowing you to scroll in any direction to see the full content. This is useful
          for displaying large tables, code blocks, or any content that exceeds the container dimensions.
        </p>
        <div className="mt-4 grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="bg-muted flex size-20 items-center justify-center rounded-md text-sm">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
};

export const CustomHeight: Story = {
  render: () => (
    <div className="flex gap-4">
      <ScrollArea className="border-border h-40 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Small (h-40)</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="border-border h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Medium (h-72)</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="border-border h-96 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Large (h-96)</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
};

export const WithLongContent: Story = {
  render: () => (
    <ScrollArea className="border-border h-72 w-full max-w-lg rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Article</h4>
        <div className="text-muted-foreground space-y-4 text-sm">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
            ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur.
          </p>
        </div>
      </div>
    </ScrollArea>
  )
};

export const InteractionTest: Story = {
  tags: ["test-only"],
  render: () => (
    <div className="flex gap-4">
      <ScrollArea className="border-border h-40 w-48 rounded-md border" data-testid="vertical-scroll">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Vertical Scroll</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="border-border w-72 rounded-md border whitespace-nowrap" data-testid="horizontal-scroll">
        <div className="flex w-max space-x-4 p-4">
          {works.slice(0, 4).map((work) => (
            <figure key={work.art} className="shrink-0">
              <div className="bg-muted flex h-20 w-[100px] items-center justify-center rounded-md text-xs">
                {work.art}
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ScrollArea components are rendered", async () => {
      const verticalScrollArea = canvas.getByTestId("vertical-scroll");
      const horizontalScrollArea = canvas.getByTestId("horizontal-scroll");

      await expect(verticalScrollArea).toBeVisible();
      await expect(horizontalScrollArea).toBeVisible();

      await expect(verticalScrollArea).toHaveAttribute("data-slot", "scroll-area");
      await expect(horizontalScrollArea).toHaveAttribute("data-slot", "scroll-area");
    });

    await step("Content is visible within scroll areas", async () => {
      const verticalTitle = canvas.getByText("Vertical Scroll");
      await expect(verticalTitle).toBeVisible();

      const artworkItem = canvas.getByText("Water Lilies");
      await expect(artworkItem).toBeVisible();
    });
  }
};
