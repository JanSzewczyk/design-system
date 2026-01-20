import * as React from "react";

import { type TimelineItemElement, type TimelineStatus } from "~/components";

import { TIMELINE_ROOT_NAME } from "./timeline.constants";

type TimelineStoreState = {
  items: Map<string, React.RefObject<TimelineItemElement | null>>;
};

export type TimelineStore = {
  subscribe: (callback: () => void) => () => void;
  getState: () => TimelineStoreState;
  notify: () => void;
  onItemRegister: (id: string, ref: React.RefObject<TimelineItemElement | null>) => void;
  onItemUnregister: (id: string) => void;
  getNextItemStatus: (id: string, activeIndex?: number) => TimelineStatus | undefined;
  getItemIndex: (id: string) => number;
};

export const TimelineStoreContext = React.createContext<TimelineStore | null>(null);

export function useTimelineStore<T>(selector: (store: TimelineStore) => T): T {
  const store = React.useContext(TimelineStoreContext);
  if (!store) {
    throw new Error(`\`useTimelineStore\` must be used within \`${TIMELINE_ROOT_NAME}\``);
  }

  const getSnapshot = React.useCallback(() => selector(store), [store, selector]);

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

export function useTimelineStoreContext(consumerName: string) {
  const context = React.useContext(TimelineStoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${TIMELINE_ROOT_NAME}\``);
  }
  return context;
}
