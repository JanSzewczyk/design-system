import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { useTimelineStore } from "~/components/timeline/timeline.store";
import { useTimelineItemContext } from "~/components/timeline/timeline-item.context";
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
      data-completed={isConnectorCompleted ? "" : undefined}
      data-orientation={orientation}
      data-slot="timeline-connector"
      data-status={status}
      {...props}
      className={cn(
        timelineConnectorVariants({
          className,
          isAlternateRight,
          isCompleted: isConnectorCompleted,
          orientation,
          variant
        })
      )}
    />
  );
}
