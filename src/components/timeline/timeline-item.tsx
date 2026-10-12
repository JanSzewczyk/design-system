import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { useTimelineStore, useTimelineStoreContext } from "~/components/timeline/timeline.store";
import { getItemStatus } from "~/components/timeline/timeline.utils";
import { TimelineItemContext, type TimelineItemContextValue } from "~/components/timeline/timeline-item.context";
import { useIsomorphicLayoutEffect } from "~/hooks";
import { cn } from "~/utils";

import { TIMELINE_ITEM_NAME } from "./timeline.constants";
import { useTimelineContext } from "./timeline.context";
import { timelineItemVariants } from "./timeline.styles";
import { type TimelineStatus } from "./timeline.types";

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

  const status = React.useMemo<TimelineStatus>(
    function () {
      return itemIndex < 0 ? "pending" : getItemStatus(itemIndex, activeIndex);
    },
    [activeIndex, itemIndex]
  );

  useIsomorphicLayoutEffect(() => {
    store.onItemRegister(itemId, itemRef);
    return () => {
      store.onItemUnregister(itemId);
    };
  }, [id, store]);

  const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1;

  const itemContextValue = React.useMemo<TimelineItemContextValue>(
    () => ({ id: itemId, isAlternateRight, status }),
    [itemId, status, isAlternateRight]
  );

  const ItemPrimitive = asChild ? Slot : "div";

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <ItemPrimitive
        aria-current={status === "active" ? "step" : undefined}
        data-alternate-right={isAlternateRight ? "" : undefined}
        data-orientation={orientation}
        data-slot="timeline-item"
        data-status={status}
        dir={dir}
        id={itemId}
        role="listitem"
        {...props}
        className={cn(
          timelineItemVariants({
            className,
            isAlternateRight,
            orientation,
            variant
          })
        )}
        ref={composedRef}
      />
    </TimelineItemContext.Provider>
  );
}
