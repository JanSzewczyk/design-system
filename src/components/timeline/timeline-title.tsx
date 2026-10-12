import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

export type TimelineTitleProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineTitle({ asChild = false, className, ...props }: TimelineTitleProps) {
  const TitlePrimitive = asChild ? Slot : "div";

  return (
    <TitlePrimitive className={cn("font-semibold leading-none", className)} data-slot="timeline-title" {...props} />
  );
}
