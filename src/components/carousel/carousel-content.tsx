import * as React from "react";

import { useCarousel } from "./carousel.context";
import { carouselContentVariants } from "./carousel.styles";

export type CarouselContentProps = React.ComponentProps<"div">;

export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div className={carouselContentVariants({ orientation, className })} {...props} />
    </div>
  );
}
