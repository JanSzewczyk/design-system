import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { useTimelineItemContext } from "~/components/timeline/timeline-item.context";
import { useTimelineStore } from "~/components/timeline/timeline.store";
import { cn } from "~/utils";

import { TIMELINE_CONNECTOR_NAME } from "./timeline.constants";
import { useTimelineContext } from "./timeline.context";
import { timelineConnectorVariants } from "./timeline.styles";

export type TimelineConnectorProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  forceMount?: boolean;
};

export function TimelineConnector({ asChild = false, forceMount, className, ...props }: TimelineConnectorProps) {
  const { orientation, variant, activeIndex } = useTimelineContext(TIMELINE_CONNECTOR_NAME);
  const { id, status, isAlternateRight } = useTimelineItemContext(TIMELINE_CONNECTOR_NAME);

  const nextItemStatus = useTimelineStore((state) => state.getNextItemStatus(id, activeIndex));

  const isLastItem = nextItemStatus === undefined;

  if (!forceMount && isLastItem) return null;

  const isConnectorCompleted = nextItemStatus === "completed" || nextItemStatus === "active";

  const ConnectorPrimitive = asChild ? Slot : "div";

  return (
    <ConnectorPrimitive
      aria-hidden="true"
      data-slot="timeline-connector"
      data-completed={isConnectorCompleted ? "" : undefined}
      data-status={status}
      data-orientation={orientation}
      {...props}
      className={cn(
        timelineConnectorVariants({
          isCompleted: isConnectorCompleted,
          orientation,
          variant,
          isAlternateRight,
          className
        })
      )}
    />
  );
}
