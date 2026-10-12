import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

export type TimelineHeaderProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineHeader({ asChild, className, ...props }: TimelineHeaderProps) {
  const HeaderPrimitive = asChild ? Slot : "div";

  return <HeaderPrimitive className={cn("flex flex-col gap-1", className)} data-slot="timeline-header" {...props} />;
}
