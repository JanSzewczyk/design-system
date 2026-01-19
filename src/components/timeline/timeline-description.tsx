import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type TimelineDescriptionProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineDescription({ asChild = false, className, ...props }: TimelineDescriptionProps) {
  const DescriptionPrimitive = asChild ? Slot : "div";

  return (
    <DescriptionPrimitive
      data-slot="timeline-description"
      {...props}
      className={cn("text-muted-foreground text-sm", className)}
    />
  );
}
