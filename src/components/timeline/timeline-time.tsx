import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type TimelineTimeProps = React.ComponentProps<"time"> & {
  asChild?: boolean;
};

export function TimelineTime({ asChild = false, className, ...props }: TimelineTimeProps) {
  const TimePrimitive = asChild ? Slot : "time";

  return (
    <TimePrimitive data-slot="timeline-time" className={cn("text-muted-foreground text-xs", className)} {...props} />
  );
}
