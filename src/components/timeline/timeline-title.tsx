import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

export type TimelineTitleProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineTitle({ asChild = false, className, ...props }: TimelineTitleProps) {
  const TitlePrimitive = asChild ? Slot : "div";

  return (
    <TitlePrimitive data-slot="timeline-title" className={cn("leading-none font-semibold", className)} {...props} />
  );
}
