import * as React from "react";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import { type TimelineStatus } from "~/components";
import { TimelineItemContext, type TimelineItemContextValue } from "~/components/timeline/timeline-item.context";
import { useTimelineStore, useTimelineStoreContext } from "~/components/timeline/timeline.store";
import { getItemStatus } from "~/components/timeline/timeline.utils";
import { useIsomorphicLayoutEffect } from "~/hooks";
import { cn } from "~/utils";

import { TIMELINE_ITEM_NAME } from "./timeline.constants";
import { useTimelineContext } from "./timeline.context";
import { timelineItemVariants } from "./timeline.styles";

type ItemElement = HTMLDivElement;

export type TimelineItemProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function TimelineItem({ asChild = false, className, id, ref, ...props }: TimelineItemProps) {
  const { dir, orientation, variant, activeIndex } = useTimelineContext(TIMELINE_ITEM_NAME);
  const store = useTimelineStoreContext(TIMELINE_ITEM_NAME);

  const instanceId = React.useId();
  const itemId = id ?? instanceId;
  const itemRef = React.useRef<ItemElement | null>(null);
  const composedRef = useComposedRefs(ref, itemRef);

  const itemIndex = useTimelineStore((state) => state.getItemIndex(itemId));

  const status = React.useMemo<TimelineStatus>(() => {
    return getItemStatus(itemIndex, activeIndex);
  }, [activeIndex, itemIndex]);

  useIsomorphicLayoutEffect(() => {
    store.onItemRegister(itemId, itemRef);
    return () => {
      store.onItemUnregister(itemId);
    };
  }, [id, store]);

  const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1;

  const itemContextValue = React.useMemo<TimelineItemContextValue>(
    () => ({ id: itemId, status, isAlternateRight }),
    [itemId, status, isAlternateRight]
  );

  const ItemPrimitive = asChild ? Slot : "div";

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <ItemPrimitive
        role="listitem"
        aria-current={status === "active" ? "step" : undefined}
        data-slot="timeline-item"
        data-status={status}
        data-orientation={orientation}
        data-alternate-right={isAlternateRight ? "" : undefined}
        id={itemId}
        dir={dir}
        {...props}
        ref={composedRef}
        className={cn(
          timelineItemVariants({
            orientation,
            variant,
            isAlternateRight,
            className
          })
        )}
      />
    </TimelineItemContext.Provider>
  );
}
