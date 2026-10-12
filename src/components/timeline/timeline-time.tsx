import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "~/utils";

export type TimelineTimeProps = React.ComponentProps<"time"> & {
  asChild?: boolean;
};

export function TimelineTime({ asChild = false, className, ...props }: TimelineTimeProps) {
  const TimePrimitive = asChild ? Slot : "time";

  return (
    <TimePrimitive className={cn("text-muted-foreground text-xs", className)} data-slot="timeline-time" {...props} />
  );
}
