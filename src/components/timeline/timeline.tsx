import * as React from "react";

import { useDirection } from "@radix-ui/react-direction";
import { Slot } from "@radix-ui/react-slot";
import {
  type TimelineDirection,
  type TimelineOrientation,
  type TimelineVariant,
  type TimelineStatus,
  type TimelineItemElement
} from "~/components";
import { type TimelineStore, TimelineStoreContext } from "~/components/timeline/timeline.store";
import { getItemStatus, getSortedEntries } from "~/components/timeline/timeline.utils";
import { useLazyRef } from "~/hooks";
import { cn } from "~/utils";

import { TimelineContext, type TimelineContextValue } from "./timeline.context";
import { timelineVariants } from "./timeline.styles";

export type TimelineProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  dir?: TimelineDirection;
  orientation?: TimelineOrientation;
  variant?: TimelineVariant;
  activeIndex?: number;
};

export function Timeline({
  orientation = "vertical",
  variant = "default",
  dir: dirProp,
  activeIndex,
  asChild = false,
  className,
  ...props
}: TimelineProps) {
  const dir = useDirection(dirProp);

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<{ items: Map<string, React.RefObject<TimelineItemElement | null>> }>(() => ({
    items: new Map()
  }));

  const store = React.useMemo<TimelineStore>(() => {
    return {
      subscribe: (cb) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
      },
      getState: () => stateRef.current,
      notify: () => {
        for (const cb of listenersRef.current) {
          cb();
        }
      },
      onItemRegister: (id: string, ref: React.RefObject<TimelineItemElement | null>) => {
        stateRef.current.items.set(id, ref);
        store.notify();
      },
      onItemUnregister: (id: string) => {
        stateRef.current.items.delete(id);
        store.notify();
      },
      getNextItemStatus: (id: string, activeIndex?: number): TimelineStatus | undefined => {
        const entries = Array.from(stateRef.current.items.entries());
        const sortedEntries = getSortedEntries(entries);

        const currentIndex = sortedEntries.findIndex(([key]) => key === id);
        if (currentIndex === -1 || currentIndex === sortedEntries.length - 1) {
          return undefined;
        }

        const nextItemIndex = currentIndex + 1;
        return getItemStatus(nextItemIndex, activeIndex);
      },
      getItemIndex: (id: string) => {
        const entries = Array.from(stateRef.current.items.entries());
        const sortedEntries = getSortedEntries(entries);
        return sortedEntries.findIndex(([key]) => key === id);
      }
    };
  }, [listenersRef, stateRef]);

  const contextValue = React.useMemo<TimelineContextValue>(
    () => ({
      dir,
      orientation,
      variant,
      activeIndex
    }),
    [dir, orientation, variant, activeIndex]
  );

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <TimelineStoreContext.Provider value={store}>
      <TimelineContext.Provider value={contextValue}>
        <RootPrimitive
          role="list"
          aria-orientation={orientation}
          data-slot="timeline"
          data-orientation={orientation}
          data-variant={variant}
          dir={dir}
          {...props}
          className={cn(timelineVariants({ orientation, variant, className }))}
        />
      </TimelineContext.Provider>
    </TimelineStoreContext.Provider>
  );
}
