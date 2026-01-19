import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { useTimelineItemContext } from "~/components/timeline/timeline-item.context";
import { cn } from "~/utils";

import { TIMELINE_CONTENT_NAME } from "./timeline.constants";
import { useTimelineContext } from "./timeline.context";
import { timelineContentVariants } from "./timeline.styles";

export type TimelineContentProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineContent({ asChild = false, className, ...props }: TimelineContentProps) {
  const { variant, orientation } = useTimelineContext(TIMELINE_CONTENT_NAME);
  const { status, isAlternateRight } = useTimelineItemContext(TIMELINE_CONTENT_NAME);

  const ContentPrimitive = asChild ? Slot : "div";

  return (
    <ContentPrimitive
      data-slot="timeline-content"
      data-status={status}
      {...props}
      className={cn(
        timelineContentVariants({
          orientation,
          variant,
          isAlternateRight,
          className
        })
      )}
    />
  );
}
