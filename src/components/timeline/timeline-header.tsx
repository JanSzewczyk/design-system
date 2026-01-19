import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type TimelineHeaderProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineHeader({ asChild, className, ...props }: TimelineHeaderProps) {
  const HeaderPrimitive = asChild ? Slot : "div";

  return <HeaderPrimitive data-slot="timeline-header" className={cn("flex flex-col gap-1", className)} {...props} />;
}
