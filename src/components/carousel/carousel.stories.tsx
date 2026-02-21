import * as React from "react";

import { Card } from "~/components/card";

import { Carousel } from "./carousel";
import { CarouselContent } from "./carousel-content";
import { CarouselItem } from "./carousel-item";
import { CarouselNext } from "./carousel-next";
import { CarouselPrevious } from "./carousel-previous";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  }
});

export const Default = meta.story({
  render: (args) => (
    <div className="flex justify-center px-12">
      <Carousel {...args} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
});

export const Vertical = meta.story({
  args: {
    orientation: "vertical"
  },
  render: (args) => (
    <div className="flex justify-center py-12">
      <Carousel
        {...args}
        className="w-full max-w-xs"
        opts={{
          align: "start"
        }}
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2 pt-1">
              <div className="p-1">
                <Card className="flex h-[100px] items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
});
