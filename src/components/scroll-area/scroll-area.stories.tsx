import * as React from "react";

import { expect, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { ScrollArea } from "~/components";
import { Separator } from "~/components/separator";
import { ScrollBar } from "./scroll-bar";

const meta = preview.meta({
  component: ScrollArea,
  tags: ["autodocs", "new"],
  title: "Components/ScrollArea"
});

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const works = [
  {
    art: "Water Lilies",
    artist: "Claude Monet"
  },
  {
    art: "Starry Night",
    artist: "Vincent van Gogh"
  },
  {
    art: "Mona Lisa",
    artist: "Leonardo da Vinci"
  },
  {
    art: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer"
  },
  {
    art: "The Scream",
    artist: "Edvard Munch"
  },
  {
    art: "The Kiss",
    artist: "Gustav Klimt"
  },
  {
    art: "The Birth of Venus",
    artist: "Sandro Botticelli"
  }
];

export const Example = meta.story({
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
});

export const HorizontalScrolling = meta.story({
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((work) => (
          <figure className="shrink-0" key={work.art}>
            <div className="overflow-hidden rounded-md">
              <img
                alt={`Artwork: ${work.art}`}
                className="aspect-3/4 h-fit w-37.5 object-cover"
                src={`https://avatar.vercel.sh/${work.art}`}
              />
            </div>
            <figcaption className="pt-2 text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">{work.artist}</span>
              <br />
              {work.art}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
});

export const BothDirections = meta.story({
  render: () => (
    <ScrollArea className="size-72 rounded-md border border-border">
      <div className="w-125 p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Both Directions</h4>
        <p className="text-muted-foreground text-sm">
          This ScrollArea supports scrolling in both vertical and horizontal directions. The content inside is wider and
          taller than visible area, allowing you to scroll in any direction to see full content. This is useful for
          displaying large tables, code blocks, or any content that exceeds the container dimensions.
        </p>
        <div className="mt-4 grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <div className="flex size-20 items-center justify-center rounded-md bg-muted text-sm" key={i}>
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
});

export const CustomHeight = meta.story({
  render: () => (
    <div className="flex gap-4">
      <ScrollArea className="h-40 w-48 rounded-md border border-border">
        <div className="p-4">
          <h4 className="mb-4 font-medium text-sm leading-none">Small (h-40)</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="h-72 w-48 rounded-md border border-border">
        <div className="p-4">
          <h4 className="mb-4 font-medium text-sm leading-none">Medium (h-72)</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="h-96 w-48 rounded-md border border-border">
        <div className="p-4">
          <h4 className="mb-4 font-medium text-sm leading-none">Large (h-96)</h4>
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
});

export const WithLongContent = meta.story({
  render: () => (
    <ScrollArea className="h-72 w-full max-w-lg rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Article</h4>
        <div className="space-y-4 text-muted-foreground text-sm">
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
});

export const InteractionTest = meta.story({
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
  },
  render: () => (
    <div className="flex gap-4">
      <ScrollArea className="h-40 w-48 rounded-md border border-border" data-testid="vertical-scroll">
        <div className="p-4">
          <h4 className="mb-4 font-medium text-sm leading-none">Vertical Scroll</h4>
          {tags.slice(0, 20).map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="w-72 whitespace-nowrap rounded-md border border-border" data-testid="horizontal-scroll">
        <div className="flex w-max space-x-4 p-4">
          {works.slice(0, 4).map((work) => (
            <figure className="shrink-0" key={work.art}>
              <div className="flex h-20 w-25 items-center justify-center rounded-md bg-muted text-xs">{work.art}</div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
});
