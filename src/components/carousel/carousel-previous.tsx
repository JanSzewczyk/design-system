import { ArrowLeft } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/button";
import { cn } from "~/utils";

import { useCarousel } from "./carousel.context";

export type CarouselPreviousProps = React.ComponentProps<typeof Button>;

export function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }: CarouselPreviousProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      size={size}
      variant={variant}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}
