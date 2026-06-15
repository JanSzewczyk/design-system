import * as React from "react";

import { cn } from "~/utils";

import { useCarousel } from "./carousel.context";
import { carouselItemVariants } from "./carousel.styles";

export type CarouselItemProps = React.ComponentProps<"div">;

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(carouselItemVariants({ orientation, className }))}
      {...props}
    />
  );
}
