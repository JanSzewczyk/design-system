import * as React from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "~/components/button";
import { cn } from "~/utils";

import { useCarousel } from "./carousel.context";

export type CarouselNextProps = React.ComponentProps<typeof Button>;

export function CarouselNext({ className, variant = "outline", size = "icon", ...props }: CarouselNextProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}
