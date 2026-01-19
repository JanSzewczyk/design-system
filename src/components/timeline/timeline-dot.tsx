import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { useTimelineItemContext } from "~/components/timeline/timeline-item.context";
import { cn } from "~/utils";

import { TIMELINE_DOT_NAME } from "./timeline.constants";
import { useTimelineContext } from "./timeline.context";
import { timelineDotVariants } from "./timeline.styles";

export type TimelineDotProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineDot({ asChild = false, className, ...props }: TimelineDotProps) {
  const { orientation, variant } = useTimelineContext(TIMELINE_DOT_NAME);
  const { status, isAlternateRight } = useTimelineItemContext(TIMELINE_DOT_NAME);

  const DotPrimitive = asChild ? Slot : "div";

  return (
    <DotPrimitive
      data-slot="timeline-dot"
      data-status={status}
      data-orientation={orientation}
      {...props}
      className={cn(
        timelineDotVariants({
          status,
          orientation,
          variant,
          isAlternateRight,
          className
        })
      )}
    />
  );
}
