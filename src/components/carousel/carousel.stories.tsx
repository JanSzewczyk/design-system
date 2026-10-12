import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import preview from "~/.storybook/preview";
import { Card } from "~/components/card";
import { Carousel } from "./carousel";
import { type CarouselApi } from "./carousel.context";
import { CarouselContent } from "./carousel-content";
import { CarouselItem } from "./carousel-item";
import { CarouselNext } from "./carousel-next";
import { CarouselPrevious } from "./carousel-previous";

const meta = preview.meta({
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  },
  component: Carousel,
  tags: ["autodocs"],
  title: "Components/Carousel"
});

export const Horizontal = meta.story({
  render: (args) => (
    <div className="flex justify-center px-12">
      <Carousel {...args} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-4xl">{index + 1}</span>
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
            <CarouselItem className="basis-1/2 pt-1" key={index}>
              <div className="p-1">
                <Card className="flex h-[100px] items-center justify-center p-6">
                  <span className="font-semibold text-3xl">{index + 1}</span>
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

export const Sizes = meta.story({
  args: {
    opts: {
      align: "start"
    }
  },
  render: (args) => (
    <div className="flex justify-center px-12">
      <Carousel {...args} className="w-full max-w-48 sm:max-w-xs md:max-w-sm">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="basis-1/2 lg:basis-1/3" key={index}>
              <div className="p-1">
                <Card className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-3xl">{index + 1}</span>
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

export const Spacing = meta.story({
  render: (args) => (
    <div className="flex justify-center px-12">
      <Carousel {...args} className="w-full max-w-48 sm:max-w-xs md:max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="basis-1/2 pl-1 lg:basis-1/3" key={index}>
              <div className="p-1">
                <Card className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-2xl">{index + 1}</span>
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

export const Api = meta.story({
  render: (args) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    return (
      <div className="mx-auto max-w-40 sm:max-w-xs">
        <Carousel {...args} className="w-full max-w-xs" setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="m-px flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-4xl">{index + 1}</span>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-muted-foreground text-sm">
          Slide {current} of {count}
        </div>
      </div>
    );
  }
});

export const Plugin = meta.story({
  render: (args) => {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
      <div className="flex justify-center px-12">
        <Carousel
          {...args}
          className="w-full max-w-40 sm:max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.reset()}
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="flex aspect-square items-center justify-center p-6">
                    <span className="font-semibold text-4xl">{index + 1}</span>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
});

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("");
}

export const Rtl = meta.story({
  render: (args) => (
    <div className="flex justify-center px-12">
      <Carousel
        {...args}
        className="w-full max-w-48 sm:max-w-xs"
        dir="rtl"
        opts={{
          direction: "rtl"
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="flex aspect-square items-center justify-center p-6" dir="rtl">
                  <span className="font-semibold text-4xl">{toArabicNumerals(index + 1)}</span>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rtl:rotate-180" />
        <CarouselNext className="rtl:rotate-180" />
      </Carousel>
    </div>
  )
});
